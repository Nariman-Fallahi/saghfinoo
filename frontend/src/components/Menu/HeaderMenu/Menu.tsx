"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Type";
import { getCookie } from "cookies-next";
import Register from "@/components/Register/Register";
import { Api, dataKey } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { userInfoDataType } from "@/types/Type";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { isMobile, LoginErrorText } from "@/constant/Constants";
import { ErrorNotification } from "@/notification/Error";
import CustomButton from "@/components/CustomButton";
import { Suspense, useEffect } from "react";

export default function Menu() {
  const access = getCookie("access");
  const router = useRouter();

  const { data, status, refetch } = useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: [dataKey.GET_USER_INFO],
    headers: {
      Authorization: `Bearer ${access}`,
    },
    staleTime: 5 * 1000 * 60,
    enabled: true,
  });

  useEffect(() => {
    if (access) {
      refetch();
    }
  }, [access, refetch]);

  const isLogin: boolean = !!access && !!data?.data && status === "success";

  const baseMenu: navigationMenuType = [
    {
      title: "اجاره",
      icon: "/icons/house.svg",
      link: "/searchResults?type_of_transaction_name=اجاره",
    },
    {
      title: "خرید",
      icon: "/icons/key.svg",
      link: "/searchResults?type_of_transaction_name=خرید",
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
    // {
    //   title: "اخبار روز",
    //   icon: "/icons/receipt-2.svg",
    //   link: "/news",
    // },
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
      <CustomButton
        onPress={() =>
          isLogin
            ? router.push("/adPosting")
            : ErrorNotification(LoginErrorText)
        }
        variant="light"
        radius="sm"
        className="border border-primary text-primary"
      >
        ثبت آگهی
      </CustomButton>
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
      <Suspense fallback={<div></div>}>
        <DesktopMenu
          NavigationMenu={navigationMenu}
          userInfoData={data}
          dataStatus={status}
          iconMenu={iconMenu()}
          AdPostingBtn={AdPostingBtn()}
          isLogin={isLogin}
        />
      </Suspense>
      <Register />
    </>
  );
}
