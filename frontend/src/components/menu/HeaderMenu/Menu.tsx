"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/Types";
import { getCookie } from "cookies-next";
import AuthModal from "@/components/auth/AuthModal";
import { Api, usePostRequest } from "@/services/ApiService";
import Image from "next/image";
import { useRouter } from "@bprogress/next/app";
import { isMobile } from "@/utils/isMobile";
import { ErrorNotification } from "@/notification/Error";
import CustomButton from "@/components/CustomButton";
import { Suspense, useEffect } from "react";
import { useUserInfo } from "@/hooks/queries/useUserInfo";
import { LOGIN_ERROR_TEXT } from "@/constant/textConstants";

export default function Menu() {
  const router = useRouter();
  const access = getCookie("access");

  const { data: userInfoData, status, refetch } = useUserInfo();

  const { data: isRECData, mutate: isRECMutate } = usePostRequest({
    url: `${Api.Ad}/`,
    key: "isRealEstateConsultant",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  useEffect(() => {
    isRECMutate({});

    if (access) {
      refetch();
    }
  }, [access, isRECMutate, refetch]);

  const isLogin: boolean =
    !!access && !!userInfoData?.data && status === "success";

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
            link: "/userProfile/MyAds",
          },
          {
            title: "آگهی های ذخیره شده",
            icon: "/icons/save.svg",
            link: "/userProfile/SavedAds",
          },
        ]
      : [];

  const navigationMenu = [...loggedIn, ...baseMenu];

  const iconMenu = () => {
    return (
      <Image
        width={72}
        height={32}
        className="md:w-[77px] md:h-[37px] lg:w-[131px] lg:h-[63px] cursor-pointer"
        src="/icons/Logo.svg"
        alt="Go to homepage"
        onClick={() => {
          router.push(access ? "/proUser" : "/newUser");
        }}
      />
    );
  };

  const AdPostingBtn = () => {
    return (
      <CustomButton
        onPress={() => {
          if (!isLogin) {
            ErrorNotification(LOGIN_ERROR_TEXT);
          } else if (isRECData.status == 403) {
            ErrorNotification("فقط مشاور املاک میتواند آگهی ثبت کند.");
          } else {
            router.push("/adPosting");
          }
        }}
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
        userInfoData={userInfoData}
        iconMenu={iconMenu()}
        adPostingBtn={AdPostingBtn()}
        isLogin={isLogin}
      />
      <Suspense fallback={null}>
        <DesktopMenu
          NavigationMenu={navigationMenu}
          userInfoData={userInfoData}
          dataStatus={status}
          iconMenu={iconMenu()}
          adPostingBtn={AdPostingBtn()}
          isLogin={isLogin}
        />
      </Suspense>
      <AuthModal />
    </>
  );
}
