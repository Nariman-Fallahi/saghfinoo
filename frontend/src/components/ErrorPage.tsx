"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next-nprogress-bar";

type ErrorPage = {
  icon: string;
  title: string;
  description: string;
};

export default function ErrorPage({ icon, description, title }: ErrorPage) {
  const router = useRouter();
  return (
    <div className="w-full p-5">
      <div className="mt-20 md:mt-28 border rounded-lg items-center justify-center py-8 flex flex-col">
        <Image
          width={250}
          height={250}
          className="md:w-[350px] md:h-[350px]"
          sizes="(min-width: 768px) 350px, 350px"
          src={icon}
          alt="ERROR"
        />
        <h2 className="font-bold text-xl mt-8 md:text-2xl">{title}</h2>
        <p className="mt-3 text-sm text-center md:text-xl">{description}</p>

        <Button
          className="bg-[#CB1B1B] text-white mt-5 md:px-8"
          radius="sm"
          onPress={() => router.push("/")}
        >
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
