import Image from "next/image";
import EditingInformation from "@/components/UserProfile/EditingInformation";
import MyAds from "@/components/UserProfile/MyAds";
import SavedAds from "@/components/UserProfile/SavedAds";
import ItemMenu from "@/components/UserProfile/ItemMenu";
import { notFound } from "next/navigation";

enum UserProfileItem {
  EditingInformation = "EditingInformation",
  MyAds = "MyAds",
  SavedAds = "SavedAds",
  Logout = "Logout",
}

export const Title = ({ title }: { title: string }) => {
  return <p className="text-xs md:text-xl lg:text-2xl font-bold">{title}</p>;
};

export async function generateStaticParams() {
  return [
    { id: "EditingInformation" },
    { id: UserProfileItem.MyAds },
    { id: UserProfileItem.SavedAds },
    { id: UserProfileItem.Logout },
  ];
}

export default function Page({ params }: { params: { userName: string } }) {
  const { userName } = params;

  if (
    ![
      UserProfileItem.EditingInformation,
      UserProfileItem.MyAds,
      UserProfileItem.SavedAds,
      UserProfileItem.Logout,
    ].includes(userName as UserProfileItem)
  ) {
    notFound();
  }

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
            <span className="text-sm lg:text-lg">نام کاربر</span>
            <span className="mt-1 text-[#717171] text-sm lg:text-lg">
              نوع فعالیت
            </span>
          </div>
        </div>

        <div className="mt-4 border border-[#D9D9D9] rounded-xl p-4 flex flex-col">
          <ItemMenu
            title="ویرایش اطلاعات"
            icon="/icons/edit.svg"
            alt="Edit Icon"
            active={UserProfileItem.EditingInformation}
            userName={userName}
            routerPush={UserProfileItem.EditingInformation}
          />

          <ItemMenu
            title="آگهی های من"
            icon="/icons/receipt-text.svg"
            alt="My Ads"
            active={UserProfileItem.MyAds}
            userName={userName}
            routerPush={UserProfileItem.MyAds}
          />

          <ItemMenu
            title="آگهی های ذخیره شده"
            icon="/icons/save.svg"
            alt="Saved Ads"
            active={UserProfileItem.SavedAds}
            userName={userName}
            routerPush={UserProfileItem.SavedAds}
          />

          <ItemMenu
            title="خروج"
            icon="/icons/logout.svg"
            alt="Logout"
            active={UserProfileItem.Logout}
            userName={userName}
            routerPush={UserProfileItem.Logout}
          />
        </div>
      </div>
      <div className="w-full flex flex-col border md:mr-4 rounded-lg p-5">
        {userName === UserProfileItem.EditingInformation && (
          <EditingInformation />
        )}
        {userName === UserProfileItem.MyAds && <MyAds />}
        {userName === UserProfileItem.SavedAds && <SavedAds />}
      </div>
    </div>
  );
}
