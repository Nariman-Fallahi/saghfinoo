"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next-nprogress-bar";
import EditingInformation from "@/components/UserProfile/EditingInformation";
import MyAds from "@/components/UserProfile/MyAds";
import SavedAds from "@/components/UserProfile/SavedAds";

enum UserProfileItem {
  EditingInformation = "EditingInformation",
  MyAds = "MyAds",
  SavedAds = "SavedAds",
}

type ItemMenu = {
  title: string;
  icon: string;
  alt: string;
  active: string;
  onClick: () => void;
};

export const Title = ({ title }: { title: string }) => {
  return <p className="text-xs md:text-xl lg:text-2xl font-bold">{title}</p>;
};

const ItemMenu = ({ title, icon, alt, active, onClick }: ItemMenu) => {
  const params = useParams();

  return (
    <div
      onClick={onClick}
      className={`flex mt-2 p-2 cursor-pointer text-[#717171] ${
        params.id === active
          ? "before:w-1 before:h-5 before:rounded-xl before:ml-2 before:bg-[#CB1B1B] text-black"
          : null
      }`}
    >
      <i>
        <Image width={20} height={20} src={icon} alt={alt} />
      </i>
      <span className="text-xs lg:text-sm mr-3 w-full">{title}</span>
    </div>
  );
};

export default function UserProfile() {
  const router = useRouter();
  const params = useParams();

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
            onClick={() => router.push(UserProfileItem.EditingInformation)}
          />

          <ItemMenu
            title="آگهی های من"
            icon="/icons/receipt-text.svg"
            alt="My Ads"
            active={UserProfileItem.MyAds}
            onClick={() => router.push(UserProfileItem.MyAds)}
          />

          <ItemMenu
            title="آگهی های ذخیره شده"
            icon="/icons/save.svg"
            alt="Saved Ads"
            active={UserProfileItem.SavedAds}
            onClick={() => router.push(UserProfileItem.SavedAds)}
          />

          <ItemMenu
            title="خروج"
            icon="/icons/logout.svg"
            alt="Logout"
            active=""
            onClick={() => {
              deleteCookie("access");
              deleteCookie("refresh");
              router.push("/");
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col border md:mr-4 rounded-lg p-5">
        {params.id === UserProfileItem.EditingInformation && (
          <EditingInformation />
        )}
        {params.id === UserProfileItem.MyAds && <MyAds />}
        {params.id === UserProfileItem.SavedAds && <SavedAds />}
      </div>
    </div>
  );
}
