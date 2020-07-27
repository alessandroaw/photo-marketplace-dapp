<template>
	<main class="photographer container py-5">
		<form>
			<div class="row justify-content-center">
				<enlist-photographer v-if="!isPhotographer"
					@photographerListed="loadPhotoManager">
				</enlist-photographer>
				<div v-else class="col-md-6">
					<photo-manager-status
						:address="photoManagerAddress"
						:balance="photoManagerBalance">
					</photo-manager-status>
					<photo-submit-form
						:address="photoManagerAddress">
					</photo-submit-form>
				</div>
			</div>
		</form>
	</main>
</template>
<script>
import { mapGetters } from 'vuex';
import contractMixin from '@/common/contract.mixin';
import EnlistPhotographer from '@/components/EnlistPhotographer.vue';
import PhotoManagerStatus from '@/components/PhotoManagerStatus.vue';
import PhotoSubmitForm from '@/components/PhotoSubmitForm.vue';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export default {
	components: {
		EnlistPhotographer,
		PhotoManagerStatus,
		PhotoSubmitForm,
	},
	mixins: [contractMixin],
	data() {
		return {
			photoManagerAddress: NULL_ADDRESS,
			photoManagerBalance: 100,
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount']),
		isPhotographer() {
			return this.photoManagerAddress && (this.photoManagerAddress !== NULL_ADDRESS);
		},
	},
	async created() {
		// Initializing PhotoManager if isPhotographer
		console.log(this.drizzleInstance);
		this.photoManagerAddress = await this.drizzleInstance
			.contracts.AccountManager
			.methods.getPhotoManager(this.activeAccount)
			.call({ from: this.activeAccount });

		if (this.isPhotographer) {
			await this.createPhotoManagerContract(this.photoManagerAddress);
			console.log(this.drizzleInstance);
		}
	},
	methods: {
		async loadPhotoManager(photoManagerAddress) {
			this.photoManagerAddress = photoManagerAddress;
			// TODO LOAD PHOTO MANAGER CONTRACT
			await this.createPhotoManagerContract(this.photoManagerAddress);
		},
	},
};
</script>
