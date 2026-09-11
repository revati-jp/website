import fs from 'fs';
import path from 'path';

function fail(message: string): never {
	fs.writeSync(2, `${message}\n`);
	process.exit(1);
}

const now = new Date();
const today = `${String(now.getFullYear()).padStart(4, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
const id = process.argv[2] ?? today;
const match = /^(\d{4})(\d{2})(\d{2})(0[2-9]|[1-5]\d)?(_[^\s/\\]+)?$/.exec(id);

if (process.argv.length > 3 || match === null) {
	fail(
		'記事 ID は YYYYMMDD、YYYYMMDDNN (02–59)、または末尾に _text を付けた形式で指定してください。'
	);
}

const [, year, month, day, numbering, text] = match;
const isoDate = `${year}-${month}-${day}`;
const parsedDate = new Date(`${isoDate}T00:00:00Z`);
if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== isoDate) {
	fail(`記事 ID の日付が不正です: ${id}`);
}

const articlesDir = path.join(process.cwd(), `articles/${year}/${Number(month)}`);

let i = 1;
let fileName = `${id}.md`;
while (fs.existsSync(path.join(articlesDir, fileName)) === true) {
	if (numbering !== undefined || text !== undefined)
		fail(`記事 ID が既存のファイルと競合しています: ${id}`);
	if (i === 59) fail(`記事 ID のナンバリング上限（59）に達しました: ${id}`);
	i++;
	fileName = `${id}${String(i).padStart(2, '0')}.md`;
}

const filePath = path.join(articlesDir, fileName);

const INIT_CONTENT = `---
published: true
indexed: true
title: ここにタイトル
---

ここに本文を書く

サムネイル画像は[サムネイル画像の設定方法](/docs/ADDING_NEWS.md#サムネイル画像の設定方法)を見ながら設定してください。(任意)

日付を変えたい場合は[記事IDのルール(ファイル)](/docs/ADDING_NEWS.md#記事IDのルール)に従った上でファイル名を変更する

画像を新しくアップロードする場合は [/static/images/blog/](/static/images/news/) に配置する

その他の詳細についてはドキュメントやテスト記事参照:

## ドキュメント

- [ADDING_NEWS.md](/docs/ADDING_NEWS.md)

## テスト記事

- Markdownファイル: [/articles/2023/2/20230206_test.md](/articles/2023/2/20230206_test.md)
- ページ: [/news/articles/20230206_test](/news/articles/20230206_test)

## 専用コンポーネント一覧

- Markdownファイル: [/articles/2024/3/20240301_test.md](/articles/2024/3/20240301_test.md)
- ページ: [/news/articles/20240301_test](/news/articles/20240301_test)
`;

if (fs.existsSync(articlesDir) === false) fs.mkdirSync(articlesDir, { recursive: true });
fs.writeFileSync(filePath, INIT_CONTENT, { flag: 'wx' });

console.log('Created: ' + filePath);
