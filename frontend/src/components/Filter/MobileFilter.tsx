"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SelectTitle, TextError } from "@/constant/Constants";
import Select from "react-select";
import {
  CitiesType,
  ProvincesType,
  SelectionDataType,
  FilterDataType,
} from "@/types/Type";
import { Api, useGetRequest } from "@/ApiService";
import { useEffect, useState } from "react";
import Input from "./Input";
import MoreItems from "./MoreItems";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

type MobileFilterType = {
  isViewMore: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  queryObject: {
    [key: string]: string | undefined;
  };
  urlQuery: FilterDataType | undefined;
};

export default function MobileFilter({
  isViewMore,
  isOpen,
  setIsOpen,
  queryObject,
  urlQuery,
}: MobileFilterType) {
  const [optionsCitiesData, setOptionsCitiesData] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
  const [viewMore, setViewMore] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const SelectStyle = {
    control: (state: { menuIsOpen: any }) =>
      `!cursor-pointer text-xs lg:text-base ${
        state.menuIsOpen ? "blueShadow" : ""
      }`,
    menu: () => "!w-[70%] md:!w-full text-sm md:text-[15.5px] lg:text-base",
  };

  const findDefaultValue = (
    options:
      | {
          value: number | string;
          label: string;
        }[]
      | undefined,
    key: string,
    parseToInt = false
  ) => {
    const value = queryObject[key];
    if (value === undefined || value === null) return undefined;
    return options?.find(
      (option) => option.value === (parseToInt ? parseInt(value) : value)
    );
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FilterDataType>();

  useEffect(() => {
    reset(urlQuery);
  }, [urlQuery]);

  // Get provinces
  const { data: provincesData } = useGetRequest<{
    data: ProvincesType[];
  }>({
    url: Api.GetProvinces_Cities,
    key: ["getProvinces"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const optionsProvincesData = provincesData?.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Get provinceCities
  const { data: citiesData, refetch } = useGetRequest<{ data: CitiesType[] }>({
    url: `${Api.GetProvinces_Cities}/${watch("province")}/cities`,
    key: ["getCities", JSON.stringify(watch("province"))],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [watch("province")]);

  useEffect(() => {
    if (citiesData && watch("province")) {
      const mappedOptions = citiesData.data.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setOptionsCitiesData(mappedOptions);
    }
  }, [citiesData]);

  // Get propertyTypeDataS
  const { data: selectionData } = useGetRequest<{
    data: SelectionDataType[];
  }>({
    url: Api.GetSelectionData,
    key: ["getSelectionData"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  // property_type
  const property_type = selectionData?.data.filter(
    (item) => item.key === "propertyType"
  );

  const optionsPropertyType = property_type?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  // cooling_system
  const cooling_system = selectionData?.data.filter(
    (item) => item.key === "coolingSystem"
  );

  const optionsCoolingSystem = cooling_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  // heating_system
  const heating_system = selectionData?.data.filter(
    (item) => item.key === "heatingSystem"
  );

  const optionsHeatingSystem = heating_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const onSubmit: SubmitHandler<FilterDataType> = (data) => {
    const filters = {
      province: data.province,
      city: data.city,
      propertyType: data.propertyType,
      rentalPrice: `${data.rentalPrice.min}-${data.rentalPrice.max}`,
      depositPrice: `${data.depositPrice.min}-${data.depositPrice.max}`,
      metre: `${data.metre.min}-${data.metre.max}`,
      numberOfBedroom: data.numberOfBedroom,
      numberOfParking: data.numberOfParking,
      numberOfStorageRoom: data.numberOfStorageRoom,
      numberOfElevators: data.numberOfElevators,
      numberOfRestrooms: data.numberOfRestrooms,
      typeOfRestroom: data.typeOfRestroom,
      numberOfFloors: data.numberOfFloors,
      coolingSystem: data.coolingSystem,
      heatingSystem: data.heatingSystem,
    };

    let updatedSearchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "undefined-undefined" && value !== "-") {
        updatedSearchParams.set(key, value);
      }
    });

    router.push(`${pathname}?${updatedSearchParams}`);
  };

  const provinceDefaultValue = findDefaultValue(
    optionsProvincesData,
    "province",
    true
  );
  const cityDefaultValue = findDefaultValue(optionsCitiesData, "city");
  const propertyTypeDefaultValue = findDefaultValue(
    optionsPropertyType,
    "propertyType",
    true
  );
  const coolingSystemDefaultValue = findDefaultValue(
    optionsCoolingSystem,
    "coolingSystem",
    true
  );
  const heatingSystemDefaultValue = findDefaultValue(
    optionsHeatingSystem,
    "heatingSystem",
    true
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isKeyboardDismissDisabled
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="overflow-y-auto pb-16">
                <div className="w-full flex items-center flex-col mt-7">
                  <Image
                    width={105}
                    height={105}
                    src="/icons/Logo.svg"
                    alt=""
                  />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 w-full flex gap-3 justify-between flex-wrap"
                  >
                    <div className="w-full flex flex-col">
                      <SelectTitle text="انتخاب استان" />
                      <Controller
                        name="province"
                        control={control}
                        render={({ field: { onChange, name } }) => (
                          <Select
                            inputId={name}
                            placeholder="استان خود را انتخاب کنید"
                            options={optionsProvincesData}
                            onChange={(option) => {
                              onChange(option?.value);
                            }}
                            classNames={SelectStyle}
                            defaultValue={provinceDefaultValue}
                          />
                        )}
                      />
                    </div>

                    <div className="w-full flex flex-col">
                      <SelectTitle text="انتخاب شهرستان" />
                      <Controller
                        name="city"
                        control={control}
                        rules={{
                          required: watch("province") ? true : false,
                        }}
                        render={({ field: { onChange, name } }) => (
                          <Select
                            inputId={name}
                            placeholder="شهرستان خود را انتخاب کنید"
                            isDisabled={watch("province") ? false : true}
                            options={optionsCitiesData}
                            onChange={(option) => {
                              onChange(option?.label);
                            }}
                            classNames={SelectStyle}
                            defaultValue={cityDefaultValue}
                          />
                        )}
                      />
                      {errors.city && (
                        <TextError text="لطفا شهرستان خود را انتخاب کنید" />
                      )}
                    </div>

                    <div className="w-full flex flex-col">
                      <SelectTitle text="نوع ملک" />
                      <Controller
                        name="propertyType"
                        control={control}
                        render={({ field: { onChange, name } }) => (
                          <Select
                            inputId={name}
                            placeholder="نوع ملک را انتخاب کنید"
                            options={optionsPropertyType}
                            onChange={(option) => {
                              onChange(option?.value);
                            }}
                            classNames={SelectStyle}
                            defaultValue={propertyTypeDefaultValue}
                          />
                        )}
                      />
                    </div>

                    <Input
                      title="قیمت اجاره"
                      displayMode="row"
                      name={{ min: "rentalPrice.min", max: "rentalPrice.max" }}
                      register={register}
                      placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                      unit="تومان"
                      error={
                        errors.rentalPrice?.min?.message ||
                        errors.rentalPrice?.max?.message
                      }
                    />

                    <Input
                      title="قیمت رهن"
                      displayMode="row"
                      name={{
                        min: "depositPrice.min",
                        max: "depositPrice.max",
                      }}
                      register={register}
                      placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                      unit="تومان"
                      error={
                        errors.depositPrice?.min?.message ||
                        errors.depositPrice?.max?.message
                      }
                    />

                    <Input
                      title="متر"
                      name={{ min: "metre.min", max: "metre.max" }}
                      displayMode="row"
                      error={
                        errors.metre?.min?.message || errors.metre?.max?.message
                      }
                      register={register}
                      placeholder={{ min: "۱۲۰", max: "۲۰۰" }}
                      unit="متر"
                    />

                    {isViewMore && (
                      <div className="w-full flex justify-center">
                        <Button
                          className="flex"
                          size="sm"
                          variant="light"
                          onPress={() => setViewMore(!viewMore)}
                          radius="sm"
                        >
                          مشاهده بیشتر
                          <Image
                            width={16}
                            height={16}
                            src="/icons/arrow-down-red.svg"
                            alt="ArrowDown"
                            className={viewMore ? "rotate-180" : "rotate-0"}
                          />
                        </Button>
                      </div>
                    )}

                    {viewMore && (
                      <>
                        <MoreItems control={control} watch={watch} />

                        <div className="w-full flex flex-col">
                          <SelectTitle text="سیستم سرمایش" />
                          <Controller
                            name="coolingSystem"
                            control={control}
                            render={({ field: { onChange, name } }) => (
                              <Select
                                inputId={name}
                                placeholder="انتخاب سیستم"
                                options={optionsCoolingSystem}
                                onChange={(option) => {
                                  onChange(option?.value);
                                }}
                                classNames={SelectStyle}
                                defaultValue={coolingSystemDefaultValue}
                              />
                            )}
                          />
                        </div>

                        <div className="w-full flex flex-col">
                          <SelectTitle text="سیستم گرمایش" />
                          <Controller
                            name="heatingSystem"
                            control={control}
                            render={({ field: { onChange, name } }) => (
                              <Select
                                inputId={name}
                                placeholder="انتخاب سیستم"
                                options={optionsHeatingSystem}
                                onChange={(option) => {
                                  onChange(option?.value);
                                }}
                                classNames={SelectStyle}
                                defaultValue={heatingSystemDefaultValue}
                              />
                            )}
                          />
                        </div>
                      </>
                    )}

                    <div className="w-[-webkit-fill-available] bg-white bottom-0 absolute p-3 flex justify-between">
                      <Button
                        size="sm"
                        variant="bordered"
                        onPress={() => {
                          reset({
                            province: "",
                            city: "",
                            propertyType: "",
                            rentalPrice: { min: "", max: "" },
                            depositPrice: { min: "", max: "" },
                            metre: { min: "", max: "" },
                            numberOfBedroom: "",
                            numberOfParking: "",
                            numberOfStorageRoom: "",
                            numberOfElevators: "",
                            numberOfRestrooms: "",
                            typeOfRestroom: "",
                            numberOfFloors: "",
                            coolingSystem: "",
                            heatingSystem: "",
                          });
                          router.push(pathname, undefined);
                          onClose();
                        }}
                        className="w-[48%] border"
                      >
                        حذف فیلترها
                      </Button>
                      <Button
                        className="text-white bg-primary w-[48%]"
                        size="sm"
                        type="submit"
                        onPress={() => onClose()}
                      >
                        جست‌جو
                      </Button>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
