import { Title } from "@/app/userProfile/[id]/page";
import NoData from "./NoData";
import DeleteAllAdsBtn from "./DeleteAllAdsBtn";
import AdsCart from "../AdsCart";

export default function SavedAds() {
  const a = true;
  return (
    <>
      <Title title="آگهی های ذخیره شده" />
      <DeleteAllAdsBtn />

      {a && (
        <div className="w-full mt-5">
          <AdsCart />
        </div>
      )}

      <NoData
        icon="/icons/SavedAds-icon.svg"
        title="هنوز آگهی ذخیره نکردید !"
        description="صفحه املاک اجاره ای سقفینو را ببینید و از میان آنها آگهی های دلخواه را ذخیره کنید"
        titleBtn="املاک اجاره ای"
        linkBtn="/" //TODO این قسمت باید تغییر کند
      />
    </>
  );
}
