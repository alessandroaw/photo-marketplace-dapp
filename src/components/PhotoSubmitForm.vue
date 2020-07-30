<template>
	<div>
		<div class="form-group">
			<label for="inputImage">Foto</label>
			<div class="input-group">
				<div class="custom-file">
					<input type="file" class="custom-file-input" id="inputImage"
						@change="onImageChange">
					<label class="custom-file-label" for="inputImage">{{photo.image}}</label>
				</div>
			</div>
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
			tagsInput: '',
			selectedFile: null,
			imageFile: null,
			photo: {
				image: 'Pilih berkas foto',
				description: 'keluarga di pantai',
				price: 100,
				tags: [],
				photoManager: '',
			},
		};
	},
	created() {
		const tagsTest = ['alam', 'arsitektur', 'teknologi', 'industri', 'kesehatan'];

		const random = (x) => Math.floor(Math.random() * x);

		this.tagsInput += `${tagsTest.splice(random(tagsTest.length), 1)}`;
		this.tagsInput += `, ${tagsTest.splice(random(tagsTest.length), 1)}`;
		this.tagsInput += `, ${tagsTest.splice(random(tagsTest.length), 1)}`;
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount']),
	},
	methods: {
		onImageChange(event) {
			[this.imageFile] = event.target.files;
			console.log(this.imageFile);
			this.photo.image = `${new Date().toISOString()}-${this.imageFile.name}`;
		},
		async onPhotoSubmit() {
			const tagsArr = this.tagsInput.split(',');
			const tagSet = new Set();

			for (let i = 0; i < tagsArr.length; i++) {
				if (tagsArr[i].trim() !== '') tagSet.add(tagsArr[i].toLowerCase().trim());
			}

			this.photo.tags = Array.from(tagSet);
			this.photo.photoManager = this.address;

			const fd = new FormData();
			fd.append('imageFile', this.imageFile, this.imageFile.name);

			Object.keys(this.photo).forEach((key) => {
				fd.append(key, this.photo[key]);
			});

			try {
				const { data } = await axios.post('/photo', fd);
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
