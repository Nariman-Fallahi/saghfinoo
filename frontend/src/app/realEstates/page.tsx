"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import { useState } from "react";
import ErrNoData from "@/components/ErrNoData";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";

export default function RealEstates() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchCity, setSearchCity] = useState<string>("");

  const { data, status } = useGetRequest<{
    data: allrealEstateOfficesDataType[];
    status: number;
    total_pages: number;
  }>({
    url: `${Api.GetAllRealEstateOffices}${pageNumber}&city=${encodeURIComponent(
      searchCity
    )}`,
    key: ["getAllRealEstateOffices", JSON.stringify(pageNumber), searchCity],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (status === "error" || (data?.status !== 200 && status !== "pending")) {
    return <ErrNoData />;
  }

  return (
    <>
      <SearchBox title="املاک و مستغلات" setSearchCity={setSearchCity} />
        <RealEstatesCards
          data={data}
          setPageNumber={setPageNumber}
          status={status}
          pageNumber={pageNumber}
        />

      {data?.data && data.data.length < 1 && (
        <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
      )}
    </>
  );
}
