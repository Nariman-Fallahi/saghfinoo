import { ServicesDataNewUserHome } from "@/constant/Constants";

// Components
import Features from "@/components/Home/newUser/Features";
import TypesEstate from "@/components/Home/newUser/TypesEstate";
import LatestNews from "@/components/Home/newUser/LatestNews";
import Services from "@/components/Home/newUser/Services";
import SearchBox from "@/components/Home/SearchBox";
import { NewsDataType } from "@/types/Type";
import { Api, axiosInstance } from "@/ApiService";

export default async function Home({
  searchParams,
}: {
  searchParams: { pageNumber: string };
}) {
  const pageNumber = searchParams.pageNumber || "1";

  const data = await axiosInstance.get<{
    data: NewsDataType[];
    total_pages: number;
  }>(`${Api.News}/?page=${pageNumber}&special=0`);

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
      <LatestNews
        data={data.data.data}
        totalPages={data.data.total_pages}
        status={data.status}
      />
    </>
  );
}
