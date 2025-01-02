import { Api, dataKey } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { ProvincesType } from "@/types/Type";
import { CitiesType } from "@/types/Type";
import { useEffect, useState } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import BtnSubmit from "../BtnSubmit";
import AutocompleteComponent from "../AutocompleteComponent";
import Input from "../Input";
import FormWrapper from "../FormWrapper";

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
      data: ProvincesType[];
    }>({
      url: Api.GetProvinces_Cities,
      key: [dataKey.GET_PROVINCES],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // Get provinceCities
  const {
    data: CitiesData,
    refetch,
    isFetching: CitiesDataFetching,
  } = useGetRequest<{
    data: CitiesType[];
  }>({
    url: `${Api.GetProvinces_Cities}/${watch("province")}/cities`,
    key: [dataKey.GET_CITIES, watch("province")],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

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
    if (watch("province")) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, watch("province")]);

  const optionsProvincesData = provincesData?.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (watch("province")) {
      setOptionsCitiesData(
        CitiesData?.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CitiesData?.data, watch("province")]);

  return (
    <FormWrapper handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Controller
        name="province"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <AutocompleteComponent
            data={optionsProvincesData}
            isLoading={provincesDataPending}
            title="استان"
            onSelectionChange={(province) => onChange(province)}
            placeholder="استان خود را انتخاب کنید"
            errorMessage={!!errors.province}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <AutocompleteComponent
            data={optionsCitiesData}
            isLoading={CitiesDataFetching}
            title="شهرستان"
            onSelectionChange={(cityID) => onChange(cityID)}
            placeholder="شهرستان خود را انتخاب کنید"
            errorMessage={!!errors.city}
          />
        )}
      />

      <Input
        register={register}
        name="mainSt"
        title="خیابان اصلی"
        placeholder="لطفا آدرس خیابان اصلی خود را وارد کنید"
        errors={errors}
      />

      <Input
        register={register}
        name="sideStreet"
        placeholder="جزییات آدرس را وارد کنید"
        title="خیابان فرعی / کوچه"
        errors={errors}
      />

      <BtnSubmit />
    </FormWrapper>
  );
}
