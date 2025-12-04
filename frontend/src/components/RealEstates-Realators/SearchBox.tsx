"use client";
import { Title } from "@/constant/Constants";
import { Api } from "@/services/ApiService";
import { useGetRequest, dataKey } from "@/services/ApiService";
import { CitiesType } from "@/Types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "@bprogress/next/app";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

type SearchBoxType = {
  title?: string;
  className?: string;
};

export default function SearchBox({ title, className }: SearchBoxType) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useGetRequest<{ data: CitiesType[] }>({
    url: Api.SearchCity,
    key: [dataKey.GET_ALL_CITY],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const handleSelectChange = (city: any) => {
    router.push(`${pathname}?city=${city}`);
  };

  return (
    <div className={`flex flex-col p-3 relative md:px-8 ${className}`}>
      {title && <Title title={title} />}

      <div className={`${title ? "mt-3 md:mt-6" : ""}`}>
        <Autocomplete
          placeholder="لطفا شهر مورد نظر خود را جستجو کنید"
          isLoading={isLoading}
          aria-label="propertyType"
          variant="bordered"
          radius="sm"
          defaultItems={data?.data || []}
          inputProps={{
            classNames: {
              inputWrapper: "w-full md:w-1/3",
            },
          }}
          startContent={
            <i className="pl-3">
              <Image
                width={16}
                height={16}
                src="/icons/search-normal.svg"
                className="md:w-5 md:h-5"
                alt="Search Normal"
              />
            </i>
          }
          onSelectionChange={(value) => handleSelectChange(value)}
        >
          {(city) => (
            <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
}
