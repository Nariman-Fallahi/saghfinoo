"use client";
import { Title } from "@/constant/Constants";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import Select, { components, MultiValue } from "react-select";
import { CitiesType } from "@/types/Type";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";

type SearchBoxType = {
  title?: string;
  className?: string;
};

export default function SearchBox({ title, className }: SearchBoxType) {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useGetRequest<{ data: CitiesType[] }>({
    url: Api.SearchCity,
    key: ["searchCityData"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const cityOptions = data?.data.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const handleSelectChange = (
    selectedOptions: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    const params = new URLSearchParams();

    selectedOptions?.forEach((city) => {
      params.append("city", city.value);
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className={`flex flex-col p-3 relative md:px-8 ${className}`}>
      {title && <Title title={title} />}

      <div
        className={`${title ?? "mt-5 md:mt-8"} w-[80%] md:w-[35%] ${className}`}
      >
        <Select
          placeholder="لطفا شهر مورد نظر خود را جستجو کنید."
          isMulti
          options={cityOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          classNames={{
            multiValue: () => "border border-[#353535] !bg-transparent ltr",
            control: () => "!cursor-pointer text-xs md:text-base",
            menu: () => "!w-[70%] text-sm md:text-base",
          }}
          onChange={handleSelectChange}
          components={{
            Control: ({ children, ...rest }) => (
              <components.Control {...rest}>
                <i className="mr-4">
                  <Image
                    width={16}
                    height={16}
                    src="/icons/search-normal.svg"
                    className="md:w-5 md:h-5"
                    alt="Search Normal"
                  />
                </i>{" "}
                {children}
              </components.Control>
            ),
          }}
        />
      </div>
    </div>
  );
}
