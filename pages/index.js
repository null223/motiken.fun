// pages/index.js
import Link from 'next/link'
import PageHead from '../components/PageHead'

export default function Home({ blog }) {
  return (<>
    <PageHead name="Top">
      <p>仮置き</p>
    </PageHead>
    <main>
      <div className="container">
          <ul>
            {blog.map(blog => (
              <li key={blog.id}>
                <Link href={`blog/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </main>
  </>);
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(`https://${process.env.API_NAME}.microcms.io/api/v1/blog`, key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  };
};
