"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { allRealtorDataType } from "@/types/Type";
import "react-loading-skeleton/dist/skeleton.css";
import { isMobile } from "@/constant/Constants";
import { useRouter } from "@bprogress/next/app";

type RealatorsCartsType = {
  data: allRealtorDataType[] | undefined;
};

export default function RealatorsCarts({ data }: RealatorsCartsType) {
  const router = useRouter();

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 p-3 gap-6 md:gap-8 md:p-5">
        {data?.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              isMobile ? router.push(`/realatorProfile/${item.id}`) : null
            }
            className="shadow rounded-2xl flex flex-col p-2 items-center text-xs
            border border-[#E1E1E1] mt-6"
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
      </div>
    </>
  );
}
