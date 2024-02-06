import "@/styles/globals.css";
import type { AppProps } from "next/app";

// const roboto = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
