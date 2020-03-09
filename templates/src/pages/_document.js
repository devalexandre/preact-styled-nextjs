import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from 'styled-components'
import Manifest from '../../public/manifest.json'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="pt">
       <Head>
        <meta charset="utf-8"/>
       
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="theme-color" content={Manifest.theme_color}/>
        <link rel="apple-touch-icon" href="./assets/icon.png"></link>
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}