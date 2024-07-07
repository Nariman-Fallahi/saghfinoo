import Title from "@/constant/Constants";
import Image from "next/image";

export default function Consultants() {
  return (
    <div className="mt-10 flex flex-col w-fill p-4">
      <Title title="مشاورین توسی" />

      <div className="mt-5 flex justify-between flex-wrap">
        <div className="w-[24%] flex flex-col justify-center">
          <Image
            width={70}
            height={70}
            className="rounded-full"
            src="/image/Bg-SearchBox.webp"
            alt=""
          />
          <span className="mt-3 font-medium text-xs">نریمان فلاحی</span>
        </div>
      </div>
    </div>
  );
}
