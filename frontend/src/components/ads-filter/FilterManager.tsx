"use client";
import { useState } from "react";
import { FilterDataType } from "@/types";
import useUpdateSearchParams from "../../hooks/queries/useUpdateSearchParams";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./desktop/DesktopFilter";
import FilterSkeleton from "../ui/skeletons/FilterSkeleton";
import { Button } from "@heroui/button";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface ExtendedFormMethods extends UseFormReturn<FilterDataType> {
  onSubmit: (data: FilterDataType) => void;
}

interface FilterManagerProps {
  isViewMore: boolean;
  isLoading: boolean;
  formMethods: ExtendedFormMethods;
}

export default function FilterManager({
  isViewMore,
  isLoading,
  formMethods,
}: FilterManagerProps) {
  const updateSearchParams = useUpdateSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
    onSubmit,
  } = formMethods;

  const handleReset = () => {
    const emptyValues = {
      city: "",
      propertyType: "",
      deposit_from: "",
      deposit_to: "",
      rent_from: "",
      rent_to: "",
      numberOfBedroom: "",
      numberOfParking: "",
      numberOfStorageRoom: "",
      numberOfElevators: "",
      numberOfRestrooms: "",
      typeOfRestroom: "",
      numberOfFloors: "",
      coolingSystem: "",
      heatingSystem: "",
    };
    reset(emptyValues);
    updateSearchParams(emptyValues);
  };

  if (isLoading) return <FilterSkeleton />;

  return (
    <>
      <div className="hidden md:block">
        <DesktopFilter
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onReset={handleReset}
          isViewMore={isViewMore}
        />
      </div>

      <div className="md:hidden">
        <Button
          size="sm"
          className="rounded-sm! border w-full flex items-center justify-center gap-2"
          variant="bordered"
          onPress={() => setIsMobileOpen(true)}
        >
          <Image
            width={16}
            height={16}
            src="/icons/ui/filter-search.svg"
            alt="FilterSearch"
          />
          فیلترها
        </Button>

        <MobileFilter
          isOpen={isMobileOpen}
          setIsOpen={setIsMobileOpen}
          register={register}
          control={control}
          watch={watch}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
          isViewMore={isViewMore}
        />
      </div>
    </>
  );
}
