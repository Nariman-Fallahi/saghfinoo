"use client";
import { Title } from "@/constant/Constants";
import AdsCart from "@/components/AdsCart";
import { useGetRequest, Api } from "@/ApiService";
import { AdsDataType } from "@/types/Type";
import { getCookie } from "cookies-next";

export default function NewestHouseRent() {
  const access = getCookie("access");

  const { isLoading, isFetching, refetch, data } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: `${Api.Ad}/?page=1&type_of_transaction_name=اجاره&limit=6`,
    key: ["getNewestHouseRentData"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="جدید ترین خانه های اجاره ای" />

      <div className="flex flex-wrap">
        <AdsCart
          data={data?.data}
          isFetching={isFetching}
          isloading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
