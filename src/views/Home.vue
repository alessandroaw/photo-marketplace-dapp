<template>
	<main role="main">
        <app-search-bar @searchTag="filterPhoto"></app-search-bar>
        <section class="album py-5">
            <div class="container">
                <div class="row">
					<app-photo
						v-for="(photo, index) in filteredPhotos"
						:key="photo._id"
						:index="index"
						:photo="photo"
						@tagClicked="filterPhoto"
						@photoClicked="buyPhoto"
						></app-photo>
				</div>
			</div>
        </section>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from '@/common/api.service';
import SearchBar from '@/components/SearchBar.vue';
import Photo from '@/components/Photo.vue';
import contractMixin from '@/common/contract.mixin';

export default {
	components: {
		appPhoto: Photo,
		appSearchBar: SearchBar,
	},
	mixins: [contractMixin],
	data() {
		return {
			photos: [],
			filteredPhotos: [],
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount']),
	},
	methods: {
		async buyPhoto(index) {
			// SC Params : ImageHash
			const choosen = this.filteredPhotos[index];
			this.createPhotoManagerContract(choosen.photoManager);
			try {
				const result = await this.drizzleInstance
					.contracts.PhotoManager
					.methods.orderLicense(choosen.imageHash)
					.send({ from: this.activeAccount });

				const {
					clientAddress, paymentAddress, paid, licenseIndex,
				} = result.events.LicensingProcess.returnValues;

				const payload = {
					clientAddress,
					paymentAddress,
					licenseIndex,
					paid,
					imageId: choosen._id,
				};

				const temp = await axios.post('/order', payload);
			} catch (error) {
				console.error('Gagal membeli foto');
			}
		},
		filterPhoto(tag) {
			// if (tag === '')
			this.filteredPhotos = this.photos.filter((photo) => photo.tags.includes(tag));
		},
	},
	created() {
		axios.get('/photo').then((result) => {
			// const baseURL = 'https://photo-markeplace-service.herokuapp.com/';
			const baseURL = 'http://localhost:3000/';
			this.photos = result.data.map((photo) => ({
				...photo,
				imgSrc: baseURL + encodeURI(photo.imagePath),
			}));
			this.filteredPhotos = [...this.photos];
		}).catch((error) => {
			console.error(error);
		});
	},
};
</script>
