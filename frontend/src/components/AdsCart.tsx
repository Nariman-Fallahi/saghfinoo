"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import "react-loading-skeleton/dist/skeleton.css";
import S_Ads from "@/skeleton/S_Ads";
import { AdsDataType } from "@/types/Type";
import { usePostRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { ErrorNotification } from "@/notification/Error";
import { LoginErrorText, numberToPersian } from "@/constant/Constants";
import { Success } from "@/notification/Success";
import { Spinner } from "@heroui/spinner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type AdsCartType = {
  isloading: boolean;
  data: AdsDataType[] | undefined;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        data: AdsDataType[];
        totalPages: number;
      },
      Error
    >
  >;
  isFetching: boolean;
};

export default function AdsCart({
  data,
  isloading,
  refetch,
  isFetching,
}: AdsCartType) {
  const [adsSave_Delete_Id, setAdsSave_Delete_Id] = useState<number>();
  const access = getCookie("access");

  const {
    mutate: adsSaveMutate,
    isSuccess: adsSaveSuccess,
    isPending: adsSavePending,
    data: adsSaveData,
  } = usePostRequest({
    url: `${Api.Ad}/${adsSave_Delete_Id}/save`,
    key: "saveAds",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    mutate: adsDeleteMutate,
    isSuccess: adsDeleteSuccess,
    isPending: adsDeletePending,
    data: adsDeleteData,
  } = usePostRequest({
    url: `${Api.Ad}/${adsSave_Delete_Id}/save`,
    key: "deleteAdsSave",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    method: "DELETE",
  });

  const handleAdsSave_Delete = (id: number, isSaved: boolean) => {
    if (access) {
      setAdsSave_Delete_Id(id);
      isSaved ? adsDeleteMutate({}) : adsSaveMutate({});
    } else {
      ErrorNotification(LoginErrorText);
    }
  };

  useEffect(() => {
    if (
      adsSaveSuccess &&
      adsSaveData &&
      refetch &&
      adsSaveData.msg === "done"
    ) {
      refetch();
      Success("آگهی با موفقیت ذخیره شد.");
    }
  }, [adsSaveSuccess, adsSaveData, refetch]);

  useEffect(() => {
    if (
      adsDeleteSuccess &&
      adsDeleteData &&
      refetch &&
      adsDeleteData.msg === "done"
    ) {
      refetch();
      Success("آگهی با موفقیت حذف شد.");
    }
  }, [adsDeleteSuccess, adsDeleteData, refetch]);

  const isSave_Delete_Loading =
    adsSavePending || adsDeletePending || isFetching;

  return (
    <div className="flex flex-wrap justify-between w-full gap-2">
      {isloading ? (
        <S_Ads />
      ) : (
        data?.map((item) => {
          return (
            <div
              key={item.id}
              className="w-[48%] h-fit flex flex-col border border-[#E1E1E1]
             rounded-lg mt-6 lg:mt-8 lg:w-[30%] md:rounded-2xl"
            >
              <Image
                width={100}
                height={100}
                className="w-full h-[100px] rounded-t-lg md:h-1/2"
                sizes="(min-width: 768px) 100%, 50%"
                src={item.imageFullPath || "/icons/noneImage.svg"}
                alt="Ads Image"
              />

              <div className="flex flex-col p-2 md:p-3">
                <div className="flex w-full justify-between items-center">
                  <p className="text-xs text-[#909090] md:text-base">
                    {`${item.typeOfTransaction} ${item.propertyType}`}
                  </p>
                  {/* Save Btn */}
                  {isSave_Delete_Loading && item.id === adsSave_Delete_Id ? (
                    <div className="mt-1">
                      <Spinner size="sm" color="danger" />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      radius="full"
                      isIconOnly
                      variant="light"
                      onPress={() => {
                        handleAdsSave_Delete(
                          item.id,
                          item.isSaved === undefined ? true : item.isSaved
                        );
                      }}
                    >
                      <i>
                        <Image
                          width={16}
                          height={16}
                          src={
                            item.isSaved === undefined
                              ? "/icons/trash-black.svg"
                              : item.isSaved
                              ? "/icons/trash-black.svg"
                              : "/icons/archive-add.svg"
                          }
                          className="md:w-6 md:h-6"
                          sizes="(min-width: 768px) 24px, 24px"
                          alt="Save"
                        />
                      </i>
                    </Button>
                  )}
                  {/* END Save Btn */}
                </div>

                <p className="mt-1 text-xs md:text-base truncate">
                  {`${item.city} ${item.mainStreet}`}
                </p>
                <p className="mt-1 text-xs font-bold md:text-base truncate">
                  {item.rent !== 0
                    ? `${numberToPersian(item.rent)} تومان رهن`
                    : "رهن ندارد"}
                </p>
                <p className="mt-1 text-xs font-bold md:text-base truncate">
                  {item.deposit !== 0
                    ? `${numberToPersian(item.deposit)} تومان اجاره`
                    : "اجاره ندارد"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
