import Home from '@/views/Home.vue';
import Photographer from '@/views/Photographer.vue';
import Client from '@/views/Client.vue';
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
	{
		path: '/fotografer',
		name: 'photographer',
		component: Photographer,
	},
	{
		path: '/klien',
		name: 'client',
		component: Client,
	},
	{ path: '*', redirect: { name: 'home' } },
];
