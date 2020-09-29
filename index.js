'use strict';

module.exports = function NetworkMod(mod) {
	try {
		mod.require["tera-guide-core"].load(mod);
	} catch (e) {
		throw "Warning!\nDepended module \"tera-guide-core\" needed for TERA-Guide is not installed!\nPlease download and install: https://github.com/hsdn/tera-guide-core";
	}
};