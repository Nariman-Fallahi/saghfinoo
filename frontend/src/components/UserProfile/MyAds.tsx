"use client";
import Title from "./Title";
import NoData from "./NoData";
import DeleteAllAdsBtn from "./DeleteAllAdsBtn";
import { Api, dataKey } from "@/ApiService";
import { usePostRequest } from "@/ApiService";
import { useEffect, useState } from "react";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequest } from "@/ApiService";
import { AdsDataType } from "@/types/Type";
import { getCookie } from "cookies-next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isMobile } from "@/constant/Constants";
import { Spinner } from "@heroui/spinner";
import AdsCart from "../AdsCart";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import Image from "next/image";

export default function MyAds() {
  const access = getCookie("access");
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber") || "1";
  const [adDeleteId, setAdDeleteId] = useState<number>();

  const {
    mutate: deleteAllAdsDataMutate,
    data: deleteAllAdsData,
    isPending: DeleteAllPending,
  } = usePostRequest({
    url: Api.DeleteAllMyAds,
    key: "deleteAllAds",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const { data, isPending, refetch, isFetching, isLoading } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: `${Api.GetAllMyAds}?page=${pageNumber}`,
    key: [dataKey.GET_ALL_MY_ADS, pageNumber.toString()],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    mutate: deleteAdsDataMutate,
    data: deleteAdsData,
    isPending: deleteAdsPending,
  } = usePostRequest({
    url: `${Api.Ad}/${adDeleteId}`,
    key: "deleteAds",
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const handleDeleteAds = (id: number) => {
    setAdDeleteId(id);
    deleteAdsDataMutate({});
  };

  useEffect(() => {
    if (deleteAllAdsData && deleteAllAdsData.msg === "done") {
      Success("تمام آگهی های شما با موفقیت حذف شدند");
      refetch();
    } else if (deleteAllAdsData && deleteAllAdsData.msg !== "done") {
      ErrorNotification("در حذف تمام آگهی ها مشکلی پیش آمد");
    }
  }, [deleteAllAdsData, refetch]);

  useEffect(() => {
    if (deleteAdsData && deleteAdsData.msg === "done") {
      Success("این آگهی با موفقیت حذف شد");
      refetch();
    } else if (deleteAdsData && deleteAdsData.msg !== "done") {
      ErrorNotification("در حذف این آگهی مشکلی پیش آمد");
    }
  }, [deleteAdsData, refetch]);

  const isData = data?.data && data?.data.length >= 1 && !isPending;

  return (
    <>
      <Title title="آگهی های من" />

      {isPending ? (
        <Skeleton width={145} height={20} className="mt-4 md:!w-[180px]" />
      ) : (
        isData &&
        (!DeleteAllPending ? (
          <DeleteAllAdsBtn
            onPress={() => {
              deleteAllAdsDataMutate({});
            }}
          />
        ) : (
          <div className="flex mt-5 items-center">
            <Spinner size="sm" color="danger" />
            <p className="text-sm md:text-base mr-3">
              در حال حذف تمام آگهی ها ...
            </p>
          </div>
        ))
      )}

      {isPending && (
        <div className="flex flex-wrap justify-between w-full">
          {Array.from({ length: isMobile ? 4 : 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[48%] rounded-lg flex flex-col items-center relative
               lg:w-[30%] border mt-5 pb-2"
            >
              <Skeleton
                containerClassName="w-full !-mt-1"
                className="rounded-t md:!h-[100px]"
                height={70}
              />
              <Skeleton
                containerClassName="w-[75%]"
                count={4}
                className="mt-21 md:mt-2"
              />
            </div>
          ))}
        </div>
      )}

      {isData && (
        <>
          <div className="flex flex-wrap justify-between w-full">
            {data?.data.map((item) => {
              return (
                // <div className="flex flex-col" key={item.id}>
                //   <AdsCart
                //     data={data.data}
                //     isFetching={isFetching}
                //     isloading={isLoading}
                //     refetch={refetch}
                //   />

                //   <Button className="w-full" radius="sm">
                //     حذف این آگهی
                //   </Button>
                // </div>
                <div
                  key={item.id}
                  className="w-[48%] rounded-lg flex flex-col items-center relative
                lg:w-[30%] border mt-5"
                >
                  <Image
                    width={500}
                    height={1000}
                    className="w-full h-1/2 rounded-t"
                    src="/image/Bg-SearchBox.webp"
                    alt=""
                  />
                  <div className="flex flex-col p-3 w-full">
                    <p className="text-xs md:text-sm lg:text-base text-[#909090] mt-1 truncate">
                      {`${item.typeOfTransaction} ${item.propertyType}`}
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-[#909090] mt-1 truncate">
                      {`${item.area}‌متر، شهرستان ${item.city}`}
                    </p>
                    <p className="text-xs md:text-sm lg:text-base font-bold mt-1 truncate">
                      {item.deposit !== 0
                        ? `${item.deposit} میلیون تومان رهن`
                        : `رهن ندارد`}
                    </p>
                    <p className="text-xs md:text-sm lg:text-base font-bold mt-1 truncate">
                      {`${item.rent} میلیون تومان اجاره`}
                    </p>
                  </div>
                  <div className="absolute z-10 w-full flex justify-between p-2 items-center">
                    {/* <div
                    className={`${
                      item.is_confirmed ? "bg-gray-300" : "bg-red-300"
                    } opacity-70 text-xs md:text-sm lg:text-base rounded
                    flex items-center justify-center p-1 cursor-default`}
                  >
                    {item.is_confirmed ? "تایید شده‌" : "در انتظار تایید"}
                  </div> */}
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => {
                        handleDeleteAds(item.id);
                      }}
                    >
                      {!deleteAdsPending ? (
                        <Image
                          width={16}
                          height={16}
                          className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                          src="/icons/trash.svg"
                          alt="Trash"
                        />
                      ) : (
                        <Spinner size="sm" color="default" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!isPending && data?.data && data?.data.length < 1 && (
        <NoData
          title="هنوز آگهی ثبت نکردید !"
          description="با ثبت رایگان آگهی در هر جایی که هستید به سرعت ملکتان را معامله کنید."
          icon="/icons/my-ads-icon.svg"
          titleBtn="ثبت آگهی"
          linkBtn="/adPosting"
        />
      )}
    </>
  );
}
