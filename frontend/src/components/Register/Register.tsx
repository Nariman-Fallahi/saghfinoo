"use client";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Otp from "./Otp";
import { RegisterStatusValue } from "@/constant/Constants";
import SignUp from "./SignUp";
import { ErrorNotification } from "@/notification/Error";
import { Spinner } from "@heroui/spinner";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Register";
import { useRegisterStatus } from "@/store/Register";
import { setCookie } from "cookies-next";
import { useRouter } from "@bprogress/next/app";
import { Api } from "@/ApiService";
import { usePostRequest } from "@/ApiService";
import { LoginDataType } from "@/types/Type";
import { isMobile } from "@/constant/Constants";
import EmailInput from "./EmailInput";

export default function Register() {
  const router = useRouter();
  const { isOpen, setOpen } = useModalStore();
  const [email, setEmail] = useState<string>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  const { registerStatus, setRegisterStatus } = useRegisterStatus();
  const [time, setTime] = useState<number>(90);

  const { mutate, isSuccess, data, isPending } = usePostRequest<LoginDataType>({
    url: Api.VerifyEmail,
    key: "verifyEmail",
  });

  // constants
  let ModalRegisterTitle: string = "";
  let ModalRegisterDescription: string = "";

  switch (registerStatus) {
    case RegisterStatusValue.status1:
      ModalRegisterTitle = "ورود/ثبت نام";
      ModalRegisterDescription =
        "لطفا برای ورود یا ثبت نام ایمیل خود را وارد کنید.";
      break;

    case RegisterStatusValue.status2:
      ModalRegisterTitle = "کد تایید";
      ModalRegisterDescription = `کد ارسال شده به ایمیل ${email} را وارد کنید.`;
      break;

    case RegisterStatusValue.status3:
      ModalRegisterTitle = "ثبت نام";
  }

  const handleFocus = (index: number) => {
    setFocusedInput(index);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSendEmail = (email?: string) => {
    if (isSelected) {
      mutate({ email: email!, code: 0, token: "" });
      setEmail(email);
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
    } else if (data && data.code === "number_delay") {
      ErrorNotification("لطفا بعد تلاش کنید.");
    }
  }, [isSuccess, data, setRegisterStatus]);

  const BtnSendCode = () => {
    if (otp === "" || otp.length < 5) {
      ErrorNotification("لطفا کد را کامل وارد نمایید.");
    } else {
      mutate({ email: email!, code: otp, token: token });
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status === 303) {
        setRegisterStatus(RegisterStatusValue.status3);
      } else if (data.code === "wrong_code") {
        ErrorNotification("کد وارد شده اشتباه می‌باشد.");
      } else if (data.code === "to_manny_tries") {
        ErrorNotification("لطفا بعد تلاش کنید.");
      } else if (data.code === "login_done") {
        console.log(data);
        setCookie("access", data.access, {
          maxAge: data.expire,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
        setCookie("refresh", data.refresh, {
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
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
  }, [isSuccess, data, setRegisterStatus, setOpen, router]);

  const EditMN = () => {
    setRegisterStatus(RegisterStatusValue.status1);
    setEmail(undefined);
  };

  return (
    <Modal
      size={isMobile ? "full" : "lg"}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
    >
      <ModalContent>
        <>
          <ModalBody className="overflow-y-auto">
            <div className="mt-5 w-full flex flex-col items-center pb-3 ltr">
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
                  ویرایش ایمیل
                </span>
              )}

              {registerStatus === RegisterStatusValue.status1 && (
                <EmailInput
                  setEmail={setEmail}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  handleSendEmail={handleSendEmail}
                  isPendingVerifyEmail={isPending}
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
                    handleSendPhoneNumber={handleSendEmail}
                  />
                  <Button
                    className="mt-[64px] w-full rounded-lg p-2 bg-primary
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
                <SignUp token={token} email={email!} />
              )}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
