import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="preconnect" href="//db.onlinewebfonts.com" />
          <link rel="stylesheet" href="//db.onlinewebfonts.com/c/19d93ed94fcde59d609dd56bb0f1e9f0?family=SF+UI+Display" />
          <link rel="stylesheet" href="//db.onlinewebfonts.com/c/c1f9a988cca69a193c0c29039a0fb81e?family=SF+UI+Display+Semibold" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}