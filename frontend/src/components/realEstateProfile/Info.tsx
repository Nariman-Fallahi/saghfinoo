import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function Info() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-44 mt-[60px]">
        <Image
          width={100}
          height={100}
          className="w-full h-full"
          src="/image/Bg-SearchBox.webp"
          alt=""
        />
      </div>

      <div
        className="w-[96px] h-[96px] rounded-full -mt-12 relative mr-4
       bg-[#F9F9F9] flex justify-center items-center"
      ></div>

      <div className="w-full p-4 flex flex-col">
        <div className="w-full flex justify-between mt-4 items-center">
          <p className="font-bold text-sm">املاک توسی</p>
          <Button isIconOnly size="sm" variant="light" radius="full">
            <Image width={18} height={18} src="/icons/more.svg" alt="" />
          </Button>
        </div>

        <p className="text-xs mt-2 text-[#505050]">میزان رضایت مندی کاربران</p>

        <p className="font-bold text-xs mt-2">
          تخضض ما یافتن خانه دلخواه شما است
        </p>

        <div className="flex items-center mt-3">
          <Image width={16} height={16} src="/icons/location.svg" alt="" />
          <span className="text-xs font-bold text-[#505050] mr-1">
            تهران نیاوران
          </span>
        </div>

        <Button
          className="border mt-4 w-3/12"
          variant="bordered"
          color="danger"
          radius="sm"
          size="sm"
        >
          تماس با ما
        </Button>
      </div>
    </div>
  );
}
