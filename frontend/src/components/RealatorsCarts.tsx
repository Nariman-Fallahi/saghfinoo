import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { allRealtorDataType } from "@/types/Type";
import ViewMoreBtn from "./realEstates-realators/ViewMoreBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isMobile } from "@/constant/Constants";
import { useRouter } from "next-nprogress-bar";
import { SetStateAction } from "react";

type RealatorsCartsType = {
  data: { data: allRealtorDataType[] } | undefined;
  setPageNumber: (value: SetStateAction<number>) => void;
  status: "error" | "success" | "pending";
};

export default function RealatorsCarts({
  data,
  setPageNumber,
  status,
}: RealatorsCartsType) {
  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const [completeData, setCompleteData] = useState<allRealtorDataType[]>();
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

  const hasMore = data?.data.length === 21;

  return (
    <>
      <div className="w-full flex flex-wrap p-3 justify-between md:p-5">
        {status === "pending"
          ? Array.from({ length: 9 }).map((_, index) => (
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
            ))
          : completeData?.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  isMobile
                    ? router.push(
                        `/realatorProfile/${item.id}`
                      )
                    : null
                }
                className="w-[45%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
                md:w-[30%] border border-[#E1E1E1] mt-6"
              >
                <Image
                  width={80}
                  height={80}
                  className="rounded-full"
                  src={item.user__image_full_path}
                  alt=""
                />
                <p className="font-bold mt-3 md:text-xl">
                  {item.user__first_name} {item.user__last_name}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  املاک {item.real_estate_office__name}
                </p>
                <p className="mt-2 text-[#717171] md:text-lg">
                  امتیاز {item.score} از 5
                </p>
                <Button
                  className="mt-2 md:text-sm rounded-lg border p-4 hidden md:flex"
                  size="sm"
                  variant="bordered"
                  color="danger"
                  onPress={() =>
                    router.push(
                      `/realatorProfile/${item.id}`
                    )
                  }
                >
                  نمایش پروفایل
                </Button>
              </div>
            ))}
      </div>
      {buttonActive && status !== "pending" && (
        <ViewMoreBtn
          hasMore={hasMore}
          setButtonActive={setButtonActive}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
}
