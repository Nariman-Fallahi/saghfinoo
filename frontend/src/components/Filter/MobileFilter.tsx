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
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GetAllCity
  const { data: allCitiesData, isPending: allCitiesPending } = useGetRequest<{
    data: CitiesType[];
  }>({
    url: Api.SearchCity,
    key: ["getAllCities"],
    enabled: true,
    staleTime: 10 * 60 * 10,
  });

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
      city: data.city,
      propertyType: data.propertyType,
      rent_from: data.rent_from,
      rent_to: data.rent_to,
      deposit_from: data.deposit_from,
      deposit_to: data.deposit_to,
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

  function createQueryString(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
  }

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
                    <SelectTitle text="انتخاب شهرستان" />
                    <Controller
                      name="city"
                      control={control}
                      rules={{
                        required: watch("city") ? true : false,
                      }}
                      render={({ field: { onChange } }) => (
                        <Autocomplete
                          isLoading={allCitiesPending}
                          placeholder="شهرستان‌"
                          aria-label="cities"
                          variant="bordered"
                          radius="sm"
                          defaultItems={allCitiesData?.data || []}
                          size="sm"
                          inputProps={{
                            classNames: {
                              input: "text-[13px]",
                            },
                          }}
                          onSelectionChange={(city) => onChange(city)}
                        >
                          {(city) => (
                            <AutocompleteItem key={city.name}>
                              {city.name}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />
                    {errors.city && (
                      <TextError text="لطفا شهرستان خود را انتخاب کنید" />
                    )}

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
                      name={{ min: "rent_from", max: "rent_to" }}
                      register={register}
                      placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                      unit="تومان"
                      error={
                        errors.rent_from?.message || errors.rent_to?.message
                      }
                    />

                    <Input
                      title="قیمت رهن"
                      displayMode="row"
                      name={{
                        min: "deposit_from",
                        max: "deposit_to",
                      }}
                      register={register}
                      placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                      unit="تومان"
                      error={
                        errors.deposit_from?.message ||
                        errors.deposit_to?.message
                      }
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
                            city: "",
                            propertyType: "",
                            deposit_from: "",
                            deposit_to: "",
                            rent_from: "",
                            rent_to: "",
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
