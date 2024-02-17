import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Roboto } from "next/font/google";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main >
      <Component {...pageProps} />  
    </main>
  )
}
