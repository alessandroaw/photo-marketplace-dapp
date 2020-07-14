import Home from '@/views/Home.vue';
import Header from '@/components/Header.vue';

export default [
	{
		path: '',
		name: 'home',
		components: {
			default: Home,
			'header-top': Header,
		},
	},
	{ path: '*', redirect: { name: 'home' } },
];
