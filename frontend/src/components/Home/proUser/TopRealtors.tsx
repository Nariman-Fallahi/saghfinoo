import { Title } from "@/constant/Constants";
import RealatorsCarts from "@/components/RealatorsCarts";
import { allRealtorDataType } from "@/types/Type";

type TopRealtorsType = {
  data: allRealtorDataType[];
};

export default function TopRealtors({ data }: TopRealtorsType) {
  return (
    <div className="w-full flex flex-col mt-7 p-3">
      <Title title="مشاوران برتر" />

      <div className="flex flex-wrap">
        <RealatorsCarts data={data} />
      </div>
    </div>
  );
}
