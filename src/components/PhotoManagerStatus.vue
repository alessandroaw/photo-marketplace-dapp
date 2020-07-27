<template>
	<table class="table table-bordered">
		<thead class="thead-dark">
			<tr>
				<th class="text-center" colspan="2">
					<strong>Photo Manager</strong>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Addres</th>
				<td>{{address}}</td>
			</tr>
			<tr>
				<th >Saldo</th>
				<td>{{balance}}</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	props: {
		address: String,
		balance: Number,
	},
};
</script>
