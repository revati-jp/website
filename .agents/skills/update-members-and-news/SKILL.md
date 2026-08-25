---
name: update-members-and-news
description: REVATI のメンバー情報を更新し、その変更を告知するニュース記事を作成する。メンバー追加・削除・部門変更と記事作成を伴う依頼に使い、無関係な記事編集やサイト変更には使わない。
metadata:
  short-description: REVATIのメンバー更新とニュース記事作成
---

# REVATI のメンバー更新とニュース記事作成

ユーザーが提供した情報に基づいて、REVATI のメンバーデータとニュース記事の適用を一連の作業として同時に実施する。既存のプロジェクト規約を優先し、情報が不足して結果を変える場合は編集前に確認する。

## 変更前の確認

- `src/lib/scripts/data/MEMBERS.ts` のファイル冒頭コメントを読み、現在の型・並び・記入方法を確認する。
- 記事作成時は `docs/ADDING_NEWS.md` と、必要に応じて `articles/2023/2/20230206_test.md`、`articles/2024/3/20240301_test.md` を参照する。
- ユーザーが指定した記事日付、タイトル、公開・検索インデックス方針、部門名・部門順、メンバー順を勝手に変更しない。
- 名前、所属、記事日付、記事本文など重要な情報が欠けている場合は、推測で編集せずユーザーに確認する。誤字や不自然な表現も黙って直さず、確認事項として伝える。

## ワークフロー

### 1. メンバーを更新する

`MEMBER_LISTS` に追加・削除・変更を反映する。新しい部門を作る場合は、ユーザー指定の部門名、サブネームを反映する。指定がない場合は既存ファイルの規則に従う。

ユーザーの提供するメンバー情報は基本的に次のテンプレートの形式になっている:

```md
名前（必須）
コンプライアンスに遵守したアイコン画像（任意）
国（任意）
生年月日又は誕生日（任意）
X.com（旧Twitter）のアカウント（任意）
YouTube のアカウント（任意）
Twitch のアカウント（任意）
その他ウェブサイト1つ（任意）

役職（必須）
```

※ メンバーの並びを役職やグループ分けで変更する場合は理由と共に明示されるため、基本は `MEMBERS.ts` にて述べられている通り名前順でソートする。
　 「ユーザーがメンバーを記述している順番」自体は重要ではない。ただしその部門において、既にグループの並びがコメントアウトで明示されている場合はそれに従う。
※ 新部門設立時は部門名と部門の並びの指定がある。
※ 新しく国旗を追加する必要がある場合、「SVG ファイルの配置」以外のタスク（型追加など）を実施し、最後に SVG ファイルの配置をユーザーに依頼する。

ただし、このテンプレートに従っていない場合もあるため、重要な情報が欠けている場合はその都度ユーザーに確認する。

メンバー削除では、先に `static/images/members/` 内のアイコンが他のメンバーや記事から参照されていないことを確認する。未使用であることが確認できた場合だけ画像削除を提案・実行する。

`gearsAndSettings` の参照先を削除・変更する場合は、`src/lib/scripts/data/GEARS_AND_SETTINGS.ts` の要素と `static/images/members/characters/` 内の `avatar` ファイルを削除してよいか、必ずユーザーに確認する。確認なしにこれらを削除しない。

### 2. 記事ファイルを生成する

記事はテンプレート生成コマンドを使う。

```bash
pnpm run article
```

生成されたパスを確認し、ユーザーが指定した日付と記事 ID が一致するように修正する。ただし修正前に既存 ID との衝突も確認する。

ID の構造は次のとおり:

- 基本は `YYYYMMDD`
- 同じ日に複数の記事を投稿するならナンバリング: `YYYYMMDDNN`
  - ただしその日の最初の記事はナンバリングなし
  - ナンバリングは最大 59 まで
  - つまりナンバリングは 02 から 59 まで
- ID に文字を入れたい場合（非推奨）: `YYYYMMDD_text` や `YYYYMMDDNN_text`
- 桁数は年が4桁、それ以外は2桁でゼロ埋め
- 例: 2023年4月13日の3つ目の記事なら `2023041303`

### 3. 記事を書く

