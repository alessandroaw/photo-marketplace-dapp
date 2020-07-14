<template>
	<main role="main">
        <app-search-bar></app-search-bar>
        <section class="album py-5 bg-light">
            <div class="container">
                <div class="row">
					<app-photo
						imgSrc="../assets/laptop.jpg"
						:message="message"
						:photoTags="photoTags"
						></app-photo>

					<app-photo
						:imgSrc="imgSrc"
						:message="message"
						:photoTags="photoTags"
						></app-photo>

					<app-photo
						:imgSrc="imgSrc"
						:message="message"
						:photoTags="photoTags"
						></app-photo>
				</div>
			</div>
        </section>
    </main>
</template>
<script>
import SearchBar from '@/components/SearchBar.vue';
import Photo from '@/components/Photo.vue';

export default {
	data() {
		return {
			imgSrc: 'https://picsum.photos/300/200',
			message: 'this is my message hahaha',
			photoTags: ['laptop', 'coffee', 'wood', 'table', 'work', 'glassess'],
		};
	},
	components: {
		appPhoto: Photo,
		appSearchBar: SearchBar,
	},
};
</script>
