"use client";
import {Title} from "@/constant/Constants";
import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Consultants() {
  const [isloading, setIsloading] = useState<boolean>(true);

  return (
    <div className="mt-10 flex flex-col w-fill p-4 md:mt-14 md:p-8">
      <Title title="مشاورین توسی" />

      <div className="mt-5 flex justify-between flex-wrap md:mt-8">
        {isloading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-[24%] flex flex-col justify-center md:bg-[#F9F9F9]
             md:p-3 md:w-1/6 md:rounded-xl md:ml-1 md:mr-2 items-center"
            >
              <Skeleton
                circle
                width={70}
                height={70}
                className="md:w-[120px] md:h-[120px]"
              />
              <div className="mt-3 md:mt-4">
                <Skeleton width={80} className="md:!w-[130px]" />
              </div>
            </div>
          ))
        ) : (
          <div
            className="w-[24%] flex flex-col justify-center md:bg-[#F9F9F9]
            md:p-3 md:w-1/6 md:rounded-xl md:ml-1 md:mr-2 items-center"
          >
            <Image
              width={70}
              height={70}
              className="rounded-full md:w-[120px] md:h-[120px]"
              src="/image/Bg-SearchBox.webp"
              alt=""
            />
            <span className="mt-3 font-medium text-xs md:text-base md:mt-4">
              {isloading ? (
                <Skeleton width={50} className="md:!w-[100px]" />
              ) : (
                "نریمان فلاحی"
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
