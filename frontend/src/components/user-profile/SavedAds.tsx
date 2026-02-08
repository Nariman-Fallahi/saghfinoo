"use client";
import Title from "./Title";
import ProfileEmptyState from "./ProfileEmptyState";
import DeleteAllAdsBtn from "./DeleteAllAdsBtn";
import AdsCard from "../AdsCard";
import { Api, QueryKeys } from "@/services/apiService";
import { Spinner } from "@heroui/spinner";
import { useParams } from "next/navigation";
import { AdsDataType } from "@/types";
import { useGetRequest, usePostRequest } from "@/hooks/useRequest";
import { Success } from "@/notification/Success";
import { ErrorNotification } from "@/notification/Error";

export default function SavedAds() {
  const { pageNumber } = useParams();

  const {
    data: adsSavedData,
    isPending: adsSavedPending,
    refetch: adsSavedRefetch,
  } = useGetRequest<{
    data: AdsDataType[];
    totalPages: number;
  }>({
    url: `${Api.AdsSaved}?page=${pageNumber || 1}`,
    key: [QueryKeys.GET_ADS_SAVED, pageNumber?.toString() || "1"],
  });

  const { mutate: deleteAllAdsSaved, isPending: deleteAllPending } =
    usePostRequest({
      url: Api.AdsSaved,
      key: QueryKeys.DELETE_ALL_ADS_SAVED,
      method: "DELETE",
    });

  const handleDeleteAllAdsSaved = () => {
    deleteAllAdsSaved(
      {},
      {
        onSuccess: (res) => {
          if (res.msg === "done") {
            Success("تمام آگهی‌های ذخیره شده با موفقیت حذف شدند.");
            adsSavedRefetch();
          } else {
            ErrorNotification("در حذف تمام آگهی های ذخیره شده مشکلی پیش آمد.");
          }
        },
      },
    );
  };

  if (adsSavedPending) {
    return (
      <div className="flex flex-col animate-pulse">
        <Title title="آگهی های ذخیره شده" />
        <div className="h-6 w-36 bg-gray-200 rounded-sm mt-5" />{" "}
        <AdsCard data={undefined} isloading={true} onActionSuccess={() => {}} />
      </div>
    );
  }

  const hasData = adsSavedData?.data && adsSavedData.data.length > 0;

  return (
    <>
      <Title title="آگهی های ذخیره شده" />

      {!hasData && (
        <ProfileEmptyState
          icon="/icons/common/saved-ads.svg"
          title="هنوز آگهی ذخیره نکردید !"
          description="صفحه املاک اجاره ای سقفینو را ببینید و از میان آنها آگهی های دلخواه را ذخیره کنید"
          titleBtn="املاک اجاره ای"
          linkBtn="/searchResults?type_of_transaction_name=اجاره"
        />
      )}

      {hasData && (
        <>
          <div className="mt-5">
            {deleteAllPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="danger" />
                <p className="text-sm text-gray-500">
                  در حال حذف تمام ذخیره‌ها...
                </p>
              </div>
            ) : (
              <DeleteAllAdsBtn onPress={handleDeleteAllAdsSaved} />
            )}
          </div>
          <AdsCard
            data={adsSavedData.data}
            isloading={false}
            onActionSuccess={() => adsSavedRefetch()}
          />

          <div className="mt-5">
            {deleteAllPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="danger" />
                <p className="text-sm text-gray-500">
                  در حال حذف تمام ذخیره‌ها...
                </p>
              </div>
            ) : (
              <DeleteAllAdsBtn onPress={handleDeleteAllAdsSaved} />
            )}
          </div>
          <AdsCard
            data={adsSavedData.data}
            isloading={false}
            onActionSuccess={() => adsSavedRefetch()}
          />
        </>
      )}
    </>
  );
}
