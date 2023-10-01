import "@/styles/globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
