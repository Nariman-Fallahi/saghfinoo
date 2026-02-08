import Image from "next/image";
import Link from "next/link";

export default function Successful() {
  return (
    <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
      <div className="relative mb-6">
        <Image
          width={250}
          height={250}
          className="w-50 h-50 md:w-87.5 md:h-87.5 drop-shadow-xl"
          src="/icons/common/submission-success.svg"
          alt="Successful registration"
        />
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2E7D32]">
        آگهی شما با موفقیت ثبت شد!
      </h2>

      <p className="mt-4 text-sm md:text-base text-[#717171] max-w-md">
        اطلاعات شما پس از تایید نهایی توسط کارشناسان سقفینو، در سایت منتشر خواهد
        شد. از صبر و اعتماد شما سپاسگزاریم.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="px-8 py-3 bg-[#871212] text-white rounded-xl font-medium hover:bg-[#a01616] transition-all shadow-lg hover:shadow-none text-center"
        >
          بازگشت به صفحه اصلی
        </Link>

        <Link
          href="/user-profile/my-ads"
          className="px-8 py-3 border border-[#871212] text-[#871212] rounded-xl font-medium hover:bg-[#fff5f5] transition-all text-center"
        >
          مشاهده آگهی‌های من
        </Link>
      </div>
    </div>
  );
}
