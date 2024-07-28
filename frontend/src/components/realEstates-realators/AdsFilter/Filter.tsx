import { Button } from "@nextui-org/button";
import Image from "next/image";
import Select from "../../Select";
import { useState, useEffect } from "react";
import ModalFilter from "./ModalMobile/ModalFilter";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import Skeleton from "react-loading-skeleton";
import { getProvincesDataType } from "@/types/Type";
import { getProvinceCitiesDataType } from "@/types/Type";
import Province from "./selection/Province";
import City from "./selection/City";
import { useFilterValue } from "@/store/ReaFilter";
import { isMobile } from "@/constant/Constants";

export default function Filter() {
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<null | string>(null);
  const { filterValues, setFilterValues } = useFilterValue();
  // Get provinces
  const { data: provincesData, status: provincesStatus } =
    useGetRequest<getProvincesDataType>({
      url: Api.GetProvinces,
      key: ["getProvinces"],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  // Get provinceCities
  const {
    data: provinceCitiesData,
    status: provinceCitiesStatus,
    refetch,
  } = useGetRequest<getProvinceCitiesDataType>({
    url: `${Api.GetProvinceCities}${filterValues.selectedProvince?.id}`,
    key: ["getProvinceCities"],
    enabled: false,
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [refetch, filterValues.selectedProvince]);

  //  this ensures that only one dropdown  is open at a time,
  // preventing both dropdowns from being open simultaneously.
  const handleSelectClick = (title: string) => {
    setOpenSelect(openSelect === title ? null : title);
  };

  // Whenever the selected province changes, update the list of cities and reset the selected city.
  // This is because the selected city may no longer be valid if the province is changed,
  // so we need to clear the previously selected city to avoid inconsistency.
  useEffect(() => {
    setFilterValues({ selectedCity: undefined });
  }, [filterValues.selectedProvince, setFilterValues]);

  return (
    <>
      {provincesStatus === "pending" ? (
        <div className="mt-5 md:mt-10">
          <Skeleton width={100} height={20} className="md:!w-[250px]" />
        </div>
      ) : (
        <>
          <Button
            variant="bordered"
            size={isMobile ? "sm" : "md"}
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
          <div className="flex items-center">
            <Select
              ButtonText={
                filterValues.selectedProvince
                  ? filterValues.selectedProvince.name
                  : "استان"
              }
              onPress={() => handleSelectClick("province")}
              isOpen={openSelect === "province"}
              component={<Province data={provincesData} />}
            />
            {filterValues.selectedProvince &&
              provinceCitiesStatus === "success" && (
                <Select
                  ButtonText={
                    filterValues.selectedCity
                      ? filterValues.selectedCity
                      : "شهرستان"
                  }
                  onPress={() => handleSelectClick("city")}
                  isOpen={openSelect === "city"}
                  component={<City data={provinceCitiesData} />}
                />
              )}
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
