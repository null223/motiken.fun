import Link from 'next/link'
import styled, { css } from 'styled-components'

import Api from '@/config/api'
import BaseLayout from '@/components/BaseLayout'
import Head, { OgUrl } from '@/components/Head'
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
    <Head>
      <title>motiken.fun サイトについて</title>
      <meta property="og:title" content="motiken.fun サイトについて" />
      <meta name="description" content="motikenサイト 現在、鋭意製作中" />
      <meta property="og:description" content="motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="article" />
      <OgUrl path="/about" />
    </Head>
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
