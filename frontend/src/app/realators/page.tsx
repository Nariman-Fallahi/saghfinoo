"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { allRealtorDataType } from "@/types/Type";
import { useState } from "react";
import ErrNoData from "@/components/ErrNoData";
// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

export default function Realators() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchCity, setSearchCity] = useState("");

  const { data, status } = useGetRequest<{
    data: allRealtorDataType[];
    total_pages: number;
    status: number;
  }>({
    url: `${Api.GetAllRealtor}${pageNumber}&city=${encodeURIComponent(
      searchCity
    )}`,
    key: ["getAllRealtor", JSON.stringify(pageNumber), searchCity],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (status === "error" || (data?.status !== 200 && status !== "pending")) {
    return <ErrNoData />;
  }
  return (
    <>
      <SearchBox title="مشاورین املاک" setSearchCity={setSearchCity} />
        <RealatorsCarts
          data={data}
          status={status}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />

      {data?.data && data?.data.length < 1 && (
        <SearchDataNotFound text="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد." />
      )}
    </>
  );
}
