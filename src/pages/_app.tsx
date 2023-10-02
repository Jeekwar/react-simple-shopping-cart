import "@/styles/globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </MantineProvider>
  );
}
