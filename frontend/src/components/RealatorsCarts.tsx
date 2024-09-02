import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { allRealtorDataType } from "@/types/Type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isMobile } from "@/constant/Constants";
import { useRouter } from "next-nprogress-bar";
import { SetStateAction } from "react";
import PaginationComponent from "./Pagination";
import { scrollToTop } from "@/constant/Constants";

type RealatorsCartsType = {
  data: { data: allRealtorDataType[]; total_pages: number } | undefined;
  pageNumber: number;
  setPageNumber: (value: SetStateAction<number>) => void;
  isPending: boolean;
};

export default function RealatorsCarts({
  data,
  setPageNumber,
  isPending,
  pageNumber,
}: RealatorsCartsType) {
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
              className="w-[45%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
              md:w-[30%] border border-[#E1E1E1] mt-6"
            >
              <Skeleton circle width={80} height={80} />
              <Skeleton
                width={100}
                height={15}
                count={3}
                className="mt-2 md:!w-[250px] md:mt-4 md:!h-[20px]"
              />
              <Skeleton
                width={50}
                height={15}
                className="mt-2 md:!w-[100px] md:mt-4 md:!h-[20px]"
              />
            </div>
          ))}

        {data?.data && data?.data.length >= 1 && (
          <>
            {data?.data?.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  isMobile ? router.push(`/realatorProfile/${item.id}`) : null
                }
                className="w-[45%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
                md:w-[30%] border border-[#E1E1E1] mt-6"
              >
                <Image
                  width={80}
                  height={80}
                  className="rounded-full !h-[80px]"
                  src={item.user.imageFullPath}
                  alt=""
                />
                <p className="font-bold mt-3 md:text-xl">
                  {item.user.firstName} {item.user.lastName}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  املاک {item.realEstateOffice.name}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  امتیاز {item.score} از 5
                </p>
                <Button
                  className="mt-2 md:text-sm rounded-lg border p-4 hidden md:flex"
                  size="sm"
                  variant="bordered"
                  color="danger"
                  onPress={() => router.push(`/realatorProfile/${item.id}`)}
                >
                  نمایش پروفایل
                </Button>
              </div>
            ))}
            <PaginationComponent
              totalPages={data?.total_pages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </>
        )}
      </div>
    </>
  );
}
