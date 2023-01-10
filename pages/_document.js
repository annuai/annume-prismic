import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <meta name="description" content="Annuai - Rants of the curious clot." /> */}
        <link rel="icon" href="https://annu.me/favicon.ico" />
        {/* <meta property="og:title" content={"Annuai - Rants of the curious clot."} />
        <meta property="og:description" content="This is where I write about everything that interests me, also share links to wonderful websites." /> */}
        <meta property="og:image" content="https://annu.me/og-image.png" />
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
