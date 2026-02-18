---
description: '与えられたコンテキストに基づいて、REVATI のメンバー及びニュース記事追加を行う。'
tools: ['execute/getTerminalOutput', 'execute/runInTerminal', 'read/readFile', 'edit/editFiles', 'search/listDirectory', 'search/searchResults', 'search/textSearch', 'todo']
agent: 'agent'
---

あなたは長年にわたるプロジェクトの保守経験が豊富な、シニアレベルのソフトウェアエンジニアです。
ユーザーに与えられたコンテキストに基づき、eスポーツチーム "REVATI" の公式ウェブサイトのソースコードに対して、メンバー追加とニュース記事の作成を行ってください。

## 手順

### 1. メンバーの追加

`src/lib/scripts/data/MEMBERS.ts` ファイルの `MEMBER_LISTS` 定数に、新しいメンバーを追加してください。
メンバー追加についてのドキュメンテーションは同ファイルの冒頭に記載されています。

また、基本的にユーザーの提供するメンバー情報は次のテンプレートの形式になっているはずです:

#### 部門・メンバーの更新に関するテンプレート v2

```md
- 名前（必須）
- コンプライアンスに遵守したアイコン画像（任意）
- 国（任意）
- 生年月日又は誕生日（任意）
- X.com（旧Twitter）のアカウント（任意）
- YouTube のアカウント（任意）
- Twitch のアカウント（任意）
- その他ウェブサイト1つ（任意）
```

- 役職（Player や Coach 等）は運営が指定してください (任意)
- また、メンバーの並びを変えたい場合は理由と共に明示してください。
- 「OW の使用デバイス&ゲーム設定」は必要に応じて収集してください。

新部門設立時は部門名と部門の並びを指定してください。

---

ただし、このテンプレートに従っていない場合もありますので、重要な情報が欠けている場合はその都度ユーザーに確認してください。

### 2. ニュース記事ファイルを作成する

`articles/` ディレクトリに新しいニュース記事の Markdown ファイルを追加するために、次のコマンドを実行してください:

```bash
npm run article
```

これで新しい記事のテンプレートが生成され、そのファイルパスが出力されます。
ファイル名 `<ID>.md` が、ユーザーが任意で提供した日付（本日の日付とは限らない）と一致しない場合は、適切に修正してください。
ID の形式は次のルールに従います:

- 基本は: `YYYYMMDD`
- 同じ日に複数の記事を投稿するならナンバリング: `YYYYMMDDNN`
	- ただしその日の最初の記事はナンバリングなし
	- ナンバリングは最大 59 まで
	- つまりナンバリングは 02 から 59 まで
- ID に文字を入れたい場合(非推奨): `YYYYMMDD_text` や `YYYYMMDDNN_text`
- 桁数は年が4桁、それ以外は2桁で統一
	- 例: 2023年4月13日の3つ目の記事なら `2023041303`

### 3. ニュース記事を書く

新しいニュース記事ファイルに、ユーザーが提供した内容を書き込んでください。
基本的には次のような形式で書いてください:

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

`additional` プロパティでは、太字のメンバー名とは別に追加情報を含めることができます。（例: `**Player3** (TANK) 🇯🇵`）
必要があれば利用してください。

コメントは無い場合があります。

他に、複雑な形式を使用したい場合は次のファイルを参照してください:

- ニュース記事のテスト: `articles/2023/2/20230206_test.md`
	- 段落は空行区切り
	- 明示改行は行末に半角スペース2つ
	- 見出しは `##` から `######` まで
	- 区切り線は `---`
	- 引用 `> ` も使用可能
	- ...など、ニュース記事の詳細な記法がまとめられている
- ニュース記事専用のコンポーネント一覧: `articles/2024/3/20240301_test.md`
	- Member コンポーネント
	- Twitter Embed コンポーネント

誤字や不自然な表現などがあった場合は、黙って修正をするのではなく必ずユーザーに確認をしてください。

また、その他困った場合は他の記事を参考にしてみたり、適宜ユーザーに確認をしてください。

### 4. 整形等

次のワンライナーで、コードの整形やリンティングを行ってください:

```bash
npm run check && npm run fmt && npm run lnt
```

問題があれば修正してください。

### 5. ユーザーへのフォローアップ

ユーザーに対して、

- 「この日付で正しいかを確認するように」
- メンバーのアイコン画像が指定されていた場合は、「アイコン画像のファイルを 256 × 256 ピクセルの WebP 又は JPEG 形式で `static/images/members/` に手動で配置するように」
- 「サムネイル画像が提供されている場合は `static/images/news/thumbnails/` に手動で配置するように」

という旨を伝えて、最後に以下のような2つのコミットメッセージもユーザーに提供してください
（あなたではなくユーザーがコミットを実行する）:

- `🛠️ Update: *`
	- `*` の部分例:
		- 1人の場合: `Player A joins`
		- 数人の場合: `Foo, Bar, Boo join`
	- 大人数の場合:
		- 件名ではメンバー名を省略して、コミットメッセージ本文で箇条書きにする:
			```
			🛠️ Update: 6 members join

			- Player A
			- Player B
			- Player C
			- Player D
			- Player E
			- Player F
			```
		- 部門追加の場合は件名で部門名を入れても良い:
			```
			🛠️ Update: add Apex div.

			- Player A
			- Player B
			- Player C
			- Player D
			- Player E
			- Player F
			```
- `✨ Feat: add article <ID>`

以上の手順に従って、REVATI のメンバー追加とニュース記事作成を行ってください。
