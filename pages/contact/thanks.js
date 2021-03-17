import styled, { css } from 'styled-components'

import Head, { OgUrl } from '@/components/Head'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

function ContactThanks() {
  return <>
    <Head>
      <title>motiken.fun お問い合わせ送信ありがとうございます</title>
      <meta property="og:title" content="motiken.fun お問い合わせ送信ありがとうございます" />
      <meta property="og:description" content="お問い合わせ送信ありがとうございます　motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="website" />
      <OgUrl path="/contact/thanks" />
    </Head>
    <PageHead name="Contact Complete">
      <p>お問い合わせありがとうございます。</p>
    </PageHead>
    <main>
      <div className="container">
        <Box>
          <div className="px-3">
            <h2>お問い合わせありがとうございます。</h2>
            <p>内容確認して、お力になれるか・どんな流れになりそうかなどできるだけ早くお伝えしようと思います。</p>
            <p>それまで少々お待ちくださいませ。</p>
          </div>
        </Box>
      </div>
    </main>
  </>
}

export default ContactThanks
