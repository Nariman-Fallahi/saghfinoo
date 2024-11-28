"use client";
import { useCallback, useEffect, useState } from "react";
import { isMobile, numberToPersian } from "@/constant/Constants";

import SearchAndFilter from "@/components/SearchResults/SearchAndFilter";
import MobileFilter from "@/components/Filter/MobileFilter";
import DesktopFilter from "@/components/Filter/desktop/DesktopFilter";
import { useSearchParams } from "next/navigation";
import { FilterDataType } from "@/types/Type";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { Api, useGetRequest } from "@/ApiService";

export const NumberOfItemsFound = ({ number }: { number: number }) => {
  return (
    <p className="text-primary text-sm md:text-base">
      {numberToPersian(number)} مورد
    </p>
  );
};

export const DateRangeSelector = () => {
  const options = [
    { key: "newest", label: "جدید ترین" },
    { key: "oldest", label: "قدیمی ترین" },
  ];

  return (
    <Select
      defaultSelectedKeys={new Set(["newest"])}
      radius="sm"
      size="sm"
      className="w-full md:w-36"
      startContent={
        <Image
          width={16}
          height={16}
          src="/icons/filter-search.svg"
          alt="filter-search icon"
        />
      }
    >
      {options.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
};

export default function page() {
  const [isOpenFilterMobileModal, setIsOpenFilterMobileModal] =
    useState<boolean>(false);
  const [urlQuery, setUrlQuery] = useState<FilterDataType>();

  const searchParams = useSearchParams();

  const queryObject: { [key: string]: string | undefined } = {};

  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const rentalPriceDefaultValue = queryObject.rentalPrice?.split("-");
  const depositPriceDefaultValue = queryObject.depositPrice?.split("-");
  const metreDefaultValue = queryObject.metre?.split("-");

  useEffect(() => {
    setUrlQuery({
      province: queryObject.province,
      city: queryObject.city,
      coolingSystem: queryObject.coolingSystem,
      depositPrice: {
        min: depositPriceDefaultValue ? depositPriceDefaultValue[0] : undefined,
        max: depositPriceDefaultValue ? depositPriceDefaultValue[1] : undefined,
      },
      heatingSystem: queryObject.heatingSystem,
      metre: {
        min: metreDefaultValue ? metreDefaultValue[0] : "",
        max: metreDefaultValue ? metreDefaultValue[1] : "",
      },
      numberOfBedroom: queryObject.numberOfBedroom,
      numberOfElevators: queryObject.numberOfElevators,
      numberOfFloors: queryObject.numberOfFloors,
      numberOfParking: queryObject.numberOfParking,
      numberOfRestrooms: queryObject.numberOfRestrooms,
      numberOfStorageRoom: queryObject.numberOfStorageRoom,
      propertyType: queryObject.propertyType ? queryObject.propertyType : "",
      rentalPrice: {
        min: rentalPriceDefaultValue ? rentalPriceDefaultValue[0] : "",
        max: rentalPriceDefaultValue ? rentalPriceDefaultValue[1] : "",
      },
      typeOfRestroom: queryObject.typeOfRestroom,
    });
  }, [searchParams]);

  // const {} = useGetRequest({
  //   url: `${Api.}`
  // })

  return (
    <div className="p-4">
      <SearchAndFilter setOpenModal={setIsOpenFilterMobileModal} />
      <MobileFilter
        isViewMore={true}
        isOpen={isOpenFilterMobileModal}
        setIsOpen={setIsOpenFilterMobileModal}
        queryObject={queryObject}
        urlQuery={urlQuery}
      />

      <div className="mt-36 flex-col hidden md:flex">
        <DesktopFilter isViewMore={true} urlQuery={urlQuery} />

        <p className="font-bold mt-4 text-lg">املاک اجاره ای</p>

        <div className="flex justify-between items-center">
          <NumberOfItemsFound number={200} />

          <DateRangeSelector />
        </div>
      </div>
    </div>
  );
}
