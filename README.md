This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## なるに聞きたい (/ask)

なる本人・サイトに関する質問だけに答える Q&A。構成:

- `pages/ask.js` / `components/pages/Ask.js` — UI
- `pages/api/ask.js` — レート制限 → キャッシュ → Jev 話題判定 → Claude 回答生成 → Jev 根拠チェック → ログ
- `lib/ask/*` — 各段の実装
- `knowledge/naru.md` — 知識ベース。ここと microCMS `about` だけを根拠に答える
- `scripts/weekly-digest.mjs` + `.github/workflows/weekly-digest.yml` — 週次で未回答質問を PR に起こす

必要な env は `.env.example` を参照。GitHub Actions には `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` を secrets に登録する。
