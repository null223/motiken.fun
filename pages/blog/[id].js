import { htmlToText } from 'html-to-text'

import Head from '@/components/Head'

export default function BlogId({ blog }) {
  return (<>
    <Head>
      <title>motiken.fun マイページ</title>
      <meta property="og:title" content={blog.title+" motiken.fun"} />
      <meta property="og:description" content={htmlToText(blog.body, {limits: 40})} />
      <meta property="og:image" content={blog.image.url} />
      <meta property="og:type" content="article" />
    </Head>
    <main>
      <div className="container">
        <img src={blog.image.url} alt={blog.title} />
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <p className="category">{blog.category && `${blog.category.name}`}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </div>
    </main>
  </>);
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(`https://${process.env.API_NAME}.microcms.io/api/v1/blog`, key)
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
    `https://${process.env.API_NAME}.microcms.io/api/v1/blog/` + id,
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