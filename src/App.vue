<template>
  <div>
		<app-header></app-header>
		<router-view v-if="isDrizzleInitialized"></router-view>
		<div v-else class="loader">
			<h1>Loading...</h1>
		</div>
		<app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('drizzle', ['isDrizzleInitialized']),
	},
	components: {
		appHeader: Header,
		appFooter: Footer,
	},
};
</script>
