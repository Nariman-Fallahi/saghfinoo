import Title from "@/constant/Constants";
import Image from "next/image";
import { Button } from "@nextui-org/button";

export default function RealEstateADS() {
  return (
    <div className="mt-10 flex flex-col p-4">
      <Title title="آگهی های املاک توسی" />

      <Button
        variant="bordered"
        size="sm"
        className="w-1/4 border mt-5 rounded"
      >
        <div className="flex items-center">
          <Image width={16} height={16} src="/icons/filter-search.svg" alt="" />
          <span className="mr-1">فیلترها</span>
        </div>
      </Button>

      <div className="mt-2 flex flex-wrap justify-between">
        <div
          className="w-[156px] h-[196px] flex flex-col border border-[#E1E1E1]
         rounded-lg mt-2"
        >
          <Image
            width={100}
            height={100}
            className="w-full h-[110px] rounded-tl-lg rounded-tr-lg"
            src="/image/Bg-SearchBox.webp"
            alt=""
          />

          <div className="flex flex-col p-2">
            <div className="flex w-full justify-between items-center">
              <p className="text-xs text-[#909090]">ggggg</p>
              <Button size="sm" radius="full" isIconOnly variant="light">
                <Image width={17} height={17} src="/icons/save.svg" alt="" />
              </Button>
            </div>

            <p className="mt-1 text-xs">ffffffff</p>
            <p className="mt-1 text-xs font-bold">fffff</p>
            <p className="mt-1 text-xs font-bold">fff</p>
          </div>
        </div>

        {/* more */}
      </div>

      <div className="w-full flex justify-center">
        <Button
          className="bg-[#CB1B1B] text-xs font-medium w-[156px] h-[32px] mt-12
           text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
        >
          مشاهده بیشتر
        </Button>
      </div>
    </div>
  );
}
