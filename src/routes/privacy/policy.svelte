<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { SOCIALS } from '#lib/scripts/variables.ts';
</script>

<div>
	<p>
		{$_('privacy.policy.desc.0')}<a href="https://revati.jp">revati.jp</a>{$_(
			'privacy.policy.desc.1'
		)}<a href="https://studio.revati.jp">studio.revati.jp</a>
		{$_('privacy.policy.desc.2')}
	</p>

	<h2 id="policy1">1. {$_('privacy.policy.1.0')}</h2>
	<p>{$_('privacy.policy.1.1')}</p>
	<ul>
		<li>{$_('privacy.policy.1.2')}</li>
		<li>{$_('privacy.policy.1.3')}</li>
		<li>{$_('privacy.policy.1.4')}</li>
	</ul>
	<p>
		{$_('privacy.policy.1.5')}
		<a href="https://cloudflare.com/web-analytics">Cloudflare Web Analytics</a>{$_(
			'privacy.policy.1.6'
		)}
	</p>

	<h2 id="policy2">2. {$_('privacy.policy.2.0')}</h2>
	<p>{$_('privacy.policy.2.1')}</p>
	<ul>
		<li>{$_('privacy.policy.2.2')}</li>
		<li>{$_('privacy.policy.2.3')}</li>
		<li>{$_('privacy.policy.2.4')}</li>
		<li>{$_('privacy.policy.2.5')}</li>
	</ul>

	<h2 id="policy3">3. {$_('privacy.policy.3.0')}</h2>
	<p>{$_('privacy.policy.3.1')}</p>
	<ul>
		<li>{$_('privacy.policy.3.2')}</li>
		<li>{$_('privacy.policy.3.3')}</li>
		<li>{$_('privacy.policy.3.4')}</li>
	</ul>

	<h2 id="policy4">4. {$_('privacy.policy.4.0')}</h2>
	<p>{$_('privacy.policy.4.1')}</p>
	<ul>
		<li>{$_('privacy.policy.4.2')}</li>
		<li>{$_('privacy.policy.4.3')}</li>
	</ul>
	<p>{$_('privacy.policy.4.4')}</p>

	<h2 id="policy5">5. {$_('privacy.policy.5.0')}</h2>
	<p>{$_('privacy.policy.5.1')}</p>
	<ul>
		<li>{$_('privacy.policy.5.2')}</li>
		<li>{$_('privacy.policy.5.3')}</li>
	</ul>
	<p>
		{$_('privacy.policy.5.4')}<a href="#policy8">8. {$_('privacy.policy.8.0')}</a>{$_(
			'privacy.policy.5.5'
		)}
	</p>

	<h2 id="policy6">6. {$_('privacy.policy.6.0')}</h2>
	<p>{$_('privacy.policy.6.1')}<br /><br /></p>
	<p>
		{$_('privacy.policy.6.2')}
		<a href="https://suzuri.jp/trading">SUZURI</a>{$_('privacy.policy.6.3')}<a
			href="https://pepabo.com/company/overview">{$_('w.gmoPepaboInc')}</a
		>{$_('privacy.policy.6.4')} <a href="https://about.x.com">X</a>{$_('privacy.policy.6.5')}<a
			href="https://about.x.com">X Corp.</a
		>
		{$_('privacy.policy.6.6')}<a href="https://pepabo.com/company/privacy/#site"
			>{$_('privacy.policy.6.7')}</a
		>{$_('privacy.policy.6.8')}<a href="https://developer.x.com/docs/x-for-websites/privacy"
			>Privacy</a
		>{$_('privacy.policy.6.9')}
	</p>

	<h2 id="policy7">7. {$_('privacy.policy.7.0')}</h2>
	<p>{$_('privacy.policy.7.1')}</p>

	<h2 id="policy8">8. {$_('privacy.policy.8.0')}</h2>
	<p>
		{$_('privacy.policy.8.1')}<br />{$_('privacy.policy.8.2')}:
		<a href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a>
	</p>
</div>

<style lang="scss">
	@use 'stylesheets/variables/mixin' as *;

	div,
	p {
		font-size: 18px !important;
		text-align: left !important;

		@include sp {
			font-size: 16px !important;
		}
	}

	p {
		margin: 0 !important;
		max-width: initial !important;
	}
</style>
