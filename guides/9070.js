// Manglemire
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let bossBuffs = [];
	let count = -1;
	let shining = true;
	let gage_tracker_started = false;
	let debuff_tracker_started = false;

	const bossActions = {
		213: { truth: "Truth - Break shield", lie: "Lie - Puddles (run away)" }, // "My shield will save me!" (shield)
		212: { truth: "Truth - Stay outside", lie: "Lie - Stay inside" }, // "I will kill you all!" (aoe around boss)
		218: { truth: "Truth - Stay outside", lie: "Lie - Stay inside" } // "One of you must die!" (aoe around player)
	};

	const bossActions_ES = {
		213: { truth: "Правда - Сломать щит", lie: "Ложь - Лужи (убегать)" }, // "My shield will save me!" (shield)
		212: { truth: "Правда - Оставаться снаружи", lie: "Ложь - Оставаться внутри" }, // "I will kill you all!" (aoe around boss)
		218: { truth: "Правда - Оставаться снаружи", lie: "Ложь - Оставаться внутри" } // "One of you must die!" (aoe around player)
	};

	function boss_message_event(skillid) {
		if (skillid === 666) {
			handlers.text({
				sub_type: "message",
				message: bossBuffs
			});
		}

		if (skillid === 213) {
			handlers.text({
				sub_type: "message",
				message: is_telling_truth() ? bossActions[213].truth : bossActions[213].lie,
				message_ES: is_telling_truth() ? bossActions_ES[213].truth : bossActions_ES[213].lie
			});
		}

		if (skillid === 212) {
			handlers.text({
				sub_type: "message",
				message: is_telling_truth() ? bossActions[212].truth : bossActions[212].lie,
				message_ES: is_telling_truth() ? bossActions_ES[212].truth : bossActions_ES[212].lie
			});
		}

		if (skillid === 218) {
			handlers.text({
				sub_type: "message",
				message: is_telling_truth() ? bossActions[218].truth : bossActions[218].lie,
				message_ES: is_telling_truth() ? bossActions_ES[218].truth : bossActions_ES[218].lie
			});
		}
	}

	function is_telling_truth() {
		const ones = count % 10;
		const tens = Math.floor((count % 100) / 10);

		if (bossBuffs.includes(ones) || bossBuffs.includes(tens)) {
			return false;
		}

		return true;
	}

	function start_boss_event() {
		bossBuffs = [];
		count = -1;
		shining = true;
		gage_tracker_started = false;
		debuff_tracker_started = false;
	}

	function start_time() {
		if (shining) {
			if (count === 100) {
				count = -1;
			}

			count++;
			shining = false;

			dispatch.setTimeout(() => shining = true, 500);
		}
	}

	function start_gage_event() {
		const gage_change = (added, event) => {
			start_time();
		};

		if (!gage_tracker_started) {
			dispatch.hook("S_DUNGEON_EVENT_GAGE", 1, gage_change.bind(null, true));

			gage_tracker_started = true;
		}
	}

	const debuffs_hand = {
		470046: 3,
		470047: 6,
		470048: 9
	};

	function start_debuffs_event() {
		const abnormality_change = (added, event) => {
			if (debuffs_hand[event.id]) {
				if (added) {
					if (!bossBuffs.includes(debuffs_hand[event.id])) {
						bossBuffs.push(debuffs_hand[event.id]);
					}
				} else {
					const index = bossBuffs.indexOf(debuffs_hand[event.id]);
					if (index > -1) {
						bossBuffs.splice(index, 1);
					}
				}
			}
		};

		if (!debuff_tracker_started) {
			dispatch.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change.bind(null, true));
			dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));

			debuff_tracker_started = true;
		}
	}

	return {
		"h-470-1000-100": [{ type: "func", func: start_boss_event }],
		"h-470-1000-99": [{ type: "func", func: start_gage_event },
			{ type: "func", func: start_debuffs_event }
		],

		"s-470-1000-1105-0": [{ type: "text", sub_type: "message", message: "Jump", message_ES: "Salto" }],
		"s-470-1000-2105-0": [{ type: "text", sub_type: "message", message: "Jump", message_ES: "Salto" }],
		"s-470-1000-1106-0": [{ type: "text", sub_type: "message", message: "Smash", message_ES: "Aplastar" }],
		"s-470-1000-2106-0": [{ type: "text", sub_type: "message", message: "Smash", message_ES: "Aplastar" }],
		"s-470-1000-1307-0": [{ type: "text", sub_type: "message", message: "Bomb", message_ES: "Bomba" }],
		"s-470-1000-2114-0": [{ type: "text", sub_type: "message", message: "Bomb", message_ES: "Bomba" }],
		"s-470-1000-2107-0": [{ type: "text", sub_type: "message", message: "Stun", message_ES: "Stun" }],
		"s-470-1000-1201-0": [{ type: "text", sub_type: "message", message: "Stun", message_ES: "Stun" }],
		"s-470-1000-1120-0": [{ type: "text", sub_type: "message", message: "Pull", message_ES: "Jalar" }],
		"s-470-1000-1114-0": [{ type: "text", sub_type: "message", message: "Spray", message_ES: "Spray" }],
		"s-470-1000-3106-0": [
			{ type: "text", sub_type: "message", message: "100" },
			{ type: "func", func: boss_message_event, args: [0] }
		],

		"s-470-1000-3213-0": [{ type: "func", func: boss_message_event, args: [213] }],
		"s-470-1000-3212-0": [{ type: "func", func: boss_message_event, args: [212] }],
		"s-470-1000-3218-0": [{ type: "func", func: boss_message_event, args: [218] }],

		"ab-470-1000-470046": [{ type: "func", func: boss_message_event, args: [46] }],
		"ab-470-1000-470047": [{ type: "func", func: boss_message_event, args: [47] }],
		"ab-470-1000-470048": [{ type: "func", func: boss_message_event, args: [48] }],

		"qb-470-600-470053": [{ type: "text", sub_type: "message", message: "Start", message_ES: "Iniciar" }]
	};
};