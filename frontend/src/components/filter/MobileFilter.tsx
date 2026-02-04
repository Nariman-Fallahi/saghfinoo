"use client";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FilterDataType } from "@/types";
import { useState } from "react";
import Input from "./Input";
import MoreItems from "./MoreItems";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import AutocompleteMobile from "./AutocompleteMobile";
import useUpdateSearchParams from "./useUpdateSearchParams";
import { useAllCities } from "@/hooks/queries/useAllCities";
import { useSelectionData } from "@/hooks/queries/useSelectionData";

type MobileFilterType = {
  isViewMore: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function MobileFilter({
  isViewMore,
  isOpen,
  setIsOpen,
}: MobileFilterType) {
  const [viewMore, setViewMore] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParams = useUpdateSearchParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FilterDataType>();

  const { data: allCitiesData, isPending: allCitiesPending } = useAllCities();

  const { data: selectionData, isPending: selectionDataPending } =
    useSelectionData();

  const property_type = selectionData?.data.filter(
    (item) => item.key === "propertyType"
  );

  const cooling_system = selectionData?.data.filter(
    (item) => item.key === "coolingSystem"
  );

  const heating_system = selectionData?.data.filter(
    (item) => item.key === "heatingSystem"
  );

  const onSubmit: SubmitHandler<FilterDataType> = (data) => {
    updateSearchParams(data);
  };

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
