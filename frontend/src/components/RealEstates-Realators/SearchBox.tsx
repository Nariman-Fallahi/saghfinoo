'use client'
import { Title } from "@/constant/Constants";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import Select, { components, MultiValue } from "react-select";
import { CitiesType } from "@/types/Type";
import Image from "next/image";
//  import { useRouter } from "next-nprogress-bar";
 import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";

type SearchBoxType = {
  title: string;
  // setSearchCity: (
  //   value: MultiValue<{
  //     value: string;
  //     label: string;
  //   }>
  // ) => void;
};

export default function SearchBox({ title }: SearchBoxType) {
  const router = useRouter();
  const pathname = usePathname()
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const { data } = useGetRequest<{ data: CitiesType[] }>({
    url: 'http://127.0.0.1:8000/api/v1/tools/cities',
    key: ["searchCityData"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const cityOptions = data?.data.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedValues = params.getAll("value");

    const selectedFromUrl = cityOptions?.filter((option) =>
      selectedValues.includes(option.value)
    );
    setSelectedOptions(selectedFromUrl);
  }, [cityOptions]);

  const handleSelectChange = (options: any) => {
    // setSelectedOptions(options);

    // const params = new URLSearchParams();

    // options.forEach((option: any) => {
    //   params.append("value", option.value);
    // });

    // const url = `${pathname}?${'fff'}`;

    router.push(`${pathname}?${'test'}`);
  };

  return (
    <div className="mt-[82px] flex flex-col p-3 relative md:mt-[180px] md:px-8">
      <Title title={title} />

      <div className="mt-5 md:mt-8 w-[80%] md:w-[35%]">
        <Select
          placeholder="لطفا شهر مورد نظر خود را جستجو کنید."
          isMulti
          options={cityOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          classNames={{
            multiValue: () => "border border-[#353535] !bg-transparent ltr",
            control: () => "!cursor-text text-xs md:text-base",
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
