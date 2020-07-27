import { mapGetters } from 'vuex';
import pmJson from '../../contracts/PhotoManager.json';

const mixin = {
	data() {
		return {
			isPhotoManagerInitialized: false,
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
	},
	methods: {
		createPhotoManagerContract(address) {
			const config = {
				contractName: pmJson.contractName,
				web3Contract: new this.drizzleInstance.web3.eth.Contract(pmJson.abi, address),
			};

			const event = [];

			this.drizzleInstance.addContract(config, event);
			this.isPhotoManagerInitialized = true;
		},
	},
};

export default mixin;
