
import Link from 'next/link'
import styled, { css } from 'styled-components'

const Header = () => {
  return (
    <StHeader className="header">
      <div className="header__title">
        <Link href="/">
          <a>
            motiken.fun
          </a>
        </Link>
      </div>
      <div className="header__nav">
        <Link href="/">
          <a>TOP</a>
        </Link>
        <Link href="/about">
          <a>ABOUT</a>
        </Link>
        <Link href="/contact">
          <a>CONTACT</a>
        </Link>
      </div>
    </StHeader>
  )
}

export default Header

const StHeader = styled.header`
${({theme}) => css`
  background-color: ${theme.colors.primary};
  padding: 16px;
  display: flex;
  color: ${theme.colors.white};
  & a {
    color: ${theme.colors.white};
    font-weight: bold;
    font-family: 'FredokaOne';
    transition: opacity .3s ease;
    &:hover {
      color: ${theme.colors.white};
      text-decoration: none !important;
      opacity: .7;
    }
  }
  .header {
    // no white here
    &__title {
      font-weight: bold;
    }
    &__nav {
      margin-left: auto;
      & a {
        margin-left: .5rem;
      }
    }
  }
`}`
