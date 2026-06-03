<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<img src="/images/Gateway-tournament-kv.webp" alt="REVATI Community CUP 'GATEWAY'" />

<p>
	{$_('event.desc.0')}<br />{$_('event.desc.1')}<a
		href="https://tournament.revati.jp"
		target="_blank"
		rel="noopener">{$_('event.desc.2')}</a
	>{$_('event.desc.3')}<br />{$_('event.desc.4')}<a
		href="https://camp-fire.jp/projects/946239/view"
		target="_blank"
		rel="noopener noreferrer">{$_('event.desc.5')}</a
	>{$_('event.desc.6')}
</p>

<!-- <a
	href="https://tournament.revati.jp/community/gateway"
	target="_blank"
	rel="noopener"
	title="REVATI Community CUP 'GATEWAY' | TOP">{$_('event.websiteLink')}</a
> -->

<style lang="scss">
	img {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		border: 2px solid #e4ff00;
		border-radius: 2px;
		box-sizing: border-box;
	}

	p {
		margin: 14px auto !important;
		font-size: 17px !important;
		letter-spacing: -0.5px !important;
	}

	// span {
	// 	font-weight: 900;
	// 	letter-spacing: 0.5px;
	// 	white-space: nowrap;
	// }

	// a {
	// 	font-size: 22px;
	// }
</style>
