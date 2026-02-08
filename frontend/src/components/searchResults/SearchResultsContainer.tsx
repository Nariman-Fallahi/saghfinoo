"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { FilterDataType } from "@/types";
import { useAds } from "../../hooks/queries/useAds";
import useUpdateSearchParams from "@/hooks/queries/useUpdateSearchParams";

// Components
import AdsCard from "@/components/AdsCard";
import PaginationComponent from "@/components/Pagination";
import NumberItemsFound from "./NumberItemsFound";
import DateRangeSelector from "./DateRangeSelector";
import FilterManager from "../ads-filter/FilterManager";
import SearchBox from "../shared/agency/CitySearch";
import { QueryKeys } from "@/services/apiService";

export default function SearchResultsContainer() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { data, isLoading, refetch } = useAds({
    keys: [QueryKeys.SEARCH_RESULTS],
  });

  const numberItemsFound = data?.data ? data.data.length : 0;
  const propertyType = searchParams.get("type_of_transaction_name") || "";
  const propertyTypeText = `املاک ${propertyType}‌ی`;

  const isInitialLoading = isLoading && !data;

  const methods = useForm<FilterDataType>({
    defaultValues: Object.fromEntries(searchParams.entries()) as any,
  });

  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    reset(Object.fromEntries(searchParams.entries()) as any);
  }, [searchParams, reset]);

  const onSubmit = (data: FilterDataType) => {
    updateSearchParams(data);
  };

  return (
    <div className="p-4 mt-16 md:mt-36">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="font-bold text-lg">{propertyTypeText}</p>
          <SearchBox className="w-full md:hidden" />
        </div>

        <div className="w-full flex flex-col gap-3 bg-white md:bg-transparent p-2 md:p-0 rounded-lg">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex-1 md:flex-initial">
              <FilterManager
                isViewMore={true}
                isLoading={isInitialLoading}
                formMethods={{ ...methods, onSubmit }}
              />
            </div>

            <div className="flex-1 md:hidden">
              <DateRangeSelector
                control={control}
                onSubmit={handleSubmit(onSubmit)}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-1 md:mt-2">
            <div>
              <div className="hidden md:block">
                <NumberItemsFound
                  number={numberItemsFound}
                  isLoading={isInitialLoading}
                />
              </div>

              <div className="md:hidden flex items-center gap-2 px-1">
                <span className="text-sm text-gray-500 font-medium">
                  تعداد نتایج:
                </span>
                <NumberItemsFound
                  number={numberItemsFound}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="hidden md:block">
              <DateRangeSelector
                control={control}
                onSubmit={handleSubmit(onSubmit)}
                isLoading={isInitialLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <AdsCard
          data={data?.data}
          onActionSuccess={() => refetch()}
          isloading={isLoading}
        />
      </div>

      <PaginationComponent totalPages={data?.totalPages} />
    </div>
  );
}
