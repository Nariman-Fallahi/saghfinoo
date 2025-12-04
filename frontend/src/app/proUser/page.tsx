import { Api, baseURL } from "@/services/ApiService";
import SearchBox from "@/components/Home/SearchBox";
import { ServicesDataProUserHome } from "@/constant/Constants";
import { Metadata } from "next";
import {
  allrealEstateOfficesDataType,
  allRealtorDataType,
  SuggestedSearchesDataType,
} from "@/Types";
//  Components
import Services from "@/components/Home/Services";
import NewestHouseRent from "@/components/Home/proUser/NewestHouseRent";
import SuggestedSearches from "@/components/Home/proUser/SuggestedSearches";
import TopRealEstate from "@/components/Home/proUser/TopRealEstate";
import TopRealtors from "@/components/Home/proUser/TopRealtors";

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
