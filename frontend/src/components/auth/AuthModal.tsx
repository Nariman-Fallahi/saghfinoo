"use client";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import Image from "next/image";
import { useState } from "react";
import Otp from "./Otp";
import SignUp from "./SignUp";
import { ErrorNotification } from "@/notification/Error";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Auth";
import { setCookie } from "cookies-next";
import { useRouter } from "@bprogress/next/app";
import { Api, dataKey } from "@/services/ApiService";
import { usePostRequest } from "@/services/ApiService";
import { AuthStepType, LoginDataType } from "@/types";
import { isMobile } from "@/utils/isMobile";
import PhoneNumberInput from "./PhoneNumberInput";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthModal() {
  const router = useRouter();
  const { isOpen, setOpen } = useModalStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [authStep, setAuthStep] = useState<AuthStepType>("phone");
  const [time, setTime] = useState<number>(90);

  const queryClient = useQueryClient();

  const { mutate: sendOTPMutate, isPending: sendOTPIsPending } =
    usePostRequest<LoginDataType>({
      url: Api.SendOTP,
      key: "sendOTP",
    });

  const { mutate: verifyOTPMutate, isPending: verifyOTPsPending } =
    usePostRequest<LoginDataType>({
      url: Api.VerifyOTP,
      key: "verifyOTP",
    });

  // constants
  let ModalRegisterTitle: string = "";
  let ModalRegisterDescription: string = "";

  switch (authStep) {
    case "phone":
      ModalRegisterTitle = "ورود/ثبت نام";
      ModalRegisterDescription =
        "لطفا برای ورود یا ثبت نام شماره تلفن خود را وارد کنید.";
      break;

    case "otp":
      ModalRegisterTitle = "کد تایید";
      ModalRegisterDescription = `کد ارسال شده به شماره تلفن ${phoneNumber} را وارد کنید.`;
      break;

    case "signUp":
      ModalRegisterTitle = "ثبت نام";
  }

  const handleSendOTP = (phoneNumber: string) => {
    if (!isSelected) return;

    sendOTPMutate(
      { phoneNumber, code: 0, token: "" },
      {
        onSuccess: (data) => {
          switch (data.code) {
            case "number_delay":
              ErrorNotification("لطفا بعد تلاش کنید.");
              break;

            case "otp_sent":
              setToken(data.token);
              setPhoneNumber(phoneNumber);
              setAuthStep("otp");

              const intervalId = setInterval(() => {
                setTime((prev) => {
                  if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                  }
                  return prev - 1;
                });
              }, 1000);
              break;
          }
        },
        onError: () => {
          ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
        },
      }
    );
  };

  const handleVerifyOTP = (otp: string) => {
    verifyOTPMutate(
      { phoneNumber: phoneNumber, code: otp, token: token },
      {
        onSuccess: async (data) => {
          switch (data?.code) {
            case "complete_signup":
              setAuthStep("signUp");
              break;
            case "wrong_code":
              ErrorNotification("کد وارد شده اشتباه می‌باشد.");
              break;

            case "to_manny_tries":
              ErrorNotification("لطفا بعد تلاش کنید.");
              break;

            case "login_done":
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
              setOpen(false);
              Success("ثبت نام با موفقیت انجام شد.");
              await queryClient.refetchQueries({
                queryKey: [dataKey.GET_USER_INFO],
                exact: true,
              });
              router.push("/proUser");
              break;
          }
        },
        onError: () => {
          ErrorNotification("دراعتبارسنجی کد مشکلی پیش آمد.");
          setAuthStep("phone");
        },
      }
    );
  };

  const handleEditPhoneNumber = () => {
    setAuthStep("phone");
    setPhoneNumber("");
  };

  return (
    <Modal
      size={isMobile ? "full" : "lg"}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      placement={isMobile ? "top-center" : "center"}
    >
      <ModalContent>
        <>
          <ModalBody className="overflow-y-auto">
            <div className="mt-5 w-full flex flex-col items-center pb-3 ltr">
              {authStep === "phone" ||
                (authStep === "otp" && (
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

              {authStep === "phone" && (
                <p className="hidden md:block mt-4">به سقفینو خوش آمدید.</p>
              )}

              <p className="mt-[60px] text-sm text-[#353535] md:mt-2 md:text-base">
                {ModalRegisterDescription}
              </p>

              {authStep === "phone" && (
                <PhoneNumberInput
                  setPhoneNumber={setPhoneNumber}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  handleSendOTP={handleSendOTP}
                  sendOTPIsPending={sendOTPIsPending}
                />
              )}

              {authStep === "otp" && (
                <Otp
                  phoneNumber={phoneNumber}
                  time={time}
                  setTime={setTime}
                  handleVerifyOTP={handleVerifyOTP}
                  handleSendOTP={handleSendOTP}
                  verifyOTPsPending={verifyOTPsPending}
                  handleEditPhoneNumber={handleEditPhoneNumber}
                />
              )}

              {authStep === "signUp" && (
                <SignUp
                  phoneNumber={phoneNumber}
                  token={token}
                  setAuthStep={setAuthStep}
                />
              )}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
