import AdsCart from "../AdsCart";
import { Title } from "@/constant/Constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Filter from "./AdsFilter/Filter";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { ActionMeta, SingleValue } from "react-select";

export type ProvinceType =
  | { name: string | undefined; id: number | undefined }
  | undefined;

export default function Ads() {
  const [province, setProvince] = useState<ProvinceType>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState();

  console.log(city);

  const isloading = false; //TODO Delete
  return (
    <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
      <Title title="آگهی های املاک توسی" />

      {isloading ? (
        <div className="mt-5 md:mt-10">
          <Skeleton width={100} height={20} className="md:!w-[250px]" />
        </div>
      ) : (
        <Filter
          province={province}
          city={city}
          setCity={setCity}
          setProvince={setProvince}
        />
      )}

      <AdsCart />

      {!isloading && (
        <div className="w-full flex justify-center">
          <Button
            className="bg-[#CB1B1B] text-xs font-medium w-[156px] h-[32px] mt-12
           text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
          >
            مشاهده بیشتر
          </Button>
        </div>
      )}
    </div>
  );
}
