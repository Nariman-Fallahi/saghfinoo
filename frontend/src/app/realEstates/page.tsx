import { Api, baseURL } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";
import { Metadata } from "next";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";
import PaginationComponent from "@/components/Pagination";

export const metadata: Metadata = {
  title: "املاک و مستغلات",
};

export default async function RealEstates({
  searchParams,
}: {
  searchParams: { city?: string | string[]; page: string };
}) {
  const cities = searchParams.city || "";
  const pageNumber = searchParams.page || "1";
  const params = new URLSearchParams();

  params.append("page", pageNumber);

  if (Array.isArray(cities)) {
    cities?.forEach((city) => {
      params.append("city", city);
    });
  } else {
    params.append("city", cities);
  }

  let data = await fetch(
    `${baseURL}${Api.Reos}/?${params}`
  );

  let realEstateData: {
    data: allrealEstateOfficesDataType[];
    status: number;
    total_pages: number;
  } = await data.json();

  if (!data.ok) {
    return <ErrNoData />;
  }

  return (
    <>
     <div className="mt-[82px] md:mt-[180px] md:1/3">
     <SearchBox title="املاک و مستغلات" />
    </div>
    
      {realEstateData.data &&
        data.status === 200 &&
        realEstateData.data.length >= 1 && (
          <>
            <RealEstatesCards data={realEstateData.data} />
            <PaginationComponent totalPages={realEstateData.total_pages} />
          </>
        )}

      {realEstateData.data &&
        data.status === 200 &&
        realEstateData.data.length < 1 && (
          <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
        )}
    </>
  );
}
