
import styled, { css } from 'styled-components'

const Footer = () => (
  <StFooter></StFooter>
)

export default Footer

const StFooter = styled.footer`
${({theme}) => css`
  margin-top: 3rem;
  border-top: 1px solid ${theme.colors.secondaryBorder};
  height: 140px;
  background-color: ${theme.colors.secondary};
`}`
