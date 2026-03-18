<table>
	<thead>
		<tr>
			<th colspan="2">個人で受ける場合</th>
		</tr>
		<tr>
			<th>プラン</th>
			<th>料金</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>通常プラン</td>
			<td>3,000円 / 1時間</td>
		</tr>
		<tr>
			<td>3回まとめてプラン</td>
			<td>7,500円 / 3時間<span>(1時間あたり500円お得)</span></td>
		</tr>
		<tr>
			<td>1ヶ月定額プラン</td>
			<td>16,000円 / 1ヶ月<span>(1時間あたり1,000円お得)</span></td>
		</tr>
	</tbody>
</table>
<table>
	<thead>
		<tr>
			<th colspan="2">チーム単位で受ける場合</th>
		</tr>
		<tr>
			<th>プラン</th>
			<th>料金</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>通常プラン</td>
			<td>6,000円 / 1時間</td>
		</tr>
		<tr>
			<td>3回まとめてプラン</td>
			<td>15,000円 / 3時間<span>(1時間あたり1,000円お得)</span></td>
		</tr>
		<tr>
			<td>1ヶ月定額プラン</td>
			<td>32,000円 / 1ヶ月<span>(1時間あたり2,000円お得)</span></td>
		</tr>
	</tbody>
</table>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	table {
		margin: 26px auto;
		font-size: 21px;
		border-collapse: collapse;
		border: 2px solid #ccfbff98;
	}

	tr {
		background-color: #122026;

		&:first-child {
			font-weight: 900;
			font-size: 20px;

			th {
				padding: 10px 16px;
				background-color: #121326;
			}
		}

		&:hover td {
			background-color: #ffffff10;
		}
	}

	th,
	td {
		padding: 5px 16px;
	}

	th {
		font-weight: 900;
		background-color: #121826;
	}

	td span {
		display: block;
		font-size: 16px;
	}

	@include sp {
		table {
			font-size: 19px;
			letter-spacing: -0.3px;
		}

		tr:first-child {
			font-size: 18px;
		}

		th,
		td {
			padding: 2px 12px;
		}

		td span {
			font-size: 12px;
			letter-spacing: -0.1px;
		}
	}
</style>
