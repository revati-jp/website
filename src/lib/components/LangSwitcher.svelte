<script lang="ts">
	import { run } from 'svelte/legacy';

	import { locale } from 'svelte-i18n';

	let lang = $state($locale?.slice(0, 2));

	// Update the locale when the language is changed here.
	run(() => {
		locale.set(lang);
	});

	// Update the selected language when locale is changed in OTHER places.
	run(() => {
		lang = $locale?.slice(0, 2);
	});
</script>

<label
	><span>Language</span><select bind:value={lang}>
		<option value="ja">日本語</option>
		<option value="en">English</option>
		<option value="ko">한국어</option>
	</select></label
>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	label {
		@include hideWhenNoJs;
	}

	span {
		color: #dbfcff;
		font-size: 14px;
		font-weight: 900;
		margin-right: 4px;

		&:after {
			content: ':';
			margin-left: 1px;
		}
	}

	select {
		color: #a3f7ff;
		font-size: 16px;
		font-family: inherit;
		background-color: #213b3f;
		border: 4px solid #021a1e;
		border-radius: 4px;
		padding: 3px 0 3px 5px;
		cursor: pointer;
	}
</style>
