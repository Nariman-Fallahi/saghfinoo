import { Api, dataKey, useGetRequest } from "@/services/ApiService";
import { userInfoDataType } from "@/Types";
import { getCookie } from "cookies-next";

export const useUserInfo = () => {
  const access = getCookie("access");

  return useGetRequest<userInfoDataType>({
    url: Api.GetUserInfo,
    key: [dataKey.GET_USER_INFO],
    headers: {
      Authorization: `Bearer ${access}`,
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });
};
