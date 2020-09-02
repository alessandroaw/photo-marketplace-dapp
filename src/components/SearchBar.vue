<template>
<section class="jumbotron mb-0">
	<div class="container text-center">
		<h1 class="logo-font">Cari Foto Stok</h1>
		<!-- <p class="lead text-muted">Cari foto yang anda inginkan</p> -->
		<form @submit.prevent="searchTag(searchValue)" class="form-group d-flex justify-content-center">
			<input class="form-control text-center" v-model="searchValue" style="width: 50%"
			placeholder="Kata kunci" type="search" name="search" id="search">
		</form>
		<div class="d-flex justify-content-center">
			<button class="btn btn-secondary mx-1" v-for="tag in tagOptions"
				@click="searchTag(tag)"
				:key="tag">
				{{tag}}
			</button>
		</div>
	</div>
</section>
</template>
<script>

export default {
	data() {
		return {
			tagOptions: ['alam', 'arsitektur', 'teknologi', 'industri', 'kesehatan'],
			searchValue: '',
		};
	},
	methods: {
		searchTag(tag) {
			this.$emit('searchTag', tag.toLowerCase().trim());
		},
	},
};
</script>
