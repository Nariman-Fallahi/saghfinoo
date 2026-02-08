"use client";

import { useGetRequest } from "@/hooks/useRequest";
import { QueryKeys } from "@/services/apiService";
import { allRealtorDataType } from "@/types";
import RealatorsCard from "@/components/RealatorsCard";
import PaginationComponent from "@/components/Pagination";
import FetchError from "@/components/FetchError";
import EmptyState from "@/components/ui/EmptyState";

interface Props {
  page: string;
  city: string | null;
  fetchUrl: string;
}

export default function RealatorsList({ page, city, fetchUrl }: Props) {
  const { data, status, isLoading } = useGetRequest<{
    data: allRealtorDataType[];
    total_pages: number;
  }>({
    url: fetchUrl,
    key: [QueryKeys.GET_REALTORS, page, city || ""],
  });

  if (status === "error") return <FetchError />;

  const realators = data?.data || [];
  const totalPages = data?.total_pages || 0;

  if (status === "success" && realators.length < 1) {
    return (
      <EmptyState
        title="مشاوری یافت نشد"
        message="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد."
      />
    );
  }

  return (
    <>
      <RealatorsCard data={realators} isLoading={isLoading} />
      <PaginationComponent totalPages={totalPages} />
    </>
  );
}
