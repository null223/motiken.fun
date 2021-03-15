import { htmlToText } from 'html-to-text'
import styled, { css } from 'styled-components'

import Head from '@/components/Head'
import Box from '@/components/Box'

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(`https://${process.env.API_NAME}.microcms.io/api/v1/blog?fields=id&limit=500`, key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/blog/${content.id}`);
  return {paths, fallback: false};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    `https://${process.env.API_NAME}.microcms.io/api/v1/blog/${id}`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};

export default function BlogId({ blog }) {
  return (<>
    <Head>
      <title>{blog.title+" motiken.fun"}</title>
      <meta property="og:title" content={blog.title+" motiken.fun"} />
      <meta property="og:description" content={htmlToText(blog.body, {limits: 40})} />
      <meta property="og:image" content={blog.image ? blog.image.url : require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="article" />
    </Head>
    <main>
      <div className="container mt-4">
        <Box>
          <StBlogId className="px-3">
            {blog.image && (
              <div className="blog-image">
                <img src={blog.image.url} alt={blog.title} />
              </div>
            )}
            <h1>{blog.title}</h1>
            <p>{blog.publishedAt}</p>
            <p className="category">{blog.category && `${blog.category.name}`}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
              }}
            />
          </StBlogId>
        </Box>
      </div>
    </main>
  </>);
}

const StBlogId = styled.div`
${({theme}) => css`
  margin-top: 1.5rem;
  .blog-image {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  & h1 {
    font-size: 1.25rem;
  }
`}`
