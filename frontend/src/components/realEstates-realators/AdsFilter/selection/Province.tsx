import { Button } from "@nextui-org/button";
import { getProvincesDataType } from "@/types/Type";
import { useFilterValue } from "@/store/ReaFilter";

type ProvinceType = {
  data: getProvincesDataType | undefined;
};

export default function Province({ data }: ProvinceType) {
  const { setFilterValues } = useFilterValue();
  const clickProvinceSelectionBtn = (id: number, name: string) => {
    setFilterValues({ selectedProvince: { id: id, name: name } });
  };

  return (
    <>
      {data?.data.map((item) => {
        return (
          <div className="w-full" key={item.id}>
            <Button
              className="rounded-none border-b h-10 w-full text-sm md:text-base"
              variant="light"
              onPress={() => clickProvinceSelectionBtn(item.id, item.name)}
            >
              {item.name}
            </Button>
          </div>
        );
      })}
    </>
  );
}
