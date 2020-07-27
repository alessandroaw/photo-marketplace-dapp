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
			if (this.isPhotoManagerInitialized) return;

			const config = {
				contractName: pmJson.contractName,
				web3Contract: new this.drizzleInstance.web3.eth.Contract(pmJson.abi, address),
			};

			const event = [];

			this.drizzleInstance.addContract(config, event);
			this.isPhotoManagerInitialized = true;
		},
		changeContractAddress(contractName, address) {
			if (!this.drizzleInstance.contracts[contractName]) return;

			this.drizzleInstance.contracts[contractName].address = address;
		},
	},
};

export default mixin;
