import "../components/plasmic/son_vo/plasmic.css"; // plasmic-import: bLa1shfC4noziDsvmxjKJF/projectcss
import type { AppProps } from "next/app";
import Head from "next/head";
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CursorProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <link
            rel="preload"
            as="video"
            href="https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/video/video_time%20laspe.mp4"
            type="video/mp4"
          />
          
          {/* Giữ nguyên 2 dòng preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Cập nhật dòng này: Gộp cả Koulen, Pinyon Script và Roboto Mono vào cùng 1 link */}
          <link href="https://fonts.googleapis.com/css2?family=Koulen&family=Pinyon+Script&family=Roboto+Mono&display=swap" rel="stylesheet" />

        </Head>

        <CustomCursor />
        <Component {...pageProps} />
      </CursorProvider>
    </>
  );
}