<template>
  <div>
		<app-header></app-header>
		<router-view></router-view>
		<app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
	data() {
		return {
			message: 'Hello World',
		};
	},
	components: {
		appHeader: Header,
		appFooter: Footer,
	},
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>
