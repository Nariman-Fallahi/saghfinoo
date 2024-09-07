import { Api } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import { axiosInstance } from "@/ApiService";
import ErrNoData from "@/components/ErrNoData";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";

type RealEstatesDataType = {
  data: allrealEstateOfficesDataType[];
  status: number;
  total_pages: number;
};

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

  const { data } = await axiosInstance.get<RealEstatesDataType>(
    `${Api.Reos}/?${params}`
  );

  if (data.status !== 200) {
    return <ErrNoData />;
  }

  return (
    <>
      <SearchBox title="املاک و مستغلات" />
      {data?.data && data.status === 200 && data.data.length >= 1 && (
        <RealEstatesCards data={data} />
      )}

      {data?.data && data.status === 200 && data.data.length < 1 && (
        <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
      )}
    </>
  );
}
