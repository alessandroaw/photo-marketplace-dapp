<template>
  <div>
		<app-header></app-header>
		<router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
	data() {
		return {
			message: 'Hello World',
		};
	},
	components: {
		appHeader: Header,
		// appHome: Home,
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
