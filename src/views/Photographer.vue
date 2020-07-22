<template>
	<main class="photographer container py-5">
		<form>
			<div class="row justify-content-center">
				<div class="col-md-6">
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
		<hr>
	</main>
</template>
<script>
import { SUBMIT_PHOTO } from '@/store/actions.types';

export default {
	data() {
		return {
			tagsInput: 'hitler, heil, anda',
			photo: {
				image: 'nanono',
				description: 'keluarga di pantai',
				price: 100,
				tags: [],
				photoManager: '0x1478498d74E4e6faEB8F84a9085Df5197d7CFC5A',
			},
		};
	},
	methods: {
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
