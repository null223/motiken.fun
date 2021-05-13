import { useRouter } from 'next/router'
import { htmlToText } from 'html-to-text'
import styled, { css } from 'styled-components'
import dayjs from '@/config/dayjs'

import BaseLayout from '@/components/BaseLayout'
import Head, { OgUrl } from '@/components/Head'
import Box from '@/components/Box'
import Custom404 from '@/pages/404'

// 静的生成のためのパスを指定します
export const getStaticPaths = () => ({paths: [], fallback: true})


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
    revalidate: 1,
  };
};

function PageMain({ blog }) {
  return (<>
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
            <p>{dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY/MM/DD')}</p>
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

function BlogId({ blog }) {
  const router = useRouter()

  if (!blog) return <Custom404 />
  if (!router.isFallback && !blog?.id) return <Custom404 />

  return <>
    <Head>
      <title>{blog.title+" motiken.fun"}</title>
      <meta property="og:title" content={blog.title+" motiken.fun"} />
      <meta property="og:description" content={htmlToText(blog.body, {limits: 40})} />
      <meta property="og:image" content={blog.image ? blog.image.url : require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="article" />
      <OgUrl path={`/blog/${blog.id}`} />
    </Head>
    <BaseLayout>
      <PageMain blog={blog} />
    </BaseLayout>
  </>
}

export default BlogId

const StBlogId = styled.div`
${({theme}) => css`
  margin-top: 1.5rem;
  .blog-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  & h1 {
    font-size: 1.25rem;
  }
`}`
