"use client";
import { Title } from "@/constant/Constants";
import RealEstatesCards from "@/components/RealEstatesCards";
import { allrealEstateOfficesDataType } from "@/Types";

type TopRealEstateType = {
  data: allrealEstateOfficesDataType[];
};

export default function TopRealEstate({ data }: TopRealEstateType) {
  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="املاک برتر" />

      <div className="flex flex-wrap">
        <RealEstatesCards data={data} />
      </div>
    </div>
  );
}
