// pages/index.js
import Link from 'next/link'
import styled, { css } from 'styled-components'

import  Api from '@/lib/api'
import BaseLayout from '@/components/BaseLayout'

import { NextSeo } from 'next-seo'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'
import PageMain from '@/components/pages/Top'

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  // const blogs = await Api
  //   .get({
  //     endpoint: 'blog',
  //     queries: { limit: 30, fieids: 'id,title,icon' },
  //   })
  //   .then(res => res)
  //   .catch(() => null);

  const about = await Api
    .get({endpoint: 'about'})
    .then(res => res)
    .catch(() => null);
  return {
    props: {
      // blog: blogs.contents,
      about: about
    },
  }
}

function Home(props) {
  return <>
    <NextSeo />
    <BaseLayout>
      <Hero>
        <img src="/hero-video_cmp.gif" alt="モチ研" />
      </Hero>
      <PageHead name="Top">
        <p>はじめまして、なるです。</p>
      </PageHead>
      <PageMain {...props} />
    </BaseLayout>
  </>
}

export default Home

const Hero = styled.div`
  background-color: #fbb3b4;
  img {
    display: block;
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
  }
`

const StBlog = styled.section`
${({theme}) => css`
  & .box-body {
    ul {
      padding: 0;
      list-style: none;
      border-top: 1px solid ${theme.colors.border};
      margin-bottom: -16px;
    }
    li {
      list-style: none;
      border-bottom: 1px solid ${theme.colors.border};
      & a {
        display: block;
        width: 100%;
        padding: 6px 18px;
        color: ${theme.colors.gray};
        &:hover {
          text-decoration: none;
          background-color: ${theme.colors.secondary};
        }
      }
    }
  }
  .prologue {
    p {
      margin-bottom: 0;
    }
    p.font-weight-bold {
      font-weight: bold;
    }
    p.sup {
      font-size: .8rem;
      color: ${theme.colors.gray};
    }
  }
`}`
