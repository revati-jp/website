<script lang="ts">
	import type { GearsAndSettings } from '$lib/scripts/types';
	import { _ } from 'svelte-i18n';

	interface Props {
		playerName: string;
		gearsAndSettings: GearsAndSettings;
	}

	let { playerName, gearsAndSettings }: Props = $props();

	const sens = $derived(gearsAndSettings.sens);
	const crosshairs = $derived(gearsAndSettings.crosshairSettings);

	const T9N_KEY_PREFIX = 'teams.gearsAndSettingsItem.';
	const T9N_KEY_PREFIX_OUTLINE = T9N_KEY_PREFIX + 'outline.';
	const T9N_KEY_PREFIX_DOT = T9N_KEY_PREFIX + 'dot.';

	function convertColNameToHexCol(colName: string): string {
		switch (colName) {
			case 'black':
				return '#000000';
			case 'white':
				return '#ffffff';
			case 'red':
				return '#ff0000';
			case 'cyan':
				return '#00ffff';
			case 'magenta':
				return '#ff00ff';
			case 'orange':
				return '#fd7000';
			default:
				return '#00000000';
		}
	}

	function convertBoolToOnOff(b: boolean): string {
		return b ? $_('w.on') : $_('w.off');
	}
</script>

<img
	src="/images/members/characters/{gearsAndSettings.avatar}.webp"
	alt="{playerName}{$_('teams.sAvatar')}"
/>

<h2>{playerName}{$_('teams.sGearsAndGameSettings')}</h2>

<table>
	<thead>
		<tr>
			<th colSpan="2">{$_('w.gears')}</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>DPI</td>
			<td>{gearsAndSettings.dpi}</td>
		</tr>
		<tr>
			<td>{$_('w.mouse')}</td>
			<td>{gearsAndSettings.mouse}</td>
		</tr>
		<tr>
			<td>{$_('w.mousepad')}</td>
			<td>{gearsAndSettings.mousepad}</td>
		</tr>
		<tr>
			<td>{$_('w.keyboard')}</td>
			<td>{gearsAndSettings.keyboard}</td>
		</tr>
	</tbody>
</table>

<table>
	<thead>
		<tr>
			<th colSpan="2">{$_('w.gameSettings')}</th>
		</tr>
	</thead>
	<tbody>
		{#if typeof sens === 'number'}
			<tr>
				<td>{$_('w.sens')}</td>
				<td>{sens.toFixed(2)}</td>
			</tr>
		{:else if sens !== null}
			{#each sens as { role, value }}
				<tr>
					<td>{$_('w.sens')} ({role.toUpperCase()})</td>
					<td>{value.toFixed(2)}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

{#each crosshairs as crosshair, i}
	{@const crosshairColName = crosshair.color}
	{@const outline = crosshair.outline}
	{@const outlineColName = outline.color}
	{@const dot = crosshair.dot}
	<table>
		<thead>
			<tr>
				<th colSpan="2">
					{$_('w.crosshairSettings')}
					{1 < crosshairs.length ? i + 1 : ''}
				</th></tr
			>
		</thead>
		<tbody>
			{#if crosshair.type !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'type')}</td>
					<td>{$_(`${T9N_KEY_PREFIX}type.${crosshair.type}`)}</td>
				</tr>
			{/if}
			{#if crosshair.showsAccuracy !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'showsAccuracy')}</td>
					<td>{convertBoolToOnOff(crosshair.showsAccuracy)}</td>
				</tr>
			{/if}
			<tr>
				<td>{$_(T9N_KEY_PREFIX + 'color')}</td>
				<td>
					<span
						class="color"
						style="text-decoration-color: {convertColNameToHexCol(crosshairColName)};"
						>{$_(`${T9N_KEY_PREFIX}color.${crosshairColName}`)}</span
					>
				</td>
			</tr>
			{#if crosshair.thickness !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'thickness')}</td>
					<td>{crosshair.thickness.toFixed(1)}</td>
				</tr>
			{/if}
			{#if crosshair.rotation !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'rotation')}</td>
					<td>{crosshair.rotation}</td>
				</tr>
			{/if}
			{#if crosshair.crosshairLength !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'crosshairLength')}</td>
					<td>{crosshair.crosshairLength.toFixed(1)}</td>
				</tr>
			{/if}
			{#if crosshair.centerGap !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'centerGap')}</td>
					<td>{crosshair.centerGap.toFixed(1)}</td>
				</tr>
			{/if}
			{#if crosshair.opacity !== null}
				<tr>
					<td>{$_(T9N_KEY_PREFIX + 'opacity')}</td>
					<td>{crosshair.opacity + '%'}</td>
				</tr>
			{/if}
			<tr>
				<td>{$_(T9N_KEY_PREFIX_OUTLINE + 'color')}</td>
				<td>
					<span
						class="color"
						style="text-decoration-color: {convertColNameToHexCol(outlineColName)};"
						>{$_(`${T9N_KEY_PREFIX}color.${outlineColName}`)}
					</span>
				</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_OUTLINE + 'opacity')}</td>
				<td>{outline.opacity + '%'}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_OUTLINE + 'thickness')}</td>
				<td>{outline.thickness.toFixed(1)}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_OUTLINE + 'shift')}</td>
				<td>{outline.shift.toFixed(1)}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_DOT + 'type')}</td>
				<td>{$_(`${T9N_KEY_PREFIX_DOT}type.${dot.type}`)}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_DOT + 'size')}</td>
				<td>{dot.size.toFixed(1)}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX_DOT + 'opacity')}</td>
				<td>{dot.opacity + '%'}</td>
			</tr>
			<tr>
				<td>{$_(T9N_KEY_PREFIX + 'scaleWithResolution')}</td>
				<td>{convertBoolToOnOff(crosshair.scaleWithResolution)}</td>
			</tr>
		</tbody>
	</table>
{/each}

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;
	@use '$lib/stylesheets/variables/color' as *;

	img {
		height: 186px;
		margin-top: 46px;
	}

	h2 {
		font-size: 24px;
		margin-top: 38px;
	}

	$table-border-col: #566569;

	table {
		width: 100%;
		margin: 24px auto;
		font-size: 16px;
		border-collapse: collapse;
		overflow-x: scroll;
		word-break: break-all;
		scrollbar-color: $primary-color-pale transparent;
	}

	th,
	td {
		max-width: 383px;
		padding: 3px 6px;
		border: 1px solid rgba($table-border-col, 0.5);
	}

	th {
		background-color: #121826;
		border-bottom: 2px solid $table-border-col;
	}

	td {
		background-color: #122026;
	}

	.color {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-decoration-skip-ink: none;
	}

	@include sp {
		table {
			display: block;
			font-size: 14px;
			white-space: nowrap;
		}

		th,
		td {
			max-width: initial;
			width: 100vw;
		}
	}
</style>
