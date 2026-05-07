import type { AppProps } from 'next/app';
import Head from 'next/head'; // 1. Bắt buộc phải import Head từ next/head
import { CursorProvider } from '../components/CursorContext'; 
import { CustomCursor } from '../components/CustomCursor';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Cái này sẽ tự động bọc mọi trang (index, about, contact...) trên web của bạn
    <CursorProvider>
      {/* 2. Đặt thẻ meta vào bên trong Head */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <CustomCursor />
      <Component {...pageProps} />
    </CursorProvider>
  );
}