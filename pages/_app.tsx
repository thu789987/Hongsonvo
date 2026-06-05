import "../components/plasmic/son_vo/plasmic.css"; // plasmic-import: bLa1shfC4noziDsvmxjKJF/projectcss
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
      {/* CÔNG TẮC THÔNG MINH: Chỉ nhắm vào những thẻ được Plasmic gắn tên Koulen */}
      <style jsx global>{`
        [style*="Koulen"], 
        [style*="koulen"], 
        .plasmic_font_Koulen,
        .plasmic_font_koulen {
          font-family: ${fontKoulen.style.fontFamily} !important;
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