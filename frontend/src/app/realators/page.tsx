import { Api } from "@/ApiService";
import { allRealtorDataType } from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

export default async function Realators({
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${Api.realtors}/?${params}`
  );

  let realatorsData: {
    data: allRealtorDataType[];
    total_pages: number;
    status: number;
  } = await data.json();

  if (!data.ok) {
    return <ErrNoData />;
  }
  return (
    <>
      <SearchBox title="مشاورین املاک" />
      {realatorsData.data &&
        data.status === 200 &&
        realatorsData.data.length >= 1 && (
          <RealatorsCarts data={realatorsData} />
        )}

      {realatorsData.data &&
        realatorsData.status === 200 &&
        realatorsData.data.length < 1 && (
          <SearchDataNotFound text="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد." />
        )}
    </>
  );
}
