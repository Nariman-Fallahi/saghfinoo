import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { allrealEstateOfficesDataType } from "@/types/Type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next-nprogress-bar";
import { isMobile } from "@/constant/Constants";
import { SetStateAction } from "react";
import PaginationComponent from "./Pagination";
import { scrollToTop } from "@/constant/Constants";

type RealEstatesCardsType = {
  data:
    | { data: allrealEstateOfficesDataType[]; total_pages: number }
    | undefined;
  pageNumber: number;
  setPageNumber: (value: SetStateAction<number>) => void;
  isPending: boolean;
};

export default function RealEstatesCards({
  data,
  pageNumber,
  setPageNumber,
  isPending,
}: RealEstatesCardsType) {
  const router = useRouter();

  useEffect(() => {
    scrollToTop();
  }, [pageNumber]);

  return (
    <>
      <div className="w-full flex flex-wrap p-3 justify-between md:p-5">
        {isPending &&
          Array.from({ length: 9 }).map((_, index) => (
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
          ))}

        {data?.data && data?.data.length >= 1 && (
          <>
            {data.data?.map((item, index) => (
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
                  src={item.imageFullPath || "/icons/archive-minus.svg"}
                  alt=""
                />
                <div className="flex items-center mt-4 ">
                  <p className="font-bold md:text-xl truncate">
                    مشاور املاک {item.name}
                  </p>
                  {item.blueTick && (
                    <Image
                      width={15}
                      height={15}
                      className="mr-2 md:w-5 md:h-5"
                      src="/icons/blueTick.svg"
                      alt="Account confirmation check"
                    />
                  )}
                </div>
                <p className="mt-2 text-[#717171] md:text-lg text-center">
                  {item.city}، {item.mainStreet}، {item.subStreet}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  میزان رضایت مندی: {item.score} از 5
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  آگهی های فعال: {item.numberOfActiveAds}
                </p>
                {item.numberOfComments >= 1 ? (
                  <Button
                    className="mt-2 md:text-sm rounded-lg"
                    size="sm"
                    variant="light"
                  >
                    مشاهده نظرات کاربران ({item.numberOfComments} نظر)
                  </Button>
                ) : (
                  <span className="mt-2 text-[#717171] text-sm md:text-base">
                    نظری ثبت نشده است
                  </span>
                )}
                <Button
                  radius="sm"
                  className="hidden md:flex mt-3 bg-primary text-white"
                  onPress={() =>
                    router.push(`/realEstateProfile/${item.username}`)
                  }
                >
                  مشاهده صفحه شخصی
                </Button>
              </div>
            ))}

            <PaginationComponent
              totalPages={data.total_pages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </>
        )}
      </div>
    </>
  );
}
