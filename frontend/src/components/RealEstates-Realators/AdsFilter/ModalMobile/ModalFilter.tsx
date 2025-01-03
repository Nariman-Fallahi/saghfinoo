import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { AdsFilterDataType, optionType } from "@/types/Type";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextError, SelectTitle } from "@/constant/Constants";
import Select from "react-select";
import { SelectStyle } from "../Filter";
import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import { InputsType } from "../Filter";

type ModalFilterType = {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
  filterData: AdsFilterDataType | undefined;
  setFilterData: Dispatch<SetStateAction<AdsFilterDataType | undefined>>;
  optionsProvincesData:
    | {
        value: number;
        label: string;
      }[]
    | undefined;
  optionsCitiesData:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  optionPropertyTypeData: optionType;
};

export default function ModalFilter({
  openFilterModal,
  setOpenFilterModal,
  optionsProvincesData,
  optionsCitiesData,
  optionPropertyTypeData,
  filterData,
  setFilterData,
}: ModalFilterType) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    setFilterData((prevState) => ({
      ...prevState,
      city: data.city,
      rentalPrice: { min: data.rentalPriceMin, max: data.rentalPriceMax },
      depositPrice: { min: data.depositPriceMin, max: data.depositPriceMax },
      metre: { min: data.metreMin, max: data.metreMax },
    }));
    setOpenFilterModal(false);
  };

  return (
    <Modal
      isOpen={openFilterModal}
      onClose={() => setOpenFilterModal(false)}
      size="full"
      isKeyboardDismissDisabled
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="overflow-y-auto pb-8">
              <div className="w-full flex items-center flex-col mt-7">
                <Image width={105} height={105} src="/icons/Logo.svg" alt="" />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 w-full flex gap-3 justify-between flex-wrap"
                >
                  <div className="w-full flex flex-col">
                    <SelectTitle text="انتخاب استان" />
                    <Select
                      placeholder="استان خود را انتخاب کنید"
                      options={optionsProvincesData}
                      onChange={(option) => {
                        setFilterData((...prevState) => ({
                          ...prevState,
                          province: {
                            value: option?.label,
                            id: option?.value,
                          },
                        }));
                      }}
                      classNames={SelectStyle}
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <SelectTitle text="انتخاب شهرستان" />
                    <Controller
                      name="city"
                      control={control}
                      rules={{
                        required: filterData?.province?.id ? true : false,
                      }}
                      render={({ field: { onChange, name } }) => (
                        <Select
                          inputId={name}
                          placeholder="شهرستان خود را انتخاب کنید"
                          isDisabled={filterData?.province?.id ? false : true}
                          options={optionsCitiesData}
                          onChange={(option) => {
                            onChange(option?.label);
                          }}
                          classNames={SelectStyle}
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
                          options={optionPropertyTypeData}
                          onChange={(option) => {
                            onChange(option?.value);
                          }}
                          classNames={SelectStyle}
                        />
                      )}
                    />
                    {errors.propertyType && (
                      <TextError text="لطفا نوع ملک را انتخاب کنید" />
                    )}
                  </div>

                  <Input
                    title="قیمت اجاره"
                    displayMode="row"
                    nameMin="rentalPriceMin"
                    nameMax="rentalPriceMax"
                    register={register}
                    placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                    unit="تومان"
                    error={
                      errors.rentalPriceMin?.message ||
                      errors.rentalPriceMax?.message
                    }
                  />

                  <Input
                    title="قیمت رهن"
                    displayMode="row"
                    nameMin="depositPriceMin"
                    nameMax="depositPriceMax"
                    register={register}
                    placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
                    unit="تومان"
                    error={
                      errors.depositPriceMin?.message ||
                      errors.depositPriceMax?.message
                    }
                  />

                  <Input
                    title="متر"
                    nameMin="metreMin"
                    nameMax="metreMax"
                    displayMode="row"
                    error={errors.metreMin?.message || errors.metreMax?.message}
                    register={register}
                    placeholder={{ min: "۱۲۰", max: "۲۰۰" }}
                    unit="متر"
                  />

                  <div className="w-[-webkit-fill-available] bg-white bottom-0 absolute p-3 flex justify-between">
                    <Button
                      size="sm"
                      variant="bordered"
                      onPress={() => {
                        onClose();
                        reset();
                      }}
                      className="w-[48%] border"
                    >
                      حذف فیلترها
                    </Button>
                    <Button
                      className="text-white bg-primary w-[48%]"
                      size="sm"
                      type="submit"
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
  );
}
