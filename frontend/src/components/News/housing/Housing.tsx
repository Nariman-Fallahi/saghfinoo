import { Title } from "@/constant/Constants";
import Image from "next/image";
import ReadingTimeCard from "../ReadingTimeCard";
import NewsSlider from "./NewsSlider";

export default function Housing() {
  return (
    <div className="flex flex-col mt-6 px-3">
      <Title title="مسکن" />

      <div className="flex flex-col mt-4">
        <div className="w-full flex flex-col border rounded-lg">
          <Image
            width={1000}
            height={500}
            className="w-full h-1/2 rounded-t-lg"
            src="/image/Bg-SearchBox.webp"
            alt="Image"
          />

          <div className="p-2 mt-1 pb-2">
            <ReadingTimeCard time={20} />
            <h3 className="mt-2 text-[13px] font-bold">
              خطر ویرانی زلزله در آسمان‌خراش‌ها بیشتر است یا در آپارتمان‌های
              کم‌ارتفاع و یا خانه‌های ویلایی ؟
            </h3>
            <p className="mt-2 text-xs line-clamp-2">
              زلزله یکی از حوادث طبیعی است که نمی‌توان زمان و مکان وقوع زلزله آن
              را بصورت دقیق پیش‌بینی کرد. به همین دلیل اکثر افراد در هنگام زلزله
              نمی‌دانند که باید چه واکنشی از خود نشان دهند؛ حتی بسیاری از افراد
              تا چند دقیقه پس از وقوع زلزله هنوز نمی‌دانند که زلزله رخ داده است.
            </p>
          </div>
        </div>
        <NewsSlider />
      </div>
    </div>
  );
}
