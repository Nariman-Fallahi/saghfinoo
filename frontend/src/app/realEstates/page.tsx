import { Api } from "@/ApiService";
// import { useGetRequest } from "@/ApiService";
import { allrealEstateOfficesDataType } from "@/types/Type";
import { axiosInstance } from "@/ApiService";
import { useState } from "react";
import ErrNoData from "@/components/ErrNoData";
import SearchDataNotFound from "@/components/RealEstates-Realators/SearchDataNotFound";

// Components
import SearchBox from "@/components/RealEstates-Realators/SearchBox";
import RealEstatesCards from "@/components/RealEstatesCards";
import { MultiValue } from "react-select";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type RealEstatesDataType = {
  data: allrealEstateOfficesDataType[];
  status: number;
  total_pages: number;
};

// export const getServerSideProps = (async (context) => {
//   const page = context.query.page as string;
//   const cities = context.query.city as string | string[];

//   const citiesList = Array.isArray(cities) ? cities : cities ? [cities] : [];
//   const citiesQuery = citiesList
//     .map((city) => `city=${encodeURIComponent(city)}`)
//     .join("&");

//   const { data } = await axios(
//     `${Api.Reos}/?page=${page}&${citiesQuery}`
//   );
//   return { props: { RealEstatesData: data } };
// }) satisfies GetServerSideProps<{ RealEstatesData: RealEstatesDataType }>;

export default async function RealEstates() {
  const data = await axiosInstance.get<RealEstatesDataType>(
    `${Api.Reos}?page=1`
  );
  // const [pageNumber, setPageNumber] = useState<number>(1);
  // const [searchCity, setSearchCity] = useState<
  //   MultiValue<{
  //     value: string;
  //     label: string;
  //   }>
  // >();

  // const params = new URLSearchParams();

  // params.append("page", pageNumber.toString());
  // searchCity?.forEach((city) => {
  //   params.append("city", city.value);
  // });

  // const { data, isError, isPending } = useGetRequest<{
  //   data: allrealEstateOfficesDataType[];
  //   status: number;
  //   total_pages: number;
  // }>({
  //   url: `${Api.Reos}/?${params.toString()}`,
  //   key: ["getAllRealEstateOffices", pageNumber.toString(), params.toString()],
  //   enabled: true,
  //   staleTime: 10 * 60 * 1000,
  // });

  // if (isError) {
  //   return <ErrNoData />;
  // }

  return (
    <>
      <SearchBox title="املاک و مستغلات" />
      {/* <RealEstatesCards
        data={RealEstatesData}
        setPageNumber={setPageNumber}
        isPending={true}
        pageNumber={pageNumber}
      />  */}

      {/* {data?.data && data.data.length < 1 && (
        <SearchDataNotFound text="بنگاهی با شهر مورد نظر شما پیدا نشد." />
      )} */}
    </>
  );
}
