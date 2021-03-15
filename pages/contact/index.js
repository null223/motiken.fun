
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { useForm, ValidationError } from '@formspree/react'

import Head from '@/components/Head'
import PageHead from '@/components/PageHead'
import Box from '@/components/Box'

function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM)
  const router = useRouter()
  if (state.succeeded) {
    router.push("/contact/thanks")
  }
  return (
    <form onSubmit={handleSubmit} className="form px-3">
      <label htmlFor="email">
        <i className="far fa-envelope mr-2"/>メールアドレス
      </label>
      <input
        id="email"
        type="email"
        name="_replyto"
        required
        className="form-control"
        placeholder="your@email.com"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">
        <i class="fas fa-envelope-open-text mr-2" />内容
      </label>
      <textarea
        id="message"
        name="message"
        required
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        送信
      </button>
    </form>
  )
}

function ContactIndex() {
  return <>
    <Head>
      <title>motiken.fun お問い合わせページ</title>
      <meta property="og:title" content="motiken.fun お問い合わせページ" />
      <meta property="og:description" content="お問い合わせページ　motikenサイト 現在、鋭意製作中" />
      <meta property="og:image" content={require("@/assets/images/icon.jpg")} />
      <meta property="og:type" content="website" />
    </Head>
    <PageHead name="Contact">
      <p>お問い合わせ</p>
    </PageHead>
    <main>
      <StContact className="container">
        <Box
          header="お問い合わせフォーム"
        >
          <div className="px-3 mb-4">
            <h2>お問い合わせをする前に</h2>
            <p className="m-0">基本的にTwitterやSlackなどのSNSでの連絡をお願いしています。</p>
            <p className="m-0">なのでこのフォームはSNSでの連絡が取れない方のみご入力してください。</p>
            <p className="m-0">本音を言うと月50件までしか受け取れないプランでフォームを作成しているからです。</p>
          </div>
          <ContactForm />
          <div className="tips px-3">
            <h3><i className="far fa-hand-point-right mr-2" />書いてあると嬉しいこと</h3>
            <ul>
              <li>会社情報やご職業などあなたのことを教えてください。</li>
            </ul>
          </div>
        </Box>
      </StContact>
    </main>
  </>
}

export default ContactIndex;

const StContact = styled.div`
${({theme}) => css`
  p.m-0 {
    font-weight: bold;
  }
  form {
    label {
      display: block;
    }
    #email {
      display: block;
      max-width: 100%;
      width: 320px;
      padding: 9px 8px;
      font-weight: bold;
      border: 1px solid ${theme.colors.blueBorder};
      background-color: ${theme.colors.blue};
      border-radius: 5px;
      margin-bottom: 1rem;
    }
    #message {
      display: block;
      max-width: 100%;
      width: 680px;
      min-height: 200px;
      border: 1px solid ${theme.colors.blueBorder};
      background-color: ${theme.colors.blue};
      border-radius: 5px;
      margin-bottom: 1.5rem;
      padding: 9px 8px;
    }
    button {
      display: block;
      font-weight: bold;
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
      border: 1px solid;
      border-radius: 8px;
      padding: 12px 55px;
      margin: 0 auto 30px;
      width: 350px;
      max-width: 100%;
    }
  }
`}`
