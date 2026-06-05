import "../styles/globals.css"; 
import "../components/plasmic/son_vo/plasmic.css"; 
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

// 🌐 1. IMPORT CÁC FONT CHUẨN NEXT.JS (Tự động tải về máy chủ khi Build)
import { Koulen, Pinyon_Script } from 'next/font/google';

const koulen = Koulen({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-koulen', // Tạo biến CSS để tái sử dụng
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon', // Tạo biến CSS cho font viết tay
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 🎯 2. ÉP BIẾN FONT CỦA NEXT.JS ĐÈ LÊN CÁC CLASS CỦA PLASMIC */}
      <style jsx global>{`
        :root, 
        .plasmic_default_styles, 
        .plasmic_default_styles *,
        [class*="PlasmicHomepage"] {
          /* Ép các lớp mặc định của Plasmic sử dụng Font Koulen vừa tải */
          --mixin-9Kwp1_irI7wZ_font-family: var(--font-koulen), sans-serif !important;
          font-family: var(--font-koulen), sans-serif !important;
        }

        /* Bắn tỉa riêng đoạn chữ viết tay uốn lượn "bridgingEmotion..." */
        [class*="bridgingEmotionAndClarity"] {
          font-family: var(--font-pinyon), cursive !important;
        }
      `}</style>

      {/* 3. BỌC TOÀN BỘ ỨNG DỤNG TRONG LỚP CLASS FONT VÀ CON TRỎ CHUỘT */}
      <main className={`${koulen.variable} ${pinyonScript.variable}`}>
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
          </Head>

          <CustomCursor />
          <Component {...pageProps} />
        </CursorProvider>
      </main>
    </>
  );
}