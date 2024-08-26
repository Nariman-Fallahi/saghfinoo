"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Type";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import Register from "@/components/Register/Register";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { useState } from "react";
import { userInfoDataType } from "@/types/Type";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useRouter } from "next-nprogress-bar";
import { isMobile } from "@/constant/Constants";
import { useSizeBtn } from "@/store/Size";
import { ErrorNotification } from "@/notification/Error";

export default function Menu() {
  const access = getCookie("access");
  const router = useRouter();
  const currentPath = usePathname();
  const { sizeBtn } = useSizeBtn();
  const { data, status, fetchStatus } = useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: ["getUserInfo"],
    headers: {
      Authorization: `Bearer ${access}`,
    },
    staleTime: 5 * 1000 * 60,
    enabled: true,
  });

  const isLogin: boolean = !!access && !!data?.data && status === "success";

  const baseMenu: navigationMenuType = [
    {
      title: "اجاره",
      icon: "/icons/house.svg",
      link: "",
    },
    {
      title: "خرید",
      icon: "/icons/key.svg",
      link: "",
    },
    {
      title: "املاک و مستغلات",
      icon: "/icons/house-2.svg",
      link: "/realEstates",
    },
    {
      title: "مشاورین املاک",
      icon: "/icons/people.svg",
      link: "/realators",
    },
    {
      title: "اخبار روز",
      icon: "/icons/receipt-2.svg",
      link: "",
    },
  ];

  const loggedIn =
    isMobile && isLogin
      ? [
          {
            title: "ایجاد آگهی",
            icon: "/icons/add-circle.svg",
            link: "/adPosting",
          },
          {
            title: "آگهی های من",
            icon: "/icons/receipt-text.svg",
            link: "",
          },
          {
            title: "آگهی های ذخیره شده",
            icon: "/icons/save.svg",
            link: "",
          },
        ]
      : [];

  const navigationMenu = [...loggedIn, ...baseMenu];

  const iconMenu = () => {
    return (
      <Link href={access ? "/proUser" : "newUser"}>
        <Image
          width={72}
          height={32}
          className="md:w-[77px] md:h-[37px] lg:w-[131px] lg:h-[63px]"
          src="/icons/Logo.svg"
          alt=""
        />
      </Link>
    );
  };

  const AdPostingBtn = () => {
    return (
      <Button
        onPress={() =>
          isLogin
            ? router.push("/adPosting")
            : ErrorNotification("ابتدا وارد حساب کاربری خود شوید.")
        }
        size={sizeBtn}
        variant="light"
        className="p-1 px-2 border border-red-600 text-[12px] font-medium
       rounded-[8px] text-red-600 md:text-[12.7px] md:p-0 lg:text-sm md:rounded-[0.35rem]"
      >
        ثبت آگهی
      </Button>
    );
  };

  return (
    <>
      <MobileMenu
        NavigationMenu={navigationMenu}
        userInfoData={data}
        iconMenu={iconMenu()}
        AdPostingBtn={AdPostingBtn()}
        isLogin={isLogin}
      />
      <DesktopMenu
        NavigationMenu={navigationMenu}
        userInfoData={data}
        dataStatus={status}
        iconMenu={iconMenu()}
        currentPath={currentPath}
        AdPostingBtn={AdPostingBtn()}
        isLogin={isLogin}
      />
      <Register />
    </>
  );
}
