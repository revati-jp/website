# 新規ページ追加後にすべきこと

1. そのページをクロールさせるなら [`sitemap.xml/+server.ts`](/src/routes/sitemap.xml/+server.ts) によしなに追加する。
1. 静的なページならば [`vite.config.js`](/vite.config.js) の `CLOUDFLARE_ROUTES_EXCLUDE` 定数に追加する。(ワイルドカードなどで追加される場合を除く)
