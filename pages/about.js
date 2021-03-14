import Link from 'next/link'
import styled, { css } from 'styled-components'

import Head from '@/components/Head'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    `https://${process.env.API_NAME}.microcms.io/api/v1/about/`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      data,
    },
  };
};

function About({ data }) {
  return <>
    <Head>
      <title>motiken.fun ポートフォリオ</title>
      <meta property="og:title" content="motiken.fun ポートフォリオ" />
      <meta property="og:description" content="motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="article" />
    </Head>
    <PageHead name="About">
      <p>ポートフォリオ</p>
    </PageHead>
    <main>
      <div className="container">
        <StAbout>
          <Box
            header="プロフィール"
          >
            <div className="px-4">
              <div
                className="mb-3"
                dangerouslySetInnerHTML={{
                  __html: data.profile
                }}
              />
              <p className="mb-0">
                <Link href={"https://twitter.com/" + data.twitterid}>
                  <a
                    target="_blank"
                    rel="noopener"
                  ><i className="fab fa-twitter-square fa-2x" /></a>
                </Link>
              </p>
            </div>
          </Box>
          <Box
            header="仕事について"
          >
            <div className="px-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.body
                }}
              />
            </div>
          </Box>
          <Box
            header="このサイトについて"
          >
            <div className="px-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.about
                }}
              />
            </div>
          </Box>
        </StAbout>
      </div>
    </main>
  </>
}

export default About

const StAbout = styled.section`
${({theme}) => css`
  & .fa-twitter-square {
    color: #1DA1F2 !important;
  }
`}`

