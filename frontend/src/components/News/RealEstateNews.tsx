import { Title } from "@/constant/Constants";
import Image from "next/image";
import CustomButton from "../CustomButton";
import Card from "./ReadingTimeCard";

export default function RealEstateNews() {
  return (
    <div className="flex w-full flex-col md:px-4 md:p-1">
      <div className="px-3">
        <Title title="اخبار املاک" />
      </div>

      <div
        className="flex flex-col w-full bg-[#F9F9F9] mt-4 md:flex-row-reverse
       md:rounded-lg lg:rounded-xl md:items-center md:mt-6 lg:mt-7 md:justify-between md:gap-4"
      >
        <Image
          width={1000}
          height={500}
          className="w-full md:w-1/2 md:rounded-l-lg lg:rounded-l-xl"
          src="/image/Bg-SearchBox.webp"
          alt="Image News"
        />

        <div className="w-full flex flex-col p-3 mt-1 md:1/2">
          <Card time={20} />

          <h2 className="font-bold mt-4 md:text-3xl lg:text-[40px] md:mt-6">
            رکورد بازار مسکن
          </h2>

          <h4 className="font-bold text-sm mt-2 md:text-xl lg:text-2xl md:mt-4 lg:mt-6">
            رکورد بازار مسکن
          </h4>

          <p
            className="text-xs text-[#353535] mt-4 line-clamp-2 md:text-base lg:text-lg
           md:mt-6"
          >
            از منظر فعالان بازار مسکن، وضعیت فعلی بازار پاسخی است به جهشهای
            متوالی قیمت در سال‌های گذشته و به واسطه رشد نجومی قیمت‌ها در این
            بازار، فعلا رغبتی برای خرید این کالای ضروری اما سرمایه‌ای وجود
            ندارد.
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
