import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "./types/Type";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "./types/Type";
import axios from "axios";

export enum Api {
  // users Api
  verifynumber = "/api/v1/users/verify-number",
  CompleteSignup = "/api/v1/users/complete-signup",
  ChangePassword = "/api/v1/users/change-password",
  EditUserProfile = "/api/v1/users/edit-user",
  Refresh = "/api/v1/users/token/refresh",
  GetUserInfo = "/api/v1/users/user-info",
  UploadProfileImage = "/api/v1/users/upload-profile-image",

  // reos Api
  Reos = "/api/v1/reos",
  CreateReportRealEstate = "/api/v1/reos/report/create/",

  // realtors Api
  realtors = "/api/v1/realtors",
  GetAllScoreReasons = "/api/v1/realtors/comments/score-reasons",
  GetAllReportReasonsRealtors = "/api/v1/realtors/report/reasons",

  // ads Api
  Ad = "/api/v1/ads",
  GetSelectionData = "/api/v1/ads/choice",
  DeleteAllMyAds = "/api/v1/ads/self-all",
  GetAllMyAds = "/api/v1/ads/self",
  AdsSaved = "/api/v1/ads/saved",

  // tools Api
  GetProvinces_Cities = "/api/v1/tools/provinces",
  SearchCity = "/api/v1/tools/cities",

  // news Api
  News = "/api/v1/news",
}

export enum dataKey {
  GET_PROVINCES = "getProvinces",
  GET_CITIES = "getCities",
  GET_ALL_CITY = "getAllCity",
  GET_SELECTION_DATA = "getSelectionData",
}

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

// PostRequest
export const usePostRequest = <dataType>({
  url,
  key,
  headers,
  method,
}: usePostRequestType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (data: dataType) => {
      const response = await axiosInstance({
        url: url,
        method: method || "POST",
        headers: headers,
        data: data,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
    },
  });
};
// END PostRequest

// GetRequest
export const useGetRequest = <dataType>({
  url,
  key,
  headers,
  enabled,
  staleTime,
}: useGetRequestType) => {
  return useQuery<dataType>({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosInstance({
        url: url,
        method: "GET",
        headers: headers,
      });

      if (response.status !== 200) {
        ErrorNotification("در ارتباط با سرور مشکلی پیش آمد.");
      }

      return response.data;
    },
    staleTime: staleTime,
    enabled: enabled,
  });
};
// END GetRequest
