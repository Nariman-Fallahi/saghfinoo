import { AdPostingFormDataType, optionType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import BtnSubmit from "../BtnSubmit";
import Input from "../Input";
import AutocompleteComponent from "../AutocompleteComponent";
import FormWrapper from "../FormWrapper";

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
      <FormWrapper handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Input
          register={register}
          name="parking"
          title="پارکینگ"
          placeholder="۲"
          errors={errors}
        />

        <Input
          register={register}
          name="storage"
          title="انباری"
          placeholder="۲"
          errors={errors}
        />

        <Input
          register={register}
          name="elevator"
          title="آسانسور"
          placeholder="۲"
          errors={errors}
        />

        <Controller
          name="flooring"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <AutocompleteComponent
              data={optionsFlooring}
              isLoading={false}
              title="جنس کف"
              onSelectionChange={(data) => onChange(data)}
              placeholder="جنس کف را انتخاب کنید"
              errorMessage={!!errors.flooring}
            />
          )}
        />

        <Input
          register={register}
          name="restroom"
          title="سرویس بهداستی"
          placeholder="۲"
          errors={errors}
        />

        <Controller
          name="typeOfRestroom"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <AutocompleteComponent
              data={optionsTypeOfRestroom}
              isLoading={false}
              title="نوع سرویس بهداشتی"
              onSelectionChange={(data) => onChange(data)}
              placeholder="نوع سرویس بهداشتی را انتخاب کنید"
              errorMessage={!!errors.typeOfRestroom}
            />
          )}
        />

        <Controller
          name="coolingSystem"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <AutocompleteComponent
              data={optionsCoolingSystem}
              isLoading={false}
              title="نوع سیستم سرمایش"
              onSelectionChange={(data) => onChange(data)}
              placeholder="نوع سیستم سرمایش را انتخاب کنید"
              errorMessage={!!errors.coolingSystem}
            />
          )}
        />

        <Controller
          name="heatingSystem"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, name } }) => (
            <AutocompleteComponent
              data={optionsHeatingSystem}
              isLoading={false}
              title="نوع سیستم گرمایش"
              onSelectionChange={(data) => onChange(data)}
              placeholder="نوع سیستم گرمایش را انتخاب کنید"
              errorMessage={!!errors.heatingSystem}
            />
          )}
        />

        <BtnSubmit />
      </FormWrapper>
    </>
  );
}
