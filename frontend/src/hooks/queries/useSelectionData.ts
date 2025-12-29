import { Api, dataKey, useGetRequest } from "@/services/ApiService";
import { SelectionDataType } from "@/types";

export const useSelectionData = () => {
  return useGetRequest<{ data: SelectionDataType[] }>({
    url: Api.GetSelectionData,
    key: [dataKey.GET_SELECTION_DATA],
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });
};
