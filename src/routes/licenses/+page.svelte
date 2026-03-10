<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';

	import licenses from '$lib/licenses.json';
	import { OTHER_LICENSES } from '$lib/scripts/data/OTHER_LICENSES';
	import { SITE_URL } from '$lib/scripts/variables';
	import type { LicenseInfo } from '$lib/scripts/types';
	import { _ } from 'svelte-i18n';

	const libraries = Object.entries(licenses as Record<string, LicenseInfo>).map(
		([id, license]) => ({
			id,
			license
		})
	);

	const softwares = libraries.concat(OTHER_LICENSES);
</script>

<HeadMetadata
	title="Licenses"
	desc="本ウェブサイトの開発に使用しているオープンソースソフトウェア並びにその著作権表示及びライセンス条文の一覧です。"
	canonicalUrl="{SITE_URL}/licenses"
/>

<div class="container">
	<section id="licenses">
		<SectionTitle name="licenses" />
		<p>{$_('licenses.desc')}</p>
		<div class="content">
			<ul>
				{#each softwares as software}
					{@const licenseInfo = software.license}
					{@const normalizedLicenseNames = licenseInfo.licenses?.trim() ?? ''}
					{@const licenseNames =
						normalizedLicenseNames.length > 0 ? normalizedLicenseNames : 'Unknown'}
					{@const copyright = licenseInfo.copyright}
					{@const licenseText = licenseInfo.licenseText}
					{@const hasLicenseText = (licenseText?.trim().length ?? 0) > 0}
					<li>
						<details>
							<summary>{software.id}<span>&nbsp;- {licenseNames}</span></summary>
							<pre>{#if copyright?.trim()}<div
										class="copyright">{copyright}</div>{/if}{hasLicenseText
									? licenseText
									: licenseNames}
							</pre>
						</details>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style lang="scss">
	@use '$lib/stylesheets/variables/color' as *;
	@use '$lib/stylesheets/variables/mixin' as *;

	ul {
		padding: 0;
	}

	li {
		padding: 6px;
		text-align: left;
		list-style: none;
	}

	summary {
		max-width: 532px;
		margin: 0 auto;
		font-size: 20px;
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	}

	span {
		font-size: 14px;
		white-space: nowrap;
		opacity: 0.8;
	}

	pre {
		font-family: monospace;
		font-size: 14px;
		padding: 8px;
		background-color: #00000060;
		scrollbar-color: $primary-color-pale-lighter transparent;
		overflow: auto;
	}

	.copyright {
		margin-top: 4px;
		margin-bottom: 14px;
		padding: 11px;
		font-size: 13px;
		background-color: #000000a0;
		white-space: pre-wrap;
	}

	@include sp {
		li {
			padding: 8px;
		}

		summary {
			max-width: 386px;
			font-size: 16px;
		}

		span {
			font-size: 13px;
		}

		pre {
			font-size: 12px;
			padding: 7px;
		}

		.copyright {
			margin-top: 2px;
			margin-bottom: 10px;
			padding: 8px;
			font-size: 12px;
		}
	}
</style>
