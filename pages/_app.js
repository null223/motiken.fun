// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
// import 'slick-carousel/slick/slick.css'
// import 'pattern.css/dist/pattern.min.css'

import { ThemeProvider } from 'styled-components'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import PretendBody from '@/components/PretendBody'
import GlobalStyle from '@/styles/global.js'
import theme from '@/styles/theme.js'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/*<Header />*/}
      <Component {...pageProps} />
      {/*<Footer />*/}
      <PretendBody />
    </ThemeProvider>
  )
}

export default MyApp
