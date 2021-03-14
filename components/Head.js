import Head from 'next/head'
import { useRouter } from 'next/router'
import theme from '@/styles/theme'

const TemplateHead = (props) => {
  const router = useRouter()
  const domain = `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  return (
    <Head>
      {props.children}
      {/*
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content={props.type}>
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image.url} />
      */}
      <meta property="og:url" content={domain + router.pathname} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={"@" + process.env.NEXT_PUBLIC_TWITTER_ID} />
      <meta property="og:site_name" content="motiken.fun" />
      <meta property="og:locale" content="ja_JP" />
      {/*<link rel="apple-touch-icon-precomposed" href={props.icon.url + "?w=150"} />
      <link rel="icon" href={props.icon.url + "?w=16"} sizes="16x16" type="image/png" />
      <link rel="icon" href={props.icon.url + "?w=32"} sizes="32x32" type="image/png" />
      <link rel="icon" href={props.icon.url + "?w=48"} sizes="48x48" type="image/png" />
      <link rel="icon" href={props.icon.url + "?w=62"} sizes="62x62" type="image/png" />*/}
      <meta name="msapplication-TileColor" content={theme.colors.primary} />
      <meta name="theme-color" content={theme.colors.primary} />
    </Head>
  )
}

export default TemplateHead
