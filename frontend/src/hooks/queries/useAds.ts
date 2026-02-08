import { useSearchParams } from "next/navigation";
import { useGetRequest } from "@/hooks/useRequest";
import { Api, QueryKeys } from "@/services/apiService";
import { AdsDataType } from "@/types";

interface useAdsProps {
  adsURL?: string;
  keys: string[];
}

export const useAds = ({ adsURL, keys }: useAdsProps) => {
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();

  const url = adsURL ?? `${Api.Ad}/?${paramsString || `page=1`}`;
  keys.push(paramsString)

  return useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: url,
    key: keys,
  });
};
