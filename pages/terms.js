import Link from 'next/link'
import styled, { css } from 'styled-components'

import BaseLayout from '@/components/BaseLayout'
import { NextSeo } from 'next-seo'
import PageHead from '@/components/PageHead'
import PageMain from '@/components/pages/Terms'


function Terms(props) {
  return <>
    <NextSeo
      title="利用規約"
      openGraph={{type:"article"}}
    />
    <BaseLayout>
      <PageHead name="Terms">
        <p>利用規約</p>
      </PageHead>
      <PageMain {...props} />
    </BaseLayout>
  </>
}

export default Terms

const StSectionContainer = styled.section`
${({theme, colored}) => css`
  padding: 88px 0;
  background-color: ${colored ? theme.colors.secondaryBorder : theme.colors.white};
  .container {
    max-width: 620px;
  }
  .title {
    color: ${theme.colors.black_light};
    text-align: center;
  }
  .body {
    white-space: pre-wrap;
  }
`}`

const StSection = ({children, ...props}) => <StSectionContainer {...props} ><div className="container">{children}</div></StSectionContainer>
