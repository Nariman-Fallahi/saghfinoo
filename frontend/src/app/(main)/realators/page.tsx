import { Api, QueryKeys } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// Components
import CitySearch from "@/components/shared/agency/CitySearch";
import RealatorsList from "@/components/realators/RealatorsList";
import { SITE_METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: SITE_METADATA.realators.title,
  description: SITE_METADATA.realators.description,
};

export default async function Realators({
  searchParams,
}: {
  searchParams: { city?: string; page?: string };
}) {
  const queryClient = new QueryClient();

  const page = searchParams.page || "1";
  const city =
    searchParams.city && searchParams.city !== "null"
      ? searchParams.city
      : null;

  const urlParams = new URLSearchParams();
  urlParams.append("page", page);
  if (city) urlParams.append("city", city);

  const fetchUrl = `${Api.Realtors}/?${urlParams.toString()}`;

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.GET_REALTORS, page, city],
    queryFn: () => universalFetcher(fetchUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-[82px] md:mt-[180px]">
        <CitySearch title="مشاورین املاک" />
      </div>

      <RealatorsList page={page} city={city} fetchUrl={fetchUrl} />
    </HydrationBoundary>
  );
}
