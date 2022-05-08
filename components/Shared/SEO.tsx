import React from "react";
import Head from "next/head";

const SEO = ({ title, linkRel, linkHref, desc }) => (
  <Head>
    <meta name="description" content={desc} />
    <title>{title}</title>
    <link rel={linkRel} href={linkHref} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  </Head>
);

export default SEO;
