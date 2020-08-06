<template>
	<div>
		<div class="form-group">
			<label class="label text-secondary" for="inputImage">Foto</label>
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
			<label class="label text-secondary" for="description">Deskripsi foto</label>
			<input v-model="photo.description" type="text" class="form-control" id="description">
			<small class="form-text text-muted">Deskripsi dari foto</small>
		</div>
		<div class="form-group">
			<label class="label text-secondary" for="price">Harga</label>
			<input v-model="photo.price" type="number" class="form-control" id="price">
			<small class="form-text text-muted">Harga dalam wei</small>
		</div>
		<div class="form-group">
			<label class="label text-secondary" for="tags">Tag foto</label>
			<input v-model="tagsInput" type="text" class="form-control" id="tags">
			<small class="form-text text-muted">Tag untuk pencarian foto</small>
		</div>
		<div class="d-flex justify-content-between">
			<div v-if="isProcessing" class="d-flex align-items-center">
				<div class="spinner-border text-primary mr-3">
					<span class="sr-only">Loading...</span>
				</div>
				<span>Pendaftaran foto sedang diproses</span>
			</div>
			<button class="btn btn-primary float-right ml-auto" type="submit"
				@click.prevent="onPhotoSubmit">
				Submit
			</button>
		</div>
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
			isProcessing: false,
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
			this.photo.image = this.imageFile.name;
		},
		async onPhotoSubmit() {
			if (this.imageFile === null) {
				alert('Pilih foto terlebih dahulu');
				return;
			}

			this.isProcessing = true;
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
				// TODO SEND ADDPHOTO TRANSACTION THROUGH PHOTOMANAGER CONTRACT
				const result = await this.drizzleInstance
					.contracts.PhotoManager
					.methods.createPhoto(data.image, data.price)
					.send({ from: this.activeAccount });
			} catch (error) {
				console.error('Gagal Submit foto', error);
			} finally {
				this.isProcessing = false;
			}
		},
	},
};
</script>
