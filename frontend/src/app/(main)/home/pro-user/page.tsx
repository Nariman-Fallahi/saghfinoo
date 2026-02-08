import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Api, QueryKeys } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";

import SearchBox from "@/components/home/SearchBox";
import Services from "@/components/home/Services";
import NewestHouseRent from "@/components/home/proUser/NewestHouseRent";
import SuggestedSearches from "@/components/home/proUser/SuggestedSearches";
import TopRealEstate from "@/components/home/proUser/TopRealEstate";
import TopRealtors from "@/components/home/proUser/TopRealtors";
import { ServicesDataProUserHome } from "@/constant/home/servicesDataProUser";
import { Metadata } from "next";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { SITE_METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: SITE_METADATA.homeUser.title,
  description: SITE_METADATA.homeUser.description,
};

export default async function ProUserHomePage() {
  const queryClient = new QueryClient();

  const accessToken = getCookie("accessToken", { cookies });

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const getNewestHouseRentFetchUrl = `${Api.Ad}/?page=1&type_of_transaction_name=اجاره&limit=6`;
  const getSelectionFetchUrl = `${Api.Ad}/suggested-searchs`;
  const getRealEstateOfficesTopFetchUrl = `${Api.Reos}/top`;
  const getRealtorTopFetchUrl = `${Api.Realtors}/top`;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.GET_NEWEST_HOUSE_RENT],
      queryFn: () => universalFetcher(getNewestHouseRentFetchUrl, headers),
    }),
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.GET_SELECTION_DATA],
      queryFn: () => universalFetcher(getSelectionFetchUrl),
    }),
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.GET_REAL_ESTATE_OFFICES_TOP],
      queryFn: () => universalFetcher(getRealEstateOfficesTopFetchUrl),
    }),
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.GET_REALTOR_TOP],
      queryFn: () => universalFetcher(getRealtorTopFetchUrl),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchBox />
      <NewestHouseRent fetchUrl={getNewestHouseRentFetchUrl} />
      <Services
        title="سقفینو فرصتی برای همه"
        subtitle="اگر مالک یا در جست‌‌وجوی سقفی نو هستید، کلیک کنید"
        data={ServicesDataProUserHome}
      />
      <SuggestedSearches fetchUrl={getSelectionFetchUrl} />
      <TopRealEstate fetchUrl={getRealEstateOfficesTopFetchUrl} />
      <TopRealtors fetchUrl={getRealtorTopFetchUrl} />
    </HydrationBoundary>
  );
}
