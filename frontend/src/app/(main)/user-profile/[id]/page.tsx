"use client";
import { use } from "react";
import Image from "next/image";
import EditingInformation from "@/components/user-profile/EditingInformation";
import MyAds from "@/components/user-profile/MyAds";
import SavedAds from "@/components/user-profile/SavedAds";
import ItemMenu from "@/components/user-profile/ItemMenu";
import { notFound } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useRouter } from "@bprogress/next/app";
import { useUserInfo } from "@/hooks/queries/useUserInfo";
import { USER_PROFILE_MENU, UserProfileItem } from "@/constant/userProfile";

const COMPONENT_MAP: Record<string, React.ReactNode> = {
  [UserProfileItem.EditingInformation]: <EditingInformation />,
  [UserProfileItem.MyAds]: <MyAds />,
  [UserProfileItem.SavedAds]: <SavedAds />,
};

export default function UserProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const { id } = params;
  const router = useRouter();
  const { data: userInfoData } = useUserInfo();

  if (!Object.values(UserProfileItem).includes(id as UserProfileItem)) {
    notFound();
  }

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/");
  };

  return (
    <div className="mt-28 md:mt-36 flex px-4 md:px-8 w-full gap-4">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-2/6">
        <div className="w-full border flex items-center border-[#D9D9D9] p-4 rounded-xl mb-4">
          <Image
            width={35}
            height={35}
            src="/icons/ui/profile-circle.svg"
            alt="Profile"
          />
          <div className="flex flex-col mr-3">
            <span className="text-sm lg:text-lg font-medium">
              {userInfoData?.data
                ? `${userInfoData.data.firstName} ${userInfoData.data.lastName}`
                : "کاربر سقفینو"}
            </span>
          </div>
        </div>

        <div className="border border-[#D9D9D9] rounded-xl p-4 flex flex-col">
          {USER_PROFILE_MENU.map((item) => (
            <ItemMenu
              key={item.id}
              title={item.title}
              icon={item.icon}
              alt={item.title}
              active={id === item.id}
              routerPush={item.id}
            />
          ))}

          <ItemMenu
            title="خروج"
            icon="/icons/ui/logout.svg"
            alt="Logout"
            onClick={handleLogout}
            className="text-red-600"
          />
        </div>
      </div>

      <div className="w-full flex flex-col border rounded-lg p-5">
        {COMPONENT_MAP[id]}
      </div>
    </div>
  );
}
