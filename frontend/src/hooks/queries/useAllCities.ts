import { Api, QueryKeys } from "@/services/apiService";
import { CitiesType } from "@/types";
import { useGetRequest } from "../useRequest";

export const useAllCities = () => {
  return useGetRequest<{ data: CitiesType[] }>({
    url: Api.SearchCity,
    key: [QueryKeys.GET_ALL_CITY],
  });
};
