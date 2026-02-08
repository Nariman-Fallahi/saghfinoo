import { Api, QueryKeys } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// Components
import SearchBox from "@/components/shared/agency/CitySearch";
import RealEstatesList from "@/components/real-estate/RealEstatesList";
import { SITE_METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: SITE_METADATA.realEstates.title,
  description: SITE_METADATA.realEstates.description,
};

export default async function RealEstates({
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

  const fetchUrl = `${Api.Reos}/?${urlParams.toString()}`;

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.GET_REAL_ESTATE_OFFICES, page, city],
    queryFn: () => universalFetcher(fetchUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-[82px] md:mt-[180px] md:1/3">
        <SearchBox title="املاک و مستغلات" />
      </div>

      <RealEstatesList page={page} city={city} fetchUrl={fetchUrl} />
    </HydrationBoundary>
  );
}
