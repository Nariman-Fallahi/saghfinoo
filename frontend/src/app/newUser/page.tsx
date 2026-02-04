import Features from "@/components/home/newUser/Features";
import TypesEstate from "@/components/home/newUser/TypesEstate";
import LatestNews from "@/components/home/newUser/LatestNews";
import Services from "@/components/home/Services";
import SearchBox from "@/components/home/SearchBox";
import { NewsDataType } from "@/types";
import { Api, baseURL } from "@/services/ApiService";
import { Metadata } from "next";
import { ServicesDataNewUserHome } from "@/constant/servicesDataNewUser";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "سقفینو، سقفی برای همه",
};

export default async function NewUserHomePage({
  searchParams,
}: {
  searchParams: { swiperPageNumber: string };
}) {
  const swiperPageNumber = searchParams.swiperPageNumber || "1";

  const data = await fetch(
    `${baseURL}${Api.News}/?page=${swiperPageNumber}&special=0`,
    { cache: "no-store" }
  );

  const newsData: {
    data: NewsDataType[];
    total_pages: number;
    status: number;
  } = await data.json();

  return (
    <>
      <SearchBox />
      <Features />
      <TypesEstate />
      <Services
        title="همه به شما مشاوره میدهند!"
        subtitle="اما در سقفینو مشاورین املاک کنار شما میمانند"
        data={ServicesDataNewUserHome}
      />
      <LatestNews data={newsData.data} status={newsData.status} />
    </>
  );
}
