// # データを追加する人へ
//
// 追加する際は以下のフォーマットで追加してください。
// 任意となっている項目には、`null` を指定することで指定なしとすることができます。
//
// {
//
//     // 等身イラストのファイル名 (必須)
//     // `/static/images/members/characters/` に置く画像ファイルの名前を指定してください。
//     // なお、用意する画像ファイルの拡張子は `.webp` で統一してください。
//     avatar: 'epic',
//
//     // DPI (必須)
//     dpi: 800,
//
//     // ゲーム内感度 (必須)
//     // 役割(?)ごとの感度を指定する場合は、型 `{ role: string; value: number }[]` の形式で指定してください。
//     sens: 4.5,
//     // または:
//     sens: [
//         { role: 'tank', value: 10.0 },
//         { role: 'damage', value: 5.22 },
//         { role: 'support', value: 7.0 }
//     ],
//
//     // 使用マウス (必須)
//     mouse: 'Logicool G PRO X Superlight',
//
//     // 使用マウスパッド (必須)
//     mousepad: 'Padsmith Crucible - Temple of Dreams V2',
//
//     // 使用キーボード (必須)
//     keyboard: 'Logicool G PRO',
//
//     // クロスヘア設定 (必須)
//     // 配列になっているため、複数のクロスヘア設定を指定することも可能です。
//     crosshairSettings: [
//         {
//
//             // 「タイプ」 (任意)
//             // 翻訳ファイル(`/src/lib/scripts/i18n/locales/` にある JSON ファイル) の、
//             // `teams.gearsAndSettingsItem.type.` に続く 対応するキーを指定してください。
//             // 新しく追加する場合はすべての言語のファイルに追加してください。
//             type: 'default',
//
//             // 「精度を表示」 (任意)
//             showsAccuracy: true,
//
//             // 「色」 (必須)
//             // 翻訳ファイル(`/src/lib/scripts/i18n/locales/` にある JSON ファイル) の、
//             // `teams.gearsAndSettingsItem.color.` に続く 対応するキーを指定してください。
//             // 新しく追加する場合はすべての言語のファイルに追加し、
//             // `/src/lib/components/home/teams/GearsAndSettings.svelte` の `convertColNameToHexCol` 関数に対応する色を追加してください。
//             color: 'cyan',
//
//             // 「濃さ」 (任意)
//             thickness: 1.0,
//
//             // 「回転」 (任意)
//             rotation: 0
//
//             // 「照準幅」 (任意)
//             crosshairLength: 8.0,
//
//             // 「中央ギャップ」 (任意)
//             centerGap: 0.0,
//
//             // 「不透明度」 (任意)
//             opacity: 0,
//
//             outline: {
//
//                 // 「アウトラインの色」 (必須)
//                 // 翻訳ファイル(`/src/lib/scripts/i18n/locales/` にある JSON ファイル) の、
//                 // `teams.gearsAndSettingsItem.color.` に続く 対応するキーを指定してください。
//                 // 新しく追加する場合はすべての言語のファイルに追加し、
//                 // `/src/lib/components/home/teams/GearsAndSettings.svelte` の `convertColNameToHexCol` 関数に対応する色を追加してください。
//                 color: 'black',
//
//				   // 「アウトラインの透明度」 (必須)
//                 opacity: 0,
//
//                 // 「アウトラインの太さ」 (必須)
//                 thickness: 0.0,
//
//                 // 「アウトラインのシフト」 (必須)
//                 shift: 0.0
//             },
//             dot: {
//
//                 // 「ドットのタイプ」 (必須)
//                 // 翻訳ファイル(`/src/lib/scripts/i18n/locales/` にある JSON ファイル) の、
//                 // `teams.gearsAndSettingsItem.dot.type..` に続く 対応するキーを指定してください。
//                 // 新しく追加する場合はすべての言語のファイルに追加してください。
//                 type: 'default',
//
//                 // 「ドットサイズ」 (必須)
//                 size: 5.0,
//
//                 // 「ドット透明度」 (必須)
//                 opacity: 100
//             },
//
//             // 解像度スケール (必須)
//             scaleWithResolution: true
//         }
//     ]
// }
//

import type { GearsAndSettings } from '$lib/scripts/types';

