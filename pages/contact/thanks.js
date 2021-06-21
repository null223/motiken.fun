import styled, { css } from 'styled-components'

import BaseLayout from '@/components/BaseLayout'
import { NextSeo } from 'next-seo'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

function PageMain() {
  return <>
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

function ContactThanks() {
  return <>
    <NextSeo
      title="お問いあわせ完了"
      description="お問いあわせいただきありがとうございました。"
    />
    <BaseLayout>
      <PageHead name="Contact Complete">
        <p>お問い合わせありがとうございます。</p>
      </PageHead>
      <PageMain />
    </BaseLayout>
  </>
}

export default ContactThanks
