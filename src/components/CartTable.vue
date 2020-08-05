<template>
	<div class="table-responsive mt-2">
		<table class="table table-striped text-center">
			<thead>
				<th>Images</th>
				<th>Payment address</th>
				<th>Price</th>
				<th></th>
			</thead>
			<tbody>
				<tr v-for="(order, index) in orders" :key="index">
					<td>{{order.imageId.image}}</td>
					<td>
						<a href="#">
							{{order.paymentAddress}}
						</a>
					</td>
					<td>Wei {{order.imageId.price}}</td>
					<td v-if="order.paid">
						<button
							@click="onDownloadButtonClick(index)"
							class="btn btn-primary">
							unduh
						</button>
					</td>
					<td v-else>
						<button
							class="btn btn-success"
							@click="onPayButtonClick(index)">
							bayar
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	props: {
		orders: Array,
		showPaid: Boolean,
	},
	methods: {
		onDownloadButtonClick(index) {
			console.log(this.orders[index]);
			const { imagePath } = this.orders[index].imageId;
			const url = `http://localhost:3000/${imagePath}`;
			window.open(url);
		},
		onPayButtonClick(index) {
			this.$emit('payOrder', index);
		},
	},
};
</script>