export const GEARS_AND_SETTINGS: { [key: string]: GearsAndSettings } = {
	hesty: {
		avatar: 'hesty',
		dpi: 800,
		sens: [
			{ role: 'tank', value: 10.0 },
			{ role: 'damage', value: 5.22 },
			{ role: 'support', value: 7.0 }
		],
		mouse: 'Finalmouse Ultralight 2 - CAPE TOWN',
		mousepad: 'Padsmith Crucible - Temple of Dreams V2',
		keyboard: 'Varmilo 92 Sakura 桜 JIS Keyboard V2',
		crosshairSettings: [
			{
				type: 'line',
				showsAccuracy: false,
				color: 'red',
				thickness: 1.0,
				rotation: 0,
				crosshairLength: 4.0,
				centerGap: 0.0,
				opacity: 100,
				outline: {
					color: 'black',
					opacity: 0,
					thickness: 1.0,
					shift: 1.0
				},
				dot: {
					type: 'default',
					size: 4.5,
					opacity: 0
				},
				scaleWithResolution: true
			},
			{
				type: 'crosshairs',
				showsAccuracy: false,
				color: 'red',
				thickness: 1.0,
				rotation: 45,
				crosshairLength: 5.0,
				centerGap: 0.8,
				opacity: 100,
				outline: {
					color: 'black',
					opacity: 100,
					thickness: 1.0,
					shift: 1.0
				},
				dot: {
					type: 'default',
					size: 0.0,
					opacity: 0
				},
				scaleWithResolution: true
			}
		]
	},
	// hakaisinkotaro: {
	// 	avatar: 'hakaisinkotaro',
	// 	dpi: 800,
	// 	sens: 7.3,
	// 	mouse: 'Logicool G PRO X SUPERLIGHT',
	// 	mousepad: 'Padsmith Crucible - Temple of Dreams V2',
	// 	keyboard: 'Logicool G 913 TKL',
	// 	crosshairSettings: [
	// 		{
	// 			type: 'dot',
	// 			showsAccuracy: null,
	// 			color: 'white',
	// 			thickness: null,
	// 			rotation: null,
	// 			crosshairLength: null,
	// 			centerGap: null,
	// 			opacity: null,
	// 			outline: {
	// 				color: 'black',
	// 				opacity: 100,
	// 				thickness: 3.0,
	// 				shift: 1.0
	// 			},
	// 			dot: {
	// 				type: 'default',
	// 				size: 2.9,
	// 				opacity: 100
	// 			},
	// 			scaleWithResolution: true
	// 		}
	// 	]
	// },
	hofac: {
		avatar: 'hofac',
		dpi: 800,
		sens: 3.25,
		mouse: 'Logicool G PRO Wireless',
		mousepad: 'PADSMITH Temple of Dreams - Remastered',
		keyboard: 'COX Endeavour Original Retro Tenkeyless',
		crosshairSettings: [
			{
				type: 'line',
				showsAccuracy: false,
				color: 'orange',
				thickness: 1.0,
				rotation: 0,
				crosshairLength: 4.0,
				centerGap: 0.0,
				opacity: 100,
				outline: {
					color: 'black',
					opacity: 0,
					thickness: 1.0,
					shift: 1.0
				},
				dot: {
					type: 'default',
					size: 4.5,
					opacity: 0
				},
				scaleWithResolution: true
			}
		]
	},
	ninja_hamuzo: {
		avatar: 'ninja_hamuzo',
		dpi: 800,
		sens: 3.25,
		mouse: 'Gwolves HTS Plus 4K',
		mousepad: 'Artizan Hayate乙',
		keyboard: 'Steelseries Apex pro mini',
		crosshairSettings: [
			{
				type: 'circle',
				showsAccuracy: false,
				color: 'magenta',
				thickness: 1.0,
				rotation: null,
				crosshairLength: null,
				centerGap: 39.7,
				opacity: 100,
				outline: {
					color: 'black',
					opacity: 100,
					thickness: 1.0,
					shift: 1.0
				},
				dot: {
					type: 'default',
					size: 5.0,
					opacity: 100
				},
				scaleWithResolution: true
			},
			{
				type: 'crosshairs',
				showsAccuracy: false,
				color: 'magenta',
				thickness: 1.0,
				rotation: 0,
				crosshairLength: 5.0,
				centerGap: 3.5,
				opacity: 100,
				outline: {
					color: 'black',
					opacity: 100,
					thickness: 1.0,
					shift: 1.0
				},
				dot: {
					type: 'default',
					size: 0.0,
					opacity: 0
				},
				scaleWithResolution: true
			}
		]
	}
};
