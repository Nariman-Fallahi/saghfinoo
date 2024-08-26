import { Dispatch, SetStateAction } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import { useForm, SubmitHandler } from "react-hook-form";
import { inputStyle, Title } from "../AdFormContainer";
import { TextError } from "@/constant/Constants";
import BtnSubmit from "../BtnSubmit";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap justify-between mt-3"
    >
      <div className="md:w-[48%] flex flex-col">
        <Title text="متراژ (متر مربع)" />
        <input
          className={inputStyle}
          type="number"
          placeholder="۱۲۵"
          {...register("area", {
            required: "لطفا متراژ را وارد کنید",
          })}
        />
        {errors.area && <TextError text={errors.area?.message} />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <Title text="اتاق" />
        <input
          className={inputStyle}
          type="number"
          placeholder="۳"
          {...register("room", {
            required: "لطفا تعداد اتاق را وارد کنید",
          })}
        />
        {errors.room && <TextError text={errors.room?.message} />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <Title text="طبقه" />
        <input
          className={inputStyle}
          type="number"
          placeholder="۵"
          {...register("floor", {
            required: "لطفا طبقه را وارد کنید",
          })}
        />
        {errors.floor && <TextError text={errors.floor?.message} />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <Title text="تعداد طبقات" />
        <input
          className={inputStyle}
          type="number"
          placeholder="۲"
          {...register("numberFloors", {
            required: "لطفا تعداد طبقه را وارد کنید",
          })}
        />
        {errors.numberFloors && (
          <TextError text={errors.numberFloors?.message} />
        )}
      </div>

      <BtnSubmit />
    </form>
  );
}
