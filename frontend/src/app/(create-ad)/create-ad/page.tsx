import AdFormContainer from "@/components/create-ad/AdFormContainer";
import { SITE_METADATA } from "@/constant/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_METADATA.createAd.title,
  description: SITE_METADATA.createAd.description,
};

export default function AdPosting() {
  return <AdFormContainer />;
}
