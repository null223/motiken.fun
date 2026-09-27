import { createHash } from 'crypto'
import { getRedis } from './ratelimit'

const LOG_KEY = 'ask:log'
const LOG_MAX = 5000
const CACHE_TTL_SEC = 7 * 24 * 3600

export function normalizeQuestion(q) {
  return q.normalize('NFKC').toLowerCase().replace(/[\s、。，．,.!?！？「」『』()（）]/g, '').trim()
}

export function cacheKey(q) {
  return 'ask:cache:' + createHash('sha256').update(normalizeQuestion(q)).digest('hex')
}

export async function getCached(q) {
  const r = getRedis()
  if (!r) return null
  return r.get(cacheKey(q))
}

export async function setCached(q, value) {
  const r = getRedis()
  if (!r) return
  await r.set(cacheKey(q), value, { ex: CACHE_TTL_SEC })
}

/**
 * 質問ログ。IP は保存しない。週次ジョブが unknown=true を拾う。
 */
export async function logQuestion(entry) {
  const r = getRedis()
  const record = { ts: Date.now(), ...entry }
  if (!r) {
    if (process.env.NODE_ENV !== 'production') console.log('[ask:log]', JSON.stringify(record))
    return
  }
  await r.lpush(LOG_KEY, JSON.stringify(record))
  await r.ltrim(LOG_KEY, 0, LOG_MAX - 1)
}
