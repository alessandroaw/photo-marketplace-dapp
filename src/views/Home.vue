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
import axios from '@/common/api.service';
import SearchBar from '@/components/SearchBar.vue';
import Photo from '@/components/Photo.vue';

export default {
	components: {
		appPhoto: Photo,
		appSearchBar: SearchBar,
	},
	data() {
		return {
			photos: [],
			filteredPhotos: [],
		};
	},
	methods: {
		buyPhoto(index) {
			// SC Params : ImageHash
			console.log(this.filteredPhotos[index]);
		},
		filterPhoto(tag) {
			// if (tag === '')
			this.filteredPhotos = this.photos.filter((photo) => photo.tags.includes(tag));
		},
	},
	created() {
		axios.get('/photo').then((result) => {
			const baseURL = 'https://photo-markeplace-service.herokuapp.com/';
			this.photos = result.data.map((photo) => ({
				...photo,
				imgSrc: baseURL + encodeURI(photo.imagePath),
			}));
			this.filteredPhotos = [...this.photos];
			console.log(this.photos);
		}).catch((error) => {
			console.error(error);
		});
	},
};
</script>
