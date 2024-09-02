import { Title } from "@/constant/Constants";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import Select, { components, MultiValue } from "react-select";
import { CitiesType } from "@/types/Type";
import Image from "next/image";

type SearchBoxType = {
  title: string;
  setSearchCity: (
    value: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
};

export default function SearchBox({ title, setSearchCity }: SearchBoxType) {
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

  const handleCityChange = (
    selectedOptions: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setSearchCity(selectedOptions);
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
          onChange={handleCityChange}
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
