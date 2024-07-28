import Select from "../Select";
import City from "../realEstates-realators/AdsFilter/selection/City";
import { Api } from "@/ApiService";
import { useGetRequest } from "@/ApiService";
import { getProvincesDataType } from "@/types/Type";
import { getProvinceCitiesDataType } from "@/types/Type";

export default function LocationDetails() {
  // Get provinces
  const { data: provincesData, status: provincesStatus } =
    useGetRequest<getProvincesDataType>({
      url: Api.GetProvinces,
      key: ["getProvinces"],
      enabled: true,
      staleTime: 10 * 60 * 1000,
    });

  // Get provinceCities
  const {
    data: provinceCitiesData,
    status: provinceCitiesStatus,
    refetch,
  } = useGetRequest<getProvinceCitiesDataType>({
    url: `${Api.GetProvinceCities}${filterValues.selectedProvince?.id}`,
    key: ["getProvinceCities"],
    enabled: false,
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [refetch, filterValues.selectedProvince]);
  return (
    <Select
      ButtonText="لللل"
      isOpen={true}
      label="شهر"
      onPress={() => console.log("ffff")}
      component={<City  />}
    />
  );
}
