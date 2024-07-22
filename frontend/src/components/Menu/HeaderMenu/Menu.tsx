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

export default function Menu() {
  const access = getCookie("access");
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data, status, fetchStatus } = useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: "getUserInfo",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    staleTime: 5 * 1000 * 60,
    enabled: enabled,
  });

  const navigationMenu: navigationMenuType = [
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
      link: "",
    },
    {
      title: "اخبار روز",
      icon: "/icons/receipt-2.svg",
      link: "",
    },
  ];

  useEffect(() => {
    if (access !== undefined) {
      setEnabled(true);
    }
  }, [access]);

  return (
    <>
      <MobileMenu
        NavigationMenu={navigationMenu}
        userInfoData={data}
        dataStatus={status}
        fetchStatus={fetchStatus}
      />
      <DesktopMenu
        NavigationMenu={navigationMenu}
        userInfoData={data}
        dataStatus={status}
        fetchStatus={fetchStatus}
      />
      <Register />
    </>
  );
}
