import { getProvinceCitiesDataType } from "@/types/Type";
import { Button } from "@nextui-org/button";
import { useFilterValue } from "@/store/ReaFilter";

type cityType = {
  data: getProvinceCitiesDataType | undefined;
};
export default function City({ data }: cityType) {
  const { setFilterValues } = useFilterValue();
  return (
    <>
      {data?.data.map((item, index) => {
        return (
          <div className="w-full" key={index}>
            <Button
              className="rounded-none border-b h-10 w-full text-sm md:text-base"
              variant="light"
              onPress={() => setFilterValues({ selectedCity: item.name })}
            >
              {item.name}
            </Button>
          </div>
        );
      })}
    </>
  );
}
