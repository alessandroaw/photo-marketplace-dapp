<template>
	<main class="photographer container py-5">
		<form>
			<div v-if="!isPhotographer" class="row justify-content-center">
				<enlist-photographer
					@photographerListed="loadPhotoManager">
				</enlist-photographer>
			</div>
			<div v-else class="row justify-content-center">
				<div class="col-md-6">
					<photo-manager-status
						:address="photoManagerAddress"
						:balance="photoManagerBalance"
						@withdrawBalance="withdrawBalance">
					</photo-manager-status>
					<hr>
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
			photoManagerBalance: '0',
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
		try {
			this.photoManagerAddress = await this.drizzleInstance
				.contracts.AccountManager
				.methods.getPhotoManager(this.activeAccount)
				.call({ from: this.activeAccount });

			if (this.isPhotographer) {
				this.loadPhotoManager(this.photoManagerAddress);
			}
		} catch (error) {
			console.error('Gagal memuat PhotoManager', error);
		}
	},
	methods: {
		async loadPhotoManager(photoManagerAddress) {
			this.photoManagerAddress = photoManagerAddress;
			try {
				await this.createPhotoManagerContract(this.photoManagerAddress);
				await this.getPhotoManagerBalance();
			} catch (error) {
				console.error('Gagal memuat PhotoManager', error);
			}
		},
		async getPhotoManagerBalance() {
			try {
				await this.createPhotoManagerContract(this.photoManagerAddress);
				this.photoManagerBalance = await this.drizzleInstance
					.contracts.PhotoManager
					.methods.getBalance()
					.call({ from: this.activeAccount });
			} catch (error) {
				console.error('Gagal memuat saldo', error);
			}
		},
		async withdrawBalance() {
			try {
				await this.drizzleInstance
					.contracts.PhotoManager
					.methods.withdrawMoney()
					.send({ from: this.activeAccount });
				await this.getPhotoManagerBalance();
			} catch (error) {
				console.error('Gagal menarik saldo', error);
			}
		},
	},
};
</script>
