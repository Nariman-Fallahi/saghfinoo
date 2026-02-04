import { Title } from "@/components/ui/Title";
import Image from "next/image";
import CustomButton from "../CustomButton";
import Card from "./ReadingTimeCard";
import { NewsDataType } from "@/types";

export default function RealEstateNews({ data }: { data: NewsDataType }) {
  return (
    <div className="flex w-full flex-col">
      <Title title="اخبار املاک" />

      <div
        className="flex flex-col w-full bg-[#F9F9F9] mt-4 md:flex-row-reverse h-[400px]
       md:rounded-lg lg:rounded-xl md:items-center md:mt-6 lg:mt-7 md:justify-between md:gap-4"
      >
        <Image
          width={1000}
          height={500}
          className="w-full h-1/2 md:h-full md:w-1/2 md:rounded-l-lg lg:rounded-l-xl"
          src={data.imageFullPath}
          alt="Image News"
        />

        <div className="w-full flex flex-col p-3 mt-1 md:1/2">
          <Card time={20} />

          <h3 className="font-bold mt-4 md:text-3xl lg:text-[40px] md:mt-6">
            {data.title}
          </h3>

          <p
            className="text-xs text-[#353535] mt-4 line-clamp-2 md:text-base lg:text-lg
           md:mt-6"
          >
            {data.shortDescription}
          </p>

          <div className="w-full flex justify-between mt-6">
            <div
              className="px-2 flex items-center text-xs bg-[#EDEDED] rounded-lg w-fit
               md:text-[13px] cursor-default"
            >
              <i>
                <Image
                  width={16}
                  height={16}
                  src="/icons/calendar.svg"
                  alt="Calendar Icon"
                  className="md:w-6 md:h-6"
                />
              </i>
              <span className="mr-2">30 اذر 1403</span>
            </div>

            <CustomButton className="bg-primary text-white" radius="sm">
              ادامه مطلب
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
