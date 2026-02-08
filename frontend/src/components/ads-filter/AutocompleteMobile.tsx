import { SelectionDataType } from "@/types";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SelectTitle } from "../ui/SelectTitle";

type AutocompleteMobileType<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T> | undefined;
  isLoading: boolean;
  defaultItems: SelectionDataType[] | undefined;
  label: string;
  placeholder: string;
};

export default function AutocompleteMobile<T extends FieldValues>({
  name,
  control,
  isLoading,
  defaultItems,
  label,
  placeholder,
}: AutocompleteMobileType<T>) {
  return (
    <div className="flex flex-col w-full">
      <SelectTitle text={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            isLoading={isLoading}
            placeholder={placeholder}
            aria-label={label}
            variant="bordered"
            radius="sm"
            defaultItems={defaultItems || []}
            size="sm"
            selectedKey={value ? String(value) : undefined}
            onSelectionChange={(key) => onChange(key)}
            inputProps={{
              classNames: {
                input: "text-sm",
              },
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.key || item.id}>
                {item.value}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
}
