import { useState } from "react";
import Image from "next/image";

type inputType = {
  placeholder: string;
  isPasswordInput: boolean;
  onChangeInput: (value: string) => void;
  textERR: string | undefined;
};

export default function SignUpInput({
  placeholder,
  isPasswordInput,
  onChangeInput,
  textERR,
}: inputType) {
  const [focus, setFocus] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<{
    type: "text" | "password";
    icon: "/icons/eye.svg" | "/icons/eye-slash.svg";
  }>({ type: "password", icon: "/icons/eye.svg" });

  const ShowPassword = () => {
    switch (inputPassword?.type) {
      case "password":
        setInputPassword({ type: "text", icon: "/icons/eye-slash.svg" });
        break;
      case "text":
        setInputPassword({ type: "password", icon: "/icons/eye.svg" });
        break;
    }
  };

  return (
    <>
      <div
        className={
          focus
            ? "mt-[28px] flex items-center directionRTL p-3 rounded w-full border-[#2F80ED] border  text-sm md:p-3 md:mt-[24px]"
            : "mt-[28px] flex items-center directionRTL p-3 rounded w-full border-[#ADADAD] border text-sm md:p-3 md:mt-[24px]"
        }
        style={{
          boxShadow: focus ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)" : "",
        }}
      >
        <Image
          width={16}
          height={16}
          className="md:w-[17px] md:h-[17px]"
          src={isPasswordInput ? "/icons/key.svg" : "/icons/user.svg"}
          alt={isPasswordInput ? "password" : "user"}
        />
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          type={isPasswordInput ? inputPassword.type : "text"}
          className="w-full outline-none mr-2 text-xs md:text-sm"
          onChange={(e) => onChangeInput(e.target.value)}
        />

        {isPasswordInput && (
          <div>
            <Image
              width={18}
              height={18}
              onClick={ShowPassword}
              className="cursor-pointer mr-2"
              src={inputPassword.icon}
              alt={
                inputPassword.type === "text" ? "Hide password" : "ShowPassword"
              }
            />
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
      <p className="mt-3 text-xs text-red-500">{textERR}</p>
      </div>
    </>
  );
}
