import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HomeLayout from "../components/Layouts/HomeLayout";
import { cn } from "../lib/utils";

// const roboto = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HomeLayout className={cn("text-foreground")}>
      <Component {...pageProps} />
    </HomeLayout>
  );
}
