import type { AppProps } from 'next/app';
import { CursorProvider } from '../components/CursorContext'; 
import { CustomCursor } from '../components/CustomCursor';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Cái này sẽ tự động bọc mọi trang (index, about, contact...) trên web của bạn
    <CursorProvider>
      <CustomCursor />
      <Component {...pageProps} />
    </CursorProvider>
  );
}