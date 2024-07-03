import OtpInput from "react-otp-input";
import { OtpType } from "@/types/Type";
import Image from "next/image";

export default function Otp({
  otp,
  setOtp,
  handleFocus,
  handleBlur,
  focusedInput,
  time,
  setTime,
  sendPhoneNumber,
}: OtpType) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const ResubmitCode = () => {
    setTime(90);
    sendPhoneNumber();
  };

  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
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

      <div className="flex mt-4 w-full directionRTL items-stretch text-xs md:text-sm">
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
    </>
  );
}
