"use client";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextError } from "../ui/TextError";
import { SelectTitle } from "../ui/SelectTitle";

type InputType<T extends FieldValues> = {
  title?: string;
  placeholder: { min: string; max: string };
  name: { min: Path<T>; max: Path<T> };
  register: UseFormRegister<T>;
  unit: string;
  displayMode: "row" | "column";
  error: string | undefined;
  rules?: RegisterOptions<T>;
};

export default function Input<T extends FieldValues>({
  title,
  name,
  placeholder,
  register,
  unit,
  displayMode,
  error,
  rules,
}: InputType<T>) {
  const minRegister = register(name.min, rules);
  const maxRegister = register(name.max, rules);

  return (
    <div className="flex flex-col w-fit">
      {title && <SelectTitle text={title} />}
      <div
        className={`w-fit flex ${
          displayMode === "column" ? "flex-col" : "flex-row gap-4"
        }`}
      >
        <div className="flex w-fit border rounded-sm border-[#D9D9D9] text-[13px] lg:text-base md:border-none">
          <span className="p-[9px] bg-red-500 text-white rounded-tr cursor-default">
            از
          </span>
          <input
            {...minRegister}
            className="w-full outline-hidden px-2"
            placeholder={placeholder.min}
            type="text"
            onChange={(e) => {
              minRegister.onChange(e);
            }}
          />
          <span className="p-2 text-[#ADADAD] cursor-default">{unit}</span>
        </div>

        <div className="flex w-fit rounded-sm border border-[#D9D9D9] text-[13px] lg:text-base md:border-none">
          <span
            className={`p-[9px] bg-red-500 text-white cursor-default ${
              displayMode === "column" ? "rounded-br" : "rounded-tr"
            }`}
          >
            تا
          </span>
          <input
            {...maxRegister}
            className="w-full outline-hidden px-2"
            placeholder={placeholder.max}
            type="text"
            onChange={(e) => {
              maxRegister.onChange(e);
            }}
          />
          <span className="p-2 text-[#ADADAD] cursor-default">{unit}</span>
        </div>
      </div>
      <TextError text={error} />
    </div>
  );
}
