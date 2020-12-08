// Sky Cruiser (Dificil)
//
// made by michengs / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let triple_attack = false;
	let back_print = false;
	let back_time = 0;
	let end_back_time = 0;
	let is_one_back = false;
	let timer1 = null;
	let timer2 = null;
	let enrage = 0;
	let enrage_time = 0;
	let counter = 0;
	let is_hp_79 = false;
	let mech_total = 0;
	let mech_counter = 0;

	const mech_messages = {
		2: { message: "Two Split Strikes", message_ES: "Tres Ataques divididos" },
		3: { message: "Three Split Strikes", message_ES: "Cuatro Ataques divididos" },
		4: { message: "Four Split Strikes", message_ES: "Dos Ataques divididos" }
	};

	function boss_backcombo_event() {
		dispatch.clearTimeout(timer2);
		counter++;

		if (counter >= 2 && triple_attack) {
			handlers.text({
				sub_type: "message",
				message: "Back Combo",
				message_ES: "Atrás Combo"
			});
		}

		timer2 = dispatch.setTimeout(() => counter = 0, enrage == 1 ? 2200 : 2500);
	}

	function boss_backattack_event() {
		end_back_time = new Date() - back_time;

		if (!back_print) {
			back_print = true;
			is_one_back = end_back_time > 0 && end_back_time < 1500;

			handlers.text({
				sub_type: "message",
				message: is_one_back ? "Back!" : "!!!",
				message_ES: is_one_back ? "Atras!" : "!!!"
			});
		}

		dispatch.setTimeout(() => back_print = false, 2500);
	}

	function boss_tripleattack_event() {
		dispatch.clearTimeout(timer1);
		triple_attack = true;
		timer1 = dispatch.setTimeout(() => triple_attack = false, 3500);
	}

	function boss_mech_event(skillid) {
		enrage = new Date() - enrage_time >= 35100 ? 0 : 1;
		mech_total = triple_attack ? (is_hp_79 ? 4 : 3) : 2;

		if (mech_counter == 0) {
			handlers.text({ sub_type: "message",
				message: mech_messages[mech_total].message,
				message_ES: mech_messages[mech_total].message_ES
			});

			mech_counter = mech_total;
		}

		mech_counter--;

		handlers.event([
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 1100, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 1100, 100, 1500] }
		]);

		if (([1401, 1402].includes(skillid) ? (skillid % 2 + enrage) % 2 : skillid % 2) == 0) {
			handlers.event([ // left
				{ type: "text", sub_type: "alert", speech: false,
					message: `(${mech_total - mech_counter}) Left`,
					message_ES: `(${mech_total - mech_counter}) Izquierda`
				},
				{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }
			]);
		} else {
			handlers.event([ // right
				{ type: "text", sub_type: "alert", speech: false,
					message: `(${mech_total - mech_counter}) Right`,
					message_ES: `(${mech_total - mech_counter}) Derecha`
				},
				{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
				{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }
			]);
		}
	}

	return {
		// Phase 1
		"ns-3036-1001": [
			{ type: "spawn", func: "marker", args: [false, 281, -500, 100, 60000000, false] },
			{ type: "spawn", func: "point", args: [513, 261, 500, 100, 60000000] }
		],
		"nd-3036-1001": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3036-1001-1112-0": [{ type: "text", sub_type: "message", message: "Back Jump", message_ES: "Salto Atrás" }],

		// Phase 2
		"ns-3036-1000": [
			{ type: "func", func: () => enrage = 0 },
			{ type: "func", func: () => mech_counter = 0 },
			{ type: "spawn", func: "marker", args: [false, 281, -500, 100, 60000000, false] },
			{ type: "spawn", func: "point", args: [513, 261, 500, 100, 60000000] }
		],
		"nd-3036-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"rb-3036-1000": [
			{ type: "text", sub_type: "message", message: "Enrage Up", message_ES: "Enrage" },
			{ type: "func", func: () => enrage = 1 },
			{ type: "func", func: () => enrage_time = new Date() }
		],
		"re-3036-1000": [
			{ type: "text", sub_type: "message", message: "End of Enrage", message_ES: "Fin del Enrage" },
			{ type: "func", func: () => enrage = 0 }
		],
		"h-3036-1000-100": [{ type: "func", func: () => is_hp_79 = false }],
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "94%" }],
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "79%" }, { type: "func", func: () => is_hp_79 = true }],
		"h-3036-1000-35": [{ type: "text", sub_type: "message", message: "Watch the countdown", message_ES: "Mira la Puntuación regresiva" }],
		"h-3036-1000-34": [{ type: "text", sub_type: "message", message: "Third layer of shrinking ring preparation", message_ES: "Tercera capa de Anillo de Contracción" }],
		"h-3036-1000-65": [{ type: "text", sub_type: "message", message: "Second layer of shrinking ring preparation", message_ES: "Secunda capa de Anillo de Contracción" }],
		"s-3036-1000-1101-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1102-0": [{ type: "func", func: () => back_time = new Date() }],
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backcombo_event }],
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backcombo_event }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "Back Move", message_ES: "Movimiento Atrás" }],
		"s-3036-1000-1114-0": [
			{ type: "text", sub_type: "message", message: "Invisible Fire", message_ES: "Fuego Invisible" },
			{ type: "spawn", func: "vector", args: [553, 90, 150, 0, 1300, 0, 5830] },
			{ type: "spawn", func: "vector", args: [553, 90, 75, 0, 1300, 0, 5830] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 1300, 0, 5830] },
			{ type: "spawn", func: "vector", args: [553, 270, 75, 0, 1300, 0, 5830] },
			{ type: "spawn", func: "vector", args: [553, 270, 150, 0, 1300, 0, 5830] }
		],
		"s-3036-1000-1115-0": [
			{ type: "text", sub_type: "message", message: "3" },
			{ type: "text", sub_type: "message", delay: 1000, message: "2" },
			{ type: "text", sub_type: "message", delay: 2000, message: "1" },
			{ type: "text", sub_type: "message", delay: 3200, message: "Dodge", message_ES: "Iframe" }
		],
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-3036-1000-1118-0": [
			{ type: "text", sub_type: "message", message: "Front Cut | Dodge", message_ES: "Corte Frontal | iframe" },
			{ type: "spawn", func: "semicircle", args: [0, 60, 553, 0, 0, 15, 60, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 55, 553, 0, 0, 15, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 45, 553, 0, 0, 10, 250, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 45, 553, 0, 0, 10, 340, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [300, 360, 553, 0, 0, 15, 60, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [305, 360, 553, 0, 0, 15, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [310, 360, 553, 0, 0, 10, 250, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [315, 360, 553, 0, 0, 10, 340, 0, 2000] }
		],
		"s-3036-1000-1302-0": [
			{ type: "text", sub_type: "message", message: "AOE", message_ES: "AOE" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000] }
		],
		"s-3036-1000-2101-0": "s-3036-1000-1101-0",
		"s-3036-1000-2102-0": "s-3036-1000-1102-0",
		"s-3036-1000-1303-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_ES: "Ataque Giratorio" }],
		"s-3036-1000-1401-0": [{ type: "func", func: boss_mech_event, args: [1401] }],
		"s-3036-1000-1402-0": [{ type: "func", func: boss_mech_event, args: [1402] }],
		"s-3036-1000-1701-0": [{ type: "func", func: boss_mech_event, args: [1701] }], // right
		"s-3036-1000-1702-0": [{ type: "func", func: boss_mech_event, args: [1702] }], // left
		"s-3036-1000-1801-0": [{ type: "text", sub_type: "message", message: "Incoming Stun", message_ES: "Entrada (Stun)" }],
		"s-3036-1000-1805-0": [
			{ type: "text", sub_type: "message", message: "Beween", message_ES: "Dentro" },
			{ type: "text", sub_type: "message", delay: 2150, message: "IN", message_ES: "ENTRAR" },
			{ type: "text", sub_type: "message", delay: 3050, message: "All | OUT", message_ES: "Todos | SALIR" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 250, 0, 6000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 430, 0, 6000] }
		],
		"s-3036-1000-1806-0": [
			{ type: "text", sub_type: "message", message: "IN", message_ES: "ENTRAR" },
			{ type: "text", sub_type: "message", delay: 2150, message: "Beween", message_ES: "Dentro" },
			{ type: "text", sub_type: "message", delay: 3050, message: "All | IN", message_ES: "Todos | ENTRAR" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 250, 0, 6000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 430, 0, 6000] }
		],
		"s-3036-1000-2103-0": "s-3036-1000-1103-0",
		"s-3036-1000-2106-0": "s-3036-1000-1106-0",
		"s-3036-1000-2112-0": "s-3036-1000-1112-0",
		"s-3036-1000-2114-0": "s-3036-1000-1114-0",
		"s-3036-1000-2115-0": "s-3036-1000-1115-0",
		"s-3036-1000-2117-0": "s-3036-1000-1117-0",
		"s-3036-1000-2118-0": "s-3036-1000-1118-0",
		"qb-3036-1000-3036039": [{ type: "func", func: boss_tripleattack_event }],
		"qb-3036-1000-3036040": [{ type: "func", func: boss_tripleattack_event }],
		"qb-3036-1000-3036041": [{ type: "func", func: boss_tripleattack_event }]
	};
};