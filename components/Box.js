import styled, { css } from 'styled-components'

const Box = ({ children, header }) => (<>
  {header
    ? (
      <StBox2>
        <div className="box-header">
          <h2>{header}</h2>
        </div>
        <div className="box-body">
          {children}
        </div>
      </StBox2>
    )
    : <StBox>{children}</StBox>
  }
</>)

export default Box

const StBox = styled.div`
${({theme}) => css`
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 15px 0;
`}`

const StBox2 = styled.div`
${({theme}) => css`
  border: 1px solid ${theme.colors.border};
  padding: 15px 0;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  & .box-header {
    margin-bottom: 20px;
    padding: 0 15px;
    & h2 {
      margin-bottom: 0;
      font-size: .875rem;
    }
  }
  & .box-body {
  }
`}`
