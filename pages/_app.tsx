import "../styles/globals.css"; 
import "../components/plasmic/son_vo/plasmic.css"; 
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ⚠️ LÁ BÙA THƯỢNG TẦNG: Ép toàn bộ các thẻ từ gốc rễ không được dùng Times New Roman */}
      <style jsx global>{`
        /* Lệnh 1: Ép tất cả các class mặc định của Plasmic phải nhận Koulen */
        :root, 
        .plasmic_default_styles, 
        .plasmic_default_styles *,
        [class*="PlasmicHomepage"] {
          --mixin-9Kwp1_irI7wZ_font-family: 'Koulen', sans-serif !important;
          font-family: 'Koulen', sans-serif !important;
        }

        /* Lệnh 2: Bắn tỉa riêng đoạn chữ viết tay, ép chết font Pinyon Script, đè bẹp Times New Roman */
        [class*="bridgingEmotionAndClarity"] {
          font-family: 'Pinyon Script', cursive !important;
        }
      `}</style>

      <CursorProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          
          {/* Cưỡng chế trình duyệt đi lấy font từ Google về máy */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Koulen&family=Pinyon+Script&display=swap" rel="stylesheet" />

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