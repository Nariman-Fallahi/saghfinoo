import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import ModalFilter from "./ModalMobile/ModalFilter";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import Skeleton from "react-loading-skeleton";
import {
  AdsFilterDataType,
  getProvincesType,
  SelectionDataType,
} from "@/types/Type";
import { getProvinceCitiesType } from "@/types/Type";
import { useSizeBtn } from "@/store/Size";
import Select, { components, MenuProps } from "react-select";
import Input from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCookie } from "cookies-next";

export type InputsType = {
  city: string;
  propertyType: number;
  priceMin: number;
  priceMax: number;
  metreMin: number;
  metreMax: number;
};

type FilterType = {
  setFilterData: Dispatch<SetStateAction<AdsFilterDataType | undefined>>;
  filterData: AdsFilterDataType | undefined;
};

//TODO Add Api

export const SelectStyle = {
  control: (state: { menuIsOpen: any }) =>
    `!cursor-pointer text-sm lg:text-base ${
      state.menuIsOpen ? "blueShadow" : ""
    }`,
  menu: () => "!w-[70%] md:!w-full text-sm md:text-[15.5px] lg:text-base",
};

export default function Filter({ filterData, setFilterData }: FilterType) {
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openMenuPrice, setOpenMenuPrice] = useState<boolean>(false);
  const access = getCookie("access");
  const [optionsCitiesData, setOptionsCitiesData] = useState<
    | {
        value: string;
        label: string;
      }[]
    | undefined
  >();
  // const { filterValues, setFilterValues } = useFilterValue();
  const { sizeBtn } = useSizeBtn();
  // Get provinces
  const { data: provincesData, status: provincesStatus } = useGetRequest<{
    data: getProvincesType[];
  }>({
    url: Api.GetProvinces,
    key: ["getProvinces"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  // Get provinceCities
  const {
    data: citiesData,
    status: citiesStatus,
    refetch,
  } = useGetRequest<{ data: getProvinceCitiesType[] }>({
    url: `${Api.GetProvinceCities}${filterData?.province?.id}`,
    key: ["getCities", JSON.stringify(filterData?.province?.id)],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

  const { data: propertyTypeData } = useGetRequest<{
    data: SelectionDataType[];
  }>({
    url: `${Api.GetSelectionData}property_type`,
    key: ["getPropertyType"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = (data) => {};

  useEffect(() => {
    refetch();
  }, [refetch, filterData?.province?.id]);

  const optionsProvincesData = provincesData?.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (filterData?.province) {
      setOptionsCitiesData(
        citiesData?.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [citiesData?.data, filterData?.province]);

  console.log(propertyTypeData);

  const optionPropertyTypeData = propertyTypeData?.data.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  // PriceSelectionCustomMenu

  const PriceSelectionCustomMenu = (props: MenuProps) => {
    return (
      <components.Menu {...props}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full text-center"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={() => setOpenMenuPrice(true)}
        >
          <Input
            title=""
            displayMode="column"
            register={register}
            nameMin="priceMin"
            nameMax="priceMax"
            placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
            unit="تومان"
            rules={{ required: "لطفا مقادیر را وارد کنید" }}
            error={errors.priceMin?.message || errors.priceMax?.message}
          />

          <div className="w-full flex justify-between pb-3 gap-3 px-4">
            <Button
              type="submit"
              className="w-1/2 mt-3 bg-[#CB1B1B] !rounded"
              size="sm"
              radius="sm"
              color="danger"
            >
              ثبت
            </Button>

            <Button
              className="w-1/2 mt-3 !rounded"
              size="sm"
              radius="sm"
              color="default"
              onPress={() => setOpenMenuPrice(false)}
            >
              بستن
            </Button>
          </div>
        </form>
      </components.Menu>
    );
  };

  // END PriceSelectionCustomMenu

  return (
    <>
      {provincesStatus === "pending" ? (
        <div className="mt-5 md:mt-10">
          <Skeleton width={100} height={20} className="md:!w-[250px]" />
        </div>
      ) : (
        <>
          {/* Mobile */}
          <Button
            variant="bordered"
            size={sizeBtn}
            className="w-1/4 border mt-5 rounded md:mt-10 md:hidden"
            onPress={() => setOpenFilterModal(true)}
          >
            <div className="flex items-center">
              <Image
                width={16}
                height={16}
                src="/icons/filter-search.svg"
                alt=""
              />
              <span className="mr-1">فیلترها</span>
            </div>
          </Button>
          {/* Desktop */}
          <div className="hidden md:flex items-center mt-6 w-full gap-4">
            <div className="w-44">
              <Select
                placeholder="انتخاب استان"
                onChange={(newValue) =>
                  setFilterData((prevState) => ({
                    province: {
                      ...prevState,
                      value: newValue?.label,
                      id: newValue?.value,
                    },
                  }))
                }
                options={optionsProvincesData}
                classNames={SelectStyle}
              />
            </div>

            <div className="w-44">
              <Select
                placeholder="انتخاب شهرستان"
                onChange={(newValue) =>
                  setFilterData((prevState) => ({
                    ...prevState,
                    city: newValue?.value,
                  }))
                }
                options={optionsCitiesData}
                isDisabled={!citiesData?.data}
                classNames={SelectStyle}
              />
            </div>

            <div className="w-44">
              <Select
                components={{ Menu: PriceSelectionCustomMenu }}
                options={[]}
                placeholder="انتخاب قیمت"
                isSearchable={false}
                menuIsOpen={openMenuPrice}
                onMenuOpen={() => setOpenMenuPrice(true)}
                classNames={SelectStyle}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    width: "230px !important",
                  }),
                }}
              />
            </div>
          </div>
          <ModalFilter
            openFilterModal={openFilterModal}
            setOpenFilterModal={setOpenFilterModal}
            optionPropertyTypeData={optionPropertyTypeData}
            optionsCitiesData={optionsCitiesData}
            optionsProvincesData={optionsProvincesData}
            filterData={filterData}
            setFilterData={setFilterData}
          />
        </>
      )}
    </>
  );
}
