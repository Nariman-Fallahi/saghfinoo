"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { navigationMenuType } from "@/types";
import { useModalStore } from "@/store/Auth";
import Link from "next/link";
import { userInfoDataType } from "@/types";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "@bprogress/next/app";
import { usePathname, useSearchParams } from "next/navigation";

type desktopMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType | undefined;
  dataStatus: "error" | "success" | "pending";
  iconMenu: JSX.Element;
  adPostingBtn: JSX.Element;
  isLogin: boolean;
};

export default function DesktopMenu({
  NavigationMenu,
  userInfoData,
  dataStatus,
  iconMenu,
  adPostingBtn: AdPostingBtn,
  isLogin,
}: desktopMenuType) {
  const { setOpen } = useModalStore();
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="w-full justify-center hidden md:flex">
      <nav
        className="w-[93%] lg:w-[88%] bg-white fixed p-3 flex justify-between items-center
         shadow rounded-2xl mt-6 z-50"
      >
        <ul className="flex items-center text-sm lg:text-xl">
          {iconMenu}
          {NavigationMenu.map((item, index) => {
            const isSearchResultsPage = pathname.startsWith("/searchResults");
            let isActive: boolean;

            if (isSearchResultsPage) {
              const propertyType = searchParams.get("type_of_transaction_name");
              isActive = propertyType === item.title;
            } else {
              isActive = pathname === item.link;
            }

            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`mr-4 lg:mr-6 cursor-pointer hover:text-red-600 flex flex-col relative ${
                    isActive
                      ? "after:bg-red-500 after:h-[3px] after:w-full after:content-[''] after:absolute after:mt-8 after:rounded text-red-500"
                      : null
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center">
          {dataStatus === "pending" && (
            <li className="ml-10 lg:ml-24">
              <Spinner size="sm" color="danger" />
            </li>
          )}

          {dataStatus !== "pending" && !isLogin && (
            <li>
              <Button
                onPress={() => setOpen(true)}
                variant="light"
                className="ml-2 lg:ml-9 text-sm rounded-[0.35rem]"
              >
                ورود
              </Button>
            </li>
          )}

          {isLogin && (
            <li>
              <Button
                variant="light"
                className="text-[13px] rounded-[0.35rem] ml-2 lg:ml-8 lg:mt-1"
                onPress={() => router.push("/userProfile/EditingInformation")}
              >
                <Image
                  width={28}
                  height={28}
                  className="rounded-full h-7 lg:w-9 lg:h-9"
                  src={
                    userInfoData?.data.imageFullPath ||
                    "/icons/profile-circle.svg"
                  }
                  alt="User Profile"
                />
                <p className="ml-2 cursor-pointer lg:text-sm">{`${userInfoData?.data.firstName} ${userInfoData?.data.lastName}`}</p>
              </Button>
            </li>
          )}

          <li>{AdPostingBtn}</li>
        </ul>
      </nav>
    </div>
  );
}
