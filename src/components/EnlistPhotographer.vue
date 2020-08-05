<template>
	<div class="col-md-6 text-center">
		<h2>Anda bukan fotografer</h2>
		<p>Daftar menjadi photographer?</p>
		<button @click.prevent="onEnlistButtonClick" class="btn btn-primary btn-block">
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
				const photoManager = result.events.PhotographerListing.returnValues.PhotoManager;
				this.$emit('photographerListed', photoManager);
			} catch (error) {
				console.error('Gagal mengirimkan transaksi', error);
			}
		},
	},
};
</script>
