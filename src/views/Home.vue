<template>
	<main role="main">
        <app-search-bar></app-search-bar>
        <section class="album py-5">
            <div class="container">
                <div class="row">
					<app-photo
						v-for="photo in photos"
						:key="photo.id"
						:imgSrc="photo.imgSrc"
						:description="photo.description"
						:tags="photo.tags"
						:price="photo.price"
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
	created() {
		axios.get('/photo').then((result) => {
			this.photos = result.data.map((photo) => ({
				id: photo._id,
				imgSrc: 'https://picsum.photos/300/200',
				description: photo.description,
				price: photo.price,
				tags: photo.tags,
				photoManager: photo.photoManager,
			}));
		}).catch((error) => {
			console.error(error);
		});
	},
	data() {
		return {
			photos: [
				{
					imgSrc: 'https://picsum.photos/300/200',
					description: 'this is my enak aja hahaha',
					tags: ['laptop', 'coffee', 'wood', 'table', 'work', 'glassess'],
				},
				{
					imgSrc: 'https://picsum.photos/300/200',
					description: 'this is my description hahaha',
					tags: ['laptop', 'coffee', 'wood', 'table', 'work', 'glassess'],
				},
				{
					imgSrc: 'https://picsum.photos/300/200',
					description: 'this is my description hahaha',
					tags: ['laptop', 'coffee', 'wood', 'table', 'work', 'glassess'],
				},
			],
		};
	},
	components: {
		appPhoto: Photo,
		appSearchBar: SearchBar,
	},
};
</script>
