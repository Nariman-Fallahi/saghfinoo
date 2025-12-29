"use client";
import Stepper from "./Stepper";
import { useState, useEffect } from "react";
import { AdPostingFormDataType } from "@/types";
import { Api } from "@/services/ApiService";
import { getCookie } from "cookies-next";
import { usePostRequest } from "@/services/ApiService";
import { AdPostingApi } from "@/types";
import { isMobile } from "@/utils/isMobile";

// Components
import LocationDetails from "./levels/LocationDetails";
import DealType from "./levels/DealType";
import Specifications from "./levels/Specifications";
import Amenities from "./levels/Amenities";
import AdditionalInformation from "./levels/AdditionalInformation";
import UploadMedia from "./levels/UploadMedia";
import Successful from "./status/Successful";
import Error from "./status/Error";
import { useSelectionData } from "@/hooks/queries/useSelectionData";

export default function AdFormContainer() {
  const [textTitle, setTextTitle] = useState<string>("");
  // 1 = LocationDetails
  // 2 = DealType
  // 3 = Specifications
  // 4 = Amenities
  // 5 = AdditionalInformation
  // 6 = UploadMedia
  const [formStage, setFormStage] = useState<number>(1);
  const [formData, setFormData] = useState<AdPostingFormDataType>();
  // To prevent multiple modal from opening at the same time
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [idForm, setIdForm] = useState<number | undefined>(undefined);

  const [isOkRegisteredAd, setIsOkRegisteredAd] = useState<boolean | null>(
    null
  );

  const access = getCookie("access");

  const { data: selectionData } = useSelectionData();

  const cooling_system = selectionData?.data.filter(
    (item) => item.key === "coolingSystem"
  );

  const optionsCoolingSystem = cooling_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const heating_system = selectionData?.data.filter(
    (item) => item.key === "heatingSystem"
  );

  const optionsHeatingSystem = heating_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const type_of_transaction = selectionData?.data.filter(
    (item) => item.key === "typeOfTransaction"
  );

  const optionsTypeOfTransaction = type_of_transaction?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const property_type = selectionData?.data.filter(
    (item) => item.key === "propertyType"
  );

  const optionsPropertyType = property_type?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const type_of_restroom = selectionData?.data.filter(
    (item) => item.key === "typeOfRestroom"
  );

  const optionsTypeOfRestroom = type_of_restroom?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const flooring = selectionData?.data.filter(
    (item) => item.key === "flooring"
  );

  const optionsFlooring = flooring?.map((item) => ({
    value: item.id,
    label: item.value,
  }));

  const { mutate: adPostinMutate, data: adPosting } =
    usePostRequest<AdPostingApi>({
      url: `${Api.Ad}/`,
      key: "adPosting",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

  const {
    mutate: uploadImageFileMutate,
    data: uploadImageFileData,
    isPending: uploadImageFileIsPending,
  } = usePostRequest({
    url: `${Api.Ad}/${idForm}/image`,
    key: "uploadImageFile",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const {
    mutate: uploadVideoFileMutate,
    data: uploadVideoFileData,
    isPending: uploadVideoFileIsPending,
  } = usePostRequest({
    url: `${Api.Ad}/${idForm}/video`,
    key: "uploadVideoFile",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  useEffect(() => {
    switch (formStage) {
      case 5:
        setTextTitle("توضیحات اضافی خود را در این قسمت بنویسید");
        break;
      case 6:
        setTextTitle(
          "در این قسمت عکس و ویدیو ملک خود را میتوانید بارگذاری کنید."
        );
        break;
      default:
        setTextTitle("لطفا موارد زیر را کامل کنید");
    }
  }, [formStage]);

  const images = files.filter(
    (file) => file && file.type.startsWith("image/")
  ) as File[];

  const videos = files.filter(
    (file) => file && file.type.startsWith("video/")
  ) as File[];

  const handleSubmitFiles = (name: string, file: File) => {
    const formData = new FormData();
    formData.append(name, file);

    name === "image"
      ? uploadImageFileMutate(formData)
      : uploadVideoFileMutate(formData);
  };

  const submitAllFiles = () => {
    if (images.length > 0) {
      images.forEach((image) => {
        handleSubmitFiles("image", image);
      });
    }

    if (videos.length > 0) {
      videos.forEach((video) => {
        handleSubmitFiles("video", video);
      });
    }
  };

  const sendForm = () => {
    adPostinMutate({
      city: formData?.city,
      province: formData?.province,
      mainStreet: formData?.mainSt,
      sideStreet: formData?.sideStreet,
      typeOfTransaction: formData?.typeOfTransaction,
      propertyType: formData?.propertyType,
      deposit: formData?.deposit || 0,
      rent: formData?.rent || 0,
      buy: formData?.buy || 0,
      convertible: false,
      area: formData?.area,
      room: formData?.room,
      floor: formData?.floor,
      numberOfFloors: formData?.numberFloors,
      parking: formData?.parking,
      restroom: formData?.restroom,
      typeOfRestroom: formData?.typeOfRestroom,
      storage: formData?.storage,
      elevator: formData?.elevator,
      flooring: formData?.flooring,
      cooling_system: formData?.coolingSystem,
      heating_system: formData?.heatingSystem,
      description: formData?.description,
    });
  };

  useEffect(() => {
    if (adPosting && adPosting.msg === "done") {
      setIdForm(adPosting.id);
    }
  }, [adPosting]);

  useEffect(() => {
    if (
      adPosting &&
      adPosting.msg === "done" &&
      (uploadImageFileData?.msg === "done" ||
        uploadVideoFileData?.msg === "done")
    ) {
      setIsOkRegisteredAd(true);
    } else if (
      adPosting &&
      adPosting.msg !== "done" &&
      (uploadImageFileData?.msg !== "done" ||
        uploadVideoFileData?.msg !== "done")
    ) {
      setIsOkRegisteredAd(false);
    }
  }, [adPosting, uploadImageFileData, uploadVideoFileData]);

  return (
    <div
      className="w-full flex mt-[60px] justify-center md:mt-0"
      style={{
        backgroundImage: isMobile
          ? !adPosting
            ? "url(/icons/BgForm.svg)"
            : ""
          : "",
      }}
    >
      <div
        className="hidden md:block w-full h-auto bg-center md:w-[30%]"
        style={{ backgroundImage: "url(/icons/BgForm.svg)" }}
      ></div>

      <div className="w-full relative p-4 md:p-20 md:mt-14">
        {adPosting && (
          <>
            <div className="w-full flex items-center justify-center flex-col">
              {isOkRegisteredAd && <Successful />}

              {isOkRegisteredAd === false && <Error />}
            </div>
          </>
        )}

        {!isOkRegisteredAd && (
          <div
            className="w-full z-10 flex flex-col items-center
          bg-white rounded-2xl p-3 justify-center"
          >
            <Stepper activeStep={formStage} count={6} />

            <p className="text-sm w-full text-center mt-6 md:text-lg md:mt-10">
              {textTitle}
            </p>

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
                optionsTypeOfTransaction={optionsTypeOfTransaction}
                propertyType={optionsPropertyType}
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
                optionsCoolingSystem={optionsCoolingSystem}
                optionsFlooring={optionsFlooring}
                optionsHeatingSystem={optionsHeatingSystem}
                optionsTypeOfRestroom={optionsTypeOfRestroom}
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
                isLoading={uploadImageFileIsPending || uploadVideoFileIsPending}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
