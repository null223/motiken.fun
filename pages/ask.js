import { NextSeo } from 'next-seo'

import BaseLayout from '@/components/BaseLayout'
import PageHead from '@/components/PageHead'
import PageMain from '@/components/pages/Ask'

function Ask() {
  return <>
    <NextSeo
      title="なるに聞きたい"
      description="なる（motiken.fun運営者）について、AIに質問できるページです。"
      openGraph={{ type: 'website' }}
    />
    <BaseLayout>
      <PageHead name="Ask">
        <p>なるに聞きたい</p>
      </PageHead>
      <PageMain />
    </BaseLayout>
  </>
}

export default Ask
