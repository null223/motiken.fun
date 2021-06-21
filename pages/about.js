import Link from 'next/link'
import styled, { css } from 'styled-components'

import Api from '@/config/api'
import BaseLayout from '@/components/BaseLayout'
import { NextSeo } from 'next-seo'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'
import PageMain from '@/components/pages/About'

export const getStaticProps = async () => {
  const data = await Api
    .get({endpoint: 'about'})
    .then(res => res)
    .catch(() => null);
  return {
    props: {
      data,
    },
  };
};

function About(props) {
  return <>
    <NextSeo
      title="サイトについて"
      openGraph={{type:"article"}}
    />
    <BaseLayout>
      <PageHead name="About">
        <p>サイトについて</p>
      </PageHead>
      <PageMain {...props} />
    </BaseLayout>
  </>
}

export default About

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
