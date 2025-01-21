import { SelectTitle } from "@/constant/Constants";
import { SelectionDataType } from "@/types/Type";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

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
        render={({ field: { onChange } }) => (
          <Autocomplete
            isLoading={isLoading}
            placeholder={placeholder}
            aria-label={label}
            variant="bordered"
            radius="sm"
            defaultItems={defaultItems || []}
            size="sm"
            inputProps={{
              classNames: {
                input: "text-[13px]",
              },
            }}
            onSelectionChange={(city) => onChange(city)}
          >
            {(city) => (
              <AutocompleteItem key={city.id}>{city.value}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </div>
  );
}
