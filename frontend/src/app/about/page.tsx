import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "درباره سقفینو",
  description:
    "سقفینو پلتفرمی تخصصی در زمینه اجاره، خرید و فروش املاک است که اطلاعات دقیق و به‌روز مناطق مختلف را ارائه می‌دهد تا با خیالی راحت معاملات ملکی خود را انجام دهید.",
};

export default function About() {
  return (
    <div className="w-full p-4">
      <div className="mt-24 border rounded-xl p-4 border-[#D9D9D9] flex flex-col md:mt-32">
        <p className="font-bold text-xs md:text-base lg:text-2xl">
          داستان سقفینو
        </p>
        <p
          className="mt-6 font-bold text-[#871212] md:mt-7 md:text-2xl lg:text-3xl
         w-full text-center"
        >
          ما باور داریم هر شخصی، سقفی دارد
        </p>
        A
        <p
          className="mt-2 font-medium text-[#717171] md:mt-3 md:text-xl lg:text-2xl
        w-full text-center"
        >
          تا پیدا کردن سقف دلخواه کنار شماییم
        </p>
        <div
          className="mt-7 flex flex-col items-center md:flex-row md:justify-between
         md:mt-8 md:items-start"
        >
          <Image
            width={500}
            height={200}
            className="w-full md:hidden rounded-md"
            src="/image/About-image.png"
            alt="Image"
          />

          <p className="text-xs mt-3 md:text-sm lg:text-base md:pl-5 text-justify">
            توسعه اینترنت، روش های معاملات و خرید ما را به کلی دگرگون کرده است و
            صرف زمان‌های طولانی برای انجام سفرهای درون شهری و رسیدگی به امورات
            روزانه معنای خود را از دست داده است. در این بین برخی هنوز به‌واسطه
            مجازی بودن فضا اعتماد کافی برای اقدام به معاملات از طریق این روش‌ها
            را ندارند. وب‌سایت سقفینو به صورت تخصصی در زمینه اجاره، خرید و فروش
            ملک در کشور فعالیت دارد. این وب‌سایت همواره تلاش می‌کند اطلاعات دقیق
            و به‌روز از مناطق مختلف را راستی‌آزمایی کرده و سپس در اختیار شما
            قرار دهد تا با خیالی راحت خرید اقدام به انجام معاملات کنید. وب‌سایت
            سقفینو همچنین با داشتن مجموعه بزرگی از املاک تایید‌شده و مشاورین
            املاکی که توسط املاک احراز هویت شده‌اند توانسته مجموعه کاملی از
            اطلاعات جامع در زمینه املاک، مشاورین و ملک را در اکثر نقاط کشور
            داشته باشد. در سقفینو همیشه خانه‌ای منتظر شماست؛ چه به‌دنبال پیدا
            کردن یک خانه دلنشین هستید، یا مدیر آژانس املاک و یا یک مشاور مستقل
            هستید، ما همیشه کنار شماییم.
          </p>

          <Image
            width={500}
            height={200}
            src="/image/desktop-image-about.png"
            alt="Image"
            className="w-1/4 hidden md:block rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
