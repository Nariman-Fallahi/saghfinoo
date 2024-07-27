"use client";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { allRealtorDataType } from "@/types/Type";
import { useState } from "react";
import ErrNoData from "@/components/ErrNoData";
// Components
import SearchBox from "@/components/realEstates-realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";

export default function Realators() {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, status } = useGetRequest<{
    data: allRealtorDataType[];
    status: number;
  }>({
    url: `${Api.GetAllRealtor}${pageNumber}`,
    key: ["getAllRealtor", JSON.stringify(pageNumber)],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (status === "error" || (data?.status !== 200 && status !== "pending")) {
    return <ErrNoData />;
  }
  return (
    <>
      <SearchBox title="مشاورین املاک" />
      <RealatorsCarts
        data={data}
        status={status}
        setPageNumber={setPageNumber}
      />
    </>
  );
}
