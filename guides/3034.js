// RK-9 Kennel (Dificil)
//
// made by michengs / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	let orb_notice = true;
	let boss_seventy = false;
	let msg_a = 3;
	let msg_b = 3;
	let mech_reverse = false;
	let mech_notice = false;

	const mech_messages = {
		0: { message_ES: "SALIR", message_RU: "От него" },
		1: { message_ES: "ENTRAR", message_RU: "К нему" },
		2: { message_ES: "Ola", message_RU: "Волна" },
		3: { message_ES: "?", message_RU: "?" }
	};

	// Throwing orbs
	function throwing_orb_event() {
		if (orb_notice) {
			orb_notice = false;

			handlers.text({
				sub_type: "message",
				message_ES: "Jugar Bombs",
				message_RU: "Бомба"
			});

			dispatch.setTimeout(() => orb_notice = true, 13000);
		}
	}

	// Core mechanics
	function thirdboss_mech_event(skillid) {
		if ([3034302, 3034303, 3034304, 3034311, 3034312].includes(skillid)) {
			switch (skillid) {
				// DM
				case 3034302: // Out
					msg_a = 0;
					print_mech(true, false);
					break;

				case 3034303: // In
					msg_a = 1;
					print_mech(true, false);
					break;

				case 3034304: // Wave
					msg_a = 2;
					print_mech(true, false);
					break;

				// QB
				case 3034311: // STANDARD (1)
					mech_reverse = false;
					print_mech(true, true);
					if (mech_notice) {
						print_mech(false, false);
					}
					break;

				case 3034312: // REVERSE (0)
					mech_reverse = true;
					print_mech(true, true);
					if (mech_notice) {
						print_mech(false, false);
					}
					break;
			}
		}
		// QB
		// 0: Out  3034301
		// 1: In   3034302
		// 2: Wave 3034303
		if (skillid >= 0 && skillid < 3) {
			msg_b = skillid;
			print_mech(false, false);
			msg_a = msg_b;
			msg_b = 3;

			dispatch.setTimeout(() => {
				print_mech(true, false);
			}, 7000);

			mech_notice = true;
			dispatch.setTimeout(() => mech_notice = false, 3000);
		}
	}
	function print_mech(next, code) {
		let message = "",
			message_RU = "",
			sub_type = "message";

		if (next) {
			message += "Next: ";
			message_RU += "Далее: ";
			sub_type = "notification";
		}

		if (mech_reverse) {
			message += `${mech_messages[msg_b].message} + ${mech_messages[msg_a].message}`;
			message_RU += `${mech_messages[msg_b].message_RU} + ${mech_messages[msg_a].message_RU}`;
		} else {
			message += `${mech_messages[msg_a].message} + ${mech_messages[msg_b].message}`;
			message_RU += `${mech_messages[msg_a].message_RU} + ${mech_messages[msg_b].message_RU}`;
		}

		if (code) {
			message += `, Code: ${mech_reverse ? "0" : "1"}`;
			message_RU += `, Код: ${mech_reverse ? "0" : "1"}`;
		}

		handlers.text({
			sub_type: sub_type,
			message_ES: message,
			message_RU: message_RU
		});
	}
	// S-attacks
	function thirdboss_sattack_event(skillid) {
		// Safe: 116/119 [R] + 222-0 [R] > 222-1 [L] > 222-2 [R] > 326/327
		// Safe: 117/118 [L] + 223-0 [L] > 223-1 [R] > 223-2 [L] > 326/327
		let delay  = boss_seventy ? 2000 : 0,
			duration = boss_seventy ? 800 : 900;
		if ([1160, 1190].includes(skillid)) {
			handlers.text({ sub_type: "message", delay: delay, message_ES: "DERECHA Seguro", message_RU: "Справа сейф" });
		}
		if ([1170, 1180].includes(skillid)) {
			handlers.text({ sub_type: "message",delay: delay, message_ES: "IZQUIERDA Seguro", message_RU: "Слева сейф" });
		}
		if ([1160, 1170, 1180, 1190].includes(skillid) && boss_seventy) { // <70%
			if (mech_reverse) {
				handlers.text({ sub_type: "message",message_ES: "Triplo-S | SALIR", message_RU: "Трипл-эска | От него" });
				handlers.text({ sub_type: "message",delay: 4500, message_ES: "SALIR", message_RU: "От него" });
			} else {
				handlers.text({ sub_type: "message", message_ES: "Triplo-S | ENTRAR", message_RU: "Трипл-эска | К нему" });
				handlers.text({ sub_type: "message", delay: 4500, message_ES: "ENTRAR", message_RU: "К нему" });
			}
			handlers.spawn({ func: "circle", args: [false, 553, 0, 0, 10, 300, 5000, 2000] });
			duration = 2000;
		}
		if ([1160, 1161, 1162, 1163, 1190, 1191, 1192, 1193, 2220, 2222, 2231].includes(skillid)) { // right safe
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 160, 300, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 340, 300, 0, duration, true, null] },
				{ type: "spawn", func: "point", args: [202, 170, 200, 0, duration] },
				{ type: "spawn", func: "point", args: [202, 350, 200, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 170, 210, 180, 290, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 120, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 130, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 140, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 150, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 160, 210, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 300, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 310, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 320, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 330, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 340, 210, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 350, 210, 0, 290, 0, duration] }
			]);
		}
		if ([1170, 1171, 1172, 1173, 1180, 1181, 1182, 1183, 2230, 2232, 2221].includes(skillid)) { // left safe
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 20, 300, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 200, 300, 0, duration, true, null] },
				{ type: "spawn", func: "point", args: [202, 10, 200, 0, duration] },
				{ type: "spawn", func: "point", args: [202, 190, 200, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 10, 210, 0, 290, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 20, 210, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 30, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 40, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 50, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 60, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 240, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 230, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 220, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 210, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 200, 210, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 190, 210, 180, 290, 0, duration] }
			]);
		}
	}

	function thirdboss_start_event() {
		boss_seventy = false;
	}

	function thirdboss_seventy_event() {
		boss_seventy = true;
	}

	return {
		// 1 BOSS
		"nd-3034-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"qb-3034-1000-3034101": [{ type: "text", sub_type: "alert", message_ES: "Pizza", message_RU: "Пицца" }],
		"qb-3034-1000-3034102": [{ type: "text", sub_type: "alert", message_ES: "AOE! SALTAR", message_RU: "AOE! Прыгай!!!" }],
		"s-3034-1000-104-0": [{ type: "text", sub_type: "message", message_ES: "Stun Frontal", message_RU: "Передний зажим" }],
		"s-3034-1000-108-0": [
		    { type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "От него" },
		    { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 300, 100, 4000] } // Adicionado// крутилка
		],	
		"s-3034-1000-111-0": [{ type: "text", sub_type: "message", message_ES: "Atras | Frente Ataque", message_RU: "Удар назад + вперед" }],
		"s-3034-1000-112-0": [
		   { type: "text", sub_type: "message", message_ES: "Ataque Atras", message_RU: "Удар назад" },
		   { type: "spawn", func: "circle", args: [false, 553, 180, 250, 10, 200, 0, 2750] }   //Adicionado
		],
		"s-3034-1003-205-0": [{ type: "text", sub_type: "alert", message_ES: "Ventilador", message_RU: "Ветер (кайя)!" }],
		"s-3034-1004-205-0": [{ type: "alias", id: "s-3034-1003-205-0" }],
		"s-3034-1005-205-0": [{ type: "alias", id: "s-3034-1003-205-0" }],
		"s-3034-1006-205-0": [{ type: "alias", id: "s-3034-1003-205-0" }],
		"s-3034-1007-205-0": [{ type: "alias", id: "s-3034-1003-205-0" }],
		"s-3034-1000-304-0": [
		   { type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "От него" },
		   { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 350, 100, 4000] } // Adicionado
		],   
		"s-3034-1000-305-0": [
		   { type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "К нему" },
		   { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 4000] } // Adicionado
		],   
		"s-3034-1000-306-0": [{ type: "text", sub_type: "message", message_ES: "Bombs", message_RU: "Бомбы" }],
		"s-3034-1000-307-0": [{ type: "text", sub_type: "message", message_ES: "Jalar", message_RU: "Стяжка" }],
		"s-3034-1000-309-0": [
			{ type: "text", sub_type: "message", message_ES: "Misiles Iniciados", message_RU: "Запуск 4 ракет" },
			{ type: "text", sub_type: "message", delay: 6000, message_ES: "5", message_RU: "5" },
			{ type: "text", sub_type: "message", delay: 7000, message_ES: "4", message_RU: "4" },
			{ type: "text", sub_type: "message", delay: 8000, message_ES: "3", message_RU: "3" },
			{ type: "text", sub_type: "message", delay: 9000, message_ES: "2", message_RU: "2" },
			{ type: "text", sub_type: "message", delay: 10000, message_ES: "1", message_RU: "1" },
			{ type: "text", sub_type: "alert", delay: 11000, message_ES: "SALTAR", message_RU: "Прыгай!" }
		],
		"s-3034-1000-311-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha Frente | Seguro", message_RU: "Справа спереди сейф" },
			{ type: "spawn", func: "marker", args: [false, 67, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-312-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha Atras | Seguro", message_RU: "Справа сзади сейф" },
			{ type: "spawn", func: "marker", args: [false, 112, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-313-0": [
			{ type: "text", sub_type: "message", message_ES: "Atras Izquierda | Seguro", message_RU: "Сзади слева сейф" },
			{ type: "spawn", func: "marker", args: [false, 202, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-314-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente Izquierda | Seguro", message_RU: "Спереди слева сейф" },
			{ type: "spawn", func: "marker", args: [false, 337, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-315-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente Derecha | Seguro", message_RU: "Спереди справа сейф" },
			{ type: "spawn", func: "marker", args: [false, 22, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-316-0": [
			{ type: "text", sub_type: "message", message_ES: "Atras Derecha | Seguro", message_RU: "Сзади справа сейф" },
			{ type: "spawn", func: "marker", args: [false, 157, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-317-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda Atras | Seguro", message_RU: "Слева сзади сейф" },
			{ type: "spawn", func: "marker", args: [false, 247, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-318-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda Frente | Seguro", message_RU: "Слева спереди сейф" },
			{ type: "spawn", func: "marker", args: [false, 292, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-319-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente Derecha | Seguro", message_RU: "Спереди справа сейф" },
			{ type: "spawn", func: "marker", args: [false, 22, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-320-0": [
			{ type: "text", sub_type: "message", message_ES: "Atras Derecha | Seguro", message_RU: "Сзади справа сейф" },
			{ type: "spawn", func: "marker", args: [false, 157, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-321-0": [
			{ type: "text", sub_type: "message", message_ES: "Atras Izquierda | Seguro", message_RU: "Сзади слева сейф" },
			{ type: "spawn", func: "marker", args: [false, 202, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-322-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda Frente | Seguro", message_RU: "Слева спереди сейф" },
			{ type: "spawn", func: "marker", args: [false, 292, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-323-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha Frente | Seguro", message_RU: "Справа спереди сейф" },
			{ type: "spawn", func: "marker", args: [false, 67, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-324-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha Atras | Seguro", message_RU: "Справа сзади сейф" },
			{ type: "spawn", func: "marker", args: [false, 112, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-325-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda Atras | Seguro", message_RU: "Слева сзади сейф" },
			{ type: "spawn", func: "marker", args: [false, 247, 120, 100, 12000, true, null] }
		],
		"s-3034-1000-326-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente Izquierda | Seguro", message_RU: "Спереди слева сейф" },
			{ type: "spawn", func: "marker", args: [false, 337, 120, 100, 12000, true, null] }
		],

		// 2 BOSS
		"nd-3034-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"ns-3034-2000": [
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32904, y: 59440, z: 0 } },
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32704, y: 59325, z: 0 } }, //direito 1 clone
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32900, y: 58824, z: 0 } }, //frente original 
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32700, y: 58946, z: 0 } }, //frente clone
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32372, y: 58520, z: 0 } }, //Esquerdo 1 original
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32372, y: 58755, z: 0 } }, //Esquerdo 1 Clone
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31842, y: 58833, z: 0 } }, //Esquerdo 2 original
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32045, y: 58945, z: 0 } }, //Esquerdo 2 Clone 
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31846, y: 59444, z: 0 } }, //Atras original
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32044, y: 59327, z: 0 } }, //Atras Clone
		{ type: "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32379, y: 59750, z: 0 } }, //Direito 2 original
		{ type: "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32375, y: 59515, z: 0 } }  //Direito 2 Clone
	],
		"s-3034-2000-102-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente", message_RU: "Пила" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 300, 12, 228, 0, 3000] }
		],
		"s-3034-2000-105-0": [
			{ type: "text", sub_type: "message", message_ES: "360 (Repeler)", message_RU: "Крутилка (откид)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 278, 0, 5000] }
		],
		"s-3034-2000-108-0": [
			{ type: "text", sub_type: "message", message_ES: "Atras (Repeler)", message_RU: "Откид назад" },
			{ type: "spawn", func: "semicircle", args: [120, 245, 553, 0, 0, 10, 385, 0, 2000] },  // Adicionado 
			{ type: "spawn", func: "vector", args: [553, 0, 0, 120, 390, 0, 2000] },             // Adicionado 
			{ type: "spawn", func: "vector", args: [553, 0, 0, 240, 390, 0, 2000] }              // Adicionado 
		],
		"s-3034-2000-301-0": [{ type: "func", func: throwing_orb_event }],
		"s-3034-2000-304-0": [
			{ type: "text", sub_type: "message", message_ES: "SLAIR (Explosion)", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 400, 0, 4000] }
		],
		"s-3034-2000-305-0": [
			{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "К нему | От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 200, 0, 3000] }
		],
		// Safe: |||2|2||| > ||||1|||| > ||3|||3||
		"s-3034-2000-310-0": [{ type: "text", sub_type: "message", message_ES: "2 - 1 - 3" },
			{ type: "spawn", func: "marker", args: [false, 40, 220, 0, 1500, true, null] },     // 2
			{ type: "spawn", func: "marker", args: [false, -40, 220, 0, 1500, true, null] },    // 2
			{ type: "spawn", func: "marker", args: [false, 0, 150, 1600, 1500, true, null] },   // 1
			{ type: "spawn", func: "marker", args: [false, 60, 300, 1600, 1500, true, null] },  // 3
			{ type: "spawn", func: "marker", args: [false, -60, 300, 3200, 1500, true, null] }, // 3
		],
		// Safe: ||||1|||| > ||3|||3|| > |||2|2|||
		"s-3034-2000-311-0": [{ type: "text", sub_type: "message", message_ES: "1 - 3 - 2" },
			{ type: "spawn", func: "marker", args: [false, 0, 150, 0, 1500, true, null] },      // 1
			{ type: "spawn", func: "marker", args: [false, 60, 300, 1600, 1500, true, null] },  // 3
			{ type: "spawn", func: "marker", args: [false, -60, 300, 1600, 1500, true, null] }, // 3
			{ type: "spawn", func: "marker", args: [false, 40, 220, 3200, 1500, true, null] },  // 2
			{ type: "spawn", func: "marker", args: [false, -40, 220, 3200, 1500, true, null] }, // 2
		],
		"s-3034-2007-201-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 8000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 8000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 8000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 8000] }
		],
		"s-3034-2007-306-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],
		"s-3034-2007-307-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 12000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 12000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 12000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 12000] }
		],

		// 3 BOSS
		"sd-3034-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3034-3000-99": [{ type: "func", func: thirdboss_start_event }],
		"h-3034-3000-70": [
			{ type: "text", sub_type: "message", message_ES: "70%", message_RU: "70%" },
			{ type: "func", func: thirdboss_seventy_event }
		],
		//
		"dm-0-0-3034311": [{ type: "func", func: thirdboss_mech_event, args: [3034311] }], // 1 std
		"dm-0-0-3034312": [{ type: "func", func: thirdboss_mech_event, args: [3034312] }], // 0 rev
		"dm-0-0-3034302": [{ type: "func", func: thirdboss_mech_event, args: [3034302] }], // out
		"dm-0-0-3034303": [{ type: "func", func: thirdboss_mech_event, args: [3034303] }], // in
		"dm-0-0-3034304": [{ type: "func", func: thirdboss_mech_event, args: [3034304] }], // wave
		"qb-3034-3000-3034301": [{ type: "func", func: thirdboss_mech_event, args: [0] }], // out
		"qb-3034-3000-3034302": [{ type: "func", func: thirdboss_mech_event, args: [1] }], // in
		"qb-3034-3000-3034303": [{ type: "func", func: thirdboss_mech_event, args: [2] }], // wave
		 // right safe S
		"s-3034-3000-116-0": [{ type: "func", func: thirdboss_sattack_event, args: [1160] }],
		"s-3034-3000-116-1": [{ type: "func", func: thirdboss_sattack_event, args: [1161] }],
		"s-3034-3000-116-2": [{ type: "func", func: thirdboss_sattack_event, args: [1162] }],
		"s-3034-3000-116-3": [{ type: "func", func: thirdboss_sattack_event, args: [1163] }],
		"s-3034-3000-119-0": [{ type: "func", func: thirdboss_sattack_event, args: [1190] }],
		"s-3034-3000-119-1": [{ type: "func", func: thirdboss_sattack_event, args: [1191] }],
		"s-3034-3000-119-2": [{ type: "func", func: thirdboss_sattack_event, args: [1192] }],
		"s-3034-3000-119-3": [{ type: "func", func: thirdboss_sattack_event, args: [1193] }],
		"s-3034-3000-223-1": [{ type: "func", func: thirdboss_sattack_event, args: [2231] }],
		"s-3034-3000-222-0": [{ type: "func", func: thirdboss_sattack_event, args: [2220] }],
		"s-3034-3000-222-2": [{ type: "func", func: thirdboss_sattack_event, args: [2222] }],
		 // left safe S
		"s-3034-3000-117-0": [{ type: "func", func: thirdboss_sattack_event, args: [1170] }],
		"s-3034-3000-117-1": [{ type: "func", func: thirdboss_sattack_event, args: [1171] }],
		"s-3034-3000-117-2": [{ type: "func", func: thirdboss_sattack_event, args: [1172] }],
		"s-3034-3000-117-3": [{ type: "func", func: thirdboss_sattack_event, args: [1173] }],
		"s-3034-3000-118-0": [{ type: "func", func: thirdboss_sattack_event, args: [1180] }],
		"s-3034-3000-118-1": [{ type: "func", func: thirdboss_sattack_event, args: [1181] }],
		"s-3034-3000-118-2": [{ type: "func", func: thirdboss_sattack_event, args: [1182] }],
		"s-3034-3000-118-3": [{ type: "func", func: thirdboss_sattack_event, args: [1182] }],
		"s-3034-3000-222-1": [{ type: "func", func: thirdboss_sattack_event, args: [2221] }],
		"s-3034-3000-223-0": [{ type: "func", func: thirdboss_sattack_event, args: [2230] }],
		"s-3034-3000-223-2": [{ type: "func", func: thirdboss_sattack_event, args: [2232] }],
		//
		"s-3034-3000-125-0": [{ type: "text", sub_type: "message", message_ES: "Frente", message_RU: "Удар вперед" }],
		"s-3034-3000-126-0": [{ type: "text", sub_type: "message", message_ES: "Frente | Atras", message_RU: "Удар вперед | Удар назад" }],
		"s-3034-3000-127-0": [{ type: "text", sub_type: "message", message_ES: "Atras", message_RU: "Удар назад" }],
		"s-3034-3000-128-0": [
			{ type: "text", sub_type: "message", message_ES: "Combo | Atras Puno Esxplosivo", message_RU: "Комба | Конус назад" },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 120, 1200, 2000, 3000] },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 240, 1200, 2000, 3000] }
		],
		"s-3034-3000-129-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Esquiva", message_RU: "Эвейд" }],
		"s-3034-3000-305-0": [{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 6000] }], // 3034301 3034302 3034303 -> 305
		"s-3034-3000-321-0": [
			{ type: "text", sub_type: "message", message_ES: "ESCUDO!", message_RU: "Щит!" },
			{ type: "text", sub_type: "message", delay: 105000, message_ES: "ESCUDO en 10 secundos!", message_RU: "Через 10 сек. Щит!" }
		],
		"s-3034-3001-308-0": [
			{ type: "text", sub_type: "message", message_ES: "Bait!", message_RU: "Байт!" },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 300, 0, 2000] }
		],
		// Radar
		"qb-3034-3000-3034312": [{ type: "text", sub_type: "message", message_ES: "!!! Radar !!!", message_RU: "!!! Радар !!!" }],
		"s-3034-3000-324-0": [
			{ type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "ОТ НЕГО" },
		    { type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 285, 0, 3000] }
//		    { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 200, 0, 3000] },
//		    { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 150, 0, 3000] },
//		    { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 100, 0, 3000] },
//		    { type: "spawn", func: "circle", args: [false, 912, 0, 0, 50, 50, 0, 3000] }
        ],
	     "s-3034-3000-325-0": [
			{ type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "К НЕМУ" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 285, 0, 3000] }
		]
	};
};