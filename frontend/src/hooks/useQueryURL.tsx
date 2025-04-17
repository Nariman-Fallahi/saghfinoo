"use client";
import { baseURL } from "@/ApiService";
import { useSearchParams } from "next/navigation";

export const useQueryURL = (
  apiURL: string,
  customQueries?: { [key: string]: string }
) => {
  const searchParams = useSearchParams();
  let searchP;

  if (typeof window !== "undefined") {
    searchP = new URLSearchParams(searchParams.toString());
  }

  const queryObject: { [key: string]: string } = { ...customQueries };

  searchP?.forEach((value, key) => {
    queryObject[key] = decodeURIComponent(value);
  });

  const url = new URL(apiURL, baseURL);

  Object.entries(queryObject).forEach(([key, value]) => {
    url.searchParams.append(key, value || "");
  });

  return url.toString();
};
