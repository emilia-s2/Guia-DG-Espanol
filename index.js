'use strict';

module.exports.NetworkMod = function (mod) {
	try {
		mod.require["tera-guide-core"].load(mod, {
			colors: { gui: {}, general: {} }, // color settings
			command: ["guide"], // module command
			chat_name: "Guide", // set chat author name for notices
		});
	} catch (e) {
		mod.error("Warning!\nDepended module \"tera-guide-core\" needed for TERA-Guide is not installed!\nPlease download and install: https://github.com/hsdn/tera-guide-core\n");
		throw e;
	}
};