import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

type FormWrapperType<T extends FieldValues> = {
  children: React.ReactNode;
  handleSubmit: (
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<T>;
};

export default function FormWrapper<T extends FieldValues>({
  children,
  handleSubmit,
  onSubmit,
}: FormWrapperType<T>) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
    >
      {children}
    </form>
  );
}
