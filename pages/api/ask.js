import { createHash, randomUUID } from 'crypto'

import { loadKnowledge } from '@/lib/ask/knowledge'
import { judgeQuestion, verifyGrounded } from '@/lib/ask/guard'
import { checkRateLimit } from '@/lib/ask/ratelimit'
import { getCached, setCached, logQuestion } from '@/lib/ask/log'
import { generateAnswer } from '@/lib/ask/llm'

const MAX_LEN = 200
const COOKIE = 'naru_ask_id'

const MESSAGES = {
  off_topic: 'ここでは、なる本人やこのサイトについての質問だけに答えています。なるのことを聞いてみてください。',
  injection: 'ここでは、なるに関する質問だけ受け付けています。',
  sensitive: 'プライベートな情報についてはお答えできません。',
  guard_unavailable: 'いま判定サービスに接続できません。少し待ってから試してください。',
  unknown: 'その質問はまだ知識にないので、なるに聞いておきます。次に来たときには答えられるかもしれません。',
  rate: {
    hour: '1時間あたりの質問回数の上限に達しました。少し時間をおいてください。',
    day: '今日の質問回数の上限に達しました。また明日どうぞ。',
    global: '本日の質問受付が上限に達しました。また明日どうぞ。',
  },
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header.split(';').map(v => v.trim().split('=')).filter(([k, v]) => k && v).map(([k, v]) => [k, decodeURIComponent(v)])
  )
}

function visitorId(req, res) {
  const cookies = parseCookies(req.headers.cookie)
  let id = cookies[COOKIE]
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) {
    id = randomUUID()
    res.setHeader('Set-Cookie', `${COOKIE}=${id}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || ''
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16)
  return `${ipHash}:${id}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : ''
  if (!question) return res.status(400).json({ error: 'empty' })
  if (question.length > MAX_LEN) return res.status(400).json({ error: 'too_long', max: MAX_LEN })

  const id = visitorId(req, res)

  // 1. レート制限（LLM を呼ぶ前に落とす）
  const rl = await checkRateLimit(id)
  if (!rl.success) {
    return res.status(429).json({ error: 'rate_limited', scope: rl.scope, answer: MESSAGES.rate[rl.scope], remaining: rl.remaining })
  }

  try {
    // 2. 同一質問キャッシュ
    const cached = await getCached(question)
    if (cached) {
      return res.status(200).json({ ...cached, cached: true, remaining: rl.remaining })
    }

    // 3. Jev で話題判定。話題外は LLM を呼ばず定型文
    const judge = await judgeQuestion(question)
    if (!judge.allowed) {
      await logQuestion({ q: question, onTopic: judge.onTopic, category: judge.category, blocked: judge.reason, unknown: false })
      const status = judge.reason === 'guard_unavailable' ? 503 : 200
      return res.status(status).json({ answer: MESSAGES[judge.reason], unknown: false, blocked: judge.reason, remaining: rl.remaining })
    }

    // 4. 回答生成（知識ベース同梱）
    const knowledge = await loadKnowledge()
    const result = await generateAnswer({ knowledge, question, category: judge.category })

    // 5. Jev で根拠チェック。知識にない話をしていたら unknown 扱いに差し替え
    let answer = result.answer
    let unknown = result.unknown
    if (!unknown) {
      const g = await verifyGrounded({ knowledge, question, answer })
      if (!g.grounded) {
        answer = MESSAGES.unknown
        unknown = true
      }
    } else {
      answer = result.answer || MESSAGES.unknown
    }

    const payload = { answer, unknown, category: judge.category }
    await Promise.all([
      setCached(question, payload),
      logQuestion({ q: question, onTopic: judge.onTopic, category: judge.category, blocked: null, unknown, confidence: result.confidence }),
    ])
    return res.status(200).json({ ...payload, remaining: rl.remaining })
  } catch (err) {
    console.error('[api/ask]', err)
    return res.status(502).json({ error: 'upstream', answer: 'いま回答できませんでした。少し待ってから試してください。' })
  }
}
