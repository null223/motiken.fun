// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import GlobalStyle from '../styles/global.js'
import { ThemeProvider } from 'styled-components'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
