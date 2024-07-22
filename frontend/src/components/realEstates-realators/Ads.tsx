import Title from "@/constant/Constants";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import Filter from "./AdsFilter/Filter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import S_Ads from "@/skeleton/S_Ads";

export default function Ads() {
  const [isloading, setIsloading] = useState<boolean>(false);

  return (
    <div className="mt-10 flex flex-col p-4 md:mt-14 md:p-8">
      <Title title="آگهی های املاک توسی" />

      {isloading ? (
        <div className="mt-5 md:mt-10">
          <Skeleton width={100} height={20} className="md:!w-[250px]" />
        </div>
      ) : (
        <Filter />
      )}

      <div className="flex flex-wrap justify-between md:mt-5">
        {isloading ? (
          <S_Ads />
        ) : (
          <div
            className="w-[156px] h-[196px] flex flex-col border border-[#E1E1E1]
         rounded-lg mt-4 md:w-[350px] md:h-[300px] md:rounded-2xl"
          >
            <Image
              width={100}
              height={100}
              className="w-full h-[110px] rounded-tl-lg rounded-tr-lg md:h-1/2"
              src="/image/Bg-SearchBox.webp"
              alt=""
            />

            <div className="flex flex-col p-2 md:p-3">
              <div className="flex w-full justify-between items-center">
                <p className="text-xs text-[#909090] md:text-base">ggggg</p>
                <Button size="sm" radius="full" isIconOnly variant="light">
                  <Image
                    width={16}
                    height={16}
                    src="/icons/save.svg"
                    className="md:w-6 md:h-6"
                    alt=""
                  />
                </Button>
              </div>

              <p className="mt-1 text-xs md:text-base">ffffffff</p>
              <p className="mt-1 text-xs font-bold md:text-base">fffff</p>
              <p className="mt-1 text-xs font-bold md:text-base">fff</p>
            </div>
          </div>
        )}

        {/* more */}
      </div>

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
