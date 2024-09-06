// import { Button } from "@nextui-org/button";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import ModalFilter from "./ModalMobile/ModalFilter";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import {
  AdsFilterDataType,
  ProvincesType,
  SelectionDataType,
} from "@/types/Type";
import { CitiesType } from "@/types/Type";
import Select, { MenuProps } from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCookie } from "cookies-next";
import SelectionCustomMenu from "./SelectionCustomMenu";
import { isMobile } from "@/constant/Constants";

export type InputsType = {
  city: string;
  propertyType: number;
  rentalPriceMin: number;
  rentalPriceMax: number;
  depositPriceMin: number;
  depositPriceMax: number;
  metreMin: number;
  metreMax: number;
};

type FilterType = {
  setFilterData: Dispatch<SetStateAction<AdsFilterDataType | undefined>>;
  filterData: AdsFilterDataType | undefined;
};

export type OpenCustomMenu = "rent" | "deposit" | "metre" | null;

export const SelectStyle = {
  control: (state: { menuIsOpen: any }) =>
    `!cursor-pointer text-xs lg:text-base ${
      state.menuIsOpen ? "blueShadow" : ""
    }`,
  menu: () => "!w-[70%] md:!w-full text-sm md:text-[15.5px] lg:text-base",
};

export default function Filter({ filterData, setFilterData }: FilterType) {
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openCustomMenu, setOpenCustomMenu] = useState<OpenCustomMenu>(null);
  const access = getCookie("access");
  const [optionsCitiesData, setOptionsCitiesData] = useState<
    | {
        value: string;
        label: string;
      }[]
    | undefined
  >();
  // Get provinces
  const { data: provincesData, status: provincesStatus } = useGetRequest<{
    data: ProvincesType[];
  }>({
    url: Api.GetProvinces_Cities,
    key: ["getProvinces"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  // Get provinceCities
  const { data: citiesData, refetch } = useGetRequest<{ data: CitiesType[] }>({
    url: `${Api.GetProvinces_Cities}/${filterData?.province?.id}/cities`,
    key: ["getCities", JSON.stringify(filterData?.province?.id)],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

  // Get propertyTypeData

  const { data: propertyTypeData } = useGetRequest<{
    data: SelectionDataType[];
  }>({
    url: `${Api.GetSelectionData}?key=property_type`,
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
    setOpenCustomMenu(null);
  };

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

  const optionPropertyTypeData = propertyTypeData?.data.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const RentalPriceSelectionCustomMenu = (props: MenuProps) => {
    return (
      <SelectionCustomMenu
        register={register}
        nameMin="rentalPriceMin"
        nameMax="rentalPriceMax"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        props={props}
        setOpenCustomMenu={setOpenCustomMenu}
        errors={
          errors.rentalPriceMin?.message || errors.rentalPriceMax?.message
        }
      />
    );
  };

  const DepositPriceSelectionCustomMenu = (props: MenuProps) => {
    return (
      <SelectionCustomMenu
        register={register}
        nameMin="depositPriceMin"
        nameMax="depositPriceMax"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        props={props}
        setOpenCustomMenu={setOpenCustomMenu}
        errors={
          errors.depositPriceMin?.message || errors.depositPriceMax?.message
        }
      />
    );
  };

  const MetreSelectionCustomMenu = (props: MenuProps) => {
    return (
      <SelectionCustomMenu
        register={register}
        nameMin="metreMin"
        nameMax="metreMax"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        props={props}
        setOpenCustomMenu={setOpenCustomMenu}
        errors={
          errors.depositPriceMin?.message || errors.depositPriceMax?.message
        }
      />
    );
  };

  return (
    <>
      <div className="mt-1 md:mt-5">
        {/* Mobile */}
        <CustomButton
          variant="bordered"
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
        </CustomButton>
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
              components={{ Menu: RentalPriceSelectionCustomMenu }}
              options={[]}
              placeholder="قیمت اجاره"
              isSearchable={false}
              menuIsOpen={openCustomMenu === "rent"}
              onMenuOpen={() => setOpenCustomMenu("rent")}
              classNames={SelectStyle}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  width: "230px !important",
                }),
              }}
            />
          </div>

          <div className="w-44">
            <Select
              components={{ Menu: DepositPriceSelectionCustomMenu }}
              options={[]}
              placeholder="قیمت رهن"
              isSearchable={false}
              menuIsOpen={openCustomMenu === "deposit"}
              onMenuOpen={() => setOpenCustomMenu("deposit")}
              classNames={SelectStyle}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  width: "230px !important",
                }),
              }}
            />
          </div>

          <div className="w-44">
            <Select
              components={{ Menu: MetreSelectionCustomMenu }}
              options={[]}
              placeholder="انتخاب متر"
              isSearchable={false}
              menuIsOpen={openCustomMenu === "metre"}
              onMenuOpen={() => setOpenCustomMenu("metre")}
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
      </div>
    </>
  );
}
