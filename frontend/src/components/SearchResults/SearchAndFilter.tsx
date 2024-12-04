"use client";
import SearchBox from "../RealEstates-Realators/SearchBox";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Select, { components } from "react-select";
import { NumberOfItemsFound } from "@/app/searchResults/page";
import { DateRangeSelector } from "@/app/searchResults/page";

type SearchAndFilterType = {
  setOpenModal: (value: boolean) => void;
};

export default function SearchAndFilter({ setOpenModal }: SearchAndFilterType) {
  return (
    <div className="w-full flex flex-col mt-16 md:mt-[180px] md:hidden">
      <div className="w-full flex flex-col items-center">
        <h4 className="font-bold text-sm">املاک اجاره ای</h4>
        <SearchBox className="w-full p-0" />
      </div>

      <div className="w-full justify-between flex mt-3 items-center">
        <NumberOfItemsFound number={200000} />

        <div className="flex w-[65%] gap-3 items-center">
          <Button
            size="sm"
            className="!rounded-[4px] border w-1/2"
            variant="bordered"
            onPress={() => setOpenModal(true)}
          >
            <Image
              width={16}
              height={16}
              src="/icons/filter-search.svg"
              alt="FilterSearch"
            />
            فیلترها
          </Button>

          <DateRangeSelector />
        </div>
      </div>
    </div>
  );
}