"use client";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Otp from "./Otp";
import PhoneNumber from "./PhoneNumber";
import { UserStatusValue } from "@/constant/Constants";
import SignUp from "./SignUp";
// Zustand
import { useModalStore } from "@/store/Register";
import { useUserStatus } from "@/store/Register";

export default function Register() {
  let sizeModal: any = "";
  const { isOpen, setOpen } = useModalStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [inputErr, setInputErr] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  // Zustand
  const { userStatus, setUserStatus } = useUserStatus();

  // constants
  let ModalRegisterTitle: string = "";
  let ModalRegisterDescription: string = "";

  switch (userStatus) {
    case UserStatusValue.status1:
      ModalRegisterTitle = "ورود/ثبت نام";
      ModalRegisterDescription =
        "لطفا برای ورود یا ثبت نام شماره موبایل خود را وارد کنید.";
      break;

    case UserStatusValue.status2:
      ModalRegisterTitle = "کد تایید";
      ModalRegisterDescription = `کد ارسال شده به شماره تلفن ${"222"} را وارد کنید.`;
      break;

    case UserStatusValue.status3:
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

  const apiUrlSPN: string = "http://127.0.0.1:8000/api/v1/users/verify-number";

  const sendPhoneNumber = async () => {
    try {
      const response = await axios.post(
        apiUrlSPN,
        { number: "09187894565", code: 0, token: "" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 && response.data.code) {
        setToken(response.data.token);
        setUserStatus(UserStatusValue.status2);
        console.log("کد دریافت شده از سرور:", response.data);
      }
    } catch (error) {
      console.error("خطا:", error);
    }
  };

  const clickSendCode = async () => {
    try {
      const response = await axios.post(
        apiUrlSPN,
        { number: "09187894565", code: otp, token: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.code === 1011) {
        setUserStatus(UserStatusValue.status3);
      } else {
        console.log(" یه مشکلی هست");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const btnSendPhoneNumber = () => {
    if (phoneNumber !== "" && phoneNumber.length === 11) {
      setInputErr(false);
      sendPhoneNumber();
    } else {
      setInputErr(true);
    }
  };

  return (
    <Modal size={sizeModal} isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalContent>
        <>
          <ModalBody>
            <div
              className="mt-5 w-full flex flex-col items-center"
              style={{ direction: "ltr" }}
            >
              {userStatus == UserStatusValue.status1 ||
                (userStatus == UserStatusValue.status2 && (
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

              {userStatus == UserStatusValue.status1 && (
                <p className="hidden md:block mt-4">به سقفینو خوش آمدید.</p>
              )}

              <p className="mt-[60px] text-sm text-[#353535] md:mt-2 md:text-base">
                {ModalRegisterDescription}
              </p>

              {userStatus == UserStatusValue.status2 && (
                <span className="text-sm md:text-base mt-1 text-[#717171] cursor-pointer">
                  ویرایش شماره موبایل
                </span>
              )}

              {userStatus === UserStatusValue.status1 && (
                <PhoneNumber
                  setPhoneNumber={setPhoneNumber}
                  inputErr={inputErr}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  btnSendPhoneNumber={btnSendPhoneNumber}
                />
              )}

              {userStatus === UserStatusValue.status2 && (
                <div className="mt-8 w-full">
                  <Otp
                    otp={otp}
                    setOtp={setOtp}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    focusedInput={focusedInput}
                  />
                  <Button
                    className="mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B]
                   text-white md:mt-[50px] md:text-lg"
                    onPress={clickSendCode}
                  >
                    تایید کد
                  </Button>
                </div>
              )}
              {userStatus === UserStatusValue.status3 && (
                <SignUp token={token} phoneNumber={phoneNumber} />
              )}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
