import { Api, baseURL } from "@/services/ApiService";
import SearchBox from "@/components/home/SearchBox";
import { Metadata } from "next";
import {
  allrealEstateOfficesDataType,
  allRealtorDataType,
  SuggestedSearchesDataType,
} from "@/types";
//  Components
import Services from "@/components/home/Services";
import NewestHouseRent from "@/components/home/proUser/NewestHouseRent";
import SuggestedSearches from "@/components/home/proUser/SuggestedSearches";
import TopRealEstate from "@/components/home/proUser/TopRealEstate";
import TopRealtors from "@/components/home/proUser/TopRealtors";
import { ServicesDataProUserHome } from "@/constant/servicesDataProUser";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "سقفینو، سقفی برای همه",
};

export default async function ProUserHomePage() {
  const [suggestedSearches, topRealEstateData, topRealtorsData]: [
    { data: SuggestedSearchesDataType[] },
    { data: allrealEstateOfficesDataType[] },
    { data: allRealtorDataType[] }
  ] = await Promise.all([
    fetch(`${baseURL}${Api.Ad}/suggested-searchs`).then((response) =>
      response.json()
    ),

    fetch(`${baseURL}${Api.Reos}/top`).then((response) => response.json()),

    fetch(`${baseURL}${Api.Realtors}/top`).then((response) => response.json()),
  ]);

  return (
    <>
      <SearchBox />
      <NewestHouseRent />
      <Services
        title="سقفینو فرصتی برای همه"
        subtitle="اگر مالک یا در جست‌‌وجوی سقفی نو هستید، کلیک کنید"
        data={ServicesDataProUserHome}
      />
      <SuggestedSearches data={suggestedSearches.data} />
      <TopRealEstate data={topRealEstateData.data} />
      <TopRealtors data={topRealtorsData.data} />
    </>
  );
}
