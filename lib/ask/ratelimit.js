import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const PER_HOUR = Number(process.env.ASK_LIMIT_PER_HOUR || 10)
const PER_DAY = Number(process.env.ASK_LIMIT_PER_DAY || 30)
const GLOBAL_PER_DAY = Number(process.env.ASK_DAILY_GLOBAL_LIMIT || 300)

export function hasRedis() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

let redis = null
export function getRedis() {
  if (!hasRedis()) return null
  if (!redis) redis = Redis.fromEnv()
  return redis
}

let limiters = null
function getLimiters() {
  if (limiters) return limiters
  const r = getRedis()
  limiters = {
    hourly: new Ratelimit({ redis: r, prefix: 'ask:rl:h', limiter: Ratelimit.slidingWindow(PER_HOUR, '1 h') }),
    daily: new Ratelimit({ redis: r, prefix: 'ask:rl:d', limiter: Ratelimit.slidingWindow(PER_DAY, '1 d') }),
    global: new Ratelimit({ redis: r, prefix: 'ask:rl:g', limiter: Ratelimit.fixedWindow(GLOBAL_PER_DAY, '1 d') }),
  }
  return limiters
}

// Redis 未設定（ローカル開発）用の簡易カウンタ。プロセス内のみ。
const mem = new Map()
function memLimit(key, limit, windowMs) {
  const now = Date.now()
  const arr = (mem.get(key) || []).filter(t => now - t < windowMs)
  const success = arr.length < limit
  if (success) arr.push(now)
  mem.set(key, arr)
  return { success, remaining: Math.max(0, limit - arr.length) }
}

/**
 * @param {string} id  訪問者識別子（IPハッシュ + cookie）
 * @returns {Promise<{success: boolean, scope: 'hour'|'day'|'global'|null, remaining: {hour: number, day: number}}>}
 */
export async function checkRateLimit(id) {
  if (!hasRedis()) {
    const h = memLimit(`h:${id}`, PER_HOUR, 3600e3)
    const d = memLimit(`d:${id}`, PER_DAY, 86400e3)
    const g = memLimit('g', GLOBAL_PER_DAY, 86400e3)
    const scope = !g.success ? 'global' : !d.success ? 'day' : !h.success ? 'hour' : null
    return { success: scope === null, scope, remaining: { hour: h.remaining, day: d.remaining } }
  }
  const { hourly, daily, global } = getLimiters()
  const g = await global.limit('all')
  if (!g.success) return { success: false, scope: 'global', remaining: { hour: 0, day: 0 } }
  const d = await daily.limit(id)
  if (!d.success) return { success: false, scope: 'day', remaining: { hour: 0, day: 0 } }
  const h = await hourly.limit(id)
  if (!h.success) return { success: false, scope: 'hour', remaining: { hour: 0, day: d.remaining } }
  return { success: true, scope: null, remaining: { hour: h.remaining, day: d.remaining } }
}
