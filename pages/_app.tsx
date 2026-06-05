import "../components/plasmic/son_vo/plasmic.css"; // plasmic-import: bLa1shfC4noziDsvmxjKJF/projectcss
import { Koulen } from "next/font/google"; // 👈 Vũ khí mới của Next.js
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

// 👇 KHỞI TẠO FONT (Phải nằm ngay dưới cụm import và trên hàm MyApp)
const fontKoulen = Koulen({
  weight: "400",
  subsets: ["khmer", "latin"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // 👇 Bọc toàn bộ web bằng Font Koulen nội bộ
    <main className={fontKoulen.className}>
      
      {/* Lớp bùa chú ép tất cả các thẻ phải dùng Koulen */}
      <style jsx global>{`
        * {
          font-family: ${fontKoulen.style.fontFamily} !important;
        }
      `}</style>

      {/* Code cũ của bạn giữ nguyên từ đây */}
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
  );
}