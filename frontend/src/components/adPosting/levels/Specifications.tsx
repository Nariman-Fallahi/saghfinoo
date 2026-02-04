import { Dispatch, SetStateAction } from "react";
import { AdPostingFormDataType } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import BtnSubmit from "../BtnSubmit";
import Input from "../Input";
import FormWrapper from "../FormWrapper";

type SpecificationsType = {
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
  setFormStage: Dispatch<SetStateAction<number>>;
};

type Inputs = {
  area: number;
  room: number;
  floor: number;
  numberFloors: number;
};

export default function Specifications({
  setFormData,
  setFormStage,
}: SpecificationsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      area: data.area,
      room: data.room,
      floor: data.floor,
      numberFloors: data.numberFloors,
    }));
    setFormStage((prevState: number) => prevState + 1);
  };

  return (
    <FormWrapper handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Input
        register={register}
        name="area"
        title="متراژ (متر مربع)"
        placeholder="۱۲۵"
        errors={errors}
      />

      <Input
        register={register}
        name="room"
        title="اتاق"
        placeholder="۳"
        errors={errors}
      />

      <Input
        register={register}
        name="floor"
        title="طبقه"
        placeholder="۵"
        errors={errors}
      />

      <Input
        register={register}
        name="numberFloors"
        title="تعداد طبقات"
        placeholder="۲"
        errors={errors}
      />

      <BtnSubmit />
    </FormWrapper>
  );
}
