<template>
	<div class="col-md-4 col-sm-12">
		<div class="card mb-4 shadow-sm">
			<img :src="photo.imgSrc" alt="" class="card-img-top img-fluid">
			<div class="card-body">
				<p class="card-text">
					{{photo.description}}
				</p>
				<p>
					<a v-for="tag in photo.tags" :key="tag"
					href="#" @click="onTagClick(tag)" class="badge badge-info mr-1">{{tag}}</a>
				</p>
				<div class="d-flex justify-content-between align-items-center">
					<strong class="text-muted">WEI {{photo.price}}</strong>
					<button @click="onPhotoClick" class="btn btn-success">Beli</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		index: Number,
		photo: {
			id: String,
			imgSrc: String,
			description: String,
			tags: Array,
			price: Number,
		},
	},
	methods: {
		onTagClick(tag) {
			this.$emit('tagClicked', tag);
		},
		onPhotoClick() {
			this.$emit('photoClicked', this.index);
		},
	},
};
</script>
