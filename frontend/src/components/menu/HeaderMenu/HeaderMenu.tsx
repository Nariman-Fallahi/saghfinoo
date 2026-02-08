"use client";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { navigationMenuType } from "@/types";
import { hasCookie } from "cookies-next";
import AuthModal from "@/components/auth/AuthModal";
import { Api } from "@/services/apiService";
import Image from "next/image";
import { useRouter } from "@bprogress/next/app";
import { isMobile } from "@/utils/isMobile";
import { ErrorNotification } from "@/notification/Error";
import CustomButton from "@/components/ui/CustomButton";
import { Suspense, useEffect } from "react";
import { useUserInfo } from "@/hooks/queries/useUserInfo";
import { LOGIN_ERROR_TEXT } from "@/constant/messages";
import { usePostRequest } from "@/hooks/useRequest";

interface CreatePostingButtonProps {
  isLogin: boolean;
  realEstateStatus: number | undefined;
}

const CreatePostingButton = ({
  isLogin,
  realEstateStatus,
}: CreatePostingButtonProps) => {
  const router = useRouter();
  return (
    <CustomButton
      onPress={() => {
        if (!isLogin) {
          ErrorNotification(LOGIN_ERROR_TEXT);
        } else if (realEstateStatus == 403) {
          ErrorNotification("فقط مشاور املاک میتواند آگهی ثبت کند.");
        } else {
          router.push("/create-ad");
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

const IconMenu = () => {
  const router = useRouter();
  const isAuthenticated = hasCookie("accessToken");

  return (
    <Image
      width={72}
      height={32}
      className="md:w-19.25 md:h-9.25 lg:w-32.75 lg:h-15.75 cursor-pointer"
      src="/icons/common/logo.svg"
      alt="Go to homepage"
      onClick={() => {
        router.push(isAuthenticated ? "/home/pro-user" : "/home/new-user");
      }}
    />
  );
};

const baseMenu: navigationMenuType = [
  {
    title: "اجاره",
    icon: "/icons/ui/house.svg",
    link: "/search-results?type_of_transaction_name=اجاره",
  },
  {
    title: "خرید",
    icon: "/icons/ui/key.svg",
    link: "/search-results?type_of_transaction_name=خرید",
  },
  {
    title: "املاک و مستغلات",
    icon: "/icons/ui/house-2.svg",
    link: "/real-estates",
  },
  {
    title: "مشاورین املاک",
    icon: "/icons/ui/people.svg",
    link: "/realators",
  },
  {
    title: "اخبار روز",
    icon: "/icons/ui/receipt-2.svg",
    link: "/news",
  },
];

export default function HeaderMenu() {
  const router = useRouter();
  const isAuthenticated = hasCookie("accessToken");

  const { data: userInfoData, status } = useUserInfo();

  const { data: realEstateData } = usePostRequest({
    url: `${Api.Ad}/`,
    key: "check-real-estate-status",
  });

  const isLogin: boolean =
    isAuthenticated && !!userInfoData?.data && status === "success";

  const mobileExtra = isLogin
    ? [
        {
          title: "ایجاد آگهی",
          icon: "/icons/ui/add-circle.svg",
          link: "/create-ad",
        },
        {
          title: "آگهی های من",
          icon: "/icons/ui/receipt-text.svg",
          link: "/user-profile/my-ads",
        },
        {
          title: "آگهی های ذخیره شده",
          icon: "/icons/ui/save.svg",
          link: "/user-profile/saved-ads",
        },
      ]
    : [];

  return (
    <>
      <MobileMenu
        NavigationMenu={[...mobileExtra, ...baseMenu]}
        userInfoData={userInfoData}
        iconMenu={<IconMenu />}
        createPostingButton={
          <CreatePostingButton
            isLogin={isLogin}
            realEstateStatus={realEstateData?.status || undefined}
          />
        }
        isLogin={isLogin}
      />
      <Suspense fallback={null}>
        <DesktopMenu
          NavigationMenu={baseMenu}
          userInfoData={userInfoData}
          dataStatus={status}
          iconMenu={<IconMenu />}
          createPostingButton={
            <CreatePostingButton
              isLogin={isLogin}
              realEstateStatus={realEstateData?.status || undefined}
            />
          }
          isLogin={isLogin}
        />
      </Suspense>
      <AuthModal />
    </>
  );
}
