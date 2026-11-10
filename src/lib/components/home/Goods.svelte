<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<img src="/images/goods-poster.webp" alt={$_('w.poster')} />

<p>{$_('goods.desc')}</p>

<a
	href="https://suzuri.jp/revati_jp"
	target="_blank"
	rel="noopener noreferrer"
	title={$_('goods.storeLinkTitle')}>{$_('goods.storeLink')}</a
>

<style lang="scss">
	@use 'stylesheets/variables/mixin' as *;

	img {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		border: 8px solid #11395d;
		border-radius: 2px;
		box-sizing: border-box;
	}

	p {
		margin: 14px auto !important;
		font-size: 17px !important;
		letter-spacing: -0.5px !important;
	}

	a {
		font-size: 22px;
	}
</style>
