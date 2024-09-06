import Image from "next/image";

export default function ErrNoData() {
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <Image
        width={200}
        height={200}
        className="md:!w-[300px] md:!h-[300px] lg:!w-[450px] lg:!h-[400px]"
        sizes="(min-width: 768px) 300px, 300px, (min-width: 1024px) 450px, 400px"
        src="/icons/err404.svg"
        alt="Error 404"
      />
      <span className="text-sm mt-6 md:mt-0 md:text-lg lg:text-xl">
        متاسفانه در دریافت اطلاعات مشکلی پیش آمد ):
      </span>
    </div>
  );
}
