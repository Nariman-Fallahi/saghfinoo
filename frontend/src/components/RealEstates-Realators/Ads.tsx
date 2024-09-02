import AdsCart from "../AdsCart";
import { Title } from "@/constant/Constants";
import Filter from "./AdsFilter/Filter";
import { Dispatch, SetStateAction } from "react";
import { AdsDataType, AdsFilterDataType } from "@/types/Type";
import PaginationComponent from "../Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

export type ProvinceType =
  | { name: string | undefined; id: number | undefined }
  | undefined;

type AdsType = {
  title: string;
  status: "error" | "success" | "pending";
  data: AdsDataType[] | undefined;
  pageNumber: number;
  setPageNumber: (value: number) => void;
  totalPages: number | undefined;
  adsfilterData: AdsFilterDataType | undefined;
  setAdsFilterData: Dispatch<SetStateAction<AdsFilterDataType | undefined>>;
};

export default function Ads({
  title,
  status,
  data,
  pageNumber,
  setPageNumber,
  totalPages,
  adsfilterData,
  setAdsFilterData,
}: AdsType) {
  return (
    <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
      {status === "pending" ? (
        <Skeleton
          width={150}
          height={25}
          className="md:!w-[300px] md:!h-[30px]"
        />
      ) : (
        <Title title={title} />
      )}

      <Filter filterData={adsfilterData} setFilterData={setAdsFilterData} />

      <AdsCart data={data} isloading={status === "pending"} />

      {status === "success" && data && data?.length <= 0 && (
        <div className="flex flex-col items-center mt-5 w-full">
          <Image
            width={130}
            height={130}
            className="md:w-52 md:h-52 lg:w-56 lg:h-56"
            src="/icons/NoDataPage.svg"
            alt="NO Data"
          />
          <p className="text-sm md:text-base lg:text-lg">
            متاسفانه آگهی برای نمایش یافت نشد ):
          </p>
        </div>
      )}

      <PaginationComponent
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />
    </div>
  );
}
