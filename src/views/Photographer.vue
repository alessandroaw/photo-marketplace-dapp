<template>
	<main class="photographer container py-5">
		<form>
			<div class="row justify-content-center">
				<div class="col-md-6">
					<div class="form-group">
						<label for="image">Foto</label>
						<input :value="image" type="text" class="form-control" id="image">
						<small class="form-text text-muted">Pastikan foto milik anda</small>
					</div>
					<div class="form-group">
						<label for="description">Deskripsi foto</label>
						<input :value="description" type="text" class="form-control" id="description">
						<small class="form-text text-muted">Deskripsi dari foto</small>
					</div>
					<div class="form-group">
						<label for="price">Harga</label>
						<input :value="price" type="number" class="form-control" id="price">
						<small class="form-text text-muted">Harga dalam wei</small>
					</div>
					<div class="form-group">
						<label for="tags">Tag foto</label>
						<input :value="tags" type="text" class="form-control" id="tags">
						<small class="form-text text-muted">Tag untuk pencarian foto</small>
					</div>
					<button @click.prevent="submitPhoto" class="btn btn-primary float-right" type="submit">Submit</button>
				</div>
			</div>
		</form>
		<hr>
	</main>
</template>
<script>
export default {
	data() {
		return {
			image: 'nanono',
			description: 'contoh: keluarga di pantai',
			price: 100,
			tags: 'laptop',
		};
	},
	methods: {
		submitPhoto() {
			console.table({
				image: this.image,
				description: this.description,
				price: this.price,
				tags: this.tags,
			});
		},
	},
};
</script>
