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
						<div class="col-lg-10">
							<cart-table
								:orders="orders"
								:showPaid="showPaid"></cart-table>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>
<script>
import CartTable from '@/components/CartTable.vue';

const tempOrder = {
	paid: false,
	clientAddress: '0x81e228905ce51B472B049177BB78Fa630078C4A5',
	paymentAddress: '0xCB55CA50d62FBEE8ecFD2a849d821E7500a35f88',
	imageId: '5f225edc52b8622bbf8cb162',
};

export default {
	components: {
		CartTable,
	},
	data() {
		return {
			showPaid: false,
			orders: [tempOrder, tempOrder, tempOrder],
		};
	},
};
</script>
