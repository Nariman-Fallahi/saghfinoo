import { Api, baseURL } from "@/services/ApiService";
import { allRealtorDataType } from "@/Types";
import ErrNoData from "@/components/ErrNoData";

// Components
import SearchBox from "@/components/realEstates-Realators/SearchBox";
import RealatorsCarts from "@/components/RealatorsCarts";
import SearchDataNotFound from "@/components/realEstates-Realators/SearchDataNotFound";
import { Metadata } from "next";
import PaginationComponent from "@/components/Pagination";

export const metadata: Metadata = {
  title: "مشاوران",
};

export default async function Realators({
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

  const data = await fetch(`${baseURL}${Api.Realtors}/?${params}`, {
    cache: "no-store",
  });

  const realatorsData: {
    data: allRealtorDataType[];
    total_pages: number;
    status: number;
  } = await data.json();

  if (!data.ok) {
    return <ErrNoData />;
  }

  return (
    <>
      <div className="mt-[82px] md:mt-[180px]">
        <SearchBox title="مشاورین املاک" />
      </div>
      {realatorsData.data &&
        data.status === 200 &&
        realatorsData.data.length >= 1 && (
          <>
            <RealatorsCarts data={realatorsData.data} />
            <PaginationComponent totalPages={realatorsData.total_pages} />
          </>
        )}

      {realatorsData.data &&
        realatorsData.status === 200 &&
        realatorsData.data.length < 1 && (
          <SearchDataNotFound text="مشاوری که عضو بنگاه شهر مورد نظر شما باشد وجود ندارد." />
        )}
    </>
  );
}
