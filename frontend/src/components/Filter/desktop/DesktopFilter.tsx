import {
  CitiesType,
  FilterDataType,
  ProvincesType,
  SelectionDataType,
} from "@/types/Type";
import { useCallback, useEffect, useState } from "react";
import { Api, useGetRequest } from "@/ApiService";
import { SubmitHandler, useForm } from "react-hook-form";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Select, SelectItem } from "@nextui-org/select";
import SelectionCustomMenu from "./SelectionCustomMenu";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import MoreItemModal from "./MoreItemModal";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";

export type OpenCustomMenu = "rent" | "deposit" | "metre" | null;

type DesktopFilterType = {
  isViewMore: boolean;
  urlQuery: FilterDataType | undefined;
};

export default function DesktopFilter({
  isViewMore,
  urlQuery,
}: DesktopFilterType) {
  const [isTablet, setIsTablet] = useState<boolean>();
  const [openCustomMenu, setOpenCustomMenu] = useState<OpenCustomMenu>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
    key: ["getAllCities"],
    enabled: true,
    staleTime: 10 * 60 * 10,
  });

  // Get propertyTypeData
  const { data: propertyTypeData, isPending: propertyTypePending } =
    useGetRequest<{
      data: SelectionDataType[];
    }>({
      url: `${Api.GetSelectionData}?key=property_type`,
      key: ["getPropertyType"],
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

  useEffect(() => {
    reset(urlQuery);
  }, [urlQuery]);

  const onSubmit: SubmitHandler<FilterDataType> = (data) => {
    const filters = {
      rentalPrice: `${data.rentalPrice.min}-${data.rentalPrice.max}`,
      depositPrice: `${data.depositPrice.min}-${data.depositPrice.max}`,
      metre: `${data.metre.min}-${data.metre.max}`,
      numberOfBedroom: data.numberOfBedroom,
      numberOfParking: data.numberOfParking,
      numberOfStorageRoom: data.numberOfStorageRoom,
      numberOfElevators: data.numberOfElevators,
      numberOfRestrooms: data.numberOfRestrooms,
      typeOfRestroom: data.typeOfRestroom,
      numberOfFloors: data.numberOfFloors,
      coolingSystem: data.coolingSystem,
      heatingSystem: data.heatingSystem,
    };

    let updatedSearchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "undefined-undefined" && value !== "-") {
        updatedSearchParams.set(key, value);
      }
    });

    router.push(`${pathname}?${updatedSearchParams}`);
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
        onSelectionChange={(city) =>
          router.push(
            pathname + "?" + createQueryString("city", city ? city.toString() : "")
          )
        }
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
        defaultSelectedKey={urlQuery?.propertyType}
        defaultItems={propertyTypeData?.data || []}
        size={isTablet ? "sm" : "md"}
        onSelectionChange={(value) =>
          router.push(
            pathname +
              "?" +
              createQueryString("propertyType", value ? value.toString() : "")
          )
        }
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>

      <SelectionCustomMenu
        placeholder="رهن"
        register={register}
        name={{ min: "depositPrice.min", max: "depositPrice.max" }}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={
          errors.depositPrice?.min?.message || errors.depositPrice?.max?.message
        }
        isTablet={isTablet}
        setOpenCustomMenu={setOpenCustomMenu}
        menuName={"deposit"}
        openCustomMenu={openCustomMenu}
      />

      <SelectionCustomMenu
        placeholder="اجاره"
        register={register}
        name={{ min: "rentalPrice.min", max: "rentalPrice.max" }}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={
          errors.rentalPrice?.min?.message || errors.rentalPrice?.max?.message
        }
        isTablet={isTablet}
        setOpenCustomMenu={setOpenCustomMenu}
        menuName={"rent"}
        openCustomMenu={openCustomMenu}
      />

      <SelectionCustomMenu
        placeholder="متراژ"
        register={register}
        name={{ min: "metre.min", max: "metre.max" }}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors.metre?.min?.message || errors.metre?.max?.message}
        isTablet={isTablet}
        setOpenCustomMenu={setOpenCustomMenu}
        menuName={"metre"}
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
