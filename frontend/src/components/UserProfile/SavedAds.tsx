"use client";
import { Title } from "@/app/userProfile/[id]/page";
import NoData from "./NoData";
import DeleteAllAdsBtn from "./DeleteAllAdsBtn";
import AdsCart from "../AdsCart";
import { usePostRequest, Api, useGetRequest } from "@/ApiService";
import { getCookie } from "cookies-next";
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AdsDataType } from "@/types/Type";

export default function SavedAds() {
  const access = getCookie("access");
  const { pageNumber } = useParams();

  const {
    data: adsSavedData,
    isPending: adsSavedPending,
    refetch: adsSavedRefetch,
    isFetching: adsSavedFetching,
  } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: `${Api.AdsSaved}?page=${pageNumber || 1}`,
    key: ["getAdsSaved"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const { mutate: deleteAllAdsSaves, isPending: deleteAllAdsSavedPending } =
    usePostRequest({
      url: Api.AdsSaved,
      key: "deleteAllAdsSaves",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
  return (
    <>
      <Title title="آگهی های ذخیره شده" />
      {adsSavedPending ? (
        <Skeleton width={145} height={20} className="mt-4 md:!w-[180px]" />
      ) : (
        adsSavedData?.data &&
        adsSavedData?.data.length >= 1 &&
        (!deleteAllAdsSavedPending ? (
          <DeleteAllAdsBtn
            onPress={() => {
              deleteAllAdsSaves({});
            }}
          />
        ) : (
          <div className="flex mt-5 items-center">
            <Spinner size="sm" color="danger" />
            <p className="text-sm md:text-base mr-3">
              در حال حذف تمام آگهی های ذخیره شده ...
            </p>
          </div>
        ))
      )}

      <AdsCart
        data={adsSavedData?.data}
        isloading={adsSavedPending}
        refetch={adsSavedRefetch}
        isFetching={adsSavedFetching}
      />

      {adsSavedData && adsSavedData.data.length === 0 && (
        <NoData
          icon="/icons/SavedAds-icon.svg"
          title="هنوز آگهی ذخیره نکردید !"
          description="صفحه املاک اجاره ای سقفینو را ببینید و از میان آنها آگهی های دلخواه را ذخیره کنید"
          titleBtn="املاک اجاره ای"
          linkBtn="/" //TODO این قسمت باید تغییر کند
        />
      )}
    </>
  );
}
