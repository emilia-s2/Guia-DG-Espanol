"use strict";

const DefaultSettings = {
	"enabled": true,
	"lNotice": true,
	"gNotice": false,
	"stream": false,
	"spawnObject": true,
	"speaks": false,
	"rate": [
		3
	],
	"cc": [
		"</font><font color=\"#8eff05\">"
	],
	"language": "auto",
	"dungeons": {}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		// Migrate legacy config file
		return Object.assign(Object.assign({}, DefaultSettings), settings);
	} else if (from_ver === null) {
		// No config file exists, use default settings
		return DefaultSettings;
	} else {
		// Migrate from older version (using the new system) to latest one
		from_ver = parseFloat(from_ver);
		to_ver = parseFloat(to_ver);
		// Recursively upgrade in one-version steps
		if (from_ver + 0.1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 0.1, settings);
			return MigrateSettings(from_ver + 0.1, to_ver, settings);
		}
		// If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
		// a switch for each version step that upgrades to the next version. This enables us to
		// upgrade from any version to the latest version without additional effort!
		const oldsettings = settings;
		settings = Object.assign(DefaultSettings, {});
		switch (to_ver) {
			case 1.12:
				for (const option in oldsettings) {
					if (option == "dungeons") {
						settings[option] = {};
						let id;
						for (const element of oldsettings[option]) {
							id = element.id;
							delete element.id;
							settings[option][id] = element;
						}
						continue;
					}
					if (settings[option]) {
						settings[option] = oldsettings[option];
					}
				}
				break;
			default:
				for (const option in oldsettings) {
					if (settings[option]) {
						settings[option] = oldsettings[option];
					}
				}
				break;
		}
		return settings;
	}
}