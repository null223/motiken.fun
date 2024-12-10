// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
// import 'slick-carousel/slick/slick.css'
// import 'pattern.css/dist/pattern.min.css'

import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import Head from 'next/head'
import SEO from '@/next-seo.config'
import PretendBody from '@/components/PretendBody'
import GlobalStyle from '@/styles/global.js'
// import theme from '@/styles/theme.js'
import {getThemeColor} from '@/core/services/theme.service'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const theme = getThemeColor()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DefaultSeo {...SEO} />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="msapplication-TileColor" content={theme.colors.primary} />
        <meta name="theme-color" content={theme.colors.primary} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
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
