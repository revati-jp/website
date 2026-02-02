// # メンバーを追加する人へ
//
// 追加する際は以下のフォーマットで追加してください。
// 任意となっている項目には、`null` を指定することで指定なしとすることができます。
// メンバーの並びは名前の `数字順 -> アルファベット順 -> 五十音順 -> その他(ここまで着たら追加順)` でお願いします。
// やむを得ず並びを変える場合はコメントアウトでその旨を記載してください。
//
// {
//
//     // 名前 (必須)
//     // 長くしすぎないように。
//     memberName: 'Rinrin.rs',
//
//     // アイコン画像のファイル名 (任意)
//     // `/static/images/members/` に置く画像ファイルを指定してください。
//     // - 最大ファイルサイズ: 50KB (原則)
//     // - 推奨ファイルサイズ: 7KB 前後
//     // - 推奨画像フォーマット: WebP
//     // - 推奨画像サイズ: 256x256
//     // - 推奨画像比率: 1:1 (正方形以外は押し潰されて表示される)
//     // 画像ファイルの配置を忘れないでください。
//     icon: 'rinrin.png',
//
//	   // 役職 (任意)
//     // Player, Coach, Manager 等を指定してください。
//     // 長くしすぎないように。
//     role: 'Web Developer',
//
//     // 国旗 (任意)
//     // 'jp' が日本国、`us` がアメリカ合衆国、'kr' が大韓民国となります。
//     // 新しい国旗を追加する場合は `/static/images/flags/` に SVG ファイルとして追加し、
//     // `/src/lib/scripts/types.ts` に定義される `Member` 型の `country` フィールドの型にファイル名を追加してください。
//     country: 'jp',
//
//     // 生年月日 (任意)
//     // ┏━ 生年月日を一切指定しない場合は `null` にしてください。
//     // ┃
//     // ┃          ┏━ 年は必ず4桁の整数で西暦を指定してください。
//     // ┃          ┃  誕生日の月日のみを指定する場合はこれを `null` にしてください。
//     // ┃          ┃
//     // ┃          ┃           ┏━ 月は1から12までの整数で指定してください。
//     // ┃          ┃           ┃
//     // ┃          ┃           ┃         ┏━ 日は1から31までの整数で指定してください。
//     birthday: { year: 2006, month: 4, day: 13 },
//
//     // 年齢 (任意)
//     // 上の `birthday` フィールドで誕生日を年まで指定している場合は、
//     // 自動で計算(約1日の誤差あり)されるため `null` で問題はありません。
//     age: null,
//
//     // X(旧 Twitter) アカウントの ID (任意)
//     // アットマークはつけないでください。
//     twitter: 'Rinrin_2nd',
//
//     // YouTube チャンネル ID (任意)
//     // `@rinrin-rs` みたいな感じか `UCb3U3ovwzmagTBuzkdrsJkQ` みたいな形式で指定してください。
//     youtube: '@rinrin-rs',
//
//     // Twitch アカウント ID (任意)
//     // アットマークはつけないでください。
//     twitch: 'rinrin0413',
//
//     // ホームページの URL (任意)
//     homepage: 'https://rinrin.pages.dev',
//
//     // 使用デバイスとゲーム設定
//     // この項目のデータは `/src/lib/scripts/data/GEARS_AND_SETTINGS.ts` に記載します。
//     // 詳しくはそちらを参照してください。
//     // 指定しない場合は `null` にするのではなく、
//     // このプロパティ自体を省略してください。
//     gearsAndSettings: GEARS_AND_SETTINGS['rinrin']
// }
//
// なお、部門の並びは自由です。
//

import type { Member } from '$lib/scripts/types';
import { GEARS_AND_SETTINGS } from './GEARS_AND_SETTINGS';

