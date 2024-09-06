"use client";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";

type ItemMenuType = {
  title: string;
  icon: string;
  alt: string;
  active: string;
  userName: string;
  routerPush: string;
};

export default function ItemMenu({
  active,
  alt,
  icon,
  title,
  userName,
  routerPush,
}: ItemMenuType) {
  const router = useRouter();

  useEffect(() => {
    if (userName === "Logout") {
      deleteCookie("access");
      deleteCookie("refresh");
      router.push("/");
    }
  }, [router, userName]);

  return (
    <div
      onClick={() => router.push(routerPush)}
      className={`flex mt-2 p-2 cursor-pointer text-[#717171] ${
        userName === active
          ? "before:w-1 before:h-5 before:rounded-xl before:ml-2 before:bg-primary text-black"
          : null
      }`}
    >
      <i>
        <Image width={20} height={20} src={icon} alt={alt} />
      </i>
      <span className="text-xs lg:text-sm mr-3 w-full">{title}</span>
    </div>
  );
}
