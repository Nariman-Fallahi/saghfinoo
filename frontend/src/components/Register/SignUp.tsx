import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { ErrorNotification } from "@/notification/Error";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Register";
import { Spinner } from "@nextui-org/spinner";
import { useRegisterStatus } from "@/store/Register";
import { RegisterStatusValue } from "@/constant/Constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next-nprogress-bar";
import { usePostRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { SignUpDataType } from "@/types/Type";
import InputRegister from "../InputRegister";
import { useForm, SubmitHandler } from "react-hook-form";

type SignUpType = {
  token: string;
  phoneNumber: number | undefined;
};

type Inputs = {
  fristName: string;
  lastName: string;
  password: string;
};

export default function SignUp({ token, phoneNumber }: SignUpType) {
  const { setOpen } = useModalStore();
  const { setRegisterStatus } = useRegisterStatus();
  const router = useRouter();
  const { mutate, isSuccess, data, isPending } = usePostRequest<SignUpDataType>(
    {
      url: Api.CompleteSignup,
      key: "signUp",
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      first_name: data.fristName,
      last_name: data.lastName,
      password: data.password,
      token: token,
      number: phoneNumber,
    });
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
          httpOnly: true,
        });
        console.log(data);
        Success("ثبت نام با موفقیت انجام شد.");
        setRegisterStatus(RegisterStatusValue.status1);
        setOpen(false);
        router.push("/proUser");
      } else {
        ErrorNotification("در ارسال اطلاعات مشکلی پیش آمد.");
      }
    }
  }, [isSuccess, data, setRegisterStatus, setOpen, router]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <p className="text-sm text-[#353535] md:mt-2 md:text-base mt-[-30px] text-center">
        با این شماره موبایل حساب کاربری وجود ندارد.
        <br />
        برای ثبت نام اطلاعات زیر را کامل کنید.
      </p>

      <div className="flex flex-col w-full">
        <InputRegister
          name="fristName"
          placeholder="نام خود را  وارد نمایید"
          alt="Frist Name"
          type="text"
          icon="/icons/user.svg"
          register={register}
          rules={{
            required: "لطفا نام خود را وارد کنید",
            pattern: {
              value: /^[\u0600-\u06FF\s]+$/,
              message: "لطفا اسم خود را به فارسی وارد کنید",
            },
            maxLength: {
              value: 18,
              message: "وارد کردن بیشتر از ۱۸ کاراکتر ممکن نمیباشد",
            },
            minLength: {
              value: 3,
              message: "وارد کردن کم تر از ۳ کاراکتر ممکن نمیباشد",
            },
          }}
          error={errors.fristName?.message}
        />

        <InputRegister
          name="lastName"
          placeholder="نام خانوادگی خود را  وارد نمایید"
          alt="Last Name"
          type="text"
          icon="/icons/user.svg"
          register={register}
          rules={{
            required: "لطفا نام خانوادگی خود را وارد کنید",
            pattern: {
              value: /^[\u0600-\u06FF\s]+$/,
              message: "لطفا نام خانوادگی خود را به فارسی وارد کنید",
            },
            maxLength: {
              value: 18,
              message: "وارد کردن بیشتر از ۱۸ کاراکتر ممکن نمیباشد",
            },
            minLength: {
              value: 3,
              message: "وارد کردن کم تر از ۳ کاراکتر ممکن نمیباشد",
            },
          }}
          error={errors.lastName?.message}
        />

        <InputRegister
          name="password"
          placeholder="رمز دلخواه خود را وارد نمایید"
          alt="Password"
          type="password"
          icon="/icons/key.svg"
          register={register}
          rules={{
            required: "لطفا رمز عبور خود را وارد کنید",
            pattern: {
              value: /^[A-Za-z0-9._$#@]+$/,
              message: "رمز عبور معتبر نمیباشد",
            },
            minLength: {
              value: 8,
              message: "رمز عبور نمیتواند کم تر از ۸ رقم باشد",
            },
          }}
          error={errors.password?.message}
        />
      </div>

      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className="text-sm mt-5 w-4/5 rounded-lg p-2 bg-primary text-white
           md:mt-[50px] md:text-base"
          isLoading={isPending}
          spinner={<Spinner color="white" size="sm" />}
        >
          {isPending ? "" : "ثبت اطلاعات"}
        </Button>
      </div>
    </form>
  );
}
