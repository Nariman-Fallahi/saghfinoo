import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import BtnSubmit from "../BtnSubmit";

type AdditionalInformationType = {
  formData: AdPostingFormDataType | undefined;
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
};

type InputType = {
  number: number;
  onchange: (value: string) => void;
};

const Input: React.FC<InputType> = ({ number, onchange }) => {
  return (
    <div className="flex items-center w-full mt-6">
      <span className="ml-2">{number}</span>
      <input
        type="text"
        className="w-full outline-none border-b border-dashed text-sm md:text-base"
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
};

export default function AdditionalInformation({
  formData,
  setFormData,
}: AdditionalInformationType) {
  const [inputValue, setInputValue] = useState({
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
  });

  const handleInputChange = (lineNumber: string) => (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [lineNumber]: value,
    }));
  };

  useEffect(() => {
    const lines = Object.values(inputValue).filter(
      (value) => value.trim() !== ""
    );
    setFormData((prevState) => ({
      ...prevState,
      description: lines.join(" \n "),
    }));
  }, [inputValue, setFormData]);

  return (
    <div className="flex flex-col w-full">
      <Input number={1} onchange={handleInputChange("line1")} />
      <Input number={2} onchange={handleInputChange("line2")} />
      <Input number={3} onchange={handleInputChange("line3")} />
      <Input number={4} onchange={handleInputChange("line4")} />
      <Input number={5} onchange={handleInputChange("line5")} />

      <BtnSubmit />
    </div>
  );
}