生成ファイルに含まれるテンプレート文は残さず、ユーザーから提供された記事内容で完全に置き換える。
ただし、段落や改行などは不必要に変更しない。

基本的には次の形式で記述する:

```md
---
published: true
indexed: true
title: ここにタイトル
---

<script>
	import Member from '$lib/components/news/util/Member.svelte';

	const PLAYERS = [
		{ name: 'Player1', socials: { twitter: 'player1' } },
		{
			name: 'Player2',
			socials: {
				twitter: 'player2',
				youtube: 'UCb3U3ovwzmagTBuzkdrsJkQ',
				twitch: 'player2',
				other: 'https://example.com'
			}
		},
		{
			name: 'Player3',
			socials: { twitter: 'player3', youtube: '@player3' },
			additional: '(TANK) 🇯🇵'
		}
	];

	const COACHES = [
		{ name: 'Coach1', socials: { twitter: 'Coach1' } }
	];
</script>

... 任意の文 ...

## 選手

<Member members={PLAYERS} />

## コーチ

<Member members={COACHES} />

... 任意の文 ...

---

## コメント

Player1「任意のコメント」

Player2「任意のコメント」

Player3「任意のコメント」

Coach1「任意のコメント」

```

コメントセクションは無い場合がある。

メンバーの箇条書きにおいては基本的に `Member.svelte` を使う。
`additional` プロパティでは、太字のメンバー名とは別に追加情報を含めることができる（例: `**Player3** (TANK) 🇯🇵`）。必要に応じて利用する。
ただし、ユーザーが提供した記事本文での箇条書きにて国旗やロールなどが書かれていない限り、`additional` プロパティを積極的には使う必要はない。

より複雑な記法や X.com の埋め込みについては次のファイルを参照する:

- 記事のテスト: `articles/2023/2/20230206_test.md`
  - 段落は空行区切り
  - 明示改行は行末に半角スペース2つ
  - 見出しは `##` から `######` まで
  - 区切り線は `---`
  - 引用 `> ` も使用可能
  - ...など、ニュース記事の詳細な記法がまとめられている
- 記事専用のコンポーネント一覧: `articles/2024/3/20240301_test.md`
  - Member コンポーネント
  - Twitter Embed コンポーネント

本文の表現に疑問（誤字の可能性があるものや不自然な表現など）がある場合は、意味を変える修正をせずユーザーに確認する。

また、その他困った場合は他の記事を参考にしてみたり、適宜ユーザーに確認する。

### 4. 検証する

変更後に次のワンライナーを実行し、問題があれば修正する。

```bash
pnpm run check && pnpm run format && pnpm run lint
```

## 完了時の報告

次を明示して引き渡す。

- 作成・変更したファイルと記事 ID。
- 指定日付が正しいか確認するよう依頼する。
- メンバーのアイコン画像が指定されている場合は、「アイコン画像のファイルを256×256ピクセルの WebP 又は JPEG 形式で `static/images/members/` に手動で配置するように」と案内する。
- サムネイル画像がある場合は、「サムネイル画像が提供されている場合は `static/images/news/thumbnails/` に手動で配置するように」と案内する。

コミットはユーザーが行うため、最後に以下のような2つのコミットメッセージもユーザーに提供する。自分でコミットしない。

- `🛠️ Update: *`
  - `*` の部分例:
    - 1人の場合: `Player A joins`
    - 数人の場合: `Foo, Bar, Boo join`
    - 退出: `Player A leaves`, `Foo, Bar leave`
    - 両方: `Player A leaves, and Player B joins`
  - 大人数の場合:
    - 件名ではメンバー名を省略して、コミットメッセージ本文で箇条書きにする:
      ```
      🛠️ Update: 6 members join

      - Player A joins
      - Player B joins
      - Player C joins
      - Player D joins
      - Player E joins
      - Player F joins
      ```
    - 新規部門追加の場合は件名で部門名を入れても良い:
      ```
      🛠️ Update: add Apex div.

      - Player A joins
      - Player B joins
      - Player C joins
      - Player D joins
      - Player E joins
      - Player F joins
      ```
- `✨ Feat: add article <ID>`
