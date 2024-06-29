"use client";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useModalStore } from "@/Store";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Otp from "./Otp";
import { useUserStatus } from "@/Store";
import InputPhoneNumber from "./InputPhoneNumber";
import { UserStatusValue } from "@/enum/enums";

export default function Register() {
  let sizeModal: any = "";
  const { isOpen, setOpen } = useModalStore();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>();
  const [inputErr, setInputErr] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
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
      ModalRegisterDescription = "لطفا نام و رمز عبور خود را وارد نمایید.";
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
      const response1 = await axios.post(
        apiUrlSPN,
        { number: "09187966902", code: 0 },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response1.status === 200 && response1.data.code) {
        console.log("کد دریافت شده از سرور:", response1.data.code);
        console.log(response1.headers);

        const response2 = await axios.post(
          apiUrlSPN,
          { number: "09187965685", code: 66691 },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response2.status === 200) {
          console.log("کد به شماره تلفن ارسال شد");
          console.log(response2.data);
          console.log(response2.headers);
          
        }
      }
    } catch (error) {
      console.error("خطا:", error);
    }
  };

  const btnSendPhoneNumber = () => {
    if (phone !== undefined) {
      if (phone!.length === 11) {
        setInputErr(false);
        sendPhoneNumber();
      } else {
        setInputErr(true);
      }
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
              <Image
                className="md:hidden"
                width={85}
                height={45}
                src="/icons/Logo.svg"
                alt=""
              />

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
                <InputPhoneNumber
                  setPhone={setPhone}
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
                  >
                    تایید کد
                  </Button>
                </div>
              )}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
