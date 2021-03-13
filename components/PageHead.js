
import Link from 'next/link'
import styled, { css } from 'styled-components'

const PageHead = ({ children, name }) => {
  return (
    <StPageHead className="pt-3 mb-5">
      <h1>{name}</h1>
      {children}
    </StPageHead>
  )
}

export default PageHead

const StPageHead = styled.div`
${({theme}) => css`
  background-color: ${theme.colors.secondary};
  border-bottom: 1px solid ${theme.colors.secondaryBorder};
  padding-left: 15px;
  padding-right: 15px;
  & p {
    color: ${theme.colors.gray};
  }
`}`
