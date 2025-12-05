import { Title } from "@/constant/Constants";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Api, dataKey } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import PaginationComponent from "./Pagination";
import { allRealtorDataType } from "@/types/Type";
import { useSearchParams } from "next/navigation";

type ConsultantsType = {
  userName: string | string[];
};

export default function Consultants({ userName }: ConsultantsType) {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") || 1;

  const { data, isPending } = useGetRequest<{
    data: allRealtorDataType[];
    total_pages: number;
  }>({
    url: `${Api.Realtors}/?reo_username=${userName}&page=${pageNumber}`,
    key: [dataKey.GET_REAL_ESTATE_CONSULTANTS],
    staleTime: 10 * 60 * 1000,
    enabled: true,
  });

  return (
    <div className="mt-10 flex flex-col w-fill p-4 md:mt-14 md:p-8">
      {isPending ? (
        <Skeleton width={220} height={25} />
      ) : (
        <Title
          title={`مشاورین ${data?.data.map(
            (item) => item.realEstateOffice.name
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
                    src={item.user.imageFullPath || "/icons/profile-circle.svg"}
                    alt="profileIcon"
                  />
                  <span className="mt-3 font-medium text-xs md:text-base md:mt-4">
                    {isPending ? (
                      <Skeleton width={50} className="md:!w-[100px]" />
                    ) : (
                      `${item.user.firstName} ${item.user.lastName}`
                    )}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>

      <PaginationComponent totalPages={data?.total_pages} />
    </div>
  );
}
