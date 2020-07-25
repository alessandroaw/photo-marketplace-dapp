<template>
	<main class="photographer container py-5">
		<form>
			<div class="row justify-content-center">
				<enlist-photographer v-if="!isPhotographer"
					@photographerListed="loadPhotoManager">
				</enlist-photographer>
				<div v-else class="col-md-6">
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
import EnlistPhotographer from '@/components/EnlistPhotographer.vue';
import axios from '@/common/api.service';

export default {
	components: {
		EnlistPhotographer,
	},
	data() {
		return {
			photoManager: '',
			tagsInput: 'hitler, heil, anda',
			photo: {
				image: 'nanono',
				description: 'keluarga di pantai',
				price: 100,
				tags: [],
				photoManager: '0x0000000000000000000000000000000000000000',
			},
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount', 'activeBalance']),
		isPhotographer() {
			return this.photoManager && (this.photoManager !== '0x0000000000000000000000000000000000000000');
		},
	},
	async created() {
		// Initializing PhotoManager if isPhotographer
		this.photoManager = await this.drizzleInstance
			.contracts.AccountManager
			.methods.getPhotoManager(this.activeAccount)
			.call({ from: this.activeAccount });
	},
	methods: {
		loadPhotoManager(photoManager) {
			this.photoManager = photoManager;
			// TODO LOAD PHOTO MANAGER CONTRACT
		},
		async submitPhoto() {
			const tagsArr = this.tagsInput.split(',');
			const tagSet = new Set();

			for (let i = 0; i < tagsArr.length; i++) {
				if (tagsArr[i].trim() !== '') tagSet.add(tagsArr[i].trim());
			}

			this.photo.tags = Array.from(tagSet);

			try {
				const { data } = await axios.post('/photo', this.photo);
				// TODO SEND ADDPHOTO TRANSACTION THROUGH PHOTOMANAGER CONTRACT
			} catch (error) {
				console.errror('Gagal Submit foto', error);
			}
		},
	},
};
</script>
