import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalFilter from "./ModalMobile/ModalFilter";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import Skeleton from "react-loading-skeleton";
import { getProvincesType } from "@/types/Type";
import { getProvinceCitiesType } from "@/types/Type";
import { useSizeBtn } from "@/store/Size";
import Select, { components, MenuProps } from "react-select";
import { ProvinceType } from "../Ads";
import { numberWithCommas } from "@/constant/Constants";
import { removeCommas } from "@/constant/Constants";

type FilterType = {
  province: ProvinceType;
  setProvince: (value: ProvinceType) => void;
  city: string | undefined;
  setCity: (value: string | undefined) => void;
};

//TODO Add Api
//TODO Add removeCommas

export default function Filter({
  city,
  setCity,
  province,
  setProvince,
}: FilterType) {
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openMenuPrice, setOpenMenuPrice] = useState<boolean>(false);
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
    url: `${Api.GetProvinceCities}${province?.id}`,
    key: ["getCities", JSON.stringify(province?.id)],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [refetch, province]);

  const optionsProvincesData = provincesData?.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (province) {
      setOptionsCitiesData(
        citiesData?.data.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [citiesData?.data, province]);

  // PriceSelectionCustomMenu

  const PriceSelectionCustomMenu = (props: MenuProps) => {
    const [price, setPrice] = useState<{ price1?: string; price2?: string }>();

    return (
      <components.Menu {...props}>
        <div
          className="flex flex-col w-full text-sm"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="flex">
            <span className="p-[9px] bg-red-500 text-white rounded-tr">از</span>
            <input
              className="w-full outline-none px-2"
              placeholder="200,000"
              type="text"
              value={price?.price1}
              onChange={(e) =>
                setPrice({ price1: numberWithCommas(e.target.value) })
              }
            />
            <span className="p-2 text-[#ADADAD]">تومان</span>
          </div>

          <div className="flex">
            <span className="p-[8.5px] bg-red-500 text-white">تا</span>
            <input
              className="w-full outline-none px-2"
              placeholder="100,000"
              type="text"
              value={price?.price2}
              onChange={(e) =>
                setPrice({ price2: numberWithCommas(e.target.value) })
              }
            />
            <span className="p-2 text-[#ADADAD]">تومان</span>
          </div>

          <div className="w-full flex justify-between pb-3 gap-3 px-4">
            <Button
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
        </div>
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
            <Select
              placeholder="انتخاب استان"
              onChange={(newValue) =>
                setProvince({ name: newValue?.label, id: newValue?.value })
              }
              options={optionsProvincesData}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  boxShadow: state.menuIsOpen
                    ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                    : "",
                  cursor: "pointer",
                  width: "180px",
                }),
              }}
            />

            <Select
              placeholder="انتخاب شهرستان"
              onChange={(newValue) => setCity(newValue?.value)}
              options={optionsCitiesData}
              isDisabled={!citiesData?.data}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  boxShadow: state.menuIsOpen
                    ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                    : "",
                  cursor: "pointer",
                  width: "180px",
                }),
              }}
            />

            <Select
              components={{ Menu: PriceSelectionCustomMenu }}
              options={[]}
              placeholder="انتخاب قیمت"
              isSearchable={false}
              menuIsOpen={openMenuPrice}
              onMenuOpen={() => setOpenMenuPrice(true)}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  boxShadow: state.menuIsOpen
                    ? "0px 0px 0px 3px rgba(47, 128, 237, 0.19)"
                    : "",
                  cursor: "pointer",
                  width: "180px",
                }),
                menu: (provided) => ({
                  ...provided,
                  width: "230px",
                }),
              }}
            />
          </div>
          <ModalFilter
            openFilterModal={openFilterModal}
            setOpenFilterModal={setOpenFilterModal}
          />
        </>
      )}
    </>
  );
}
