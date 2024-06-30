import { SignUpItem } from "@/constant/Constants";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import axios from "axios";
import { SignUpType } from "@/types/Type";

export default function SignUp({ token, phoneNumber }: SignUpType) {
  const [focus, setFocus] = useState<number>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const apiUrlSignUp = "http://127.0.0.1:8000/api/v1/users/complete-signup";

  const ClickBtnSignUp = () => {};

  const UserSignUp = async () => {
    try {
      const response = await axios.post(apiUrlSignUp, {
        first_name: firstName,
        last_name: lastName,
        password: password,
        token: token,
        number: phoneNumber,
      });
      if (response.status == 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
            <p>ffff</p>
            <input
              onFocus={() => setFocus(index)}
              placeholder={item.placeholder}
              type="text"
              className="w-full outline-none mr-2 text-xs"
              onChange={(e) => OnChangeInput(e.target.value, item.id)}
            />
          </div>
        );
      })}
      <div className="w-full flex justify-center">
        <Button
          className="mt-5 w-4/5 rounded-lg p-2 bg-[#CB1B1B]
        text-white md:mt-[50px] md:text-lg"
          onPress={UserSignUp}
        >
          ثبت اطلاعات
        </Button>
      </div>
    </div>
  );
}
