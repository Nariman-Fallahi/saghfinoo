import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TextError } from "../ui/TextError";
import { SelectTitle } from "../ui/SelectTitle";

type InputType<T extends FieldValues> = {
  title: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder: string;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
};

export default function Input<T extends FieldValues>({
  title,
  name,
  register,
  placeholder,
  errors,
  disabled = false,
  required = true,
}: InputType<T>) {
  return (
    <div className="flex flex-col">
      <SelectTitle text={title} />
      <input
        className="text-[13px] md:text-sm p-2 border border-[#ADADAD] rounded
         outline-none md:p-[8.7px] h-10 min-h-10"
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, {
          required: required ? "لطفا این فیلد را خالی نگزارید" : false,
        })}
      />

      {errors[name] && <TextError text={errors[name]?.message as string} />}
    </div>
  );
}
