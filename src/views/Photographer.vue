<template>
	<main class="photographer container py-5">
		<form>
			<div class="row justify-content-center">
				<div v-if="!isPhotographer" class="col-md-6 text-center">
					<h2>Anda bukan fotografer</h2>
					<p>Daftar menjadi photographer?</p>
					<button @click.prevent="enlistPhotographer" class="btn btn-primary btn-block">
						Daftar
					</button>
				</div>
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
import { SUBMIT_PHOTO } from '@/store/actions.types';
import { mapGetters } from 'vuex';

export default {
	created() {
		this.photoManager = this.drizzleInstance
			.contracts.AccountManager
			.methods.getPhotoManager
			.cacheCall(this.activeAccount);
		this.drizzleInstance.contracts.AccountManager.address = 'sass';
		console.log(this.drizzleInstance.contracts.AccountManager.address);
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
				photoManager: '',
			},
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount', 'activeBalance']),
		...mapGetters('contracts', ['getContractsData']),
		isPhotographer() {
			return this.photoManager !== '';
		},
	},
	methods: {
		enlistPhotographer() {
			this.drizzleInstance
				.contracts.AccountManager
				.methods.addPhotographer
				.cacheSend();
			// this.photoManager = '0x1478498d74E4e6faEB8F84a9085Df5197d7CFC5A';
		},
		submitPhoto() {
			const tagsArr = this.tagsInput.split(',');
			const tagSet = new Set();

			for (let i = 0; i < tagsArr.length; i++) {
				if (tagsArr[i].trim() !== '') tagSet.add(tagsArr[i].trim());
			}

			this.photo.tags = Array.from(tagSet);
			this.$store.dispatch(SUBMIT_PHOTO, this.photo);
		},
	},
};
</script>
