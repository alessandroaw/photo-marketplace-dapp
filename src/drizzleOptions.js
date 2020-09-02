import AccountManager from '../contracts/AccountManager.json';

const options = {
	web3: {
		block: false,
		fallback: {
			type: 'ws',
			url: 'ws://127.0.0.1:7545',
		},
	},
	contracts: [AccountManager],
	events: {
		AccountManager: ['PhotographerListing'],
	},
	pols: {
		accounts: 15000,
	},
};

export default options;
