"use client";
import { useState } from "react";
import SearchAndFilter from "@/components/SearchResults/SearchAndFilter";
import MobileFilter from "@/components/Filter/MobileFilter";
import DesktopFilter from "@/components/Filter/desktop/DesktopFilter";
import { AdsDataType, FilterDataType } from "@/types/Type";
import { Api, dataKey, useGetRequest } from "@/ApiService";
import AdsCart from "@/components/AdsCart";
import { useQueryURL } from "@/hooks/useQueryURL";
import DateRangeSelector from "@/components/SearchResults/DateRangeSelector";
import NumberItemsFound from "@/components/SearchResults/NumberItemsFound";

export default function SearchResults() {
  const [isOpenFilterMobileModal, setIsOpenFilterMobileModal] =
    useState<boolean>(false);
  // const [urlQuery, setUrlQuery] = useState<FilterDataType>();
  
  // const adsURL = useQueryURL(Api.Ad);

  const { data, isFetching, isPending, refetch } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: '',
    key: [dataKey.SEARCH_RESULTS, ],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="p-4">
      <SearchAndFilter
        setOpenModal={setIsOpenFilterMobileModal}
        numberItemsFound={data?.data ? data.data.length : 0}
      />
      <MobileFilter
        isViewMore={true}
        isOpen={isOpenFilterMobileModal}
        setIsOpen={setIsOpenFilterMobileModal}
        // queryObject={queryObject}
        // urlQuery={urlQuery}
      />

      <div className="mt-36 flex-col hidden md:flex">
        <DesktopFilter isViewMore={true} />

        <p className="font-bold mt-4 text-lg">املاک اجاره ای</p>

        <div className="flex justify-between items-center">
          <NumberItemsFound number={200} />

          <DateRangeSelector />
        </div>
      </div>

      <AdsCart
        data={data?.data}
        isFetching={isFetching}
        isloading={isPending}
        refetch={refetch}
      />
    </div>
  );
}
