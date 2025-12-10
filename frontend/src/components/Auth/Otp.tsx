import OtpInput from "react-otp-input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { ErrorNotification } from "@/notification/Error";

interface OTPCredentialRequestOptions extends CredentialRequestOptions {
  otp: { transport: string[] };
}

interface OTPCredential extends Credential {
  code: string;
  type: "otp";
}

type OtpType = {
  phoneNumber: string;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  focusedInput: number | null;
  time: number;
  setTime: (value: number) => void;
  handleVerifyOTP: (otp: string) => void;
  handleSendOTP: (phoneNumber: string) => void;
  verifyOTPsPending: boolean;
  handleEditPhoneNumber: () => void;
};

export default function Otp({
  phoneNumber,
  handleFocus,
  handleBlur,
  focusedInput,
  time,
  setTime,
  handleVerifyOTP,
  handleSendOTP,
  verifyOTPsPending,
  handleEditPhoneNumber,
}: OtpType) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [otpValue, setOtpValue] = useState("");

  const ResubmitCode = () => {
    setTime(90);
    setOtpValue("");
    handleSendOTP(phoneNumber);
  };

  useEffect(() => {
    if (!("OTPCredential" in window)) return;

    const abortController = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: abortController.signal,
      } as CredentialRequestOptions)
      .then((credential) => {
        if (!credential || credential.type !== "otp") return;
        const otpCode = (credential as OTPCredential).code.trim();
        if (otpCode && otpCode.length === 5) {
          setOtpValue(otpCode);
          abortController.abort();
        }
      })
      .catch(() => {});

    const timeoutId = setTimeout(() => abortController.abort(), 120_000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleOtpComplete = (otp: string) => {
    if (otp.length === 5) {
      setTimeout(() => handleVerifyOTP(otpValue), 100);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <span
        onClick={handleEditPhoneNumber}
        className="text-sm md:text-base mt-1 text-[#717171]
        cursor-pointer"
      >
        ویرایش شماره تلفن
      </span>

      <OtpInput
        value={otpValue}
        onChange={(value: string) => {
          setOtpValue(value);
          handleOtpComplete(value);
        }}
        numInputs={5}
        renderInput={(props, index) => (
          <input
            {...props}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            className="rounded-lg w-[50px] h-12 mr-2 ml-2 outline-none text-center text-2xl
             md:!w-[80px]"
            style={{
              border: `1px solid ${
                focusedInput === index ? "#2F80ED" : "#ADADAD"
              }`,
              boxShadow:
                focusedInput === index
                  ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                  : "none",
            }}
          />
        )}
      />

      <input type="text" autoComplete="one-time-code" className="hidden" />

      <div className="flex w-full rtl items-stretch text-xs md:text-sm">
        {time > 0 && (
          <>
            <Image
              width={16}
              height={16}
              className="md:w-[18px] md:h-[18px]"
              src="/icons/clock.svg"
              alt=""
            />
            <p className="text-[#717171] mr-1">
              <span className="text-red-500 pl-1">{`${seconds} : ${minutes}`}</span>
              تا ارسال دوباره کد
            </p>
          </>
        )}

        {time <= 0 && <button onClick={ResubmitCode}>ارسال دوباره کد</button>}
      </div>

      <Button
        className="mt-2 w-full rounded-lg p-2 bg-primary
        text-white md:mt-[50px] md:text-lg"
        isDisabled={otpValue.length < 5}
        onPress={() => handleOtpComplete(otpValue)}
        isLoading={verifyOTPsPending}
        spinner={<Spinner color="white" size="sm" />}
      >
        {verifyOTPsPending ? "" : "ثبت کد"}
      </Button>
    </div>
  );
}
