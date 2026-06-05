import "../components/plasmic/son_vo/plasmic.css"; 
import { Koulen } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head"; 
import { CursorProvider } from "../components/CursorContext";
import { CustomCursor } from "../components/CustomCursor";

const fontKoulen = Koulen({
  weight: "400",
  subsets: ["khmer", "latin"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Ghi đè chính xác biến CSS bị lỗi của Plasmic */}
      <style jsx global>{`
        :root, .plasmic_default_styles {
          --mixin-9Kwp1_irI7wZ_font-family: ${fontKoulen.style.fontFamily} !important;
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