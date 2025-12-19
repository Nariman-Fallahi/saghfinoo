import { HTMLInputTypeAttribute, useCallback, useState, useRef } from "react";
import Image from "next/image";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextError } from "./ui/TextError";

type InputType<T extends FieldValues> = {
  placeholder: string;
  alt: string;
  type: HTMLInputTypeAttribute;
  icon: string;
  disabled?: boolean;
  error: string | undefined;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules: RegisterOptions<T>;
};

export default function InputRegister<T extends FieldValues>({
  placeholder,
  alt,
  type,
  icon,
  disabled = false,
  name,
  error,
  register,
  rules,
}: InputType<T>) {
  const [inputPassword, setInputPassword] = useState<{
    type: "text" | "password";
    icon: "/icons/eye.svg" | "/icons/eye-slash.svg";
  }>({ type: "password", icon: "/icons/eye.svg" });

  const divRef = useRef<HTMLDivElement>(null);

  const showPassword = useCallback(() => {
    setInputPassword((prev) => ({
      type: prev.type === "password" ? "text" : "password",
      icon:
        prev.type === "password" ? "/icons/eye-slash.svg" : "/icons/eye.svg",
    }));
  }, []);

  const handleFocus = () => {
    if (divRef.current) {
      divRef.current.classList.remove("border-[#ADADAD]");
      divRef.current.classList.add("blueShadow");
      divRef.current.classList.add("border-[#2F80ED]");
    }
  };

  const handleBlur = () => {
    if (divRef.current) {
      divRef.current.classList.remove("blueShadow");
      divRef.current.classList.remove("border-[#2F80ED]");
      divRef.current.classList.add("border-[#ADADAD]");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div
        ref={divRef}
        className="mt-[28px] flex items-center rtl p-3 rounded border text-sm md:p-3 md:mt-[24px]"
      >
        <Image
          width={17}
          height={17}
          className="md:w-[20px] md:h-[20px]"
          src={icon}
          alt={alt}
        />
        <input
          placeholder={placeholder}
          type={type !== "password" ? type : inputPassword.type}
          className="w-full outline-none mr-2 text-xs md:text-sm"
          disabled={disabled}
          {...register(name, rules)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {type === "password" && (
          <div>
            <Image
              width={18}
              height={18}
              onClick={showPassword}
              className="cursor-pointer mr-2"
              src={inputPassword.icon}
              alt={
                inputPassword.type === "text"
                  ? "Hide password"
                  : "Show Password"
              }
            />
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <TextError text={error} />
      </div>
    </div>
  );
}
