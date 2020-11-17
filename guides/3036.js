// Sky Cruiser (Dificil)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let status_tracker_started = false;
	let triple_attack = false;
	let timer1 = null;
	let timer2 = null;
	let step_two = 0;
	let enraged = false;
	let boss_ID = null;
	let counter = 0;
	let print_mech = true;

	const mech_messages = {
		0: { message: "Three Split Strikes", message_ES: "Tres ataques divididos" },
		1: { message: "Four Split Strikes", message_ES: "Cuatro ataques divididos" },
		2: { message: "Two Split Strikes", message_ES: "Dos ataques divididos" }
	};

	function boss_backattack_event() {
		dispatch.clearTimeout(timer2);
		counter++;
		if (counter >= 2 && triple_attack) {
			handlers.text({
				sub_type: "message",
				message: "Back Attack",
				message_ES: "Ataque Atras"
			});
		}
		timer2 = dispatch.setTimeout(() => counter = 0, enraged ? 2050 : 2140);
	}

	function start_dungeon_event() {
		function sBossGageInfo(event) {
			if (!boss_ID || (boss_ID != event.id)) boss_ID = event.id;
		}

		function sInfo(event) {
			const bossWord = parseInt(event.message.match(/\d+/ig));
			if ([3036039, 3036040, 3036041].includes(bossWord)) {
				dispatch.clearTimeout(timer1);
				triple_attack = true;
				timer1 = dispatch.setTimeout(() => triple_attack = false, 2800);
			}
		}

		function sNpcStatus(event) {
			if (boss_ID != event.gameId) return;
			if (event.enraged && !enraged) {
				enraged = true;
				handlers.text({
					sub_type: "message",
					message: "Enrage Up",
					message_ES: "Enrage"
				});
			} else if (!event.enraged && enraged) {
				enraged = false;
				handlers.text({
					sub_type: "message",
					message: "End of Enrage",
					message_ES: "Fin del Enrage"
				});
			}
		}

		if (!status_tracker_started) {
			dispatch.hook("S_NPC_STATUS", 2, sNpcStatus);
			dispatch.hook("S_BOSS_GAGE_INFO", 3, sBossGageInfo);
			dispatch.hook("S_QUEST_BALLOON", 1, sInfo);
			status_tracker_started = true;
		}

		print_mech = true;
	}

	function skilld_event(skillid) {
		if ([1401, 1402, 1701, 1702].includes(skillid)) {
			if (print_mech) {
				handlers.text({ sub_type: "message",
					message: triple_attack ? mech_messages[step_two].message : mech_messages[2].message,
					message_ES: triple_attack ? mech_messages[step_two].message_ES : mech_messages[2].message_ES
				});
				print_mech = false;
				dispatch.setTimeout(() => print_mech = true, triple_attack ? 8000 : 4000);
			}

			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
				{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] }
			]);
		}

		if ([1401, 1701].includes(skillid)) {
			if (enraged) {
				handlers.event([
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }
				]);
			} else {
				handlers.event([
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }
				]);
			}
		}

		if ([1402, 1702].includes(skillid)) {
			if (!enraged) {
				handlers.event([
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }
				]);
			} else {
				handlers.event([
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
					{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }
				]);
			}
		}
	}

	return {
		"nd-3036-1001": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3036-1001-1112-0": [{ type: "text", sub_type: "message", message: "Back Jump", message_ES: "Salto Atras" }],
		//
		"ns-3036-1000": [{ type: "func", func: start_dungeon_event }],
		"nd-3036-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3036-1000-100": [{ type: "func", func: () => step_two = 0 }],
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "94%" }],
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "79%" }, { type: "func", func: () => step_two = 1 }],
		//
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "Back", message_ES: "Atras" }],
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-3036-1000-1118-0": [{ type: "text", sub_type: "message", message: "Front Cut | Dodge", message_ES: "Corte Frontal | Esquiva" }],
		"s-3036-1000-1302-0": [
			{ type: "text", sub_type: "message", message: "AOE" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000] }
		],
		"s-3036-1000-1303-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_ES: "Ataque Giratorio" }],
		"s-3036-1000-1401-0": [{ type: "func", func: skilld_event, args: [1401] }],
		"s-3036-1000-1402-0": [{ type: "func", func: skilld_event, args: [1402] }],
		"s-3036-1000-1701-0": [{ type: "func", func: skilld_event, args: [1701] }], //right
		"s-3036-1000-1702-0": [{ type: "func", func: skilld_event, args: [1702] }], //left
		"s-3036-1000-1805-0": [
			{ type: "text", sub_type: "message", message: "Beween", message_ES: "Dentro" },
			{ type: "text", sub_type: "message", delay: 2150, message: "IN", message_ES: "ENTRAR" },
			{ type: "text", sub_type: "message", delay: 3050, message: "All | OUT", message_ES: "Todos | SALIR" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 250, 0, 6000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 450, 0, 6000] }
		],
		"s-3036-1000-1806-0": [
			{ type: "text", sub_type: "message", message: "IN", message_ES: "ENTRAR" },
			{ type: "text", sub_type: "message", delay: 2150, message: "Beween", message_ES: "Dentro" },
			{ type: "text", sub_type: "message", delay: 3050, message: "All | IN", message_ES: "Todos | ENTRAR" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 250, 0, 6000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 450, 0, 6000] }
		],
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "Back", message_ES: "Atrss" }],
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "Front Cut | Dodge", message_ES: "Corte frontal | Esquiva" }]
	};
};