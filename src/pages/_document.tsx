import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Kevin Landen - Professional website showcasing my work, services, and contact information" />
          <meta name="theme-color" content="#8B4513" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Google Fonts */}
          <link 
            href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap" 
            rel="stylesheet" 
          />
          
          {/* Bootstrap Icons */}
          <link 
            rel="stylesheet" 
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
          />
          
          {/* Preload critical CSS */}
          <style jsx global>{`
            @font-face {
              font-display: swap;
            }
          `}</style>
        </Head>
        <body className="antialiased text-gray-900 bg-white dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}