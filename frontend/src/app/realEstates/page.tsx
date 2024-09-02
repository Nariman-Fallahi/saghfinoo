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
import { MultiValue } from "react-select";

export default function RealEstates() {
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
    data: allrealEstateOfficesDataType[];
    status: number;
    total_pages: number;
  }>({
    url: `${Api.Reos}/?${params.toString()}`,
    key: ["getAllRealEstateOffices", pageNumber.toString(), params.toString()],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  if (isError) {
    return <ErrNoData />;
  }

  return (
    <>
      <SearchBox title="املاک و مستغلات" setSearchCity={setSearchCity} />
      <RealEstatesCards
        data={data}
        setPageNumber={setPageNumber}
        isPending={isPending}
        pageNumber={pageNumber}
      />

      {data?.data && data.data.length < 1 && (
        <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
      )}
    </>
  );
}
