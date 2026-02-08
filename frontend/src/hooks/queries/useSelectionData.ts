import { Api, QueryKeys } from "@/services/apiService";
import { SelectionDataType } from "@/types";
import { useGetRequest } from "../useRequest";

export const useSelectionData = () => {
  return useGetRequest<{ data: SelectionDataType[] }>({
    url: Api.GetSelectionData,
    key: [QueryKeys.GET_SELECTION_DATA],
  });
};
