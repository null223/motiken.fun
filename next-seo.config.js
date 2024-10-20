// const env = process.env;

export default {
  titleTemplate: '%s | モチ研',
  defaultTitle: 'モチ研',
  description: 'モチ研サイト 現在、鋭意製作中',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    site_name: 'motiken',
    images: [
      { url: `https://${process.env.NEXT_PUBLIC_DOMAIN}/ogp.png` }
    ]
  },
  twitter: {
    cardType: 'summary_large_image',
    site: `@${process.env.NEXT_PUBLIC_TWITTER_ID}`
  },
}