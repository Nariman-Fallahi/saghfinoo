import { Api, dataKey, useGetRequest } from "@/services/ApiService";
import { CitiesType } from "@/Types";

export const useAllCities = () => {
  return useGetRequest<{ data: CitiesType[] }>({
    url: Api.SearchCity,
    key: [dataKey.GET_ALL_CITY],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });
};
