"use client";
import { useState } from "react";
import SearchAndFilter from "@/components/SearchResults/SearchAndFilter";
import MobileFilter from "@/components/Filter/MobileFilter";
import DesktopFilter from "@/components/Filter/desktop/DesktopFilter";
import { AdsDataType } from "@/Types";
import { Api, dataKey, useGetRequest } from "@/services/ApiService";
import AdsCart from "@/components/AdsCart";
import DateRangeSelector from "@/components/SearchResults/DateRangeSelector";
import NumberItemsFound from "@/components/SearchResults/NumberItemsFound";
import PaginationComponent from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

export default function SearchResultsContainer() {
  const [isOpenFilterMobileModal, setIsOpenFilterMobileModal] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber") || "1";

  const adsURL = `${Api.Ad}/?page=${pageNumber}`;

  const { data, isFetching, isPending, refetch } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: adsURL,
    key: [dataKey.SEARCH_RESULTS, adsURL],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const numberItemsFound = data?.data ? data.data.length : 0;
  const propertyType = searchParams.get("type_of_transaction_name") || "";
  const propertyTypeText = `املاک ${propertyType}‌ی`;

  return (
    <div className="p-4">
      <SearchAndFilter
        setOpenModal={setIsOpenFilterMobileModal}
        numberItemsFound={numberItemsFound}
        propertyTypeText={propertyTypeText}
      />
      <MobileFilter
        isViewMore={true}
        isOpen={isOpenFilterMobileModal}
        setIsOpen={setIsOpenFilterMobileModal}
      />

      <div className="mt-36 flex-col hidden md:flex">
        <DesktopFilter isViewMore={true} />

        <p className="font-bold mt-4 text-lg">{propertyTypeText}</p>

        <div className="flex justify-between items-center">
          <NumberItemsFound number={numberItemsFound} />

          <DateRangeSelector />
        </div>
      </div>

      <AdsCart
        data={data?.data}
        isFetching={isFetching}
        isloading={isPending}
        refetch={refetch}
      />

      <PaginationComponent totalPages={data?.totalPages} />
    </div>
  );
}
