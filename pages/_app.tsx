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
          
          {/* 1. Thêm 3 dòng này để tải Google Font Koulen trực tiếp từ HTML */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />

        </Head>

        <CustomCursor />
        <Component {...pageProps} />
      </CursorProvider>
    </>
  );
}