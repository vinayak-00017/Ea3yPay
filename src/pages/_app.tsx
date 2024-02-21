import Appbar from "@/components/Appbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main >
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_150%)]"></div>
      <QueryClientProvider client={queryClient}>
        <Appbar></Appbar>
        <Component {...pageProps} />  
      </QueryClientProvider>
    </main>
  )
}
