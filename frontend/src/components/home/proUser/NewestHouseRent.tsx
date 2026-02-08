"use client";
import { Title } from "@/components/ui/Title";
import AdsCard from "@/components/AdsCard";
import { QueryKeys } from "@/services/apiService";
import { AdsDataType } from "@/types";
import { useGetRequest } from "@/hooks/useRequest";

interface NewestHouseRentProps {
  fetchUrl: string;
}

export default function NewestHouseRent({ fetchUrl }: NewestHouseRentProps) {
  const { isLoading, refetch, data } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: fetchUrl,
    key: [QueryKeys.GET_NEWEST_HOUSE_RENT],
  });

  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="جدید ترین خانه های اجاره ای" />

      <div className="flex flex-wrap">
        <AdsCard
          data={data?.data}
          isloading={isLoading}
          onActionSuccess={() => refetch()}
        />
      </div>
    </div>
  );
}
