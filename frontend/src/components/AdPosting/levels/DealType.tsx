import { AdPostingFormDataType } from "@/types/Type";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import Select from "react-select";
import { optionType } from "@/types/Type";
import { inputStyle } from "../AdFormContainer";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextError, SelectTitle } from "@/constant/Constants";
import BtnSubmit from "../BtnSubmit";
import { SelectStyle } from "../AdFormContainer";

type DealType = {
  formData: AdPostingFormDataType | undefined;
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
  optionsTypeOfTransaction: optionType;
  propertyType: optionType;
  setFormStage: Dispatch<SetStateAction<number>>;
};

type Inputs = {
  typeOfTransaction: number;
  propertyType: number;
  deposit: number;
  rent: number;
};

export default function DealType({
  formData,
  setFormData,
  optionsTypeOfTransaction,
  propertyType,
  setFormStage,
}: DealType) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      typeOfTransaction: data.typeOfTransaction,
      propertyType: data.propertyType,
      deposit: data.deposit,
      rent: data.rent,
    }));
    setFormStage((prevState: number) => prevState + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap justify-between mt-3"
    >
      <div className="w-[48%] flex flex-col">
        <SelectTitle text="نوع معامله" />
        <Controller
          name="typeOfTransaction"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, name } }) => (
            <Select
              inputId={name}
              placeholder="نوع معامله خود را انتخاب کنید"
              options={optionsTypeOfTransaction}
              onChange={(option) => {
                onChange(option?.value);
              }}
              classNames={SelectStyle}
            />
          )}
        />
        {errors.typeOfTransaction && (
          <TextError text="لطفا نوع معامله خود را انتخاب کنید" />
        )}
      </div>

      <div className="w-[48%] flex flex-col">
        <SelectTitle text="نوع ملک" />
        <Controller
          name="propertyType"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, name } }) => (
            <Select
              inputId={name}
              placeholder="نوع ملک خود را انتخاب کنید"
              options={propertyType}
              onChange={(option) => {
                onChange(option?.value);
              }}
              classNames={SelectStyle}
            />
          )}
        />
        {errors.typeOfTransaction && (
          <TextError text="لطفا نوع ملک خود را انتخاب کنید" />
        )}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="رهن" />
        <input
          className={inputStyle}
          type="number"
          placeholder={
            formData?.typeOfTransaction !== 10
              ? "۵۰ میلیون تومان"
              : "وارد کردن رهن ممکن نمیباشد"
          }
          disabled={formData?.typeOfTransaction === 10 ? true : false}
          {...register("deposit", {
            required:
              formData?.typeOfTransaction !== 10
                ? "لطفا رهن را وارد کنید"
                : false,
          })}
        />
        {errors.deposit && <TextError text={errors.deposit?.message} />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="اجاره" />
        <input
          type="number"
          className={inputStyle}
          placeholder="۲ میلیون تومان"
          {...register("rent", {
            required: "لطفا رهن را وارد کنید",
          })}
        />
        {errors.rent && <TextError text={errors.rent?.message} />}
      </div>

      <BtnSubmit />
    </form>
  );
}
