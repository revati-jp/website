<script lang="ts">
	import { writable } from 'svelte/store';
	import { _ } from 'svelte-i18n';

	import Modal from '$lib/components/Modal.svelte';

	const PLAYERS = [
		'Proper',
		'Pelican',
		'FiNN',
		'Merit',
		'ChiYo',
		'Viol2t',
		'Heesang',
		'Junbin',
		'MAX',
		'Vindaim'
	];

	const isOpen = writable(false);
	let scrollY = $state(0);
	const isVisible = $derived(0 < scrollY);
</script>

<svelte:window bind:scrollY />

<button
	class:visible={isVisible}
	aria-label={$_('o2blast.buttonTitle')}
	title={$_('o2blast.buttonTitle')}
	onclick={() => isOpen.set(true)}
>
	<img src="/images/logos/O2-Blast.png" alt="O2 Blast" />
</button>

<Modal open={isOpen} title="O2 Blast">
	<div class="modal-content">
		<p class="subtitle">{$_('o2blast.subtitle')}</p>

		<h2>{$_('o2blast.overview.title')}</h2>
		<p>
			{$_('o2blast.overview.desc')}
		</p>

		<h2>{$_('o2blast.achievements.title')}</h2>
		<p>
			{$_('o2blast.achievements.desc.0')}
		</p>
		<p>{$_('o2blast.achievements.desc.1')}</p>
		<a
			href="https://liquipedia.net/overwatch/O2_Blast#Results"
			target="_blank"
			rel="noopener noreferrer"
		>
			{$_('o2blast.achievements.liquipediaLink')}
		</a>

		<h2>{$_('o2blast.players.title')}</h2>
		<p>{$_('o2blast.players.desc')}</p>
		<ul>
			{#each PLAYERS as player (player)}
				<li>{player}</li>
			{/each}
		</ul>

		<h2>{$_('o2blast.initiative.title')}</h2>
		<p>
			{$_('o2blast.initiative.desc.0')}
		</p>
		<p>{$_('o2blast.initiative.desc.1')}</p>

		<h2>{$_('o2blast.links.title')}</h2>
		<ul>
			<li>
				<a href="https://x.com/O2_Blast" target="_blank" rel="noopener noreferrer"
					>{$_('o2blast.links.officialX')}</a
				>
			</li>
			<li>
				<a href="https://www.youtube.com/@O2BLAST" target="_blank" rel="noopener noreferrer"
					>{$_('o2blast.links.officialYouTube')}</a
				>
			</li>
		</ul>
	</div>
</Modal>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	button {
		position: fixed;
		bottom: 6px;
		left: 9px;
		background-color: #0a0a0a;
		cursor: pointer;
		padding-block: 10px 6px;
		padding-inline: 14px;
		border-radius: 8px;
		border: none;
		z-index: 112;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transform: translateY(20px);
		transition:
			opacity 0.4s ease,
			visibility 0.4s ease,
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.25s ease;

		&.visible {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translateY(0);
		}

		// Shimmer / light sweep effect
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 60%;
			height: 100%;
			background: linear-gradient(90deg, transparent, #ffffff2e, transparent);
			transform: skewX(-20deg);
			pointer-events: none;
		}

		&:hover,
		&:focus-visible {
			border-color: #ffffff66;
			background-color: #141414;
			transform: translateY(-3px) scale(1.01);

			&::before {
				left: 150%;
				transition: left 0.65s cubic-bezier(0.4, 0, 0.2, 1);
			}

			img {
				transform: scale(1.02);
				filter: brightness(1.12);
			}
		}

		&:focus:not(:focus-visible) {
			outline: none;
		}

		&:active {
			transform: translateY(0) scale(0.97);
			box-shadow: 0 4px 12px #00000099;
			transition-duration: 0.1s;
		}

		img {
			width: 280px;
			height: auto;
			display: block;
			transition:
				transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
				filter 0.25s ease;
		}
	}

	.modal-content {
		text-align: left;
		max-width: 636px;
	}

	.subtitle {
		font-size: 1.2rem;
		font-weight: 900;
		margin-bottom: 1rem;
		text-align: center;
	}

	h2 {
		font-size: 1.4rem;
		font-weight: 900;
		margin-top: 1.5rem;
	}

	ul {
		padding-left: 20px;
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;

			&::before {
				display: none;
			}

			&:hover,
			&:focus-visible {
				transform: none;

				img {
					transform: none;
				}
			}
		}
	}

	@include sp {
		button {
			bottom: 14px;
			left: 6px;
			padding-block: 8px 4px;
			padding-inline: 10px;

			img {
				width: 190px;
			}

			&:hover,
			&:focus-visible {
				transform: translateY(0) scale(1.01);

				img {
					transform: scale(1.01);
				}
			}
		}

		.subtitle {
			font-size: 1rem;
		}

		h2 {
			font-size: 1.2rem;
		}
	}
</style>
