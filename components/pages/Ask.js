import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import Box from '@/components/Box'

const MAX_LEN = 200
const EXAMPLES = [
  'なるはどんな人？',
  '得意な技術は？',
  '仕事を頼みたいときはどうすればいい？',
  '好きなものは？',
]

function PageMain() {
  const [messages, setMessages] = useState([
    { role: 'naru', text: 'なるのことなら何でも聞いてください。知識にないことは「わからない」と答えて、なる本人に伝えておきます。' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [remaining, setRemaining] = useState(null)
  const listEnd = useRef(null)

  useEffect(() => {
    listEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, loading])

  async function send(text) {
    const question = (text ?? input).trim()
    if (!question || loading) return
    if (question.length > MAX_LEN) return
    setInput('')
    setMessages(m => [...m, { role: 'you', text: question }])
    setLoading(true)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.remaining) setRemaining(data.remaining)
      const reply = data.answer || 'いま回答できませんでした。少し待ってから試してください。'
      setMessages(m => [...m, { role: 'naru', text: reply, unknown: data.unknown, blocked: data.blocked }])
    } catch {
      setMessages(m => [...m, { role: 'naru', text: '通信に失敗しました。時間をおいて試してください。' }])
    } finally {
      setLoading(false)
    }
  }

  const exhausted = remaining && (remaining.hour === 0 || remaining.day === 0)

  return (
    <main>
      <StAsk className="container">
        <Box header="なるに聞きたい">
          <div className="px-3">
            <ul className="chat" aria-live="polite">
              {messages.map((m, i) => (
                <li key={i} className={`msg msg--${m.role}${m.unknown ? ' msg--unknown' : ''}`}>
                  <span className="who">{m.role === 'you' ? 'あなた' : 'なる(AI)'}</span>
                  <p>{m.text}</p>
                </li>
              ))}
              {loading && (
                <li className="msg msg--naru msg--loading">
                  <span className="who">なる(AI)</span>
                  <p>考え中…</p>
                </li>
              )}
              <li ref={listEnd} aria-hidden="true" />
            </ul>

            <div className="examples">
              {EXAMPLES.map(ex => (
                <button key={ex} type="button" onClick={() => send(ex)} disabled={loading || exhausted}>{ex}</button>
              ))}
            </div>

            <form
              className="form"
              onSubmit={e => { e.preventDefault(); send() }}
            >
              <label htmlFor="ask-input" className="sr-only">質問</label>
              <input
                id="ask-input"
                type="text"
                value={input}
                maxLength={MAX_LEN}
                placeholder="なるについて聞きたいこと（200字まで）"
                onChange={e => setInput(e.target.value)}
                disabled={loading || exhausted}
                autoComplete="off"
              />
              <button type="submit" disabled={loading || exhausted || !input.trim()}>
                聞く
              </button>
            </form>
            <p className="meta">
              <span>{input.length}/{MAX_LEN}</span>
              {remaining && <span>残り 今日{remaining.day}回 / 1時間{remaining.hour}回</span>}
            </p>
          </div>
        </Box>

        <div className="tips px-3">
          <h3><i className="far fa-hand-point-right mr-2" />このページについて</h3>
          <ul>
            <li>なる本人ではなく、なるが用意した知識をもとに AI が答えます。間違うこともあります。</li>
            <li>なる本人やこのサイトに関する質問だけに答えます。それ以外は返答しません。</li>
            <li>答えられなかった質問はなるに届き、後日ここで答えられるようになることがあります。</li>
            <li>正確に確認したいこと、仕事の相談は <Link href="/contact">お問い合わせ</Link> からどうぞ。</li>
          </ul>
        </div>
      </StAsk>
    </main>
  )
}

export default PageMain

const StAsk = styled.div`
${({ theme }) => css`
  max-width: 720px;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .chat {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .msg {
    max-width: 85%;
    padding: 8px 12px;
    border-radius: 12px;
    border: 1px solid ${theme.colors.border};
    background-color: ${theme.colors.secondary};
    .who {
      display: block;
      font-size: .75rem;
      color: ${theme.colors.gray};
      margin-bottom: 2px;
    }
    p {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
  .msg--you {
    align-self: flex-end;
    background-color: ${theme.colors.blue};
    border-color: ${theme.colors.blueBorder};
  }
  .msg--naru {
    align-self: flex-start;
  }
  .msg--unknown {
    border-style: dashed;
  }
  .msg--loading p {
    color: ${theme.colors.gray};
  }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: .75rem;
    button {
      font-size: .8rem;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid ${theme.colors.border};
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
      cursor: pointer;
      &:hover:not(:disabled) {
        background-color: ${theme.colors.secondary};
      }
      &:disabled {
        opacity: .5;
        cursor: default;
      }
    }
  }

  .form {
    display: flex;
    gap: 8px;
    input {
      flex: 1;
      min-width: 0;
      padding: 9px 10px;
      border: 1px solid ${theme.colors.blueBorder};
      background-color: ${theme.colors.blue};
      border-radius: 5px;
      font-size: 16px;
    }
    button {
      font-weight: bold;
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
      border: 1px solid ${theme.colors.black};
      border-radius: 8px;
      padding: 9px 22px;
      white-space: nowrap;
      &:disabled {
        opacity: .5;
      }
    }
  }
  .meta {
    display: flex;
    justify-content: space-between;
    font-size: .75rem;
    color: ${theme.colors.gray};
    margin: 6px 0 0;
  }

  .tips {
    h3 {
      font-size: 1rem;
    }
    ul {
      padding-left: 1.2rem;
    }
    li {
      margin-bottom: .25rem;
    }
  }
`}`
