import { useRouter } from 'next/router'
import { htmlToText } from 'html-to-text'
import styled, { css } from 'styled-components'
import { formatDate } from '@/lib/dayjs'
import Api from '@/lib/api'

import BaseLayout from '@/components/BaseLayout'
import { NextSeo } from 'next-seo'
import Box from '@/components/Box'
import Custom404 from '@/pages/404'

// 静的生成のためのパスを指定します
export const getStaticPaths = () => ({paths: [], fallback: 'blocking'})


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const data = await Api
    .get({
      endpoint: 'blog',
      contentId: context.params.id
    })
    .then(res => res)
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
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
            <p className="blog-published">{formatDate(blog.publishedAt)}</p>
            <p className="blog-category">{blog.category && `${blog.category.name}`}</p>
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
    <NextSeo
      title={blog.title}
      description={htmlToText(blog.body, {limits: 40})}
      openGraph={{
        type: "article",
        images: [{url: blog.image ? blog.image.url : require("@/assets/images/ogp.png")}]
      }}
    />
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
  .blog-published {
    color: ${theme.colors.black_light};
    font-size: .875rem;
    margin-bottom: .25rem;
    text-align: right;
  }
  .blog-category {
    background: linear-gradient(transparent 66%, yellow 66%);
    display: inline-block;
    font-weight: bold;
    padding: 0 2px;
  }
  & h1 {
    font-size: 1.25rem;
  }
`}`
