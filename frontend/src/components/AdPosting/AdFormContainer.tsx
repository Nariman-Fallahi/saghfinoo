import Stepper from "./Stepper";
import { useState } from "react";
import LocationDetails from "./LocationDetails";

export default function AdFormContainer() {
  // 1 = LocationDetails
  // 2 = DealType
  // 3 = Specifications
  // 4 = Amenities
  // 5 = AdditionalInformation
  // 6 = UploadMedia
  const [formStage, setFormStage] = useState<number>(1);
  const [formData, setFormData] = useState();
  return (
    <div className="w-full flex mt-[60px] justify-center items-center">
      <div
        className="w-full h-screen bg-center"
        style={{ backgroundImage: "url(/icons/BgForm.svg)" }}
      ></div>

      <div className="w-full absolute p-4">
        <div
          className="w-full bg-wgite z-10 flex flex-col items-center
          bg-white rounded-2xl p-3 justify-center"
        >
          <Stepper activeStep={1} count={6} />

          <p className="text-sm w-full text-center mt-6">
            لطفا موارد زیر را کامل کنید.
          </p>

          <div className="mt-5">
            <LocationDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
