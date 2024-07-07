import Menu from "@/components/Menu/HeaderMenu/Menu";
import Info from "@/components/realEstateProfile/Info";
import Consultants from "@/components/realEstateProfile/Consultants";
import RealEstateADS from "@/components/RealEstateADS";
import Comments from "@/components/Comments";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";

export default function page() {
  return (
    <>
      <Menu />
      <Info />
      <Consultants />
      <RealEstateADS />
      <Comments />
      <FooterMenu />
    </>
  );
}
