import {
  CitiesType,
  FilterDataType,
  ProvincesType,
  SelectionDataType,
} from "@/types/Type";
import { useEffect, useState } from "react";
import { Api, dataKey, useGetRequest } from "@/ApiService";
import { SubmitHandler, useForm } from "react-hook-form";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import SelectionCustomMenu from "./SelectionCustomMenu";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useDisclosure } from "@heroui/modal";
import MoreItemModal from "./MoreItemModal";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import useAddQuery from "@/hooks/useAddQuery";
import useUpdateSearchParams from "../useUpdateSearchParams";

export type OpenCustomMenu = "rent" | "deposit" | "metre" | null;

type DesktopFilterType = {
  isViewMore: boolean;
  // urlQuery: FilterDataType | undefined;
};

export default function DesktopFilter({
  isViewMore,
}: // urlQuery,
DesktopFilterType) {
  const [isTablet, setIsTablet] = useState<boolean>();
  const [openCustomMenu, setOpenCustomMenu] = useState<OpenCustomMenu>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateSearchParams = useUpdateSearchParams();

  const { setQuery } = useAddQuery();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsTablet(
      typeof window !== "undefined" &&
        window.innerWidth >= 768 &&
        window.innerWidth < 1080
        ? true
        : false
    );
  }, []);

  // GetAllCity
  const { data: allCitiesData, isPending: allCitiesPending } = useGetRequest<{
    data: CitiesType[];
  }>({
    url: Api.SearchCity,
    key: [dataKey.GET_ALL_CITY],
    enabled: true,
    staleTime: 10 * 60 * 10,
  });

  // Get propertyTypeData
  const { data: propertyTypeData, isPending: propertyTypePending } =
    useGetRequest<{
      data: SelectionDataType[];
    }>({
      url: `${Api.GetSelectionData}?key=property_type`,
      key: [dataKey.GET_PROPERTY_TYPE],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FilterDataType>();

  // useEffect(() => {
  //   reset(urlQuery);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onSubmit: SubmitHandler<FilterDataType> = (data) => {
    updateSearchParams(data);
  };

  return (
    <div className="flex w-[70%] gap-3">
      <Autocomplete
        isLoading={allCitiesPending}
        placeholder="شهرستان‌"
        aria-label="cities"
        variant="bordered"
        radius="sm"
        defaultItems={allCitiesData?.data || []}
        size={isTablet ? "sm" : "md"}
        onSelectionChange={(city) => setQuery("city", city?.toString())}
      >
        {(city) => (
          <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        placeholder="نوع ملک"
        isLoading={propertyTypePending}
        aria-label="propertyType"
        variant="bordered"
        radius="sm"
        // defaultSelectedKey={urlQuery?.propertyType}
        defaultItems={propertyTypeData?.data || []}
        size={isTablet ? "sm" : "md"}
        onSelectionChange={(value) =>
          setQuery("propertyType", value?.toString())
        }
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>

      <SelectionCustomMenu
        placeholder="رهن"
        register={register}
        name={{ min: "deposit_from", max: "deposit_to" }}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors.deposit_from?.message || errors.deposit_to?.message}
        isTablet={isTablet}
        setOpenCustomMenu={setOpenCustomMenu}
        menuName={"deposit"}
        openCustomMenu={openCustomMenu}
      />

      <SelectionCustomMenu
        placeholder="اجاره"
        register={register}
        name={{ min: "rent_from", max: "rent_to" }}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors.rent_from?.message || errors.rent_to?.message}
        isTablet={isTablet}
        setOpenCustomMenu={setOpenCustomMenu}
        menuName={"rent"}
        openCustomMenu={openCustomMenu}
      />

      {isViewMore && (
        <>
          <div className="w-full">
            <Button
              variant="bordered"
              className="flex items-center justify-between border-[#e4e4e7]"
              radius="sm"
              onPress={onOpen}
              size={isTablet ? "sm" : "md"}
            >
              <Image
                width={16}
                height={16}
                src="/icons/filter-search.svg"
                alt="filter-search icon"
              />

              <span className="md:text-xs lg:text-sm text-gray-400 ml-2">
                فیلتر های بیشتر
              </span>
            </Button>
          </div>

          {/* Modal */}
          <MoreItemModal
            control={control}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            watch={watch}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            reset={reset}
          />
        </>
      )}
    </div>
  );
}
