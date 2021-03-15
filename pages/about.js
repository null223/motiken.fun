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
      <StProfile bgImage={data.profile_bg.url}>
        <div className="p-3">
          <div className="profile-image">
            <div><img src={data.icon.url} alt={data.name} /></div>
          </div>
          <div className="profile-body">
            <h2>{data.name}</h2>
            <p>{data.profile}</p>
            <div className="profile-sns">
              <Link href={"https://twitter.com/" + process.env.NEXT_PUBLIC_TWITTER_ID}>
                <a
                  target="_blank"
                  rel="noopener"
                ><i className="fab fa-twitter-square fa-2x" /></a>
              </Link>
            </div>
          </div>
        </div>
      </StProfile>
      <div className="container">
        <StAbout>
          
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
`}`

const StProfile = styled.section`
${({theme, bgImage}) => css`
  position: relative;
  width: 100%;
  margin-top: -3rem;
  margin-bottom: 3rem;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${theme.colors.black};
    opacity: .7;
  }
  & > div {
    position: relative;
  }
  .profile-image {
    margin: 30px auto 0;
    display: block;
    max-width: 250px;
    & > div {
      border-radius: 50%;
      overflow: hidden;
      border: 5px solid ${theme.colors.white};
    }
    @media (max-width: 768px) {
      max-width: 200px;
    }
  }
  .profile-body {
    max-width: 600px;
    width: 100%;
    margin: 32px auto 50px;
    text-align: center;
    & h2, & p {
      color: ${theme.colors.white};
    }
    & p {
      white-space: pre-wrap;
    }
  }
  .profile-sns {
    & a {
      display: inline-block;
      padding: 4px 6px 3px;
      border-radius: 50%;
      transition: opacity .2s ease;
      &:hover {
        opacity: .7;
      }
      & .fa-twitter-square {
        color: #1DA1F2 !important;
      }
    }
  }
`}`

