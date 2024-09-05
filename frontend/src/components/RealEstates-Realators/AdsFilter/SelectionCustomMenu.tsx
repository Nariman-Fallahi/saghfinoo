import {
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { components, GroupBase, MenuProps } from "react-select";
import { InputsType } from "./Filter";
import { BaseSyntheticEvent } from "react";
import Input from "./Input";
import { Button } from "@nextui-org/button";
import { OpenCustomMenu } from "./Filter";

type SelectionCustomMenuType = {
  handleSubmit: (
    onValid: SubmitHandler<InputsType>,
    onInvalid?: SubmitErrorHandler<InputsType> | undefined
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<InputsType>;
  props: MenuProps<unknown, boolean, GroupBase<unknown>>;
  register: UseFormRegister<InputsType>;
  nameMin: Path<InputsType>;
  nameMax: Path<InputsType>;
  errors: string | undefined;
  setOpenCustomMenu: (value: OpenCustomMenu) => void;
};

export default function SelectionCustomMenu({
  handleSubmit,
  onSubmit,
  props,
  register,
  errors,
  nameMax,
  nameMin,
  setOpenCustomMenu,
}: SelectionCustomMenuType) {
  return (
    <components.Menu {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full text-center"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          title=""
          displayMode="column"
          register={register}
          nameMin={nameMin}
          nameMax={nameMax}
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
    </components.Menu>
  );
}
