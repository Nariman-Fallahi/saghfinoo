import { SignUpItem } from "@/constant/Constants";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { SignUpType } from "@/types/Type";
import { Error } from "@/notification/Error";
import Image from "next/image";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Register";
import { InputPasswordType } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";
import { useRegisterStatus } from "@/store/Register";
import { RegisterStatusValue } from "@/constant/Constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ApiService } from "@/ApiService";

export default function SignUp({ token, phoneNumber }: SignUpType) {
  const [focus, setFocus] = useState<number>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setOpen } = useModalStore();
  const [typeInputPassword, setTypeInputPassword] = useState<InputPasswordType>(
    {
      type: "password",
      icon: "/icons/eye.svg",
    }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { setRegisterStatus } = useRegisterStatus();
  const router = useRouter();

  const ClickBtnSignUp = () => {
    if (firstName == "" || lastName == "" || password == "") {
      Error("لطفا اطلاعات خود را کامل وارد نمایید.");
    } else {
      UserSignUp();
    }
  };

  const UserSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiService.CompleteSignup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          password: password,
          token: token,
          number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.code === "login_done") {
        console.log(data);
        setCookie("access", data.access, {
          maxAge: data.expire,
          sameSite: "strict",
        });
        setCookie("refresh", data.refresh, {
          sameSite: "strict",
        });
        console.log(data);
        Success("ثبت نام با موفقیت انجام شد.");
        setRegisterStatus(RegisterStatusValue.status1);
        setOpen(false);
        router.push("/proUser");
      } else {
        Error("در ارسال اطلاعات مشکلی پیش آمد.");
      }
    } catch (error) {
      Error("در ارتباط با سرور مشکلی پیش آمد.");
      console.log(error);
    }
    setLoading(false);
  };

  const OnChangeInput = (value: string, id: number) => {
    switch (id) {
      case 0:
        setFirstName(value);
        break;
      case 1:
        setLastName(value);
        break;
      case 2:
        setPassword(value);
    }
  };

  const ShowPassword = () => {
    switch (typeInputPassword.type) {
      case "password":
        setTypeInputPassword({ type: "text", icon: "/icons/eye-slash.svg" });
        break;
      case "text":
        setTypeInputPassword({ type: "password", icon: "/icons/eye.svg" });
        break;
    }
  };

  return (
    <div className="w-full flex flex-col mt-2 items-center">
      <p className="text-sm text-[#353535] md:mt-2 md:text-base">
        با این موبایل حساب کاربری وجود ندارد.
        <br />
        برای ثبت نام اطلاعات زیر را کامل کنید.
      </p>
      {SignUpItem.map((item, index) => {
        return (
          <div
            key={index}
            className={
              focus === item.id
                ? "mt-[28px] flex items-center directionRTL p-3 rounded w-full border-[#2F80ED] border  text-sm md:p-3 md:mt-[24px]"
                : "mt-[28px] flex items-center directionRTL p-3 rounded w-full border-[#ADADAD] border text-sm md:p-3 md:mt-[24px]"
            }
            style={{
              boxShadow:
                focus === item.id
                  ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                  : "",
            }}
          >
            <Image
              width={16}
              height={16}
              className="md:w-[17px] md:h-[17px]"
              src={item.icon}
              alt=""
            />
            <input
              onFocus={() => setFocus(index)}
              placeholder={item.placeholder}
              type={item.id !== 2 ? "text" : typeInputPassword.type}
              className="w-full outline-none mr-2 text-xs md:text-sm"
              onChange={(e) => OnChangeInput(e.target.value, item.id)}
            />
            {item.id === 2 && (
              <div>
                <Image
                  width={18}
                  height={18}
                  onClick={ShowPassword}
                  className="cursor-pointer mr-2"
                  src={typeInputPassword.icon}
                  alt=""
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="w-full flex justify-center">
        <Button
          className="mt-5 w-4/5 rounded-lg p-2 bg-[#CB1B1B]
        text-white md:mt-[50px] md:text-lg"
          onPress={ClickBtnSignUp}
          isLoading={loading}
          spinner={<Spinner color="white" size="sm" />}
        >
          {loading ? "" : "ثبت اطلاعات"}
        </Button>
      </div>
    </div>
  );
}
