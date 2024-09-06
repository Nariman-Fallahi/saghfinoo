"use client";
import Stepper from "./Stepper";
import { useState, useEffect } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import { useGetRequest } from "@/ApiService";
import { Api } from "@/ApiService";
import { getCookie } from "cookies-next";
import { usePostRequest } from "@/ApiService";
import { SelectionDataType } from "@/types/Type";
import { AdPostingApi } from "@/types/Type";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { isMobile } from "@/constant/Constants";
import CustomButton from "../CustomButton";

// Components
import LocationDetails from "./levels/LocationDetails";
import DealType from "./levels/DealType";
import Specifications from "./levels/Specifications";
import Amenities from "./levels/Amenities";
import AdditionalInformation from "./levels/AdditionalInformation";
import UploadMedia from "./levels/UploadMedia";

export const inputStyle =
  "text-xs md:text-sm p-2 border border-[#ADADAD] rounded outline-none md:p-[8.7px]";

export const SelectStyle = {
  control: (state: { menuIsOpen: any }) =>
    `text-xs md:text-sm !cursor-pointer !border-[#adadad] ${
      state.menuIsOpen ? "blueShadow" : ""
    }`,
  menu: () => "!w-[70%] text-[13.5px] md:text-[15.5px]",
};

export default function AdFormContainer() {
  // 1 = LocationDetails
  // 2 = DealType
  // 3 = Specifications
  // 4 = Amenities
  // 5 = AdditionalInformation
  // 6 = UploadMedia
  const [textTitle, setTextTitle] = useState<string>("");
  const [formStage, setFormStage] = useState<number>(1);
  const [formData, setFormData] = useState<AdPostingFormDataType>();
  // To prevent multiple modal from opening at the same time
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [idForm, setIdForm] = useState<number | undefined>(undefined);

  const access = getCookie("access");
  const router = useRouter();

  const {
    data: selectionData,
    status: SelectionDataStatus,
    refetch,
  } = useGetRequest<{ data: SelectionDataType[] }>({
    url: `${Api.GetSelectionData}`,
    key: ["getSelectionData"],
    enabled: true,
    staleTime: 10 * 60 * 1000,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  // cooling_system
  const cooling_system = selectionData?.data.filter(
    (item) => item.key === "cooling_system"
  );

  const optionsCoolingSystem = cooling_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END cooling_system

  // heating_system
  const heating_system = selectionData?.data.filter(
    (item) => item.key === "heating_system"
  );

  const optionsHeatingSystem = heating_system?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END heating_system

  // type_of_transaction
  const type_of_transaction = selectionData?.data.filter(
    (item) => item.key === "type_of_transaction"
  );

  const optionsTypeOfTransaction = type_of_transaction?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END type_of_transaction

  // property_type
  const property_type = selectionData?.data.filter(
    (item) => item.key === "property_type"
  );

  const optionsPropertyType = property_type?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END property_type

  // type_of_restroom
  const type_of_restroom = selectionData?.data.filter(
    (item) => item.key === "type_of_restroom"
  );

  const optionsTypeOfRestroom = type_of_restroom?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END type_of_restroom

  // flooring
  const flooring = selectionData?.data.filter(
    (item) => item.key === "flooring"
  );

  const optionsFlooring = flooring?.map((item) => ({
    value: item.id,
    label: item.value,
  }));
  // END flooring

  const {
    mutate: adPostinMutate,
    isPending,
    data: adPosting,
  } = usePostRequest<AdPostingApi>({
    url: Api.Ad,
    key: "adPosting",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const { mutate: uploadImageFileMutate, data: uploadImageFile } =
    usePostRequest<{
      image: File | null;
    }>({
      url: `${Api.Ad}/${idForm}/image`,
      key: "uploadImageFile",
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
    (file) => file && file.type.startsWith("image/") //TODO تغییر
  ) as File[];

  const videos = files.filter(
    (file) => file && file.type.startsWith("video/") //TODO تغییر
  ) as File[];

  useEffect(() => {
    if (formStage === 6) {
      adPostinMutate({
        city: formData?.city,
        province: formData?.province,
        main_street: formData?.mainSt,
        side_street: formData?.sideStreet,
        type_of_transaction: formData?.typeOfTransaction,
        property_type: formData?.propertyType,
        deposit: formData?.typeOfTransaction !== 10 ? formData?.deposit : 0,
        rent: formData?.rent,
        convertible: false,
        area: formData?.area,
        room: formData?.room,
        floor: formData?.floor,
        number_of_floors: formData?.numberFloors,
        parking: formData?.parking,
        restroom: formData?.restroom,
        type_of_restroom: formData?.typeOfRestroom,
        storage: formData?.storage,
        elevator: formData?.elevator,
        flooring: formData?.flooring,
        cooling_system: formData?.coolingSystem,
        heating_system: formData?.heatingSystem,
        description: formData?.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStage]);

  useEffect(() => {
    if (adPosting && adPosting.msg === "done") {
      setIdForm(adPosting.id);
    }
  }, [adPosting]);

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
              {adPosting.msg === "done" && (
                <>
                  <p className="md:text-xl lg:text-2xl font-bold">
                    فرم با موفقیت ارسال شد
                  </p>

                  <i className="mt-5">
                    <Image
                      width={250}
                      height={250}
                      className="md:w-[400px] md:h-[400px]"
                      src="/icons/formSubmit_S.svg"
                      alt="Form submit successful"
                    />
                  </i>
                </>
              )}

              {adPosting.msg !== "done" && (
                <>
                  <p className="md:text-xl lg:text-2xl font-bold">
                    مشکلی در ثبت آگهی شما به وجود آمده !
                  </p>

                  <p className="text-[#717171] text-sm md:text-base lg:text-xl mt-4 text-center">
                    در قسمت ثبت آگهی، خطای مربوط به اطلاعات
                    <br />
                    برای شما مشخص شده است.
                  </p>

                  <CustomButton
                    radius="sm"
                    variant="bordered"
                    className="text-primary border-primary border mt-6"
                    onPress={() => router.push("/adPosting")}
                  >
                    برگشت به ثبت آگهی
                  </CustomButton>

                  <i className="mt-8 md:mt-5">
                    <Image
                      width={180}
                      height={180}
                      src="/icons/Folder.svg"
                      alt="Error"
                      className="md:w-[300px] md:h-[300px]"
                    />
                  </i>
                </>
              )}
            </div>
          </>
        )}

        {!adPosting && (
          <div
            className="w-full z-10 flex flex-col items-center
          bg-white rounded-2xl p-3 justify-center"
          >
            <Stepper activeStep={formStage} count={6} />

            <p className="text-sm w-full text-center mt-6 md:text-lg md:mt-10">
              {textTitle}
            </p>

            <div
              className="mt-1 flex w-full flex-col md:flex-row flex-wrap
              md:justify-between md:items-center"
            >
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
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {formStage === 6 && (
                <UploadMedia files={files} setFiles={setFiles} />
              )}

              {adPosting && adPosting.msg !== "done" && (
                <div className="w-full flex flex-col items-center justify-center"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}