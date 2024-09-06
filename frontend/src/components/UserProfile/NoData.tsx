import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
// import { useSizeBtn } from "@/store/Size";

type NoData = {
  icon: string;
  title: string;
  description: string;
  titleBtn: string;
  linkBtn: string;
};

export default function NoData({
  icon,
  title,
  description,
  titleBtn,
  linkBtn,
}: NoData) {
  const router = useRouter();
  // const { sizeBtn } = useSizeBtn();

  return (
    <div className="flex flex-col mt-6 w-full justify-center items-center md:mt-7">
      <Image
        width={170}
        height={170}
        src={icon}
        className="lg:w-[210px] lg:h-[210px]"
        sizes="(min-width: 1024px) 210px, 210px"
        alt=""
      />

      <h4 className="text-lg font-bold mt-5 md:text-xl lg:text-2xl md:mt-6">
        {title}
      </h4>

      <p className="text-sm text-[#717171] md:text-base lg:text-xl mt-2 md:mt-3 text-center">
        {description}
      </p>

      <Button
        radius="sm"
        className="bg-primary text-white mt-4 md:mt-5 w-[20%]"
        onPress={() => router.push(linkBtn)}
      >
        {titleBtn}
      </Button>
    </div>
  );
}
