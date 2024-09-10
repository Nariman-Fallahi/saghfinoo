"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { allRealtorDataType } from "@/types/Type";
import "react-loading-skeleton/dist/skeleton.css";
import { isMobile } from "@/constant/Constants";
import { useRouter } from "next-nprogress-bar";
import PaginationComponent from "./Pagination";

type RealatorsCartsType = {
  data: { data: allRealtorDataType[]; total_pages: number } | undefined;
};

export default function RealatorsCarts({ data }: RealatorsCartsType) {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-wrap p-3 justify-between md:p-5">
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
        <PaginationComponent totalPages={data?.total_pages} />
      </div>
    </>
  );
}
