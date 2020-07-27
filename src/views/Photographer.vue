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
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
							</div>
							<div class="custom-file">
								<input type="file" class="custom-file-input" id="inputImage"
									aria-describedby="inputGroupFileAddon01">
								<label class="custom-file-label" for="inputImage">Choose file</label>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="image">Foto</label>
						<input :value="photo.image" type="text" class="form-control" id="image">
						<small class="form-text text-muted">Pastikan foto milik anda</small>
					</div>
					<div class="form-group">
						<label for="description">Deskripsi foto</label>
						<input :value="photo.description" type="text" class="form-control" id="description">
						<small class="form-text text-muted">Deskripsi dari foto</small>
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<input :value="photo.price" type="number" class="form-control" id="price">
						<small class="form-text text-muted">Harga dalam wei</small>
					</div>
					<div class="form-group">
						<label for="tags">Tag foto</label>
						<input :value="tagsInput" type="text" class="form-control" id="tags">
						<small class="form-text text-muted">Tag untuk pencarian foto</small>
					</div>
					<button class="btn btn-primary float-right" type="submit"
						@click.prevent="submitPhoto">Submit</button>
				</div>
			</div>
		</form>
	</main>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from '@/common/api.service';
import contractMixin from '@/common/contract.mixin';
import EnlistPhotographer from '@/components/EnlistPhotographer.vue';
import PhotoManagerStatus from '@/components/PhotoManagerStatus.vue';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export default {
	components: {
		EnlistPhotographer,
		PhotoManagerStatus,
	},
	mixins: [contractMixin],
	data() {
		return {
			photoManagerAddress: NULL_ADDRESS,
			photoManagerBalance: 100,
			tagsInput: 'hitler, heil, anda',
			photo: {
				image: 'nanono',
				description: 'keluarga di pantai',
				price: 100,
				tags: [],
				photoManager: '',
			},
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount', 'activeBalance']),
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
		async submitPhoto() {
			const tagsArr = this.tagsInput.split(',');
			const tagSet = new Set();

			for (let i = 0; i < tagsArr.length; i++) {
				if (tagsArr[i].trim() !== '') tagSet.add(tagsArr[i].trim());
			}

			this.photo.tags = Array.from(tagSet);
			this.photo.photoManager = this.photoManagerAddress;

			try {
				const { data } = await axios.post('/photo', this.photo);
				console.log(data);
				// TODO SEND ADDPHOTO TRANSACTION THROUGH PHOTOMANAGER CONTRACT
				const result = await this.drizzleInstance
					.contracts.PhotoManager
					.methods.createPhoto(data.image, data.price)
					.send({ from: this.activeAccount });
				console.log(result);
			} catch (error) {
				console.errror('Gagal Submit foto', error);
			}
		},
	},
};
</script>
