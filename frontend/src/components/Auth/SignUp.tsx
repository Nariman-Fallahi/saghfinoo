import { Button } from "@heroui/button";
import { ErrorNotification } from "@/notification/Error";
import { Success } from "@/notification/Success";
import { useModalStore } from "@/store/Auth";
import { Spinner } from "@heroui/spinner";
import { setCookie } from "cookies-next";
import { useRouter } from "@bprogress/next/app";
import { dataKey, usePostRequest } from "@/services/ApiService";
import { Api } from "@/services/ApiService";
import { AuthStepType, SignUpDataType } from "@/Types";
import InputRegister from "../InputRegister";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

type SignUpType = {
  phoneNumber: string;
  token: string;
  setAuthStep: (val: AuthStepType) => void;
};

type Inputs = {
  fristName: string;
  lastName: string;
  password: string;
};

export default function SignUp({
  token,
  phoneNumber,
  setAuthStep,
}: SignUpType) {
  const { setOpen } = useModalStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = usePostRequest<SignUpDataType>({
    url: Api.CompleteSignup,
    key: "signUp",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      {
        firstName: data.fristName,
        lastName: data.lastName,
        password: data.password,
        token: token,
        phoneNumber: phoneNumber,
      },
      {
        onSuccess: (data) => {
          if (data.code === "login_done") {
            setCookie("access", data.access, {
              maxAge: data.expire,
              sameSite: "strict",
            });
            setCookie("refresh", data.refresh, {
              sameSite: "strict",
              httpOnly: true,
            });
            Success("ثبت نام با موفقیت انجام شد.");
            setAuthStep("phone");
            setOpen(false);
            queryClient.invalidateQueries({
              queryKey: [dataKey.GET_USER_INFO],
            });
            router.push("/proUser");
          }
        },
        onError: () => {
          ErrorNotification("در ارسال اطلاعات مشکلی پیش آمد.");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <p className="text-sm text-[#353535] md:mt-2 md:text-base mt-[-30px] text-center">
        با این شماره تلفن حساب کاربری وجود ندارد.
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
          placeholder="نام خانوادگی خود را وارد نمایید"
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
