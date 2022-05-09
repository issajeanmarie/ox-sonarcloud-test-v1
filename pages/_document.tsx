import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

type Props = null;

class Document extends NextDocument<Props> {
  render = (): JSX.Element => {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/logo.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@200;300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}

export default Document;
