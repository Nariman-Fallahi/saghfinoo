import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePostRequestType } from "./types/Type";
import { ErrorNotification } from "@/notification/Error";
import { useGetRequestType } from "./types/Type";

export enum Api {
  verifynumber = "http://127.0.0.1:8000/api/v1/users/verify-number",
  CompleteSignup = "http://127.0.0.1:8000/api/v1/users/complete-signup",
  Refresh = "http://127.0.0.1:8000/api/v1/users/token/refresh",
  GetUserInfo = "http://127.0.0.1:8000/api/v1/users/get-user-info",
  GetAllRealEstateOffices = "http://127.0.0.1:8000/api/v1/real-estate-offices/get-all?page=",
  GetRealEstateOffices = "http://127.0.0.1:8000/api/v1/real-estate-offices/get/",
  GetProvinces = "http://127.0.0.1:8000/api/v1/tools/get-provinces",
  GetProvinceCities = "http://127.0.0.1:8000/api/v1/tools/get-province-cities/",
  GetAllRealtor = "http://127.0.0.1:8000/api/v1/realtors/get-all?page=",
  GetRealtor = "http://127.0.0.1:8000/api/v1/realtors/get/",
}

// PostRequest
export const usePostRequest = <dataType>({ url, key }: usePostRequestType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (data: dataType) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
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
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    staleTime: staleTime,
    enabled: enabled,
  });
};
// END GetRequest
