import naruMd from '@/knowledge/naru.md'
import Api from '@/lib/api'

// `A: TODO` のままの Q/A ブロックを取り除く（週次ジョブの下書きは回答に使わない）
export function stripTodo(md) {
  return md
    .replace(/^Q:[^\n]*\nA:\s*TODO[^\n]*\n?/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function aboutToMarkdown(about) {
  if (!about) return ''
  const lines = ['## ABOUT ページ（microCMS）']
  const p = about.profiles || {}
  if (p.name) lines.push(`- 名前: ${p.name}`)
  if (p.work) lines.push(`- 仕事: ${p.work}`)
  if (p.body) lines.push(`- 自己紹介: ${p.body}`)
  if (about.motiken?.title) lines.push(`- モチ研とは: ${about.motiken.title} / ${about.motiken.body || ''}`)
  if (about.vision) lines.push(`- ビジョン: ${about.vision}`)
  if (Array.isArray(about.careers) && about.careers.length) {
    lines.push('', '### 経歴')
    about.careers.forEach(c => lines.push(`- ${c.year}: ${c.title} — ${c.body || ''}`))
  }
  if (Array.isArray(about.skills) && about.skills.length) {
    lines.push('', '### スキル')
    about.skills.forEach(s => lines.push(`- ${s.title}: ${s.body || ''}`))
  }
  if (Array.isArray(about.likes) && about.likes.length) {
    lines.push('', '### 好きなもの')
    about.likes.forEach(l => lines.push(`- ${l.title}: ${l.body || ''}`))
  }
  return lines.join('\n')
}

let cached = null
let cachedAt = 0
const TTL_MS = 10 * 60 * 1000

// リポジトリの Markdown + microCMS about を結合した知識テキスト。10分メモリキャッシュ。
export async function loadKnowledge() {
  if (cached && Date.now() - cachedAt < TTL_MS) return cached
  const about = await Api.get({ endpoint: 'about' }).catch(() => null)
  cached = [stripTodo(naruMd), aboutToMarkdown(about)].filter(Boolean).join('\n\n')
  cachedAt = Date.now()
  return cached
}
