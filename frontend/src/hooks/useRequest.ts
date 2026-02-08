"use client";

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiService";
import { universalFetcher } from "@/services/fetcher";
import { PaginatedResponse, GetRequestType, PostRequestType } from "@/types";
import { ErrorNotification } from "@/notification/Error";
import { CONNECTION_ERROR_TEXT } from "@/constant/messages";

export const usePostRequest = <TVariable>({
  url,
  key,
  headers,
  method = "POST",
}: PostRequestType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (data: TVariable) => {
      const response = await axiosInstance({
        url,
        method,
        headers,
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      ErrorNotification(CONNECTION_ERROR_TEXT);
    },
  });
};

export const useGetRequest = <TData>({
  url,
  key,
  headers,
  enabled = true,
  staleTime = 10 * 60 * 1000,
}: GetRequestType<TData>) => {
  return useQuery<TData, Error>({
    queryKey: key,
    queryFn: () => universalFetcher(url, headers),
    staleTime,
    enabled,
  });
};

export const useInfiniteRequest = <TData>(url: string, key: QueryKey) => {
  return useInfiniteQuery<PaginatedResponse<TData>, Error>({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) => {
      const separator = url.includes("?") ? "&" : "?";
      return universalFetcher(`${url}${separator}page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total_pages;
      const current = allPages.length;
      return current < total ? current + 1 : undefined;
    },
  });
};
