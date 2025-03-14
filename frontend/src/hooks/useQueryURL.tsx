"use client";
import { baseURL } from "@/ApiService";

export const useQueryURL = (
  apiURL: string,
  customQueries?: { [key: string]: string }
) => {
  let searchParams;

  if (typeof window !== "undefined") {
    searchParams = new URLSearchParams(window.location.search);
  }

  const queryObject: { [key: string]: string } = { ...customQueries };

  searchParams?.forEach((value, key) => {
    queryObject[key] = value;
  });

  const url = new URL(apiURL, baseURL);

  Object.entries(queryObject).forEach(([key, value]) => {
    url.searchParams.append(key, value || "");
  });

  return url.toString();
};
