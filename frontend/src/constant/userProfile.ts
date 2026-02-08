export enum UserProfileItem {
  EditingInformation = "editing-information",
  MyAds = "my-ads",
  SavedAds = "saved-ads",
}

export const USER_PROFILE_MENU = [
  {
    id: UserProfileItem.EditingInformation,
    title: "ویرایش اطلاعات",
    icon: "/icons/edit.svg",
  },
  {
    id: UserProfileItem.MyAds,
    title: "آگهی‌های من",
    icon: "/icons/receipt-text.svg",
  },
  {
    id: UserProfileItem.SavedAds,
    title: "آگهی‌های ذخیره شده",
    icon: "/icons/save.svg",
  },
] as const;
