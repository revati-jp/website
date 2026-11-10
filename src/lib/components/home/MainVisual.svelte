<div>
	<img src="/images/logos/revati/title_without-icon.webp" alt="REVATI - UNDEFINED SPIRIT" />
</div>

<style lang="scss">
	@use 'stylesheets/variables/mixin' as *;
	@use 'stylesheets/variables/dimension' as *;

	div {
		height: calc($max-vh001 * 100);
		position: relative;
		opacity: 0;
		filter: blur(12px);
		animation: fadeIn 2s ease-in-out forwards;

		@keyframes fadeIn {
			to {
				opacity: 1;
				filter: blur(0);
			}
		}
	}

	img {
		display: block;
		width: 609px;
		height: auto;
		aspect-ratio: 917 / 256;
		margin: 0 auto;
		position: relative;
		top: calc(50% - 20px);
		translate: 0 -50%;
		user-select: none;
		pointer-events: none;
		filter: sepia(2) hue-rotate(154deg) saturate(4) drop-shadow(0 0 36px #caffff59)
			drop-shadow(0 0 128px #75ffff99);

		@include sp {
			width: 80vw;
		}
	}
</style>
