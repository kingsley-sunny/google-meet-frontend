import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bootstrapQueryRequest } from "@ventlio/tanstack-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

import { WsContext } from "../base/Contexts/wsContext/WsContext";
import { useWebSocket } from "../base/hooks/useWebsocket";
import { Toaster } from "../components/ui/sonner";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  fallback: ["san serif"],
});

const queryClient = new QueryClient();

bootstrapQueryRequest(queryClient);

export default function App({ Component, pageProps }: AppProps) {
  const { socket } = useWebSocket();

  return (
    <QueryClientProvider client={queryClient}>
      <WsContext.Provider value={socket}>
        <main className={roboto.className}>
          <Component {...pageProps} />
          <Toaster richColors position='top-center' />
        </main>
      </WsContext.Provider>
    </QueryClientProvider>
  );
}
