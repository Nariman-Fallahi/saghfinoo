import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Spinner } from "@nextui-org/spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextError } from "@/constant/Constants";

type Inputs = {
  phoneNumber: number;
};

type PhoneNumberType = {
  setPhoneNumber: (value: number) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  handleSendPhoneNumber: (phoneNumber: number) => void;
  isPendingVerifyNumber: boolean;
};

export default function PhoneNumber({
  setPhoneNumber,
  isSelected,
  setIsSelected,
  handleSendPhoneNumber,
  isPendingVerifyNumber,
}: PhoneNumberType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSendPhoneNumber(data.phoneNumber);
    setPhoneNumber(data.phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rtl">
      <input
        {...register("phoneNumber", {
          required: "لطفا شماره تلفن خود را وارد کنید",
          pattern: {
            value: /^09\d*$/,
            message: "شماره تلفن معتبر نمیباشد",
          },
          minLength: {
            value: 11,
            message: "شماره تلفن نمیتواند کم تر از ۱۱ رقم باشد",
          },
          maxLength: {
            value: 11,
            message: "شماره تلفن نمیتواند بیشتر از ۱۱ رقم باشد",
          },
        })}
        placeholder="09123456789"
        type="number"
        className="mt-[40px] p-2 rounded-lg w-full border-[#2F80ED] border
        outline-none text-sm md:p-3 md:mt-[24px]"
        style={{
          boxShadow: "0px 0px 0px 3px rgba(47, 128, 237, 0.19)",
        }}
      />
      <TextError text={errors.phoneNumber?.message} />
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
          <span className="text-[#CB1B1B]"> قوانین سقفینو </span>
          موافق هستم.
        </p>
      </div>
      {/* END CheckBox */}
      <Button
        type="submit"
        isDisabled={!isSelected}
        isLoading={isPendingVerifyNumber}
        spinner={<Spinner color="white" size="sm" />}
        className="mt-[64px] w-full rounded-lg p-2 bg-[#CB1B1B] text-white md:mt-[50px] md:text-lg"
      >
        {isPendingVerifyNumber ? "" : "ورود"}
      </Button>
    </form>
  );
}
