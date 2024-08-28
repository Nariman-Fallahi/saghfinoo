import { AdPostingFormDataType, optionType } from "@/types/Type";
import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { inputStyle } from "../AdFormContainer";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextError, SelectTitle } from "@/constant/Constants";
import { SelectStyle } from "../AdFormContainer";
import BtnSubmit from "../BtnSubmit";

type AmenitiesType = {
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
  setFormStage: Dispatch<SetStateAction<number>>;
  optionsFlooring: optionType;
  optionsTypeOfRestroom: optionType;
  optionsCoolingSystem: optionType;
  optionsHeatingSystem: optionType;
};

type Inputs = {
  parking: number;
  storage: number;
  elevator: number;
  flooring: number;
  restroom: number;
  typeOfRestroom: number;
  coolingSystem: number;
  heatingSystem: number;
};

export default function Amenities({
  setFormData,
  setFormStage,
  optionsFlooring,
  optionsTypeOfRestroom,
  optionsCoolingSystem,
  optionsHeatingSystem,
}: AmenitiesType) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      parking: data.parking,
      storage: data.storage,
      elevator: data.elevator,
      flooring: data.flooring,
      restroom: data.restroom,
      typeOfRestroom: data.typeOfRestroom,
      coolingSystem: data.coolingSystem,
      heatingSystem: data.heatingSystem,
    }));
    setFormStage((prevState: number) => prevState + 1);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap justify-between mt-3"
      >
        <div className="md:w-[48%] flex flex-col">
          <SelectTitle text="پارکینگ" />
          <input
            type="number"
            className={inputStyle}
            placeholder="۲"
            {...register("parking", {
              required: "لطفا تعداد پارکینگ ها را را وارد کنید",
            })}
          />
          {errors.parking && <TextError text={errors.parking?.message} />}
        </div>

        <div className="md:w-[48%] flex flex-col">
          <SelectTitle text="انباری" />
          <input
            type="number"
            className={inputStyle}
            placeholder="۲"
            {...register("storage", {
              required: "لطفا تعداد انباری ها را وارد کنید",
            })}
          />
          {errors.storage && <TextError text={errors.storage?.message} />}
        </div>

        <div className="md:w-[48%] flex flex-col">
          <SelectTitle text="آسانسور" />
          <input
            type="number"
            className={inputStyle}
            placeholder="۲"
            {...register("elevator", {
              required: "لطفا تعداد آسانسور را وارد کنید",
            })}
          />
          {errors.elevator && <TextError text={errors.elevator?.message} />}
        </div>

        <div className="w-[48%] flex flex-col">
          <SelectTitle text="جنس کف" />
          <Controller
            name="flooring"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, name } }) => (
              <Select
                inputId={name}
                placeholder="جنس کف را انتخاب کنید"
                options={optionsFlooring}
                onChange={(option) => {
                  onChange(option?.value);
                }}
                classNames={SelectStyle}
              />
            )}
          />
          {errors.flooring && <TextError text="لطفا جنس کف را انتخاب کنید" />}
        </div>

        <div className="md:w-[48%] flex flex-col">
          <SelectTitle text="سرویس بهداستی" />
          <input
            type="number"
            className={inputStyle}
            placeholder="۲"
            {...register("restroom", {
              required: "لطفا تعداد سرویس بهداشتی را وارد کنید",
            })}
          />
          {errors.restroom && <TextError text={errors.restroom?.message} />}
        </div>

        <div className="w-[48%] flex flex-col">
          <SelectTitle text="نوع سرویس بهداشتی" />
          <Controller
            name="typeOfRestroom"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, name } }) => (
              <Select
                inputId={name}
                placeholder="نوع سرویس بهداشتی را انتخاب کنید"
                options={optionsTypeOfRestroom}
                onChange={(option) => {
                  onChange(option?.value);
                }}
                classNames={SelectStyle}
              />
            )}
          />
          {errors.typeOfRestroom && (
            <TextError text="لطفا نوع سرویس بهداشتی را انتخاب کنید" />
          )}
        </div>

        <div className="w-[48%] flex flex-col">
          <SelectTitle text="سیستم سرمایش" />
          <Controller
            name="coolingSystem"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, name } }) => (
              <Select
                inputId={name}
                placeholder="نوع سیستم سرمایش را انتخاب کنید"
                options={optionsCoolingSystem}
                onChange={(option) => {
                  onChange(option?.value);
                }}
                classNames={SelectStyle}
              />
            )}
          />
          {errors.coolingSystem && (
            <TextError text="لطفا نوع سیستم سرمایش را انتخاب کنید" />
          )}
        </div>

        <div className="w-[48%] flex flex-col">
          <SelectTitle text="سیستم گرمایش" />
          <Controller
            name="heatingSystem"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, name } }) => (
              <Select
                inputId={name}
                placeholder="نوع سیستم گرمایش را انتخاب کنید"
                options={optionsHeatingSystem}
                onChange={(option) => {
                  onChange(option?.value);
                }}
                classNames={SelectStyle}
              />
            )}
          />
          {errors.heatingSystem && (
            <TextError text="لطفا نوع سیستم گرمایش را انتخاب کنید" />
          )}
        </div>

        <BtnSubmit />
      </form>
    </>
  );
}
