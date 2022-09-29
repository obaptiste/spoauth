import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/core/types';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps<Session>) {
  return (
    <SessionProvider session={pageProps.session as typeof pageProps}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