export const MEMBER_LISTS: {
	divisionName: string;
	divisionSubName?: string;
	members: Member[];
}[] = [
	{
		divisionName: 'Overwatch',
		members: [
			{
				memberName: 'harutoon',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'harutoon_ow',
				youtube: null,
				twitch: 'harutoon_',
				homepage: null
			},
			{
				memberName: 'HESTY',
				icon: 'hesty.webp',
				role: 'Player',
				country: 'jp',
				birthday: { year: 1999, month: 9, day: 17 },
				age: null,
				twitter: '__Hestyow',
				youtube: null,
				twitch: 'hesty_ow',
				homepage: null,
				gearsAndSettings: GEARS_AND_SETTINGS['hesty']
			},
			{
				memberName: 'Imalone',
				icon: null,
				role: 'Player',
				country: 'kr',
				birthday: null,
				age: null,
				twitter: 'ow_imalone',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'minseo',
				icon: null,
				role: 'Player',
				country: 'kr',
				birthday: null,
				age: null,
				twitter: 'Kirito0519_OW',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'NOZL',
				icon: 'nozl.webp',
				role: 'Player',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'nozl_hog',
				youtube: null,
				twitch: 'nozl_hog',
				homepage: null
			},
			{
				memberName: 'seunghyeon',
				icon: null,
				role: 'Player',
				country: 'kr',
				birthday: null,
				age: null,
				twitter: 'Hyeon_Seung2',
				youtube: null,
				twitch: null,
				homepage: null
			},
			// ▲ 選手
			// ▼ アナリスト
			{
				memberName: 'Findirath',
				icon: null,
				role: 'Analyst',
				country: 'us',
				birthday: { year: 2002, month: 8, day: 9 },
				age: null,
				twitter: 'findirath_ow',
				youtube: null,
				twitch: 'findirath',
				homepage: null
			},
			// ▲ アナリスト
			// ▼ コーチ
			{
				memberName: 'Byeolha',
				icon: null,
				role: 'Coach',
				country: 'kr',
				birthday: null,
				age: null,
				twitter: 'ow_byeolha',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'Fickle',
				icon: 'fickle.webp',
				role: 'Coach',
				country: 'kr',
				birthday: { year: 1998, month: 7, day: 9 },
				age: null,
				twitter: 'Fickle_OW',
				youtube: null,
				twitch: 'fickle_ow',
				homepage: null
			},
			{
				memberName: 'Troyda',
				icon: null,
				role: 'Coach',
				country: 'kr',
				birthday: null,
				age: null,
				twitter: 'troy_da0321',
				youtube: null,
				twitch: null,
				homepage: null
			},
			// ▲ コーチ
			// ▼ マネージャー
			{
				memberName: 'LUD',
				icon: null,
				role: 'Manager',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'Luvica_Lore',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'N4rAKq',
				icon: null,
				role: 'Manager',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'N4rAKq_ow',
				youtube: null,
				twitch: 'n4rakq_ow',
				homepage: null
			}
		]
	},
	{
		divisionName: 'Overwatch Academy 1st',
		divisionSubName: 'パチマリぽこぽこファイターズ',
		members: [
			{
				memberName: 'chihuahua',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'Smth_ow',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'Ginkgo',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: '_Ginkgo_ow_',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'Mattu',
				icon: null,
				role: 'Player',
				country: null,
				birthday: { year: null, month: 4, day: 26 },
				age: null,
				twitter: 'Mattu_OW',
				youtube: null,
				twitch: 'mattsu_ow',
				homepage: null
			},
			{
				memberName: 'Ril',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'Ril7_ow',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'sans',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: '_sans_ow',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'Seungyeon',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'Seungyeon_ow',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'しのたん',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'shlnoqun_ow',
				youtube: null,
				twitch: null,
				homepage: null
			},
			// ▲ 選手
			// ▼ コーチ
			{
				// Overwatch 部門との兼任
				memberName: 'にんじゃはむぞー',
				icon: 'ninja_hamuzo.webp',
				role: 'Coach',
				country: 'jp',
				birthday: { year: 2002, month: 11, day: 3 },
				age: null,
				twitter: 'ninja_hamuzo',
				youtube: null,
				twitch: 'nhzow',
				homepage: null,
				gearsAndSettings: GEARS_AND_SETTINGS['ninja_hamuzo']
			},
			// ▲ コーチ
			// ▼ マネージャー
			{
				memberName: 'YAMININE',
				icon: null,
				role: 'Manager',
				country: null,
				birthday: null,
				age: null,
				twitter: 'YAMlCHAAAAN',
				youtube: null,
				twitch: null,
				homepage: null
			}
		]
	},
	{
		divisionName: 'Apex',
		members: [
			{
				memberName: 'kiwamyX',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: { year: 2007, month: 4, day: 30 },
				age: null,
				twitter: 'lozexyz111',
				youtube: '@kiwami7140',
				twitch: 'kiwamyx',
				homepage: null
			},
			{
				memberName: 'Kxuh',
				icon: 'kxuh.webp',
				role: 'Player',
				country: 'jp',
				birthday: { year: 1999, month: 9, day: 24 },
				age: null,
				twitter: 'Lilx_zZc',
				youtube: '@k0uh862',
				twitch: 'kxuh_ttv',
				homepage: null
			},
			{
				memberName: 'Suy',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: { year: 2003, month: 10, day: 11 },
				age: null,
				twitter: 'Suy_On_Fire',
				youtube: '@Suy_1203',
				twitch: null,
				homepage: null
			},
			// ▲ 選手
			// ▼ コーチ
			{
				memberName: 'Allice',
				icon: null,
				role: 'Coach',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'GGGallice',
				youtube: null,
				twitch: 'kyarakonn142',
				homepage: null
			}
		]
	},
	{
		divisionName: 'Rainbow Six Siege',
		members: [
			{
				memberName: 'Levia',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'Levia_R6',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'NaKyoung',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'NaKyoungsss',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'いとそん',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: { year: null, month: 12, day: 15 },
				age: null,
				twitter: 'itoson1415',
				youtube: null,
				twitch: 'itos0n1415',
				homepage: null
			},
			{
				memberName: 'いはりー',
				icon: null,
				role: 'Player',
				country: null,
				birthday: null,
				age: null,
				twitter: 'Ihaliyi',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'しぇりー',
				icon: null,
				role: 'Player',
				country: 'jp',
				birthday: { year: null, month: 8, day: 5 },
				age: null,
				twitter: 'ShqIIy',
				youtube: null,
				twitch: 'shellychaaan',
				homepage: null
			},
			{
				memberName: 'ゆうちゃん',
				icon: null,
				role: 'Player',
				country: null,
				birthday: { year: null, month: 1, day: 13 },
				age: null,
				twitter: 'sprYuchan',
				youtube: null,
				twitch: null,
				homepage: null
			},
			{
				memberName: 'れずりー',
				icon: null,
				role: 'Player',
				country: null,
				birthday: { year: null, month: 5, day: 5 },
				age: null,
				twitter: 'Circle_Eye5',
				youtube: null,
				twitch: null,
				homepage: null
			},
			// ▲ 選手
			// ▼ コーチ
			{
				memberName: 'MeeeL',
				icon: null,
				role: 'Coach',
				country: 'jp',
				birthday: { year: null, month: 8, day: 16 },
				age: null,
				twitter: 'MeeeL_cc',
				youtube: 'UCRLj16xVlr4nMV-0UauZYHw',
				twitch: 'meeel0816',
				homepage: null
			}
		]
	},
	{
		divisionName: 'Content Creator',
		members: [
			{
				memberName: 'CLANK',
				icon: 'clank.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: { year: 1998, month: 7, day: 10 },
				age: null,
				twitter: 'clank_ccc',
				youtube: null,
				twitch: 'clank_owl',
				homepage: null
			},
			{
				memberName: 'osato',
				icon: 'osato.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: { year: null, month: 6, day: 13 },
				age: null,
				twitter: 'osato_ow',
				youtube: '@osato_ow',
				twitch: 'osato_fps',
				homepage: null
			},
			{
				memberName: 'きゅうりおいしい',
				icon: 'kyuurioisii.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: { year: null, month: 11, day: 11 },
				age: null,
				twitter: 'kyuurioisii333',
				youtube: null,
				twitch: 'kyuurioisii333',
				homepage: 'https://lit.link/kyuurioisii333'
			},
			{
				memberName: 'ささかま',
				icon: 'sskmovo.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'sskmovo',
				youtube: null,
				twitch: 'nidonesiyoo',
				homepage: 'https://skeb.jp/@sskmovo'
			},
			{
				memberName: 'れるにゃ',
				icon: 'relle.webp',
				role: 'MCBE Map Creator',
				country: 'jp',
				birthday: { year: 2002, month: 7, day: 23 },
				age: null,
				twitter: 'LanternCold',
				youtube: '@relle3674',
				twitch: null,
				homepage: null
			},
			{
				memberName: '翠羽めもり',
				icon: 'suiumemori.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: { year: null, month: 7, day: 22 },
				age: null,
				twitter: 'lO7zZl',
				youtube: '@memori2851',
				twitch: 'lo7zzl',
				homepage: 'https://suiumemori.fanbox.cc/'
			},
			{
				memberName: '魔灰えん',
				icon: 'makaien.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: { year: null, month: 5, day: 5 },
				age: 666.2,
				twitter: 'makaien_vtuber',
				youtube: '@makaien_vtuber',
				twitch: 'makaien_vtuber',
				homepage: 'https://lit.link/makaien'
			},
			{
				memberName: '美作小夜子',
				icon: 'mimasaka.webp',
				role: 'Streamer & Creator',
				country: 'jp',
				birthday: { year: null, month: 7, day: 4 },
				age: null,
				twitter: '345mimasaka',
				youtube: null,
				twitch: '345mimasaka_vt',
				homepage: 'https://lit.link/345mimasaka'
			},
			{
				memberName: '破壊神こたろ',
				icon: 'hakaisinkotaro.webp',
				role: 'Streamer',
				country: 'jp',
				birthday: null,
				age: null,
				twitter: 'mareku1212',
				youtube: '@hakaisinkotaro',
				twitch: 'hakaisinnkotaro',
				homepage: null,
				gearsAndSettings: GEARS_AND_SETTINGS['hakaisinkotaro']
			}
		]
	}
	// {
	// 	divisionName: 'Other',
	// 	members: [
	// 		{
	// 			memberName: 'kishi',
	// 			icon: null,
	// 			role: 'Translator',
	// 			country: 'jp',
	// 			birthday: { year: null, month: 9, day: 2 },
	// 			age: null,
	// 			twitter: 'kishi_krunk',
	// 			youtube: null,
	// 			twitch: null,
	// 			homepage: null
	// 		}
	// 	]
	// },
	// {
	// 	divisionName: 'Operator',
	// 	members: [
	// 		{
	// 			memberName: 'しろねこ',
	// 			icon: '46nek_0.webp',
	// 			role: 'Owner',
	// 			country: 'jp',
	// 			birthday: { year: 2005, month: 3, day: 23 },
	// 			age: null,
	// 			twitter: '46nek_0',
	// 			youtube: null,
	// 			twitch: null,
	// 			homepage: null
	// 		},
	// 		// ▲ 代表
	// 		{
	// 			memberName: '2止',
	// 			icon: 'haineko.webp',
	// 			role: null,
	// 			country: 'jp',
	// 			birthday: { year: 2004, month: 4, day: 7 },
	// 			age: null,
	// 			twitter: 'zitome22',
	// 			youtube: '@zitome2',
	// 			twitch: 'zitome2',
	// 			homepage: null
	// 		},
	// 		{
	// 			memberName: 'Kaz9nnN',
	// 			icon: 'kaz.webp',
	// 			role: null,
	// 			country: 'jp',
	// 			birthday: { year: 2003, month: 4, day: 23 },
	// 			age: null,
	// 			twitter: 'KAZKUN_TSUYOI',
	// 			youtube: null,
	// 			twitch: 'rev_kazkun',
	// 			homepage: null
	// 		},
	// 		{
	// 			memberName: 'Pear',
	// 			icon: 'pear.webp',
	// 			role: null,
	// 			country: 'jp',
	// 			birthday: null,
	// 			age: null,
	// 			twitter: 'pear_fps',
	// 			youtube: null,
	// 			twitch: 'pear_fps',
	// 			homepage: null
	// 		},
	// 		{
	// 			memberName: 'Rinrin.rs',
	// 			icon: 'rinrin.webp',
	// 			role: 'Web Developer',
	// 			country: 'jp',
	// 			birthday: { year: 2006, month: 4, day: 13 },
	// 			age: null,
	// 			twitter: 'Rinrin_2nd',
	// 			youtube: '@rinrin-rs',
	// 			twitch: 'rinrin0413',
	// 			homepage: 'https://rinrin.pages.dev'
	// 		},
	// 		{
	// 			memberName: 'ひなこ',
	// 			icon: null,
	// 			role: null,
	// 			country: 'jp',
	// 			birthday: { year: 2004, month: 10, day: 14 },
	// 			age: null,
	// 			twitter: 'hinakunaiueo',
	// 			youtube: '@hinakox9220',
	// 			twitch: 'hinakoooo_fn',
	// 			homepage: null
	// 		}
	// 	]
	// }
];
