import Image from "next/image";

export default function Ad() {
  return (
    <div
      className="w-full mt-9 flex flex-col p-2 bg-[#F9F9F9] rounded-xl pb-3
      md:flex-row-reverse justify-between gap-2 items-center md:px-4"
    >
      <Image
        width={165}
        height={165}
        className="md:w-48 md:h-48 lg:w-56 lg:h-56"
        src="/icons/Illustration.svg"
        alt="Ad Icon"
      />

      <div className="flex flex-col md:w-[80%]">
        <p className="font-bold mt-5 text-sm md:text-2xl lg:text-[32px]">
          در سقفینو همیشه خانه‌ای منتظر شماست
        </p>

        <p className="text-xs mt-2 md:text-xl lg:text-2xl md:mt-5">
          چه به‌دنبال پیدا کردن یک خانه دلنشین هستید و یا مدیر آژانس املاک و یا
          یک مشاور مستقل هستید، ما همیشه کنار شما هستیم.
        </p>
      </div>
    </div>
  );
}
