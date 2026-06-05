import "../styles/globals.css"; 
import "../components/plasmic/son_vo/plasmic.css"; 
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

// 🌐 1. Tải font chuẩn từ Next.js để lưu cache, không lo bị chặn hay lỗi mạng
import { Koulen, Pinyon_Script } from 'next/font/google';

const koulen = Koulen({
  weight: '400', 
  subsets: ['latin'],
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 🎯 2. ĐÁNH TRÁO PHẠM VI HẸP: Chỉ đè đúng tên font lỗi, các font khác giữ nguyên tự nhiên */}
      <style jsx global>{`
        /* Khi Plasmic gọi biến font lỗi này, nó sẽ lấy font Koulen đã tải ở trên thay vì Times New Roman */
        :root {
          --mixin-9Kwp1_irI7wZ_font-family: ${koulen.style.fontFamily} !important;
        }

        /* Khi Plasmic gọi font viết tay lỗi (Roboto Mono), trình duyệt sẽ tráo bằng Pinyon Script */
        @font-face {
          font-family: 'Roboto Mono';
          src: local('${pinyonScript.style.fontFamily}');
        }
      `}</style>

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
    </>
  );
}