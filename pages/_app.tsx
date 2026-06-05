import "../components/plasmic/son_vo/plasmic.css"; 
import { Koulen } from "next/font/google"; 
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

// 🎯 Khởi tạo font dưới dạng một Biến CSS ngầm
const fontKoulen = Koulen({
  weight: "400",
  subsets: ["khmer", "latin"],
  display: "swap",
  variable: "--my-custom-koulen", // 👈 Đặt tên biến CSS ở đây
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // 💡 BẮT BUỘC: Gắn fontKoulen.variable vào thẻ div bọc ngoài cùng 
    // để Next.js NHẬN DIỆN và KHÔNG XÓA file font lúc build.
    <div className={fontKoulen.variable}>
      
      {/* 🔮 BẮN TỈA CHÍNH XÁC: Lấy biến font vừa tạo đè thẳng vào mã lỗi của Plasmic */}
      <style jsx global>{`
        :root, .plasmic_default_styles {
          --mixin-9Kwp1_irI7wZ_font-family: var(--my-custom-koulen), sans-serif !important;
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
    </div>
  );
}