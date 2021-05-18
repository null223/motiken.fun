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

  @font-face {
    font-family: 'FredokaOne';
    src: url('/fonts/FredokaOne-Regular.ttf') format("truetype");
  }
`

export default GlobalStyle;
