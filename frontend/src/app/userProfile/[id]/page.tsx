"use client";
import Image from "next/image";
import EditingInformation from "@/components/UserProfile/EditingInformation";
import MyAds from "@/components/UserProfile/MyAds";
import SavedAds from "@/components/UserProfile/SavedAds";
import ItemMenu from "@/components/UserProfile/ItemMenu";
import { notFound } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useRouter } from "@bprogress/next/app";
import { useUserInfo } from "@/hooks/queries/useUserInfo";

enum UserProfileItem {
  EditingInformation = "editingInformation",
  MyAds = "myAds",
  SavedAds = "savedAds",
}

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  if (
    ![
      UserProfileItem.EditingInformation,
      UserProfileItem.MyAds,
      UserProfileItem.SavedAds,
    ].includes(id as UserProfileItem)
  ) {
    notFound();
  }

  const { data: userInfoData } = useUserInfo();

  return (
    <div className="mt-28 md:mt-36 flex px-4 md:px-8 w-full">
      <div className="hidden md:flex flex-col w-2/6">
        <div className="w-full border flex items-center border-[#D9D9D9] p-4 rounded-xl">
          <Image
            width={35}
            height={35}
            src="/icons/profile-circle.svg"
            alt=""
          />

          <div className="flex flex-col mr-3">
            <span className="text-sm lg:text-lg">
              {userInfoData?.data.firstName} {userInfoData?.data.lastName}
            </span>
          </div>
        </div>

        <div className="mt-4 border border-[#D9D9D9] rounded-xl p-4 flex flex-col">
          <ItemMenu
            title="ویرایش اطلاعات"
            icon="/icons/edit.svg"
            alt="Edit Icon"
            active={UserProfileItem.EditingInformation}
            userName={id}
            routerPush={UserProfileItem.EditingInformation}
          />

          <ItemMenu
            title="آگهی های من"
            icon="/icons/receipt-text.svg"
            alt="My Ads"
            active={UserProfileItem.MyAds}
            userName={id}
            routerPush={UserProfileItem.MyAds}
          />

          <ItemMenu
            title="آگهی های ذخیره شده"
            icon="/icons/save.svg"
            alt="Saved Ads"
            active={UserProfileItem.SavedAds}
            userName={id}
            routerPush={UserProfileItem.SavedAds}
          />

          <ItemMenu
            title="خروج"
            icon="/icons/logout.svg"
            alt="Logout"
            userName={id}
            onClick={() => {
              deleteCookie("access");
              deleteCookie("refresh");
              router.push("/");
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col border md:mr-4 rounded-lg p-5">
        {id === UserProfileItem.EditingInformation && <EditingInformation />}
        {id === UserProfileItem.MyAds && <MyAds />}
        {id === UserProfileItem.SavedAds && <SavedAds />}
      </div>
    </div>
  );
}
