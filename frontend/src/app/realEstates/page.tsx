"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import { useState } from "react";
import ErrNoData from "@/components/ErrNoData";

// Components
import SearchBox from "@/components/realEstates-realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";

export default function RealEstates() {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, status } = useGetRequest<{
    data: allrealEstateOfficesDataType[];
    status: number;
  }>({
    url: `${Api.GetAllRealEstateOffices}${pageNumber}&limit=21`,
    key: ["getAllRealEstateOffices", JSON.stringify(pageNumber)],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (status === "error" || (data?.status !== 200 && status !== "pending")) {
    return <ErrNoData />;
  }

  return (
    <>
      <SearchBox title="املاک و مستغلات" />
      <RealEstatesCards
        data={data}
        setPageNumber={setPageNumber}
        status={status}
      />
    </>
  );
}
