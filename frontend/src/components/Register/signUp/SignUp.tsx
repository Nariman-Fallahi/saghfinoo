import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { SignUpType } from "@/types/Type";
import { Error } from "@/notification/Error";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Register";
import { InputPasswordType } from "@/types/Type";
import { Spinner } from "@nextui-org/spinner";
import { useRegisterStatus } from "@/store/Register";
import { RegisterStatusValue } from "@/constant/Constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { usePostRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { SignUpDataType } from "@/types/Type";
import SignUpInput from "./SignUpInput";

export default function SignUp({ token, phoneNumber }: SignUpType) {
  const [userInformation, setUserInformation] = useState<SignUpDataType>({
    first_name: "",
    last_name: "",
    password: "",
    token: token,
    number: phoneNumber,
  });

  const { setOpen } = useModalStore();
  const [typeInputPassword, setTypeInputPassword] = useState<InputPasswordType>(
    {
      type: "password",
      icon: "/icons/eye.svg",
    }
  );
  const { setRegisterStatus } = useRegisterStatus();
  const router = useRouter();
  const { mutate, isSuccess, data, isPending } = usePostRequest<SignUpDataType>(
    {
      url: Api.CompleteSignup,
      key: "signUp",
    }
  );
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    password?: string;
  }>({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [activeBtn, setActiveBtn] = useState<boolean>();

  useEffect(() => {
    if (
      userInformation.first_name == "" ||
      userInformation.last_name == "" ||
      userInformation.password == ""
    ) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [
    userInformation.first_name,
    userInformation.last_name,
    userInformation.password,
  ]);

  const ClickBtnSignUp = () => {
    if (activeBtn) {
      mutate({
        first_name: userInformation.first_name,
        last_name: userInformation.last_name,
        password: userInformation.password,
        token: userInformation.token,
        number: userInformation.number,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.code === "login_done") {
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
    }
  }, [isSuccess, data]);

  function isPersian(text: string) {
    const persian = /^[\u0600-\u06FF\s]+$/;
    return persian.test(text);
  }

  const onChangeFristName = (fristName: string) => {
    if (fristName === "") {
      setErrors((prevState) => ({
        ...prevState,
        firstName: "لطفا نام خود را وارد نمایید.",
      }));
    } else if (!isPersian(fristName)) {
      setErrors((prevState) => ({
        ...prevState,
        firstName: "لطفا اسم خود را فارسی وارد نمایید.",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, firstName: "" }));
      setUserInformation((prevState) => ({
        ...prevState,
        first_name: fristName,
      }));
    }
  };

  console.log(userInformation.password);

  const onChangeLastName = (lastName: string) => {
    if (lastName === "") {
      setErrors((prevState) => ({
        ...prevState,
        lastName: "لطفا نام خانوادگی خود را وارد نمایید.",
      }));
    } else if (!isPersian(lastName)) {
      setErrors((prevState) => ({
        ...prevState,
        lastName: "لطفا نام خانوادگی خود را فارسی وارد نمایید.",
      }));
      setActiveBtn(false);
    } else {
      setErrors((prevState) => ({ ...prevState, lastName: "" }));
      setUserInformation((prevState) => ({
        ...prevState,
        last_name: lastName,
      }));
    }
  };

  const onChangePassword = (password: string) => {
    const forbiddenPattern = /[-$%^&*()_+]/;

    if (isPersian(password)) {
      setErrors((prevState) => ({
        ...prevState,
        password: "رمز عبور نمیتواند فارسی باشد.",
      }));
    } else if (forbiddenPattern.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        password: `نوشتن علامات ${forbiddenPattern} ممنوع میباشد.`,
      }));
    } else if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        password: "رمز عبور نمیتواند کوچک تر از ۸ رقم باشد.",
      }));
      setActiveBtn(false);
    } else {
      setErrors((prevState) => ({ ...prevState, password: "" }));
      setUserInformation((prevState) => ({
        ...prevState,
        password: password,
      }));
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-sm text-[#353535] md:mt-2 md:text-base mt-[-30px]">
        با این موبایل حساب کاربری وجود ندارد.
        <br />
        برای ثبت نام اطلاعات زیر را کامل کنید.
      </p>

      <div className="flex flex-col w-full">
      <SignUpInput
        placeholder="نام خود را  وارد نمایید"
        isPasswordInput={false}
        onChangeInput={onChangeFristName}
        textERR={errors.firstName}
      />

      <SignUpInput
        placeholder="نام خانوادگی خود را وارد نمایید"
        isPasswordInput={false}
        onChangeInput={onChangeLastName}
        textERR={errors.lastName}
      />

      <SignUpInput
        placeholder="رمز دلخواه خود را وارد نمایید"
        isPasswordInput={true}
        onChangeInput={onChangePassword}
        textERR={errors.password}
      />
      </div>


      <div className="w-full flex justify-center">
        <Button
          className={
            activeBtn
              ? "mt-5 w-4/5 rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg"
              : "mt-5 w-4/5 rounded-lg p-2 bg-gray-300 text-white md:mt-[50px] md:text-lg"
          }
          onPress={ClickBtnSignUp}
          isLoading={isPending}
          disabled={!activeBtn}
          spinner={<Spinner color="white" size="sm" />}
        >
          {isPending ? "" : "ثبت اطلاعات"}
        </Button>
      </div>
    </div>
  );
}
