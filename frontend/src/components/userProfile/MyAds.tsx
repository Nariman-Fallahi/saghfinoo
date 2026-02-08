"use client";
import Title from "./Title";
import NoData from "./NoData";
import DeleteAllAdsBtn from "./DeleteAllAdsBtn";
import { Api, QueryKeys } from "@/services/apiService";
import { useState } from "react";
import { Success } from "@/notification/Success";
import { AdsDataType } from "@/types";
import { Spinner } from "@heroui/spinner";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useGetRequest, usePostRequest } from "@/hooks/useRequest";
import MyAdsSkeleton from "../ui/skeletons/MyAdsSkeleton";
import { ErrorNotification } from "@/notification/Error";

export default function MyAds() {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber") || "1";
  const [adDeleteId, setAdDeleteId] = useState<number | null>(null);

  const { data, isPending, refetch } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: `${Api.GetAllMyAds}?page=${pageNumber}`,
    key: [QueryKeys.GET_ALL_MY_ADS, pageNumber.toString()],
  });

  const { mutate: deleteAllAdsDataMutate, isPending: deleteAllPending } =
    usePostRequest({
      url: Api.DeleteAllMyAds,
      key: "deleteAllAds",
      method: "DELETE",
    });

  const { mutate: deleteAdsDataMutate, isPending: deleteSinglePending } =
    usePostRequest({
      url: `${Api.Ad}/${adDeleteId}`,
      key: "deleteAds",
      method: "DELETE",
    });

  const handleDeleteAds = (id: number) => {
    setAdDeleteId(id);
    deleteAdsDataMutate(
      {},
      {
        onSuccess: (res) => {
          if (res.msg === "done") {
            Success("آگهی با موفقیت حذف شد.");
            setAdDeleteId(null);
            refetch();
          } else {
            ErrorNotification("در حذف آگهی مشکلی پیش آمد.");
          }
        },
      },
    );
  };

  const handleDeleteAllAds = () => {
    deleteAllAdsDataMutate(
      {},
      {
        onSuccess: (res) => {
          if (res.msg === "done") {
            Success("تمام آگهی های شما با موفقیت حذف شدند.");
            refetch();
          } else {
            ErrorNotification("در حذف تمام آگهی ها مشکلی پیش آمد.");
          }
        },
      },
    );
  };

  if (isPending) return <MyAdsSkeleton />;

  const hasData = data?.data && data.data.length > 0;
  if (!hasData) {
    return (
      <>
        <Title title="آگهی های من" />
        <NoData
          title="هنوز آگهی ثبت نکردید !"
          description="با ثبت رایگان آگهی در هر جایی که هستید به سرعت ملکتان را معامله کنید."
          icon="/icons/my-ads-icon.svg"
          titleBtn="ثبت آگهی"
          linkBtn="/adPosting"
        />
      </>
    );
  }

  return (
    <>
      <Title title="آگهی های من" />

      <div className="mt-4">
        {deleteAllPending ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" color="danger" />
            <p className="text-sm text-gray-600">در حال حذف تمام آگهی ها...</p>
          </div>
        ) : (
          <DeleteAllAdsBtn onPress={handleDeleteAllAds} />
        )}
      </div>

      <div className="flex flex-wrap justify-between w-full mt-5 gap-y-5">
        {data.data.map((item) => (
          <div
            key={item.id}
            className="w-[48%] lg:w-[31%] rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden"
          >
            <Image
              width={400}
              height={300}
              className="w-full h-32 md:h-44 object-cover"
              src={item.imageFullPath || "/image/Bg-SearchBox.webp"}
              alt="Ad Image"
            />

            <div className="flex flex-col p-3 w-full space-y-1">
              <p className="text-xs md:text-sm text-gray-500 truncate">
                {`${item.typeOfTransaction} ${item.propertyType}`}
              </p>
              <p className="text-xs md:text-sm text-gray-400 truncate">
                {`${item.area}‌ متر، ${item.city}`}
              </p>
              <p className="text-xs md:text-sm font-bold text-gray-800 truncate">
                {item.deposit !== 0
                  ? `${item.deposit} میلیون تومان رهن`
                  : "بدون رهن"}
              </p>
              <p className="text-xs md:text-sm font-bold text-gray-800 truncate">
                {item.rent !== 0
                  ? `${item.rent} میلیون تومان اجاره`
                  : "بدون اجاره"}
              </p>
            </div>

            <div className="absolute top-2 left-2 z-10">
              <Button
                isIconOnly
                radius="full"
                variant="flat"
                className="bg-white/80 backdrop-blur-sm"
                onPress={() => handleDeleteAds(item.id)}
              >
                {deleteSinglePending && adDeleteId === item.id ? (
                  <Spinner size="sm" color="danger" />
                ) : (
                  <Image
                    width={18}
                    height={18}
                    src="/icons/trash.svg"
                    alt="Delete"
                  />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
