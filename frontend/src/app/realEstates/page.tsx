import { Api, baseURL } from "@/services/ApiService";
import { allrealEstateOfficesDataType } from "@/Types";
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
  searchParams: { city?: string; page: string };
}) {
  const page = searchParams.page || "1";
  const { city } = searchParams;

  const params = new URLSearchParams();
  params.append("page", page);

  if (city == "null" || !city) {
    params.delete("city");
  } else {
    params.append("city", city);
  }

  const data = await fetch(`${baseURL}${Api.Reos}/?${params}`, {
    cache: "no-store",
  });

  const realEstateData: {
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
