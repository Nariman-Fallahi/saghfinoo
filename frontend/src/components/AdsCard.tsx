"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { AdsDataType } from "@/types";
import { Api } from "@/services/apiService";
import { useState } from "react";
import { hasCookie } from "cookies-next";
import { ErrorNotification } from "@/notification/Error";
import { Success } from "@/notification/Success";
import { Spinner } from "@heroui/spinner";
import { numberToPersian } from "@/utils/numberToPersian";
import { LOGIN_ERROR_TEXT } from "@/constant/messages";
import { usePostRequest } from "@/hooks/useRequest";
import AdsCardSkeleton from "./ui/skeletons/AdsCardSkeleton";

type AdsCartType = {
  data: AdsDataType[] | undefined;
  onActionSuccess: () => void;
  isloading: boolean;
};

export default function AdsCard({
  data,
  isloading: initialLoading,
  onActionSuccess,
}: AdsCartType) {
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);
  const isAuthenticated = hasCookie("accessToken");

  const { mutate: adsSaveMutate, isPending: adsSavePending } = usePostRequest({
    url: `${Api.Ad}/${selectedAdId}/save`,
    key: "saveAds",
  });

  const { mutate: adsDeleteMutate, isPending: adsDeletePending } =
    usePostRequest({
      url: `${Api.Ad}/${selectedAdId}/save`,
      key: "deleteAdsSave",
      method: "DELETE",
    });

  const handleAdsSave_Delete = (id: number, isSaved: boolean) => {
    if (isAuthenticated) {
      setSelectedAdId(id);

      setTimeout(() => {
        if (isSaved) {
          adsDeleteMutate(
            {},
            {
              onSuccess: (res) => {
                if (res.msg === "done") {
                  onActionSuccess();
                  Success("آگهی با موفقیت حذف شد.");
                }
              },
            },
          );
        } else {
          adsSaveMutate(
            {},
            {
              onSuccess: (res) => {
                if (res.msg === "done") {
                  onActionSuccess();
                  Success("آگهی با موفقیت ذخیره شد.");
                }
              },
            },
          );
        }
      }, 0);
    } else {
      ErrorNotification(LOGIN_ERROR_TEXT);
    }
  };

  if (initialLoading && !data) return <AdsCardSkeleton count={6} />;

  const isActionPending = adsSavePending || adsDeletePending;

  return (
    <div className="grid grid-cols-2 w-full gap-4 lg:gap-6 lg:grid-cols-3">
      {data?.map((item) => (
        <div
          key={item.id}
          className="h-fit flex flex-col border border-[#E1E1E1] rounded-lg mt-6 lg:mt-8 md:rounded-2xl"
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

              {isActionPending && item.id === selectedAdId ? (
                <div className="mt-1">
                  <Spinner size="sm" color="danger" />
                </div>
              ) : (
                <Button
                  size="sm"
                  radius="full"
                  isIconOnly
                  variant="light"
                  onPress={() =>
                    handleAdsSave_Delete(item.id, item.isSaved ?? true)
                  }
                >
                  <i>
                    <Image
                      width={16}
                      height={16}
                      src={
                        item.isSaved
                          ? "/icons/trash-black.svg"
                          : "/icons/archive-add.svg"
                      }
                      className="md:w-6 md:h-6"
                      alt="Save"
                    />
                  </i>
                </Button>
              )}
            </div>

            <p className="mt-1 text-xs md:text-base truncate">{`${item.city} ${item.mainStreet}`}</p>
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
      ))}
    </div>
  );
}
