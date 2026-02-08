import { Api, QueryKeys } from "@/services/apiService";
import { userInfoDataType } from "@/types";
import { useGetRequest } from "../useRequest";
import { hasCookie } from "cookies-next";

export const useUserInfo = () => {
  const isAuthenticated = hasCookie("accessToken");

  return useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: [QueryKeys.GET_USER_INFO],
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};
