import RealEstateNews from "@/components/News/RealEstateNews";
import Housing from "@/components/News/housing/Housing";

export default function News() {
  return (
    <div className="mt-20 md:mt-32 lg:mt-36">
      <RealEstateNews />
      <Housing />
    </div>
  );
}
