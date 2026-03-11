# 変更を加える際の規則

弊チームのウェブサイト開発への貢献を検討いただきありがとうございます。
単純な変更であれば、[Issue](https://github.com/revati-jp/website/issues) を立てていただければ こちらで対応いたします。

> [!CAUTION]
>
> 基本的に絶対に原則このリポジトリの **master ブランチに直接コミットをしないでください**。  
> これが 何を言ってるかわからない方は、先ず Git や GitHub について学習してください。
> もし万が一仮に master ブランチに直接コミットをしてしまうと、すぐさま revati.jp(プロダクション) にデプロイされて、
> 最悪の場合サイトを閲覧できなくなる可能性があります。

## 手順

1. このリポジトリをフォーク。
1. フォークしたリポジトリをローカル環境にクローン。
1. `pnpm install` などで依存関係をインストール。
1. `pnpm run check` などが自分の環境で通るか確認。
1. 任意で Issue を立てる。
1. dev ブランチから作業用ブランチを切る。
ブランチ名は基本的に `feat/*` や `fix/*` の形にしてください。
1. 作業する
1. 作業が完了したら次のコマンドが通るかを確認:
    - `pnpm run check`
    - `pnpm run build`
    - `pnpm run format`
    - `pnpm run lint`
1. リモートにプッシュしたうえでプルリクエストを出す。
1. マージされるのを待つ。

### その他注意事項

- 新規ページを追加した場合は、[新規ページ追加後にすべきこと(`when-added-new-page.md`)](/docs/when-added-new-page.md) も参照してください。
- プレビューがデプロイされるブランチは `dev`, `feat/*`, `fix/*`, `hotfix/*` のみ。
- hotfix系ブランチは基本的にメインリポジトリで masterブランチから生やす。
- 破壊的または大規模な変更になりそうだったら事前に [Issue](https://github.com/revati-jp/website/issues) 立てた方が賢明。
- 何かわからないことがあれば [Discussions](https://github.com/revati-jp/website/discussions) なりで気軽に質問してください。