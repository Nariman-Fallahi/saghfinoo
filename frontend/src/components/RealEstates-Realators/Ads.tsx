import AdsCart from "../AdsCart";
import { Title } from "@/constant/Constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Filter from "./AdsFilter/Filter";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { AdsFilterDataType } from "@/types/Type";
import PaginationComponent from "../Pagination";

export type ProvinceType =
  | { name: string | undefined; id: number | undefined }
  | undefined;

export default function Ads() {
  const [filterData, setFilterData] = useState<AdsFilterDataType>();

  const isloading = false; //TODO Delete
  return (
    <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
      <Title title="آگهی های املاک توسی" />

      {isloading ? (
        <div className="mt-5 md:mt-10">
          <Skeleton width={100} height={20} className="md:!w-[250px]" />
        </div>
      ) : (
        <Filter filterData={filterData} setFilterData={setFilterData} />
      )}

      <AdsCart />

      <PaginationComponent  />
    </div>
  );
}
