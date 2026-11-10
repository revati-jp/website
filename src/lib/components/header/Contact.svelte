<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { SOCIALS } from '#lib/scripts/variables.ts';
</script>

<p>
	{$_('contact.desc')}<br />
	{$_('contact.note.0')}<br />
	{$_('contact.note.1')}
</p>
<div class="mail-btn-container">
	<a href="mailto:{SOCIALS.email}" draggable="false">{$_('contact.button')}</a>
</div>

<style lang="scss">
	@use 'stylesheets/variables/mixin' as *;

	p {
		display: inline-block;
		font-size: 16px;
		margin: 0 auto;
		margin-top: 12px;
		margin-bottom: 32px;
		text-align: left;
		white-space: nowrap;
	}

	a {
		display: inline-block;

		@include btn(19px);
	}

	.mail-btn-container {
		display: block;
	}

	@include sp {
		p {
			font-size: 11px;
		}

		a {
			font-size: 15px;
			margin-bottom: 14px;
		}
	}
</style>
