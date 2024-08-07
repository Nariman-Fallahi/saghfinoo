"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { allrealEstateOfficesDataType } from "@/types/Type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next-nprogress-bar";
import { isMobile } from "@/constant/Constants";
import ViewMoreBtn from "./realEstates-realators/ViewMoreBtn";
import { SetStateAction } from "react";

type RealEstatesCardsType = {
  data: { data: allrealEstateOfficesDataType[] } | undefined;
  setPageNumber: (value: SetStateAction<number>) => void;
  status: "error" | "success" | "pending";
};

export default function RealEstatesCards({
  data,
  setPageNumber,
  status,
}: RealEstatesCardsType) {
  const [completeData, setCompleteData] =
    useState<allrealEstateOfficesDataType[]>();
  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const router = useRouter();

  // This code causes the data from the previous page to be merged with the new page.
  useEffect(() => {
    if (status === "success" && data) {
      setCompleteData((prevState) => {
        if (Array.isArray(prevState)) {
          return [...prevState, ...data.data];
        }
        return [...data.data];
      });
    }
  }, [data, status]);

  // This code removes the "Load more" button when there is no more data remaining.
  const hasMore = data?.data.length === 21;
  return (
    <>
      <div className="w-full flex flex-wrap p-3 justify-between md:p-5">
        {status === "pending"
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-[48%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
                md:w-[30%] border border-[#E1E1E1] mt-6"
              >
                <Skeleton circle width={60} height={60} className="mt-2" />

                <Skeleton
                  width={100}
                  height={25}
                  className="mt-4 md:!w-[150px]"
                />
                <Skeleton
                  width={150}
                  height={20}
                  count={4}
                  className="mt-2 md:!w-[200px]"
                />
              </div>
            ))
          : completeData?.map((item, index) => (
              <div
                onClick={() =>
                  isMobile
                    ? router.push(`/realEstateProfile/${item.username}`)
                    : null
                }
                className="w-[48%] shadow rounded-2xl flex flex-col p-2 items-center
                 text-xs md:w-[30%] border border-[#E1E1E1] mt-6"
                key={index}
              >
                <Image
                  width={50}
                  height={50}
                  className="rounded-full mt-2 md:w-[80px] md:h-[80px]"
                  src={
                    item.image_full_path
                      ? item.image_full_path
                      : "/icons/archive-minus.svg"
                  }
                  alt=""
                />
                <div className="flex items-center mt-4 ">
                  <p className="font-bold md:text-xl">
                    مشاور املاک {item.name}
                  </p>
                  {item.blue_tick && (
                    <Image
                      width={15}
                      height={15}
                      className="mr-2 md:w-5 md:h-5"
                      src="/icons/blueTick.svg"
                      alt="Account confirmation check"
                    />
                  )}
                </div>
                <p className="mt-2 text-[#717171] md:text-lg">
                  {item.main_street}، {item.sub_street}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  میزان رضایت مندی: {item.score} از 5
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  آگهی های فعال: {item.number_of_active_ads}
                </p>
                {item.number_of_comments >= 1 ? (
                  <Button
                    className="mt-2 md:text-sm rounded-lg"
                    size="sm"
                    variant="light"
                  >
                    مشاهده نظرات کاربران ({item.number_of_comments} نظر)
                  </Button>
                ) : (
                  <span className="mt-2 text-[#717171] text-sm md:text-base">
                    نظری ثبت نشده است
                  </span>
                )}
                <Button
                  radius="sm"
                  className="hidden md:flex mt-3 bg-[#CB1B1B] text-white"
                  onPress={() =>
                    router.push(`/realEstateProfile/${item.username}`)
                  }
                >
                  مشاهده صفحه شخصی
                </Button>
              </div>
            ))}
      </div>

      {buttonActive && status !== "pending" && status === "success" && (
        <ViewMoreBtn
          hasMore={hasMore}
          setButtonActive={setButtonActive}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
}
