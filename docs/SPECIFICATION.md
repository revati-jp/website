# Specifications

<details>
<summary>Z-Index</summary>
<div>

| Z-Index | Entity | Path |
| --: | --- | --- |
| 2048 | noscript | [`layout.scss>noscript`](/src/lib/stylesheets/layout.scss) |
| 1031 | nprogress { bar, spinner }  | [`/node_modules/nprogress/nprogress.css>#nprogress .bar`](/node_modules/nprogress/nprogress.css), [`/node_modules/nprogress/nprogress.css>#nprogress .spinner`](/node_modules/nprogress/nprogress.css) |
| 253 | header, header2 | [`header.scss>header`](/src/lib/stylesheets/header/header.scss), [`header.scss>#header2`](/src/lib/stylesheets/header/header.scss) |
| 252 | header bg | [`header.scss>#header-bg`](/src/lib/stylesheets/header/header.scss) |
| 132 | header skip btn | [`header.scss>.skip-btn`](/src/lib/stylesheets/header/header.scss) |
| 112 | O2 Blast btn | [`O2blastButton.svelte`](/src/lib/components/home/O2blastButton.svelte) |
| -1 | bg | [`layout.scss>main::before`](/src/lib/stylesheets/layout.scss) |

---

</div>
</details>

<details>
<summary>CSS Variables</summary>
<div>

| Name | Description | Usable area |
| --: | --- | --- |
| `--vh001` | viewport height * 0.01 (realtime update) | all |
| `--max-vh001` | viewport max height ever * 0.01 (realtime update) | all |

---

</div>
</details>

<details>
<summary>Fonts</summary>
<div>

Default font is `Zen Kaku Gothic New`.  
Default font weight is `400`.

- [Zen Kaku Gothic New](#zen-kaku-gothic-new)
- [Poppins](#poppins)
- [Josefin Sans](#josefin-sans)

---

## `Zen Kaku Gothic New`

<!-- - Light: `300`
- Medium: `500` -->
- Regular: `400`
- Black: `900`
<!-- - Bold: `700` -->

**Do not use**: `100`, `200`, `300`, `500`, `600`, `700`, `800`, `normal`, `bold`, `lighter`, `bolder`

---

## `Poppins`

<!-- - Thin: `100`
- Thin Italic: `100` + `italic`
- ExtraLight: `200`
- ExtraLight Italic: `200` + `italic`
- Light: `300`
- Light Italic: `300` + `italic`
- Regular: `400`
- Regular Italic: `400` + `italic` -->
- Medium: `500`
<!-- - Medium Italic: `500` + `italic`
- SemiBold: `600`
- SemiBold Italic: `600` + `italic`
- Bold: `700`
- Bold Italic: `700` + `italic`
- ExtraBold: `800`
- ExtraBold Italic: `800` + `italic`
- Black: `900`
- Black Italic: `900` + `italic` -->

**Must specify the `font-weight` to `500`**.  
**We can use only uppercase letters of [`HEADER_ITEMS`](/src/lib/scripts/data/HEADER_ITEMS.ts) constant.**

---

## `Josefin Sans`

<!-- - Thin: `100`
- Thin Italic: `100` + `italic`
- ExtraLight: `200`
- ExtraLight Italic: `200` + `italic`
- Light: `300`
- Light Italic: `300` + `italic`
- Regular: `400`
- Regular Italic: `400` + `italic`
- Medium: `500`
- Medium Italic: `500` + `italic`
- SemiBold: `600`
- SemiBold Italic: `600` + `italic` -->
- Bold: `700`
<!-- - Bold Italic: `700` + `italic` -->

**Must specify the `font-weight` to `700`**.  
**We can use only uppercase letters of [`HEADER_ITEMS`](/src/lib/scripts/data/HEADER_ITEMS.ts) constant.**

---

</div>
</details>

<details>
<summary>API Endpoints</summary>
<div>

- [Articles](#articles---get-apiarticles) (`/api/articles`)
- [Article Thumbnail Image Formats](#article-thumbnail-image-formats---get-apiarticlesthumbnail-imgs) (`/api/articles/thumbnail-imgs`)

## Articles - `GET /api/articles`

Returns a list of the news articles.

### Response Body

`ArticleMetadata[]` ([`/src/lib/scripts/types.ts`](/src/lib/scripts/types.ts))

- `[]` (`object[]`) - The list of articles.
	- `redirect` (`string?`) - The article ID to redirect to.
	- `published` (`boolean`) - Whether the article is published.
	- `indexed` (`boolean`) - Whether the article is indexed.
	- `title` (`string`) - The title of the article.
	- `slug` (`object?`) - The slug of the article. Its type is an optional string but it always exists.
        - `year` (`number`) - The year of the article.
        - `month` (`number`) - The month of the article.
        - `day` (`number`) - The day of the article.
        - `no` (`number`) - The number of the article in the day.
        - `text` (`string?`) - The text of the article ID.

#### Example

```json
[
    {
        "published": true,
        "indexed": true,
        "title": "1名のメンバーが脱退",
        "slug": "20230220"
    },
    {
        "published": true,
        "indexed": true,
        "title": "計5名のメンバーが新たに加入",
        "slug": "2023012102"
    },
    {
        "published": true,
        "indexed": true,
        "title": "Sarf Esports リブランディングのお知らせ",
        "slug": "20230121"
    }
]
```

---

## Article Thumbnail Image Formats - `GET /api/articles/thumbnail-imgs`

Returns a list of the articles that have their thumbnail images with the image file formats.

### Response Body

`ArticleThumbnailImgFmts` ([`/src/lib/scripts/types.ts`](/src/lib/scripts/types.ts))

- `{}` (`object`) - The list of the articles that have their thumbnail images with the image file formats.
	- `[slug]` (`string`) - The thumbnail image file format for the article identified by this slug.

#### Example

```json
{
    "20230825": "jpg",
    "20240819": "webp",
    "2023031502": "png"
}
```

---

</div>
</details>
