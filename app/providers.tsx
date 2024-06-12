"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ApolloProvider } from "@apollo/client";

import client from "@/lib/apollo-client";
import RecoilRootWrapper from "@/lib/recoil-wrapper";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <RecoilRootWrapper>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </RecoilRootWrapper>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
