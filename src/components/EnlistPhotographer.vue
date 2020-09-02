<template>
	<div class="alert alert-warning col-md-6 text-center">
		<h2>Akun fotografer tidak ditemukan</h2>
		<p>Daftar menjadi fotografer?</p>
		<button @click.prevent="onEnlistButtonClick" class="btn btn-success btn-block">
			Daftar
		</button>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount']),
	},
	methods: {
		async onEnlistButtonClick() {
			try {
				const result = await this.drizzleInstance
					.contracts.AccountManager
					.methods.addPhotographer()
					.send({ from: this.activeAccount });
				const { photoManager } = result.events.PhotographerListing.returnValues;
				this.$emit('photographerListed', photoManager);
			} catch (error) {
				console.error('Gagal mengirimkan transaksi', error);
			}
		},
	},
};
</script>
