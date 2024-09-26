import { Api } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";

export default async function RealEstates({
  searchParams,
}: {
  searchParams: { city?: string | string[]; pageNumber: string };
}) {
  const cities = searchParams.city || "";
  const pageNumber = searchParams.pageNumber || "1";
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${Api.Reos}/?${params}`
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
      <SearchBox title="املاک و مستغلات" />
      {realEstateData.data &&
        data.status === 200 &&
        realEstateData.data.length >= 1 && (
          <RealEstatesCards data={realEstateData} />
        )}

      {realEstateData.data &&
        data.status === 200 &&
        realEstateData.data.length < 1 && (
          <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
        )}
    </>
  );
}
