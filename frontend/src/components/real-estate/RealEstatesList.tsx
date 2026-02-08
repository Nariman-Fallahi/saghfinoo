"use client";

import { useGetRequest } from "@/hooks/useRequest";
import { QueryKeys } from "@/services/apiService";
import { allrealEstateOfficesDataType } from "@/types";
import RealEstatesCards from "@/components/RealEstatesCards";
import PaginationComponent from "@/components/Pagination";
import FetchError from "@/components/FetchError";
import EmptyState from "@/components/ui/EmptyState";

interface Props {
  page: string;
  city: string | null;
  fetchUrl: string;
}

export default function RealEstatesList({ page, city, fetchUrl }: Props) {
  const { data, status, isLoading } = useGetRequest<{
    data: allrealEstateOfficesDataType[];
    total_pages: number;
  }>({
    url: fetchUrl,
    key: [QueryKeys.GET_REAL_ESTATE_OFFICES, page, city || ""],
  });

  if (status === "error") return <FetchError />;

  const realEstateData = data?.data || [];
  const totalPages = data?.total_pages || 0;

  if (status === "success" && realEstateData.length < 1) {
    return (
      <EmptyState
        title="بنگاه املاکی یافت نشد"
        message="متاسفانه هیچ بنگاهی با شهر یا مشخصات مورد نظر شما پیدا نشد."
      />
    );
  }

  return (
    <>
      <RealEstatesCards data={realEstateData} isLoading={isLoading} />
      {totalPages > 1 && <PaginationComponent totalPages={totalPages} />}
    </>
  );
}
