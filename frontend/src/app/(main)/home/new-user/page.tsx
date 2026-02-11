import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SearchBox from "@/components/home/SearchBox";
import Features from "@/components/home/newUser/Features";
import TypesEstate from "@/components/home/newUser/TypesEstate";
import Services from "@/components/home/Services";
import { ServicesDataNewUserHome } from "@/constant/home/servicesDataNewUser";
import LatestNews from "@/components/home/newUser/LatestNews";
import { Api, QueryKeys } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";
import { Metadata } from "next";
import { SITE_METADATA } from "@/constant/metadata";

export const metadata: Metadata = {
  title: SITE_METADATA.homeGuest.title,
  description: SITE_METADATA.homeGuest.description,
};

export default async function NewUserHomePage() {
  const queryClient = new QueryClient();
  const getNewsFetchUrl = `${Api.News}/?page=1&special=0`;

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QueryKeys.GET_NEWS],
    queryFn: () => universalFetcher(getNewsFetchUrl),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SearchBox />
        <Features />
        <TypesEstate />
        <Services
          title="همه به شما مشاوره میدهند!"
          subtitle="اما در سقفینو مشاورین املاک کنار شما میمانند"
          data={ServicesDataNewUserHome}
        />
        <LatestNews />
      </div>
    </HydrationBoundary>
  );
}
