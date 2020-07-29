<template>
	<main role="main">
        <app-search-bar></app-search-bar>
        <section class="album py-5">
            <div class="container">
                <div class="row">
					<app-photo
						v-for="(photo, index) in photos"
						:key="photo._id"
						:index="index"
						:photo="photo"
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
		};
	},
	methods: {
		buyPhoto(value) {
			// SC Params : ImageHash
			console.log(this.photos[value]);
		},
	},
	created() {
		axios.get('/photo').then((result) => {
			const baseURL = 'https://photo-markeplace-service.herokuapp.com/';
			this.photos = result.data.map((photo) => ({
				...photo,
				imgSrc: baseURL + encodeURI(photo.imagePath),
			}));
			console.log(this.photos);
		}).catch((error) => {
			console.error(error);
		});
	},
};
</script>
