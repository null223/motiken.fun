import styled, { css } from 'styled-components'

const Box = ({ children }) => (
  <StBox>{children}</StBox>
)

export default Box

const StBox = styled.div`
${({theme}) => css`
  border: 1px solid ${theme.colors.blue};
  border-radius: 8px;
  padding: 15px;
`}`