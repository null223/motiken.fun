// pages/index.js
import Link from 'next/link'
import styled, { css } from 'styled-components'

import BaseLayout from '@/components/BaseLayout'
import Head, { OgUrl } from '@/components/Head'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  }
  const data = await fetch(`https://${process.env.API_NAME}.microcms.io/api/v1/blog?fields=id,title,icon&limit=30`, key)
    .then(res => res.json())
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
      <meta property="og:description" content="motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="website" />
      <OgUrl path="/" />
    </Head>
    <BaseLayout>
      <PageHead name="Top">
        <p>仮置き</p>
      </PageHead>
      <PageMain blog={blog} />
    </BaseLayout>
  </>
}

export default Home

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
`}`
