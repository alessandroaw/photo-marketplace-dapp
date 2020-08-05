import { mapGetters } from 'vuex';
import pmJson from '../../contracts/PhotoManager.json';

const mixin = {
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
	},
	methods: {
		isPhotoManagerInitialized() {
			return (typeof this.drizzleInstance.contracts.PhotoManager !== 'undefined');
		},
		createPhotoManagerContract(address) {
			if (this.isPhotoManagerInitialized()) {
				if (this.drizzleInstance.contracts.PhotoManager.address !== address) {
					this.drizzleInstance.contracts.PhotoManager.address = address;
				}
				return;
			}
			const config = {
				contractName: pmJson.contractName,
				web3Contract: new this.drizzleInstance.web3.eth.Contract(pmJson.abi, address),
			};
			const event = ['LicensingProcess'];

			this.drizzleInstance.addContract(config, event);
		},

		changeContractAddress(contractName, address) {
			if (!this.drizzleInstance.contracts[contractName]) return;

			this.drizzleInstance.contracts[contractName].address = address;
		},
	},
};

export default mixin;
