// pages/index.js
import Link from 'next/link'
import styled, { css } from 'styled-components'

import  Api from '@/config/api'
import BaseLayout from '@/components/BaseLayout'
import Head, { OgUrl } from '@/components/Head'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await Api
    .get({
      endpoint: 'blog',
      queries: { limit: 30, fieids: 'id,title,icon' },
    })
    .then(res => res)
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  }
}

function PageMain({ blog }) {
  return <>
    <main>
      <div className="container">
        <StBlog>
          <Box>
            <div className="px-3 prologue">
              <h2>楽しいこと。コードを書くこと</h2>
              <p>プログラミングも必修になっていくこの現代。</p>
              <p className="mb-3">自分は手に職をつけようと思って始めたプログラミングですがお仕事をいただけるくらいまでなれたことは本当に嬉しいです。</p>
              <p className="mb-4">新しいことが大好きで常に新しい技術を追い求めたり、面白いサイトを考えたりする毎日です。</p>
              <h3 className="mb-3">最近つくったもの</h3>
              <p className="font-weight-bold mb-2">LINEでワードウルフ</p>
              <p className="mb-2">LINEの公式アカウントを使って、ワードウルフのゲーム進行を任せちゃおうという試みです。</p>
              <p className="sup">ワードウルフ</p>
              <blockquote className="twitter-tweet"><p lang="ja" dir="ltr">ここ数日めっちゃ頑張ってた<br/>「LINEでワードウルフ」<br/>とりあえず完成しました〜！！<br/><br/>また遊んでくれる方いらっしゃったらぜひ！！<br/>（2人検証しかできなかったからまだβ版って感じ笑） <a href="https://t.co/FuCH2QVPem">pic.twitter.com/FuCH2QVPem</a></p>&mdash; なる (@null__me) <a href="https://twitter.com/null__me/status/1388793022939160584?ref_src=twsrc%5Etfw">May 2, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              <p className="font-weight-bold mb-2">このサイト</p>
              <p>このサイトはWordPressみたいな既存のブログシステムを使わずに自由にコンテンツを設計できるようにつくりました。</p>
              <p>無駄な処理とかを極力省いて高速にサイトが動くようになりました。</p>
              <p className="mb-2">いつかしっかりデザインを作って、アニメーションとイラストでいっぱいのサイトが作るのが目標です！</p>
              <p className="sup">パフォーマンスチェックしたときの様子</p>
              <blockquote className="twitter-tweet"><p lang="ja" dir="ltr">自分のサイトオールグリーンだった！いえ〜い！<br/><br/>そのうちコンテンツ増やしたりしたいなぁ <a href="https://t.co/VCnOLLZJhS">pic.twitter.com/VCnOLLZJhS</a></p>&mdash; なる (@null__me) <a href="https://twitter.com/null__me/status/1392448627834966018?ref_src=twsrc%5Etfw">May 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              <p></p>
            </div>
          </Box>
          <Box
            header="Blog"
          >
            <ul>
              {blog.map(blog => (
                <li key={blog.id}>
                  <Link href={`blog/${blog.id}`}>
                    <a>{blog.icon+" "+blog.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </StBlog>
      </div>
    </main>
  </>
}

function Home({ blog }) {
  return <>
    <Head>
      <title>motiken.fun マイページ</title>
      <meta property="og:title" content="motiken.fun マイページ" />
      <meta name="description" content="motikenサイト 現在、鋭意製作中"/>
      <meta property="og:description" content="motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={"https://" + process.env.NEXT_PUBLIC_DOMAIN + require("../assets/images/ogp.png")} />
      <meta property="og:type" content="website" />
      <OgUrl path="/" />
    </Head>
    <BaseLayout>
      <Hero>
        <img src={require('../assets/images/hero-video_cmp.gif')} alt="モチ研" />
      </Hero>
      <PageHead name="Top">
        <p>はじめまして、なるです。</p>
      </PageHead>
      <PageMain blog={blog} />
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
