<script module lang="ts">
	const GOOGLE_MATERIAL_DESIGN_ICONS_PATH = '/images/google-material-design-icons/';
	const BOOTSTRAP_ICONS_PATH = '/images/bootstrap-icons/';
	const ICONS = {
		'box-arrow-up-right': {
			src: BOOTSTRAP_ICONS_PATH + 'box-arrow-up-right.svg',
			alt: 'Box arrow up-right'
		},
		'link-45deg': {
			src: BOOTSTRAP_ICONS_PATH + 'link-45deg.svg',
			alt: 'Link 45deg'
		},
		'lock-fill_inline': {
			src: GOOGLE_MATERIAL_DESIGN_ICONS_PATH + 'lock_24dp_FILL1_wght400_GRAD0_opsz24.svg',
			alt: 'Private'
		},
		'stadia-controller': {
			src:
				GOOGLE_MATERIAL_DESIGN_ICONS_PATH +
				'stadia_controller_24dp_E8EAED_FILL1_wght400_GRAD0_opsz24.svg',
			alt: 'Stadia Controller'
		}
	};
	export type IconKind = keyof typeof ICONS;
</script>

<script lang="ts">
	interface Props {
		kind: IconKind;
		/** The intrinsic width of the image in pixels. */
		width?: string;
		/** The intrinsic height of the image in pixels. */
		height?: string;
		/** Inline styles. */
		style?: string;
	}

	let { kind, width = 'auto', height = 'auto', style = '' }: Props = $props();

	const icon = $derived(ICONS[kind]);
</script>

<img
	src={icon.src}
	alt={icon.alt}
	loading="lazy"
	style="width: {width}; height: {height}; {style}"
/>
