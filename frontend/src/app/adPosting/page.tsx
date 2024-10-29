import AdFormContainer from "@/components/AdPosting/AdFormContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ایجاد آگهی",
  description:
    "در این صفحه می‌توانید آگهی جدیدی برای خرید، فروش یا اجاره ملک خود ثبت کنید",
};

export default function AdPosting() {
  return <AdFormContainer />;
}
