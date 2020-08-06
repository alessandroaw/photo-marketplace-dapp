<template>
	<div>
		<section class="jumbotron mb-0">
			<div class="container text-center">
				<h1 class="logo-font">Keranjang Foto</h1>
			</div>
		</section>
		<main role="main">
			<section class="cart py-5">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-12">
							<cart-table
								v-if="orders.length !== 0"
								:orders="orders"
								:showPaid="showPaid"
								@payOrder="onPayOrder">
							</cart-table>
							<div v-else class="alert alert-danger text-center" role="alert">
								Order tidak ditemukan untuk klien {{this.activeAccount}}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from '@/common/api.service';
import contractMixin from '@/common/contract.mixin';
import CartTable from '@/components/CartTable.vue';

export default {
	mixins: [contractMixin],
	components: {
		CartTable,
	},
	computed: {
		...mapGetters('accounts', ['activeAccount']),
		...mapGetters('drizzle', ['drizzleInstance']),
	},
	data() {
		return {
			showPaid: false,
			orders: [],
		};
	},
	methods: {
		async onPayOrder(index) {
			const order = this.orders[index];
			const { paymentAddress } = order;
			const { photoManager } = order.imageId;

			this.createPhotoManagerContract(photoManager);

			try {
				const result = await this.drizzleInstance
					.web3.eth
					.sendTransaction({
						from: this.activeAccount,
						to: paymentAddress,
						value: `${order.imageId.price}`,
					});
			} catch (error) {
				console.error('Gagal melakukan pembayaran', error);
			}
		},
	},
	async created() {
		try {
			const response = await axios.get(`/order/${this.activeAccount}`);
			this.orders = response.data;
		} catch (error) {
			console.error('Gagal mendapatkan order', error);
		}
	},
	mounted() {
		this.$drizzleEvents.$on('drizzle/contractEvent', async (event) => {
			if (event.contractName === 'PhotoManager' && event.eventName === 'LicensingProcess') {
				const { data } = event;
				const updatedOrder = this.orders.find((order) => (
					order.paymentAddress === data.paymentAddress
				));

				if (typeof updatedOrder !== 'undefined') {
					if (updatedOrder.paid === data.paid) return;

					try {
						await axios.post(`/order/${updatedOrder._id}`);
						updatedOrder.paid = data.paid;
					} catch (error) {
						console.error('Gagal mengupdate order', error);
					}
				}
			}
		});
	},
};
</script>
