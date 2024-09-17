import { Api, axiosInstance } from "@/ApiService";
import { allRealtorDataType } from "@/types/Type";
import ErrNoData from "@/components/ErrNoData";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

type RealatorsDataType = {
  data: allRealtorDataType[];
  status: number;
  total_pages: number;
};

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

  const { data } = await axiosInstance.get<RealatorsDataType>(
    `${Api.realtors}/?${params}`
  );

  if (data.status !== 200) {
    return <ErrNoData />;
  }
  return (
    <>
      <SearchBox title="مشاورین املاک" />
      {data?.data && data.status === 200 && data?.data.length >= 1 && (
        <RealatorsCarts data={data} />
      )}

      {data?.data && data.status === 200 && data?.data.length < 1 && (
        <SearchDataNotFound text="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد." />
      )}
    </>
  );
}
