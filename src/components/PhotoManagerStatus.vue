<template>
	<div>
		<div v-if="isWithdrawalValid" class="alert alert-danger text-center">
			<span>Saldo tidak mencukupi</span>
		</div>
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
					<td>Wei {{balance}}</td>
				</tr>
			</tbody>
		</table>
		<button @click.prevent="onWithdrawButtonClick" class="btn btn-success btn-block">
			Tarik Saldo
		</button>
	</div>
</template>
<script>
export default {
	props: {
		address: String,
		balance: String,
	},
	data() {
		return {
			isWithdrawalValid: false,
		};
	},
	methods: {
		onWithdrawButtonClick() {
			if (this.balance === '0') {
				this.isWithdrawalValid = true;
				setTimeout(() => {
					this.isWithdrawalValid = false;
				}, 2000);
				return;
			}
			this.$emit('withdrawBalance');
		},
	},
};
</script>
