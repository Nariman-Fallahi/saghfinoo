import Image from "next/image";
import { Button } from "@nextui-org/button";

export default function RealatorsCarts() {
  return (
    <>
      <div className="mt-6 w-full flex flex-wrap p-3 justify-between md:p-5">
        <div
          className="w-[45%] shadow rounded-2xl flex flex-col p-2 items-center text-xs
           md:w-[30%] border border-[#E1E1E1]"
        >
          <Image
            width={80}
            height={80}
            className="rounded-full"
            src="/image/Bg-SearchBox.webp"
            alt=""
          />
          <p className="font-bold mt-3 md:text-xl">g1gg</p>
          <p className="mt-2 text-[#717171] md:text-lg">ggg</p>
          <p className="mt-2 text-[#717171] md:text-lg">ggg</p>
          <Button
            className="mt-2 md:text-sm rounded-lg border p-4 hidden md:flex"
            size="sm"
            variant="bordered"
            color="danger"
          >
            نمایش پروفایل
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Button
          className="bg-[#CB1B1B] text-xs font-medium w-[156px] h-[32px] mt-12
           text-white lg:text-sm lg:mt-24 lg:w-[328px] rounded-lg lg:h-[40px]"
        >
          مشاهده بیشتر
        </Button>
      </div>
    </>
  );
}
