"use client";
import { Title } from "@/constant/Constants";
import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import PaginationComponent from "./Pagination";

type ConsultantsType = {
  userName: string | string[];
};

export default function Consultants({ userName }: ConsultantsType) {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isPending } = useGetRequest<{
    data: {
      id: number;
      user__first_name: string;
      user__last_name: string;
      user__image_full_path: string;
      real_estate_office__name: string;
    }[];
    total_pages: number;
  }>({
    url: `${Api.GetRealEstateConsultants}${userName}&page=${pageNumber}`,
    key: ["getRealEstateConsultants"],
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });

  console.log(data?.data);

  return (
    <div className="mt-10 flex flex-col w-fill p-4 md:mt-14 md:p-8">
      {isPending ? (
        <Skeleton width={220} height={25} />
      ) : (
        <Title
          title={`مشاورین ${data?.data.map(
            (item) => item.real_estate_office__name
          )}`}
        />
      )}

      <div className="mt-5 flex justify-between flex-wrap md:mt-8">
        {isPending ? (
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
          <>
            {data?.data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-[24%] flex flex-col justify-center md:bg-[#F9F9F9]
                 md:p-3 md:w-1/6 md:rounded-xl md:ml-1 md:mr-2 items-center"
                >
                  <Image
                    width={70}
                    height={70}
                    className="rounded-full md:w-[120px] md:h-[120px]"
                    sizes="(min-width: 768px) 120px, 120px"
                    src={
                      item.user__image_full_path || "/icons/profile-circle.svg"
                    }
                    alt="profileIcon"
                  />
                  <span className="mt-3 font-medium text-xs md:text-base md:mt-4">
                    {isPending ? (
                      <Skeleton width={50} className="md:!w-[100px]" />
                    ) : (
                      `${item.user__first_name} ${item.user__last_name}`
                    )}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>

      <PaginationComponent
        totalPages={data?.total_pages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
