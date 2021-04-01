// Manglemire
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let bossBuffs = [];
	let count = -1;
	let shining = true;

	const bossActions = {
		213: { truth: "Truth | Break shield", lie: "Lie | Puddles (run away)" }, // "My shield will save me!" (shield)
		212: { truth: "Truth | Out", lie: "Lie | In" }, // "I will kill you all!" (aoe around boss)
		218: { truth: "Truth | Out", lie: "Lie | In" } // "One of you must die!" (aoe around player)
	};

	const bossActions_ES = {
		213: { truth: "Verdad - Romper el Escudo", lie: "Mentira - Charcos (Huir)" }, // "My shield will save me!" (shield)
		212: { truth: "Verdad - Salir", lie: "Mentira - Entrar" }, // "I will kill you all!" (aoe around boss)
		218: { truth: "Verdad - Salir", lie: "Mentira - Entrar" } // "One of you must die!" (aoe around player)
	};

	function start_boss_event() {
		bossBuffs = [];
		count = -1;
		shining = true;
	}

	function boss_message_event(skillid) {
		if ([213, 212, 218].includes(skillid)) {
			handlers.text({
				sub_type: "message",
				message: is_telling_truth() ? bossActions[skillid].truth : bossActions[skillid].lie,
				message_ES: is_telling_truth() ? bossActions_ES[skillid].truth : bossActions_ES[skillid].lie
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

	const debuffs_hand = {
		470046: 3,
		470047: 6,
		470048: 9
	};

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

	const gage_change = (added, event) => {
		if (shining) {
			if (count === 100) {
				count = -1;
			}

			count++;
			shining = false;

			dispatch.setTimeout(() => shining = true, 500);
		}
	};

	dispatch._mod.dispatch.addOpcode("S_DUNGEON_EVENT_GAGE", 60350);

	dispatch.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change.bind(null, true));
	dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));
	dispatch.hook("S_DUNGEON_EVENT_GAGE", 1, gage_change.bind(null, true));

	return {
		"ns-470-1000": [{ type: "func", func: start_boss_event }],

		"s-470-1000-1105-0": [{ type: "text", sub_type: "message", message: "Jump", message_ES: "Salto" }],
		"s-470-1000-1106-0": [{ type: "text", sub_type: "message", message: "Smash", message_ES: "Aplastar" }],
		"s-470-1000-1120-0": [{ type: "text", sub_type: "message", message: "Pull", message_ES: "Jalar" }],
		"s-470-1000-1114-0": [{ type: "text", sub_type: "message", message: "Spray", message_ES: "Spray" }],
		"s-470-1000-1201-0": [{ type: "text", sub_type: "message", message: "Stun", message_ES: "Stun" }],
		"s-470-1000-1307-0": [{ type: "text", sub_type: "message", message: "Bomb", message_ES: "Bomba" }],
		"s-470-1000-2105-0": [{ type: "text", sub_type: "message", message: "Jump", message_ES: "Salto" }],
		"s-470-1000-2106-0": [{ type: "text", sub_type: "message", message: "Smash", message_ES: "Aplastar" }],
		"s-470-1000-2107-0": [{ type: "text", sub_type: "message", message: "Stun", message_ES: "Stun" }],
		"s-470-1000-2114-0": [{ type: "text", sub_type: "message", message: "Line", message_ES: "Línea" }],
		"s-470-1000-3106-0": [{ type: "text", sub_type: "message", message: "100" }],

		"s-470-1000-3213-0": [{ type: "func", func: boss_message_event, args: [213] }],
		"s-470-1000-3212-0": [{ type: "func", func: boss_message_event, args: [212] }],
		"s-470-1000-3218-0": [{ type: "func", func: boss_message_event, args: [218] }]
	};
};