import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Spinner } from "@heroui/spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextError } from "@/constant/Constants";

type Inputs = {
  email: string;
};

type EmailType = {
  setEmail: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  handleSendEmail: (email: string) => void;
  isPendingVerifyEmail: boolean;
};

export default function EmailInput({
  setEmail,
  isSelected,
  setIsSelected,
  handleSendEmail,
  isPendingVerifyEmail,
}: EmailType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSendEmail(data.email);
    setEmail(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rtl">
      <input
        {...register("email", {
          required: "لطفا ایمیل خود را وارد کنید",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "ایمیل معتبر نمی‌باشد.",
          },
        })}
        placeholder="example@email.com"
        type="text"
        className="mt-[40px] p-2 rounded-lg w-full border-[#2F80ED] border
        outline-none text-sm md:p-3 md:mt-[24px]"
        style={{
          boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
        }}
      />
      <TextError text={errors.email?.message} />
      {/* CheckBox */}
      <div className="mt-[16px] w-full flex items-center">
        <Checkbox
          isSelected={isSelected}
          onValueChange={setIsSelected}
          radius="sm"
          color="danger"
        ></Checkbox>
        <p className="text-xs text-[#909090] md:text-sm">
          با
          <span className="text-primary"> قوانین سقفینو </span>
          موافق هستم.
        </p>
      </div>
      {/* END CheckBox */}
      <Button
        type="submit"
        isDisabled={!isSelected}
        isLoading={isPendingVerifyEmail}
        spinner={<Spinner color="white" size="sm" />}
        className="mt-[64px] w-full rounded-lg p-2 bg-primary text-white md:mt-[50px] md:text-lg"
      >
        {isPendingVerifyEmail ? "" : "ورود"}
      </Button>
    </form>
  );
}
