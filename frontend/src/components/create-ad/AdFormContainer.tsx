"use client";
import { useState, useEffect, useMemo } from "react";
import Stepper from "./Stepper";
import { Api } from "@/services/apiService";
import { AdPostingFormDataType, AdPostingApi } from "@/types";

// Components
import LocationDetails from "./levels/LocationDetails";
import DealType from "./levels/DealType";
import Specifications from "./levels/Specifications";
import Amenities from "./levels/Amenities";
import AdditionalInformation from "./levels/AdditionalInformation";
import UploadMedia from "./levels/UploadMedia";
import Successful from "./status/Successful";
import Error from "./status/Error";

// Hooks
import { useSelectionData } from "@/hooks/queries/useSelectionData";
import { usePostRequest } from "@/hooks/useRequest";

export default function AdFormContainer() {
  const [formStage, setFormStage] = useState<number>(1);
  const [formData, setFormData] = useState<AdPostingFormDataType>();
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [idForm, setIdForm] = useState<number | undefined>(undefined);
  const [isOkRegisteredAd, setIsOkRegisteredAd] = useState<boolean | null>(
    null,
  );

  const { data: selectionData } = useSelectionData();

  const options = useMemo(() => {
    const getOptions = (key: string) =>
      selectionData?.data
        .filter((item) => item.key === key)
        .map((item) => ({ value: item.id, label: item.value })) || [];

    return {
      cooling: getOptions("coolingSystem"),
      heating: getOptions("heatingSystem"),
      transaction: getOptions("typeOfTransaction"),
      property: getOptions("propertyType"),
      restroom: getOptions("typeOfRestroom"),
      flooring: getOptions("flooring"),
    };
  }, [selectionData]);

  const { mutate: adPostingMutate, data: adResponse } =
    usePostRequest<AdPostingApi>({
      url: `${Api.Ad}/`,
      key: "adPosting",
    });

  const { mutate: uploadFile, isPending: isUploading } = usePostRequest({
    url: `${Api.Ad}/${idForm}/image`,
    key: "uploadFile",
  });

  const sendForm = () => {
    if (!formData) return;

    adPostingMutate({
      province: formData.province,
      city: formData.city,
      mainStreet: formData.mainSt,
      sideStreet: formData.sideStreet,

      typeOfTransaction: formData.typeOfTransaction,
      propertyType: formData.propertyType,
      buy: formData.buy || 0,
      deposit: formData.deposit || 0,
      rent: formData.rent || 0,
      convertible: false,

      area: formData.area,
      room: formData.room,
      floor: formData.floor,
      numberOfFloors: formData.numberFloors,

      parking: formData.parking,
      storage: formData.storage,
      elevator: formData.elevator,
      restroom: formData.restroom,
      typeOfRestroom: formData.typeOfRestroom,
      flooring: formData.flooring,

      cooling_system: formData.coolingSystem,
      heating_system: formData.heatingSystem,

      description: formData.description,
    } as AdPostingApi);
  };

  const textTitle = useMemo(() => {
    switch (formStage) {
      case 5:
        return "توضیحات اضافی خود را در این قسمت بنویسید";
      case 6:
        return "در این قسمت عکس و ویدیو ملک خود را میتوانید بارگذاری کنید.";
      default:
        return "لطفا موارد زیر را کامل کنید";
    }
  }, [formStage]);

  useEffect(() => {
    if (adResponse?.msg === "done" && adResponse.id) {
      setIdForm(adResponse.id);
      setFormStage(6);
    }
  }, [adResponse]);

  const submitAllFiles = async () => {
    if (!idForm) return;

    try {
      const uploadPromises = files.map((file) => {
        if (!file) return null;
        const fData = new FormData();
        const type = file.type.startsWith("image/") ? "image" : "video";
        fData.append(type, file);

        return uploadFile(fData);
      });

      await Promise.all(uploadPromises);
      setIsOkRegisteredAd(true);
    } catch (err) {
      setIsOkRegisteredAd(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-start min-h-screen">
      <div className="w-full relative p-4">
        {isOkRegisteredAd !== null ? (
          <div className="flex flex-col items-center">
            {isOkRegisteredAd ? <Successful /> : <Error />}
          </div>
        ) : (
          <div className="w-full z-10 flex flex-col items-center bg-white rounded-2xl p-3">
            <Stepper activeStep={formStage} count={6} />
            <p className="text-sm w-full text-center mt-6 md:text-lg md:mt-10 font-bold">
              {textTitle}
            </p>

            <div className="w-full mt-8">
              {formStage === 1 && (
                <LocationDetails
                  setFormData={setFormData}
                  setFormStage={setFormStage}
                />
              )}

              {formStage === 2 && (
                <DealType
                  formData={formData}
                  setFormData={setFormData}
                  optionsTypeOfTransaction={options.transaction}
                  propertyType={options.property}
                  setFormStage={setFormStage}
                />
              )}

              {formStage === 3 && (
                <Specifications
                  setFormData={setFormData}
                  setFormStage={setFormStage}
                />
              )}

              {formStage === 4 && (
                <Amenities
                  setFormData={setFormData}
                  optionsCoolingSystem={options.cooling}
                  optionsFlooring={options.flooring}
                  optionsHeatingSystem={options.heating}
                  optionsTypeOfRestroom={options.restroom}
                  setFormStage={setFormStage}
                />
              )}

              {formStage === 5 && (
                <AdditionalInformation
                  setFormData={setFormData}
                  sendForm={sendForm}
                  setFormStage={setFormStage}
                />
              )}

              {formStage === 6 && (
                <UploadMedia
                  files={files}
                  setFiles={setFiles}
                  submitAllFiles={submitAllFiles}
                  isLoading={isUploading}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
