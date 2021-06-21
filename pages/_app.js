// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
// import 'slick-carousel/slick/slick.css'
// import 'pattern.css/dist/pattern.min.css'

import { ThemeProvider } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import SEO from '@/next-seo.config'
import PretendBody from '@/components/PretendBody'
import GlobalStyle from '@/styles/global.js'
import theme from '@/styles/theme.js'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DefaultSeo {...SEO} />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="msapplication-TileColor" content={theme.colors.primary} />
        <meta name="theme-color" content={theme.colors.primary} />
        <link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined" rel="stylesheet" />
      </Head>
      {/*<Header />*/}
      <Component {...pageProps} />
      {/*<Footer />*/}
      <PretendBody />
    </ThemeProvider>
  )
}

export default MyApp
