import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/theme";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>TwitterClone</title>
        <meta name="description" content="TwitterClone" />
      </Head>
      <Link href="/">
        <h1>TwitterClone</h1>
      </Link>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
