<template>
  <div>
		<app-header></app-header>
		<router-view v-if="isDrizzleInitialized"></router-view>
		<div v-else class="loader">
			<h2 class="logo-font">Loading your account</h2>
			<div class="spinner-border text-primary">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/common/api.service';
import { mapGetters } from 'vuex';

function sendLog(value) {
	try {
		console.log('sending log');
		console.log(value);
		axios.post('/sclog', value);
	} catch (error) {
		console.error('Gagal mengirimkan log', error);
	}
}

export default {
	components: {
		appHeader: Header,
		appFooter: Footer,
	},
	computed: {
		...mapGetters('drizzle', ['isDrizzleInitialized']),
	},
	mounted() {
		this.$drizzleEvents.$on('drizzle/contractEvent', async (event) => {
			const { eventName, contractName } = event;
			const payload = { eventName, contractName };

			if (eventName === 'PhotographerListing') {
				const { photographerAddress, photoManager, index } = event.data;
				payload.data = { photographerAddress, photoManager, index };
			} else if (eventName === 'LicensingProcess') {
				const { clientAddress, imageHash, paymentAddress, paid, licenseIndex } = event.data;
				payload.data = { clientAddress, imageHash, paymentAddress, paid, licenseIndex };
			} else if (eventName === 'PhotoCreated') {
				const { imageHash, owner, priceInWei } = event.data;
				payload.data = { imageHash, owner, priceInWei };
			}

			sendLog(payload);
		});
	},
};
</script>
