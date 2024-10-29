import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { AdPostingFormDataType } from "@/types/Type";
import BtnSubmit from "../BtnSubmit";
import { useForm, SubmitHandler } from "react-hook-form";

type AdditionalInformationType = {
  setFormData: Dispatch<SetStateAction<AdPostingFormDataType | undefined>>;
  sendForm: () => void;
  setFormStage: Dispatch<SetStateAction<number>>;
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
  setFormData,
  sendForm,
  setFormStage
}: AdditionalInformationType) {
  const { handleSubmit } = useForm();

  const [inputValue, setInputValue] = useState({
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
  });

  const onSubmit = () => {
    sendForm();
    setFormStage((prevState: number) => prevState + 1);
  };

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
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input number={1} onchange={handleInputChange("line1")} />
      <Input number={2} onchange={handleInputChange("line2")} />
      <Input number={3} onchange={handleInputChange("line3")} />
      <Input number={4} onchange={handleInputChange("line4")} />
      <Input number={5} onchange={handleInputChange("line5")} />

      <BtnSubmit />
    </form>
  );
}
