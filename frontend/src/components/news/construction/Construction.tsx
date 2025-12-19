import { Title } from "@/components/ui/Title";
import Slider from "./Slider";
import { NewsDataType } from "@/Types";

export default function Construction({ data }: { data: NewsDataType[] }) {
  return (
    <div className="mt-8 flex flex-col">
      <Title title="ساخت و ساز" />
      <Slider data={data} />
    </div>
  );
}
