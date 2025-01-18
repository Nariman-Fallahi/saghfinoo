"use client";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { CitiesType, SelectionDataType, FilterDataType } from "@/types/Type";
import { Api, dataKey, useGetRequest } from "@/ApiService";
import { useEffect, useState } from "react";
import Input from "./Input";
import MoreItems from "./MoreItems";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import AutocompleteMobile from "./AutocompleteMobile";

type MobileFilterType = {
  isViewMore: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  // queryObject: {
  //   [key: string]: string | undefined;
  // };
  // urlQuery: FilterDataType | undefined;
};

export default function MobileFilter({
  isViewMore,
  isOpen,
  setIsOpen,
  // // queryObject,
  // urlQuery,
}: MobileFilterType) {
  const [viewMore, setViewMore] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  // const findDefaultValue = (
  //   options:
  //     | {
  //         value: number | string;
  //         label: string;
  //       }[]
  //     | undefined,
  //   key: string,
  //   parseToInt = false
  // ) => {
  //   const value = queryObject[key];
  //   if (value === undefined || value === null) return undefined;
  //   return options?.find(
  //     (option) => option.value === (parseToInt ? parseInt(value) : value)
  //   );
  // };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FilterDataType>();

  // useEffect(() => {
  //   reset(urlQuery);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // GetAllCity
  const { data: allCitiesData, isPending: allCitiesPending } = useGetRequest<{
    data: CitiesType[];
  }>({
    url: Api.SearchCity,
    key: [dataKey.GET_ALL_CITY],
    enabled: true,
    staleTime: 10 * 60 * 10,
  });

  // Get SelectionData
  const { data: selectionData, isPending: selectionDataPending } =
    useGetRequest<{
      data: SelectionDataType[];
    }>({
      url: Api.GetSelectionData,
      key: [dataKey.GET_SELECTION_DATA],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  // property_type
  const property_type = selectionData?.data.filter(
    (item) => item.key === "propertyType"
  );

  // cooling_system
  const cooling_system = selectionData?.data.filter(
    (item) => item.key === "coolingSystem"
  );

  // heating_system
  const heating_system = selectionData?.data.filter(
    (item) => item.key === "heatingSystem"
  );

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

  // const propertyTypeDefaultValue = findDefaultValue(
  //   optionsPropertyType,
  //   "propertyType",
  //   true
  // );
  // const coolingSystemDefaultValue = findDefaultValue(
  //   optionsCoolingSystem,
  //   "coolingSystem",
  //   true
  // );
  // const heatingSystemDefaultValue = findDefaultValue(
  //   optionsHeatingSystem,
  //   "heatingSystem",
  //   true
  // );

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
                    {/* <SelectTitle text="انتخاب شهرستان" />
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
                    )} */}
                    <AutocompleteMobile
                      label="شهرستان"
                      control={control}
                      name="city"
                      isLoading={allCitiesPending}
                      defaultItems={allCitiesData?.data.map((city, index) => ({
                        value: city.name,
                        id: index,
                        key: city.name,
                      }))}
                      placeholder="شهرستان‌"
                    />

                    <AutocompleteMobile
                      label="نوع ملک"
                      control={control}
                      name="propertyType"
                      isLoading={selectionDataPending}
                      defaultItems={property_type}
                      placeholder="نوع ملک خود را وارد کنید"
                    />

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

                        <AutocompleteMobile
                          label="سیستم سرمایش"
                          control={control}
                          name="coolingSystem"
                          isLoading={selectionDataPending}
                          defaultItems={cooling_system}
                          placeholder="نوع سیستم سرمایشی را انتخاب کنید"
                        />

                        <AutocompleteMobile
                          label="سیستم گرمایش"
                          control={control}
                          name="heatingSystem"
                          isLoading={selectionDataPending}
                          defaultItems={heating_system}
                          placeholder="نوع سیستم گرمایشی را انتخاب کنید"
                        />
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
