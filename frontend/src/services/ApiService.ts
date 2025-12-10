import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "../Types";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "../Types";
import axios from "axios";

export enum Api {
  // users Api
  SendOTP = "users/send-otp",
  VerifyOTP = "users/verify-otp",
  CompleteSignup = "users/complete-signup",
  ChangePassword = "users/change-password",
  EditUserProfile = "users/edit-user",
  GetUserInfo = "users/user-info",
  UploadProfileImage = "users/upload-profile-image",

  // reos Api
  Reos = "reos",
  CreateReportRealEstate = "reos/report/create/",

  // realtors Api
  Realtors = "realtors",
  GetAllScoreReasons = "realtors/comments/score-reasons",
  GetAllReportReasonsRealtors = "realtors/report/reasons",

  // ads Api
  Ad = "ads",
  GetSelectionData = "ads/choices",
  DeleteAllMyAds = "ads/self-all",
  GetAllMyAds = "ads/self",
  AdsSaved = "ads/saved",

  // tools Api
  GetProvinces_Cities = "tools/provinces",
  SearchCity = "tools/cities",

  // news Api
  News = "news",
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

const connectionErrorText = "در ارتباط با سرور مشکلی پیش آمد.";

export const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/`;

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
      ErrorNotification(connectionErrorText);
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
        ErrorNotification(connectionErrorText);
      }

      return response.data;
    },
    staleTime: staleTime,
    enabled: enabled,
  });
};
// END GetRequest
