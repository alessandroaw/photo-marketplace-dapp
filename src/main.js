import './scss/main.scss';
import 'regenerator-runtime/runtime.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import routes from '@/routes';
import store from '@/store/store';
import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from '@/drizzleOptions';

Vue.use(VueRouter);
Vue.use(drizzleVuePlugin, { store, drizzleOptions });

const router = new VueRouter({
	// mode: 'history',
	routes,
});

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
});
