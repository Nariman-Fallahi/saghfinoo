"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProgressProvider } from "@bprogress/next/app";
import { HeroUIProvider } from "@heroui/system";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="4px"
        color="#e24039"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <HeroUIProvider>{children}</HeroUIProvider>
      </ProgressProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
