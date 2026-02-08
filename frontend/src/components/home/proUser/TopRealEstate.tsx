"use client";
import { Title } from "@/components/ui/Title";
import RealEstatesCards from "@/components/RealEstatesCards";
import { allrealEstateOfficesDataType } from "@/types";
import { QueryKeys } from "@/services/apiService";
import { useGetRequest } from "@/hooks/useRequest";

interface TopRealEstateProps {
  fetchUrl: string;
}

export default function TopRealEstate({ fetchUrl }: TopRealEstateProps) {
  const { data, isLoading } = useGetRequest<{
    data: allrealEstateOfficesDataType[];
  }>({
    key: [QueryKeys.GET_REAL_ESTATE_OFFICES_TOP],
    url: fetchUrl,
  });

  if (!data) return;

  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="املاک برتر" />

      <div className="flex flex-wrap">
        <RealEstatesCards data={data.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
