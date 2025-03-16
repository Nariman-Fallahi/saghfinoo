"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { navigationMenuType } from "@/types/Type";
import { useModalStore } from "@/store/Register";
import Link from "next/link";
import { userInfoDataType } from "@/types/Type";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";

type desktopMenuType = {
  NavigationMenu: navigationMenuType;
  userInfoData: userInfoDataType | undefined;
  dataStatus: "error" | "success" | "pending";
  iconMenu: JSX.Element;
  AdPostingBtn: JSX.Element;
  isLogin: boolean;
};

export default function DesktopMenu({
  NavigationMenu,
  userInfoData,
  dataStatus,
  iconMenu,
  AdPostingBtn,
  isLogin,
}: desktopMenuType) {
  const { setOpen } = useModalStore();
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();


  const fullURL = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

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

            console.log(isSearchResultsPage);
            

            if (isSearchResultsPage) {
              isActive = decodeURIComponent(fullURL) === item.link;
            } else {
              isActive = pathname === item.link;
            }
            
            return (
              <Link
                href={item.link}
                key={index}
                className={`mr-4 lg:mr-6 cursor-pointer hover:text-red-600 flex flex-col relative ${
                  isActive
                    ? "after:bg-red-500 after:h-[3px] after:w-full after:content-[''] after:absolute after:mt-8 after:rounded text-red-500"
                    : null
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
        <ul className="flex items-center">
          {dataStatus === "pending" && (
            <div className="ml-10 lg:ml-24">
              <Spinner size="sm" color="danger" />
            </div>
          )}

          {dataStatus !== "pending" && !isLogin && (
            <Button
              onPress={() => setOpen(true)}
              variant="light"
              className="ml-2 lg:ml-9 text-sm rounded-[0.35rem]"
            >
              ورود
            </Button>
          )}

          {isLogin && (
            <Button
              variant="light"
              className="text-[13px] rounded-[0.35rem] ml-2 lg:ml-8"
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
          )}

          {AdPostingBtn}
        </ul>
      </nav>
    </div>
  );
}
