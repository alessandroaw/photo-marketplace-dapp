<template>
  <div>
		<app-header></app-header>
		<router-view v-if="isDrizzleInitialized"></router-view>
		<div v-else class="loader">
			<h2 class="logo-font">Loading your account</h2>
			<div class="spinner-border text-primary">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		appHeader: Header,
		appFooter: Footer,
	},
	computed: {
		...mapGetters('drizzle', ['isDrizzleInitialized']),
	},
};
</script>
