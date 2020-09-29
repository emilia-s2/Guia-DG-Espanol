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
	"dungeons": {},
	"debug": {
		"chat": true,
		"all": false,
		"hp": false,
		"abnormal": false,
		"skill": false,
		"boss": false,
		"spawn": false,
		"dm": false,
		"qb": false
	}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) return Object.assign(Object.assign({}, DefaultSettings), settings);
	else if (from_ver === null) return DefaultSettings;
	else {
		from_ver = parseFloat(from_ver);
		to_ver = parseFloat(to_ver);

		if (from_ver + 0.1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 0.1, settings);

			return MigrateSettings(from_ver + 0.1, to_ver, settings);
		}

		const oldsettings = settings;
		settings = Object.assign(DefaultSettings, {});

		switch (to_ver) {
			case 1.12:
				for (const option in oldsettings) {
					if (option == "dungeons") {
						settings[option] = {};
						for (const element of oldsettings[option]) {
							let id = element.id;
							delete element.id;
							settings[option][id] = element;
						}
						continue;
					}
				}
				break;

			case 1.13:
				remove(["dbg.json", "lib.js", "dispatch.js", "voice/index.js", "voice"]);
				break;
		}

		for (const option in oldsettings) {
			if (settings[option])
				settings[option] = oldsettings[option];
		}

		return settings;
	}

	function remove(files) {
		const fs = require("fs"), path = require("path");
		try {
			for (let file of files) {
				let filePath = path.join(__dirname, file);
				if (fs.existsSync(filePath)) {
					if (fs.lstatSync(filePath).isDirectory())
						fs.rmdirSync(filePath);
					else
						fs.unlinkSync(filePath);
				}
			}
		} catch (e) {}
	}
};