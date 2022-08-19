import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

type Props = null;

class Document extends NextDocument<Props> {
  render = (): JSX.Element => {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/logo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHgwcB3X6WdORbT2I5Ra5spl1raTEDWG8&libraries=places"
            defer
          />
        </body>
      </Html>
    );
  };
}

export default Document;
