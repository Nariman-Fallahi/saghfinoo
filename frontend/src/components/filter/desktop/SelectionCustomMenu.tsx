import {
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import Input from "../Input";
import { Button } from "@heroui/button";
import { FilterDataType } from "@/types";
import { BaseSyntheticEvent, useState } from "react";
import { OpenCustomMenu } from "./DesktopFilter";

type SelectionCustomMenuType = {
  handleSubmit: (
    onValid: SubmitHandler<FilterDataType>,
    onInvalid?: SubmitErrorHandler<FilterDataType> | undefined
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FilterDataType>;
  register: UseFormRegister<FilterDataType>;
  name: { min: Path<FilterDataType>; max: Path<FilterDataType> };
  errors: string | undefined;
  placeholder: string;
  isTablet: boolean | undefined;
  menuName: OpenCustomMenu;
  openCustomMenu: OpenCustomMenu;
  setOpenCustomMenu: (value: OpenCustomMenu) => void;
};

export default function SelectionCustomMenu({
  errors,
  handleSubmit,
  name,
  onSubmit,
  register,
  placeholder,
  isTablet,
  setOpenCustomMenu,
  menuName,
  openCustomMenu,
}: SelectionCustomMenuType) {
  return (
    <div className="w-full flex flex-col relative">
      <Button
        variant="bordered"
        className="flex items-center justify-between border-[#e4e4e7]"
        onPress={() => setOpenCustomMenu(menuName)}
        disableAnimation
        radius="sm"
        size={isTablet ? "sm" : "md"}
      >
        <p className="text-sm text-gray-400">{placeholder}</p>
        <svg
          aria-hidden="true"
          fill="none"
          focusable="false"
          height="1em"
          role="presentation"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="1em"
          data-slot="selectorIcon"
          data-open="true"
          className={`end-3 w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none ${
            openCustomMenu === menuName ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </Button>

      {openCustomMenu === menuName && (
        <div
          className="absolute md:w-52 lg:w-60 max-h-[343px] top-12 bg-white
           shadow rounded"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full text-center ml-[5px]"
          >
            <Input
              displayMode="column"
              register={register}
              name={{ min: name.min, max: name.max }}
              placeholder={{ min: "۲۰۰,۰۰۰", max: "۴۰۰,۰۰۰" }}
              unit="تومان"
              rules={{ required: "لطفا مقادیر را وارد کنید" }}
              error={errors}
            />

            <div className="w-full flex justify-between pb-3 gap-3 px-4">
              <Button
                type="submit"
                className="w-1/2 mt-3 bg-primary !rounded"
                size="sm"
                radius="sm"
                color="danger"
              >
                ثبت
              </Button>

              <Button
                className="w-1/2 mt-3 !rounded"
                size="sm"
                radius="sm"
                color="default"
                onPress={() => setOpenCustomMenu(null)}
              >
                بستن
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
