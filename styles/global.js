import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.colors.black};
    font-size: 14px;
  }
  .container {
  }
  img {
    max-width: 100%;
  }
`

export default GlobalStyle;
