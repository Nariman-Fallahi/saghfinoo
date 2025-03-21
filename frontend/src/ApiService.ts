import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "./types/Type";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "./types/Type";
import axios from "axios";

export enum Api {
  // users Api
  VerifyEmail = "/api/v1/users/verify-number",
  CompleteSignup = "/api/v1/users/complete-signup",
  ChangePassword = "/api/v1/users/change-password",
  EditUserProfile = "/api/v1/users/edit-user",
  GetUserInfo = "/api/v1/users/user-info",
  UploadProfileImage = "/api/v1/users/upload-profile-image",

  // reos Api
  Reos = "/api/v1/reos",
  CreateReportRealEstate = "/api/v1/reos/report/create/",

  // realtors Api
  Realtors = "/api/v1/realtors",
  GetAllScoreReasons = "/api/v1/realtors/comments/score-reasons",
  GetAllReportReasonsRealtors = "/api/v1/realtors/report/reasons",

  // ads Api
  Ad = "/api/v1/ads",
  GetSelectionData = "/api/v1/ads/choices",
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
  GET_ADS_SAVED = "getAdsSaved",
  DELETE_ALL_ADS_SAVED = "deleteAllAdsSaved",
  GET_ALL_MY_ADS = "getAllMyAds",
  GET_USER_INFO = "getUserInfo",
  GET_ALL_SCORE_REASONS = "getAllScoreReasons",
  GET_REPORT_DATA = "getReportData",
  CREATE_REPORT = "createReport",
  GET_PROPERTY_TYPE = "getPropertyType",
  GET_NEWEST_HOUSE_RENT = "getNewestHouseRentData",
  GET_REAL_ESTATE_CONSULTANTS = "getRealEstateConsultants",
  SEARCH_RESULTS = "searchResults",
  GET_REAL_ESTATE_ADS = "getRealEstateAds",
  GET_REAL_ESTATE_COMMENTS = "getRealEstateComments",
  GET_REALTOR = "getRealtor",
  GET_REALATOR_ADS = "getRealatorAds",
  GET_REALTOR_COMMENTS = "getRealtorComments",
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
