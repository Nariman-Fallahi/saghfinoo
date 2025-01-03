import { Api, axiosInstance, baseURL } from "@/ApiService";

// Components
import RealEstateNews from "@/components/News/RealEstateNews";
import NewsBox from "@/components/News/newsBox/NewsBox";
import Construction from "@/components/News/construction/Construction";
import Ad from "@/components/News/Ad";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اخبار املاک",
  description: "در این صفحه میتوانید اخبار روز املاک را دنبال کنید",
};

export default async function News({
  searchParams,
}: {
  searchParams: {
    housingNewsPageNumber?: string;
    constructionNewsPageNumber?: string;
    rentNewsPageNumber?: string;
  };
}) {
  const housingNewsPageNumber = searchParams.housingNewsPageNumber || 1;
  const constructionNewsPageNumber =
    searchParams.constructionNewsPageNumber || 1;
  const rentNewsPageNumber = searchParams.rentNewsPageNumber || 1;

  const [
    realEstateNewsResponse,
    importantHousingNewsResponse,
    housingNewsResponse,
    constructionNewsResponse,
    importantRentNewsResponse,
    rentNewsResponse,
  ] = await Promise.all([
    fetch(
      `${baseURL}${Api.News}/?page=1&special=2`
    ).then((response) => response.json()),

    fetch(
      `${baseURL}${Api.News}/?page=1&category=مسکن&special=1`
    ).then((response) => response.json()),

    fetch(
      `${baseURL}${Api.News}/?page=${housingNewsPageNumber}&special=0`
    ).then((response) => response.json()),

    fetch(
      `${baseURL}${Api.News}/?page=${constructionNewsPageNumber}&category=ساخت و ساز`
    ).then((response) => response.json()),

    fetch(
      `${baseURL}${Api.News}/?page=1&category=اجاره&special=1`
    ).then((response) => response.json()),

    fetch(
      `${baseURL}${Api.News}/?page=${rentNewsPageNumber}&category=اجاره&special=0`
    ).then((response) => response.json()),
  ]);

  return (
    <div className="mt-20 md:mt-32 lg:mt-36 p-3 md:p-5">
      <RealEstateNews data={realEstateNewsResponse.data.data[0]} />
      <NewsBox
        title="مسکن"
        importantNews={importantHousingNewsResponse.data.data[0]}
        newsData={housingNewsResponse.data.data}
        pageName="housingNews"
        totalPages={housingNewsResponse.data.total_pages}
      />
      <Construction data={constructionNewsResponse.data.data} />
      <Ad />
      <NewsBox
        title="اجاره"
        importantNews={importantRentNewsResponse.data.data[0]}
        newsData={rentNewsResponse.data.data}
        pageName="rentNews"
        totalPages={importantRentNewsResponse.data.total_pages}
      />
    </div>
  );
}
