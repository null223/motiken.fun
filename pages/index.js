// pages/index.js
import Link from 'next/link'
import styled, { css } from 'styled-components'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  }
  const data = await fetch(`https://${process.env.API_NAME}.microcms.io/api/v1/blog`, key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  }
}

export default function Home({ blog }) {
  return <>
    <PageHead name="Top">
      <p>仮置き</p>
    </PageHead>
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
                    <a>{blog.title}</a>
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
