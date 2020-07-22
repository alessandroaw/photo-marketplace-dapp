import axios from '@/common/api.service';
import { SET_PHOTO } from './mutations.types';
import { SUBMIT_PHOTO } from './actions.types';

const initialState = {
	photo: {
		image: 'nanono',
		description: '',
		prices: 0,
		tags: [],
	},
};
export const state = { ...initialState };

export const getters = {
	photo(state) { return state.photo; },
};

export const mutations = {
	[SET_PHOTO](state, photo) {
		state.photo = photo;
	},
};

export const actions = {
	async [SUBMIT_PHOTO](context, photo) {
		context.commit(SET_PHOTO, photo);
		try {
			const result = await axios.post('/photo', photo);
			console.log(result.data);
		} catch (error) {
			console.error(error);
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
