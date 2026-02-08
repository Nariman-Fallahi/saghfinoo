"use client";
import { useEffect, useState } from "react";
import {
  Control,
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { FilterDataType, SelectionDataType } from "@/types";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import SelectionCustomMenu from "./SelectionCustomMenu";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useDisclosure } from "@heroui/modal";
import MoreItemModal from "./MoreItemModal";
import useAddQuery from "@/hooks/useAddQuery";
import { useAllCities } from "@/hooks/queries/useAllCities";
import { useSelectionData } from "@/hooks/queries/useSelectionData";

export type OpenCustomMenu = "rent" | "deposit" | "metre" | null;

type DesktopFilterType = {
  isViewMore: boolean;
  register: UseFormRegister<FilterDataType>;
  control: Control<FilterDataType>;
  watch: UseFormWatch<FilterDataType>;
  errors: FieldErrors<FilterDataType>;
  handleSubmit: UseFormHandleSubmit<FilterDataType>;
  onSubmit: (data: FilterDataType) => void;
  onReset: () => void;
};

export default function DesktopFilter({
  isViewMore,
  register,
  control,
  watch,
  errors,
  handleSubmit,
  onSubmit,
  onReset,
}: DesktopFilterType) {
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [openCustomMenu, setOpenCustomMenu] = useState<OpenCustomMenu>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { setQuery } = useAddQuery();

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1080);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: allCitiesData, isPending: allCitiesPending } = useAllCities();

  const { data: selectionData, isPending: selectionDataPending } =
    useSelectionData();

  const property_types = selectionData?.data.filter(
    (item) => item.key === "propertyType",
  );

  return (
    <div className="flex w-full gap-3">
      <Controller
        name="city"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            isLoading={allCitiesPending}
            placeholder="شهرستان‌"
            variant="bordered"
            radius="sm"
            defaultItems={allCitiesData?.data || []}
            selectedKey={value ? String(value) : undefined}
            onSelectionChange={(key) => {
              onChange(key);
              setQuery("city", key?.toString());
            }}
          >
            {(city) => (
              <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />

      <Controller
        name="propertyType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            placeholder="نوع ملک"
            isLoading={selectionDataPending}
            aria-label="propertyType"
            variant="bordered"
            radius="sm"
            defaultItems={property_types || []}
            size={isTablet ? "sm" : "md"}
            onSelectionChange={(key) => {
              onChange(key);
              setQuery("propertyType", key?.toString());
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.value}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />

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

          <MoreItemModal
            control={control}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            watch={watch}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            reset={onReset}
          />
        </>
      )}
    </div>
  );
}
