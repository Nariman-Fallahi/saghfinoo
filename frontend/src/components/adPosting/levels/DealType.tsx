import { AdPostingFormDataType } from "@/Types";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { optionType } from "@/Types";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import BtnSubmit from "../BtnSubmit";
import AutocompleteComponent from "../AutocompleteComponent";
import Input from "../Input";
import { useWatch } from "react-hook-form";
import FormWrapper from "../FormWrapper";

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
  buy: number;
};

export default function DealType({
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

  const watchedTypeOfTransaction = useWatch({
    control,
    name: "typeOfTransaction",
  });

  return (
    <FormWrapper handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Controller
        name="typeOfTransaction"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <AutocompleteComponent
            data={optionsTypeOfTransaction}
            isLoading={false}
            title="نوع معامله"
            onSelectionChange={(data) => onChange(data)}
            placeholder="نوع معامله خود را انتخاب کنید"
            errorMessage={!!errors.typeOfTransaction}
          />
        )}
      />

      <Controller
        name="propertyType"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <AutocompleteComponent
            data={propertyType}
            isLoading={false}
            title="نوع ملک"
            onSelectionChange={(data) => onChange(data)}
            placeholder="نوع ملک خود را انتخاب کنید"
            errorMessage={!!errors.propertyType}
          />
        )}
      />

      {watchedTypeOfTransaction == 7 && (
        <Input
          register={register}
          name="buy"
          title="خرید"
          placeholder="۵,۰۰۰,۰۰۰"
          errors={errors}
        />
      )}

      {watchedTypeOfTransaction != 7 && (
        <>
          <Input
            register={register}
            name="deposit"
            title="رهن"
            placeholder={
              watchedTypeOfTransaction !== 10
                ? "۵,۰۰۰,۰۰۰"
                : "وارد کردن رهن ممکن نمیباشد"
            }
            errors={errors}
            disabled={watchedTypeOfTransaction === 10 ? true : false}
            required={watchedTypeOfTransaction !== 10}
          />

          <Input
            register={register}
            name="rent"
            title="اجاره"
            placeholder="۲,۰۰۰,۰۰۰"
            errors={errors}
          />
        </>
      )}

      <BtnSubmit />
    </FormWrapper>
  );
}
