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
import { MultiValue } from "react-select";

export default function Realators() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchCity, setSearchCity] = useState<
    MultiValue<{
      value: string;
      label: string;
    }>
  >();

  const params = new URLSearchParams();

  params.append("page", pageNumber.toString());
  searchCity?.forEach((city) => {
    params.append("city", city.value);
  });

  const { data, isError, isPending } = useGetRequest<{
    data: allRealtorDataType[];
    total_pages: number;
    status: number;
  }>({
    url: `${Api.realtors}/?${params.toString()}`,
    key: ["getAllRealtor", pageNumber.toString(), params.toString()],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (isError) {
    return <ErrNoData />;
  }
  return (
    <>
      <SearchBox title="مشاورین املاک" setSearchCity={setSearchCity} />
      <RealatorsCarts
        data={data}
        isPending={isPending}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />

      {data?.data && data?.data.length < 1 && (
        <SearchDataNotFound text="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد." />
      )}
    </>
  );
}
