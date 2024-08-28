import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { TextError } from "@/constant/Constants";
import { SelectTitle } from "@/constant/Constants";
import { useState } from "react";

type InputType<T extends FieldValues> = {
  title: string;
  placeholder: { min: string; max: string };
  nameMin: Path<T>;
  nameMax: Path<T>;
  register: UseFormRegister<T>;
  unit: string;
  displayMode: "row" | "column";
  error: string | undefined;
  rules?: RegisterOptions<T>;
};

export default function Input<T extends FieldValues>({
  title,
  nameMin,
  nameMax,
  placeholder,
  register,
  unit,
  displayMode,
  error,
  rules,
}: InputType<T>) {
  const [isValue, setIsValue] = useState<{ min?: boolean; max?: boolean }>();
  return (
    <div className="flex flex-col w-fit">
      {title && <SelectTitle text={title} />}
      <div
        className={`w-fit flex ${
          displayMode === "column" ? "flex-col" : "flex-row gap-4"
        }`}
      >
        <div
          className="flex w-fit border rounded border-[#D9D9D9] text-sm lg:text-base
             md:border-none"
        >
          <span className="p-[9px] bg-red-500 text-white rounded-tr cursor-default">
            از
          </span>
          <input
            {...register(
              nameMin,
              rules || {
                required: isValue?.max
                  ? "لطفا مقدار اولیه را وارد کنید"
                  : false,
              }
            )}
            className="w-full outline-none px-2"
            placeholder={placeholder.min}
            type="number"
            onChange={(e) =>
              setIsValue((prevState) => ({
                ...prevState,
                min: !!e.target.value,
              }))
            }
          />
          <span className="p-2 text-[#ADADAD] cursor-default">{unit}</span>
        </div>

        <div
          className="flex w-fit rounded border border-[#D9D9D9] text-sm lg:text-base
          md:border-none"
        >
          <span
            className={`p-[9px] bg-red-500 text-white cursor-default ${
              displayMode === "column" ? "rounded-br" : "rounded-tr"
            }`}
          >
            تا
          </span>
          <input
            {...register(
              nameMax,
              rules || {
                required: isValue?.min ? "لطفا مقدار دوم را وارد کنید" : false,
              }
            )}
            className="w-full outline-none px-2"
            placeholder={placeholder.max}
            type="number"
            onChange={(e) =>
              setIsValue((prevState) => ({
                ...prevState,
                max: !!e.target.value,
              }))
            }
          />
          <span className="p-2 text-[#ADADAD] cursor-default">{unit}</span>
        </div>
      </div>
      <TextError text={error} />
    </div>
  );
}
