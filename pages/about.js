import Link from 'next/link'

import PageHead from '../components/PageHead'
import Box from '../components/Box'

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
  return (<>
    <PageHead name="About">
      <p>ポートフォリオ</p>
    </PageHead>
    <main>
      <div className="container">
        <Box>
          <h2>名前</h2>
          <p>{data.name}</p>
          <p>
            <Link href={"https://twitter.com/" + data.twitterID}>
              <a><i className="fab fa-twitter-square fa-2x" /></a>
            </Link>
          </p>
          <hr />
          <h2>概要</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: data.body
            }}
          />
          <hr />
          <h2>このサイトについて</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: data.about
            }}
          />
        </Box>
      </div>
    </main>
  </>)
}

export default About
