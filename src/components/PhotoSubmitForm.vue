<template>
	<div>
		<div class="form-group">
			<div class="input-group">
				<div class="custom-file">
					<input type="file" class="custom-file-input" id="inputImage"
						@change="onImageChange">
					<label class="custom-file-label" for="inputImage">{{imageMessage}}</label>
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
			@click.prevent="onPhotoSubmit">Submit</button>
	</div>
</template>
<script>
import axios from '@/common/api.service';
import { mapGetters } from 'vuex';

export default {
	props: {
		address: String,
	},
	data() {
		return {
			tagsInput: 'hitler, heil, anda',
			selectedFile: null,
			imageMessage: 'Choose File',
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
		...mapGetters('accounts', ['activeAccount']),
	},
	methods: {
		onImageChange(event) {
			[this.selectedFile] = event.target.files;
			console.log(this.selectedFile);
			this.imageMessage = this.selectedFile.name;
		},
		onUpload() {
			const fd = new FormData();
			fd.append('image', this.selectedFile, this.selectedFile.name);
		},
		async onPhotoSubmit() {
			const tagsArr = this.tagsInput.split(',');
			const tagSet = new Set();

			for (let i = 0; i < tagsArr.length; i++) {
				if (tagsArr[i].trim() !== '') tagSet.add(tagsArr[i].trim());
			}

			this.photo.tags = Array.from(tagSet);
			this.photo.photoManager = this.address;

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
