import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.colors.black};
    font-size: 14px;
  }
  .container {
  }

`

export default GlobalStyle;
