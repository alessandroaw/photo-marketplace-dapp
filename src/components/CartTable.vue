<template>
	<div class="table-responsive mt-2">
		<table class="table table-striped text-center">
			<thead>
				<th>Images</th>
				<th>Payment address</th>
				<th>Price</th>
				<!-- <th>
					<a href="#" class="badge-danger badge p-1">
						<i class="fas fa-trash">Delete</i>
					</a>
				</th> -->
				<th></th>
			</thead>
			<tbody>
				<tr v-for="(order, index) in filteredOrder" :key="index">
					<td>{{order.imageId}}</td>
					<td>
						<a href="#">
							{{order.paymentAddress}}
						</a>
					</td>
					<td>Wei {{order.price}}</td>
					<td v-if="order.paid"><a href="#" class="btn btn-primary">unduh</a></td>
					<td v-else><a href="#" class="btn btn-success">bayar</a></td>
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
	data() {
		return {
			filteredOrder: [],
		};
	},
	created() {
		this.filteredOrder = this.orders.filter((order) => order.paid === this.showPaid);
		console.table(this.filteredOrder);
	},
};
</script>
