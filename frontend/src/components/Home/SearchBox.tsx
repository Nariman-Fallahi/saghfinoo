"use client";
import Image from "next/image";
import { useState } from "react";
import { Api, dataKey, useGetRequest } from "@/ApiService";
import { CitiesType } from "@/types/Type";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useRouter } from "@bprogress/next/app";

type TabSearchBoxType = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

const TabSearchBox = ({ title, isSelected, onClick }: TabSearchBoxType) => {
  return (
    <div
      className={`w-1/2 border-b-2 ${
        isSelected ? "border-b-red-500" : "border-b-gray-300"
      } border-b text-center pb-1
    text-sm font-normal md:text-base cursor-pointer hover:text-red-500
     lg:text-2xl lg:font-medium`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default function SearchBox() {
  const [typeOfTransaction, setTypeOfTransaction] = useState<"اجاره" | "خرید">(
    "اجاره"
  );

  const router = useRouter();

  const { data, isPending } = useGetRequest<{ data: CitiesType[] }>({
    url: Api.SearchCity,
    key: [dataKey.GET_ALL_CITY],
    enabled: true,
    staleTime: 10 * 60 * 10,
  });

  return (
    <div
      style={{ backgroundImage: "url(/image/bgSearch.webp)" }}
      className="mt-[57px] md:mt-0 flex flex-col items-center p-5
     bg-center bg-cover pb-10 lg:h-screen"
    >
      <h1
        className="text-white font-bold text-base md:mt-32 md:text-xl lg:text-[56px]
       lg:mt-52"
      >
        سقفینو سقفی برای همه
      </h1>
      <h2
        className="font-bold text-xs text-white text-center mt-1 md:mt-3
       md:text-base lg:text-[32px] lg:mt-9"
      >
        آسانی و سرعت در پیدا کردن یک سقف تازه را در سقفینو تجربه کنید.
      </h2>

      <div
        className="w-full bg-white shadow rounded-lg flex flex-col p-3 mt-8
       md:w-[70%] lg:mt-16"
      >
        <div className="flex items-center">
          <TabSearchBox
            title="اجاره"
            isSelected={typeOfTransaction === "اجاره"}
            onClick={() => setTypeOfTransaction("اجاره")}
          />
          <TabSearchBox
            title="خرید"
            isSelected={typeOfTransaction === "خرید"}
            onClick={() => setTypeOfTransaction("خرید")}
          />
        </div>

        <Autocomplete
          isLoading={isPending}
          placeholder="شهر مورد نظر را جستجو کنید"
          aria-label="search city"
          radius="sm"
          defaultItems={data?.data || []}
          onSelectionChange={(value) =>
            router.push(
              `/searchResults?type_of_transaction_name=${typeOfTransaction}&city=${
                value ? value.toString() : ""
              }`
            )
          }
          inputProps={{
            classNames: {
              inputWrapper: "!bg-white !shadow-none",
              input: "lg:!text-base mr-2",
            },
          }}
          startContent={
            <Image
              width="16"
              height="16"
              className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5"
              src="/icons/search-normal.svg"
              alt="search icon"
            />
          }
        >
          {(city) => (
            <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
}
