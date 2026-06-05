import "../components/plasmic/son_vo/plasmic.css"; 
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 🎯 BẮN TỈA DIỆN RỘNG: Ép TẤT CẢ mọi phần tử nếu chứa biến lỗi này phải đổi thành Koulen */}
      <style jsx global>{`
        * {
          --mixin-9Kwp1_irI7wZ_font-family: 'Koulen', sans-serif !important;
        }
      `}</style>

      <CursorProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          
          {/* 🌐 TẢI FONT TRUYỀN THỐNG: Nhúng trực tiếp link Google Fonts vào HTML */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />

          <link
            rel="preload"
            as="video"
            href="https://cdn.jsdelivr.net/gh/thu789987/Hongsonvo/public/video/video_time%20laspe.mp4"
            type="video/mp4"
          />
        </Head>

        <CustomCursor />
        <Component {...pageProps} />
      </CursorProvider>
    </>
  );
}