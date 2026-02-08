"use client";
import Image from "next/image";
import { Api, QueryKeys } from "@/services/apiService";
import PaginationComponent from "./Pagination";
import { allRealtorDataType } from "@/types";
import { useSearchParams } from "next/navigation";
import { Title } from "./ui/Title";
import { useGetRequest } from "@/hooks/useRequest";
import ConsultantsSkeleton from "./ui/skeletons/ConsultantsSkeleton";

type ConsultantsType = {
  userName: string | string[];
};

export default function Consultants({ userName }: ConsultantsType) {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";

  const { data, isPending } = useGetRequest<{
    data: allRealtorDataType[];
    total_pages: number;
  }>({
    url: `${Api.Realtors}/?reo_username=${userName}&page=${pageNumber}`,
    key: [QueryKeys.GET_REAL_ESTATE_CONSULTANTS, pageNumber],
  });

  if (isPending || !data) return <ConsultantsSkeleton />;

  const officeName = data?.data?.[0]?.realEstateOffice?.name || "";

  return (
    <div className="mt-10 flex flex-col w-full p-4 md:mt-14 md:p-8">
      <Title title={`مشاورین املاک ${officeName}`} />

      <div className="mt-5 flex justify-start flex-wrap gap-y-6 md:mt-8">
        {data?.data.map((item) => (
          <div
            key={item.id}
            className="w-1/4 flex flex-col justify-center md:bg-[#F9F9F9]
             md:p-3 md:w-[15%] md:rounded-xl md:mx-2 items-center text-center"
          >
            <Image
              width={120}
              height={120}
              className="rounded-full w-[70px] h-[70px] md:w-[120px] md:h-[120px] object-cover"
              src={item.user.imageFullPath || "/icons/profile-circle.svg"}
              alt={`${item.user.firstName} ${item.user.lastName}`}
            />
            <span className="mt-3 font-medium text-xs md:text-base md:mt-4 truncate w-full">
              {`${item.user.firstName} ${item.user.lastName}`}
            </span>
          </div>
        ))}
      </div>

      {data?.total_pages && data.total_pages > 1 && (
        <PaginationComponent totalPages={data.total_pages} />
      )}
    </div>
  );
}
