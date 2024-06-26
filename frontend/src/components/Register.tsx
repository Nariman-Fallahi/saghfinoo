"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import useModalStore from "@/store";
import Image from "next/image";
import { Checkbox } from "@nextui-org/checkbox";
import { useState, useEffect } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";

export default function Register() {
  const { isOpen, setOpen } = useModalStore();
  let sizeModal: any = "";
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>();
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [inputErr, setInputErr] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);

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

  
  const apiUrl =
    "https://8000-idx-saghfinoo-1719090394822.cluster-qtqwjj3wgzff6uxtk26wj7fzq6.cloudworkstations.dev/api/v1/users/login";

  const sendPhoneNumber = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        { number: phone },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("کد به شماره تلفن ارسال شد");
        setCodeSent(true);
      } else {
        console.log("خطا در ارسال کد به شماره تلفن");
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
            {/* codeSent = false */}
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
                {!codeSent ? "ورود/ثبت نام" : "کد تایید"}
              </p>

              {codeSent && (
                <p className="hidden md:block mt-4">به سقفینو خوش آمدید.</p>
              )}

              <p className="mt-[60px] text-sm text-[#353535] md:mt-2 md:text-base">
                {!codeSent
                  ? "لطفا برای ورود یا ثبت نام شماره موبایل خود را وارد کنید."
                  : `کد ارسال شده به شماره تلفن ${"222"} را وارد کنید.`}
              </p>

              {codeSent && (
                <span className="text-sm md:text-base mt-1 text-[#717171] cursor-pointer">
                  ویرایش شماره موبایل
                </span>
              )}

              {!codeSent && (
                <form className="w-full pb-3" style={{ direction: "rtl" }}>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    type="number"
                    className="mt-[40px] p-2 rounded-lg w-full border-[#2F80ED] border
                   outline-none text-sm md:p-3 md:mt-[24px]"
                    style={{
                      boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
                    }}
                  />
                  {inputErr && (
                    <p className="text-xs text-red-500 mt-3 md:text-[13.2px]">
                      شماره تلفن وارد شده معتبر نمیباشد.
                    </p>
                  )}
                  {/* CheckBox */}
                  <div className="mt-[16px] w-full flex items-center">
                    <Checkbox
                      isSelected={isSelected}
                      onValueChange={setIsSelected}
                      radius="sm"
                    ></Checkbox>
                    <p className="text-xs text-[#909090] md:text-sm">
                      با
                      <span className="text-[#CB1B1B]"> قوانین سقفینو </span>
                      موافق هستم.
                    </p>
                  </div>
                  {/* END CheckBox */}
                  <Button
                    disabled={!isSelected}
                    onPress={btnSendPhoneNumber}
                    className={
                      isSelected
                        ? "mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg"
                        : "mt-[64px] w-full rounded-lg p-2 bg-gray-300 text-white md:mt-[50px] md:text-lg"
                    }
                  >
                    ورود
                  </Button>
                </form>
              )}

              {codeSent && (
                <div className="mt-8 w-full">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderInput={(props, index) => (
                      <input
                        {...props}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        style={{
                          borderRadius: "8px",
                          width: "50px",
                          height: "48px",
                          border: `1px solid ${
                            focusedInput === index ? "#2F80ED" : "#ADADAD"
                          }`,
                          boxShadow:
                            focusedInput === index
                              ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                              : "none",
                          marginRight: "20px",
                          outline: "none",
                          textAlign: "center",
                          fontSize: "24px",
                        }}
                      />
                    )}
                  />
                  <Button className="mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg">
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
