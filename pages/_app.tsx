import "../styles/globals.css";
import "../styles/nprogress.css";
import "antd/dist/antd.css";
import { useEffect, FC } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { AppLoadingLoader } from "../components/Loaders";
import { SEO } from "../components/Shared";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <SEO title="OX Dashboard" linkRel="icon" linkHref="/logo.png" />
      <Component {...pageProps} />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
  loading: () => <AppLoadingLoader />
});
