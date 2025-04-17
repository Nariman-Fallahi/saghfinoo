"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types/Type";
import { getCookie } from "cookies-next";
import Register from "@/components/Register/Register";
import { Api, dataKey, usePostRequest } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { userInfoDataType } from "@/types/Type";
import Image from "next/image";
import { useRouter } from "@bprogress/next/app";
import { isMobile, LoginErrorText } from "@/constant/Constants";
import { ErrorNotification } from "@/notification/Error";
import CustomButton from "@/components/CustomButton";
import { Suspense, useEffect } from "react";

export default function Menu() {
  const access = getCookie("access");
  const router = useRouter();

  const {
    data: userInfoData,
    status,
    refetch,
  } = useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: [dataKey.GET_USER_INFO],
    headers: {
      Authorization: `Bearer ${access}`,
    },
    staleTime: 5 * 1000 * 60,
    enabled: true,
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, refetch]);

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
            ErrorNotification(LoginErrorText);
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
        AdPostingBtn={AdPostingBtn()}
        isLogin={isLogin}
      />
      <Suspense fallback={null}>
        <DesktopMenu
          NavigationMenu={navigationMenu}
          userInfoData={userInfoData}
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
