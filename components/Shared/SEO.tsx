import React from "react";
import Head from "next/head";

type Types = {
  title: string;
  linkRel?: string;
  linkHref?: string;
  desc?: string;
};

const SEO = ({
  title = "OX Delivers Portal",
  linkRel = "icon",
  linkHref = "/logo.png",
  desc = "OX Delivers Portal Dashboard"
}: Types) => (
  <Head>
    <meta name="description" content={desc} />
    <title>{title}</title>
    <link rel={linkRel} href={linkHref} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
  </Head>
);

export default SEO;
