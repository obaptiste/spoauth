import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/core/types";
import { RecoilRoot } from "recoil";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<Session>) {
  return (
    <SessionProvider session={pageProps.session as typeof pageProps}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
