import Appbar from "@/components/Appbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main >
      <QueryClientProvider client={queryClient}>
        <Appbar></Appbar>
        <Component {...pageProps} />  
      </QueryClientProvider>
    </main>
  )
}
