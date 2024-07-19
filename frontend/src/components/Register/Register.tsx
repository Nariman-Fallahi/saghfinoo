"use client";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Otp from "./Otp";
import PhoneNumber from "./PhoneNumber";
import { RegisterStatusValue } from "@/constant/Constants";
import SignUp from "./signUp/SignUp";
import { Error } from "@/notification/Error";
import { Spinner } from "@nextui-org/spinner";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Register";
import { useRegisterStatus } from "@/store/Register";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Api } from "@/ApiService";
import { usePostRequest } from "@/ApiService";
import { LoginDataType } from "@/types/Type";

export default function Register() {
  const router = useRouter();
  let sizeModal: any = "";
  const { isOpen, setOpen } = useModalStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [inputErr, setInputErr] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  const { registerStatus, setRegisterStatus } = useRegisterStatus();
  const [time, setTime] = useState<number>(90);
  const { mutate, isSuccess, data, isPending } =
    usePostRequest<LoginDataType>({
      url: Api.verifynumber,
      key: "verifynumber",
    });

  // constants
  let ModalRegisterTitle: string = "";
  let ModalRegisterDescription: string = "";

  switch (registerStatus) {
    case RegisterStatusValue.status1:
      ModalRegisterTitle = "ورود/ثبت نام";
      ModalRegisterDescription =
        "لطفا برای ورود یا ثبت نام شماره موبایل خود را وارد کنید.";
      break;

    case RegisterStatusValue.status2:
      ModalRegisterTitle = "کد تایید";
      ModalRegisterDescription = `کد ارسال شده به شماره تلفن ${phoneNumber} را وارد کنید.`;
      break;

    case RegisterStatusValue.status3:
      ModalRegisterTitle = "ثبت نام";
  }

  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      sizeModal = "full";
    } else {
      sizeModal = "lg";
    }
  }

  const handleFocus = (index: number) => {
    setFocusedInput(index);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const btnSendPhoneNumber = () => {
    if (isSelected) {
      if (
        phoneNumber !== "" &&
        phoneNumber.length === 11 &&
        phoneNumber[0] === "0" &&
        phoneNumber[1] === "9"
      ) {
        setInputErr(false);
        mutate({ number: phoneNumber, code: 0, token: "" });
      } else {
        setInputErr(true);
      }
    }
  };

  useEffect(() => {
    if (isSuccess && data.code === "code_sent_to_number") {
      setToken(data.token);
      setRegisterStatus(RegisterStatusValue.status2);
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isSuccess, data]);

  const BtnSendCode = () => {
    if (otp === "" || otp.length < 5) {
      Error("لطفا کد را کامل وارد نمایید.");
    } else {
      mutate({ number: phoneNumber, code: otp, token: token });
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status === 303) {
        setRegisterStatus(RegisterStatusValue.status3);
      } else if (data.code === "wrong_code") {
        Error("کد وارد شده اشتباه می‌باشد.");
      } else if (data.code === "to_manny_tries") {
        Error("لطفا بعد تلاش کنید.");
      } else if (data.code === "login_done") {
        console.log(data);
        setCookie("access", data.access, {
          maxAge: data.expire,
          sameSite: "strict",
        });
        setCookie("refresh", data.refresh, {
          sameSite: "strict",
        });
        console.log(data);
        setRegisterStatus(RegisterStatusValue.status1);
        setOpen(false);
        Success("ثبت نام با موفقیت انجام شد.");
        router.push("/proUser");
      } else {
        console.log(data);
      }
    }
  }, [isSuccess, data]);

  const EditMN = () => {
    setRegisterStatus(RegisterStatusValue.status1);
    setPhoneNumber("");
  };

  return (
    <Modal size={sizeModal} isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalContent>
        <>
          <ModalBody className="overflow-y-auto">
            <div
              className="mt-5 w-full flex flex-col items-center pb-3"
              style={{ direction: "ltr" }}
            >
              {registerStatus == RegisterStatusValue.status1 ||
                (registerStatus == RegisterStatusValue.status2 && (
                  <Image
                    className="md:hidden"
                    width={85}
                    height={45}
                    src="/icons/Logo.svg"
                    alt=""
                  />
                ))}

              <p className="mt-[64px] text-xl font-bold md:text-2xl md:mt-[32px]">
                {ModalRegisterTitle}
              </p>

              {registerStatus == RegisterStatusValue.status1 && (
                <p className="hidden md:block mt-4">به سقفینو خوش آمدید.</p>
              )}

              <p className="mt-[60px] text-sm text-[#353535] md:mt-2 md:text-base">
                {ModalRegisterDescription}
              </p>

              {registerStatus == RegisterStatusValue.status2 && (
                <span
                  onClick={EditMN}
                  className="text-sm md:text-base mt-1 text-[#717171]
                 cursor-pointer"
                >
                  ویرایش شماره موبایل
                </span>
              )}

              {registerStatus === RegisterStatusValue.status1 && (
                <PhoneNumber
                phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  inputErr={inputErr}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  btnSendPhoneNumber={btnSendPhoneNumber}
                  isPendingVerifyNumber={isPending}
                />
              )}

              {registerStatus === RegisterStatusValue.status2 && (
                <div className="mt-8 w-full flex flex-col items-center">
                  <Otp
                    otp={otp}
                    setOtp={setOtp}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    focusedInput={focusedInput}
                    time={time}
                    setTime={setTime}
                    btnSendPhoneNumber={btnSendPhoneNumber}
                  />
                  <Button
                    className="mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B]
                   text-white md:mt-[50px] md:text-lg"
                    onPress={BtnSendCode}
                    isLoading={isPending}
                    spinner={<Spinner color="white" size="sm" />}
                  >
                    {isPending ? "" : "ثبت کد"}
                  </Button>
                </div>
              )}
              {registerStatus === RegisterStatusValue.status3 && (
                <SignUp token={token} phoneNumber={phoneNumber} />
              )}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
