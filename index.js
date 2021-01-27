"use strict";

module.exports.NetworkMod = function(mod) {
	try {
		mod.require["tera-guide-core"].load(mod, {
			colors: { gui: {}, general: {} }, // color settings
			command: ["guia"], // module command
			chat_name: "Guide-DG", // set chat author name for notices
		});
		mod.settings.language = "es";
	} catch (e) {
		mod.error("Aviso!\Dependencia módulo \"tera-guide-core\" necessário para TERA-Guide no está instalado!\por favor descargue y instale: https://github.com/hsdn/tera-guide-core");
		throw e;
	}
};