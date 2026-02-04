"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { allrealEstateOfficesDataType } from "@/types";
import { useRouter } from "@bprogress/next/app";
import { isMobile } from "@/utils/isMobile";

type RealEstatesCardsType = {
  data: allrealEstateOfficesDataType[];
};

export default function RealEstatesCards({ data }: RealEstatesCardsType) {
  const router = useRouter();

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 p-3 gap-6 md:gap-8 md:p-5">
        {data.map((item, index) => (
          <div
            onClick={() =>
              isMobile
                ? router.push(`/realEstateProfile/${item.username}`)
                : null
            }
            className="shadow rounded-2xl flex flex-col p-2 items-center
                 text-xs border border-[#E1E1E1] mt-6"
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
              onPress={() => router.push(`/realEstateProfile/${item.username}`)}
            >
              مشاهده صفحه شخصی
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
