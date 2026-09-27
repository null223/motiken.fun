// 週次: Redis の質問ログから「答えられなかった質問」を集め、knowledge/naru.md の
// 「## 未回答（週次自動追記）」に Q / A: TODO を追記する。
// 実行: node scripts/weekly-digest.mjs   （UPSTASH_REDIS_REST_URL / TOKEN が必要）
import fs from 'node:fs'
import path from 'node:path'
import { Redis } from '@upstash/redis'

const KNOWLEDGE = path.join(process.cwd(), 'knowledge/naru.md')
const SECTION = '## 未回答（週次自動追記）'
const DAYS = Number(process.env.DIGEST_DAYS || 7)
const MAX_ITEMS = Number(process.env.DIGEST_MAX_ITEMS || 20)

function normalize(q) {
  return q.normalize('NFKC').toLowerCase().replace(/[\s、。，．,.!?！？「」『』()（）]/g, '').trim()
}

const redis = Redis.fromEnv()
const raw = await redis.lrange('ask:log', 0, -1)
const since = Date.now() - DAYS * 86400e3

const md = fs.readFileSync(KNOWLEDGE, 'utf8')
const known = new Set(
  [...md.matchAll(/^Q:\s*(.+)$/gm)].map(m => normalize(m[1]))
)

const counts = new Map()
for (const line of raw) {
  let e
  try { e = typeof line === 'string' ? JSON.parse(line) : line } catch { continue }
  if (!e || e.ts < since) continue
  if (!e.unknown || e.blocked) continue
  const key = normalize(e.q || '')
  if (!key || known.has(key)) continue
  const cur = counts.get(key) || { q: e.q, n: 0, category: e.category }
  cur.n += 1
  counts.set(key, cur)
}

const items = [...counts.values()].sort((a, b) => b.n - a.n).slice(0, MAX_ITEMS)
if (items.length === 0) {
  console.log('no new unknown questions')
  process.exit(0)
}

const stamp = new Date().toISOString().slice(0, 10)
const block = items.map(i => `Q: ${i.q}\nA: TODO  <!-- ${stamp} ${i.n}回 / ${i.category || 'other'} -->`).join('\n\n')

if (!md.includes(SECTION)) {
  console.error(`section not found: ${SECTION}`)
  process.exit(1)
}
const out = md.trimEnd() + '\n\n' + block + '\n'
fs.writeFileSync(KNOWLEDGE, out)
console.log(`appended ${items.length} question(s)`)
for (const i of items) console.log(`- (${i.n}) ${i.q}`)
