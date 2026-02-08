"use client";
import { Title } from "@/components/ui/Title";
import RealatorsCard from "@/components/RealatorsCard";
import { allRealtorDataType } from "@/types";
import { QueryKeys } from "@/services/apiService";
import { useGetRequest } from "@/hooks/useRequest";

interface TopRealtorsProps {
  fetchUrl: string;
}

export default function TopRealtors({ fetchUrl }: TopRealtorsProps) {
  const { data, isLoading } = useGetRequest<{
    data: allRealtorDataType[];
  }>({
    key: [QueryKeys.GET_REALTOR_TOP],
    url: fetchUrl,
  });

  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="مشاوران برتر" />

      <div className="flex flex-wrap">
        <RealatorsCard data={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
