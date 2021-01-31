import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="preconnect" href="//db.onlinewebfonts.com" />
          <link rel="stylesheet" href="//db.onlinewebfonts.com/c/762c72a2791c9d3eadc7e3b6b935aa69?family=SF+UI+Display" type="text/css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}