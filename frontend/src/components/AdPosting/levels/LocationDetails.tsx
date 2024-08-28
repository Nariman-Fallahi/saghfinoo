import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { getProvincesType } from "@/types/Type";
import { getProvinceCitiesType } from "@/types/Type";
import { useEffect, useState } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextError, SelectTitle } from "@/constant/Constants";
import { inputStyle } from "../AdFormContainer";
import BtnSubmit from "../BtnSubmit";
import { SelectStyle } from "../AdFormContainer";

type LocationDetails = {
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
  setFormStage: Dispatch<SetStateAction<number>>;
};

type Inputs = {
  province: string;
  city: string;
  mainSt: string;
  sideStreet: string;
};

export default function LocationDetails({
  setFormData,
  setFormStage,
}: LocationDetails) {
  const [selectedProvince, setSelectedProvince] = useState<
    number | undefined
  >();
  const [optionsCitiesData, setOptionsCitiesData] = useState<
    | {
        value: string;
        label: string;
      }[]
    | undefined
  >();
  // Get provinces
  const { data: provincesData, isPending: provincesDataPending } =
    useGetRequest<{
      data: getProvincesType[];
    }>({
      url: Api.GetProvinces,
      key: ["getProvinces"],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  // Get provinceCities
  const {
    data: CitiesData,
    refetch,
    isPending: CitiesDataPending,
  } = useGetRequest<{
    data: getProvinceCitiesType[];
  }>({
    url: `${Api.GetProvinceCities}${selectedProvince}`,
    key: ["getCities", JSON.stringify(selectedProvince)],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      province: data.province,
      city: data.city,
      mainSt: data.mainSt,
      sideStreet: data.sideStreet,
    }));
    setFormStage((prevState: number) => prevState + 1);
  };

  useEffect(() => {
    if (selectedProvince) {
      refetch();
    }
  }, [refetch, selectedProvince]);

  const optionsProvincesData = provincesData?.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (selectedProvince) {
      setOptionsCitiesData(
        CitiesData?.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [CitiesData?.data, selectedProvince]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-wrap justify-between mt-3"
    >
      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="انتخاب استان" />
        <Controller
          name="province"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, name } }) => (
            <Select
              inputId={name}
              placeholder="استان خود را انتخاب کنید"
              options={optionsProvincesData}
              isLoading={provincesDataPending}
              onChange={(option) => {
                onChange(option?.label);
                setSelectedProvince(option?.value);
              }}
              classNames={SelectStyle}
            />
          )}
        />
        {errors.province && <TextError text="لطفا استان خود را انتخاب کنید" />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="انتخاب شهرستان" />
        <Controller
          name="city"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, name } }) => (
            <Select
              inputId={name}
              placeholder="شهرستان خود را انتخاب کنید"
              options={optionsCitiesData}
              isLoading={CitiesDataPending}
              isDisabled={!CitiesData?.data}
              onChange={(option) => onChange(option?.value)}
              classNames={SelectStyle}
            />
          )}
        />
        {errors.city && <TextError text="لطفا شهرستان خود را انتخاب کنید" />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="خیابان اصلی" />
        <input
          className={inputStyle}
          placeholder="جزییات آدرس را وارد کنید"
          {...register("mainSt", {
            required: "لطفا آدرس خیابان اصلی خود را وارد کنید",
            pattern: {
              value: /^[\u0600-\u06FF\s]+$/,
              message: "لطفا فقط حروف فارسی وارد کنید",
            },
          })}
        />
        {errors.mainSt && <TextError text={errors.mainSt?.message} />}
      </div>

      <div className="md:w-[48%] flex flex-col">
        <SelectTitle text="خیابان فرعی / کوچه" />
        <input
          className={inputStyle}
          placeholder="جزییات آدرس را وارد کنید"
          {...register("sideStreet", {
            required: "لطفا آدرس خیابان فرعی خود را وارد کنید",
            pattern: {
              value: /^[\u0600-\u06FF\s]+$/,
              message: "لطفا فقط حروف فارسی وارد کنید",
            },
          })}
        />
        {errors.sideStreet && <TextError text={errors.sideStreet?.message} />}
      </div>

      <BtnSubmit />
    </form>
  );
}
