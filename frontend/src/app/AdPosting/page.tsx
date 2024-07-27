"use client";
import { useState } from "react";

// Components
import AdFormContainer from "@/components/AdPosting/AdFormContainer";

export default function AdPosting() {
  const [formStage, setFormStage] = useState<
    | "LocationDetails"
    | "DealType"
    | "Specifications"
    | "Amenities"
    | "AdditionalInformation"
    | "UploadMedia"
  >('LocationDetails');
  return <AdFormContainer />;
}
