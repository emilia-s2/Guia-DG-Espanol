// Forbidden Arena [Undying Warlord]
//
// made by HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	let timer1 = null;
	let print_target = true;
	let in_bait = false;

	function back_kick_event(skillid) {
		if ([107, 310].includes(skillid)) { // Bait/Back Flip
			in_bait = true;
			dispatch.setTimeout(() => in_bait = false, 3500);
		}

		if (skillid == 116) { // Haymaker
			if (in_bait) {
				handlers.text({
					sub_type: "message",
					message_ES: "Golpe Aleatorio (Haymaker)",
					message_RU: "Мощный удар"
				});
			} else { // 116 -> 146
				handlers.text({
					sub_type: "message",
					message_ES: "Golpe Frontal + Patada Atras (Haymaker)",
					message_RU: "Мощный удар | Откид назад"
				});
			}
		}
	}

	function target_attack_event() {
		if (print_target) {
			dispatch.clearTimeout(timer1);
			print_target = false;
			dispatch.setTimeout(() => print_target = true, 5000);

			timer1 = dispatch.setTimeout(() => {
				handlers.text({
					sub_type: "alert",
					message_ES: "El objetivo atacar pronto...",
					message_RU: "Скоро таргет-атака..."
				});
			}, 65000);
		}
	}

	return {
		"nd-3103-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		//"s-3103-1000-101-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Punch", message_RU: "Серия ударов" }],
		"s-3103-1000-113-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Patada circular", message_RU: "Удар с разворота" }],
		"s-3103-1000-111-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Tumbar", message_RU: "Опрокид" }],
		"s-3103-1000-120-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Tumbar", message_RU: "Опрокид" }],
		//"s-3103-1000-102-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Combo", message_RU: "Комба" }], // 102 153/154 115/116
		"s-3103-1000-153-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "2 chutes", message_RU: "Два удара" }], // 153 108
		//"s-3103-1000-108-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Floor Punch", message_RU: "Удар о землю" }],
		//"s-3103-1000-127-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Many Kicks", message_RU: "Несколько ударов" }],

		"s-3103-1000-121-0": [{ type: "text", sub_type: "message", message_ES: "Giro + Patada(Stun)", message_RU: "Удар в воздухе (стан)" }],
		"s-3103-1000-107-0": [
			{ type: "text", sub_type: "message", message_ES: "Bait", message_RU: "Байт" },
			{ type: "func", func: back_kick_event, args: [107] }
		],
		"s-3103-1000-110-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro", message_RU: "Крутилка" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 12, 420, 0, 3000] }
		],
		"s-3103-1000-114-0": [
			{ type: "text", sub_type: "message", message_ES: "Salto (Tumbar)", message_RU: "Прыжок (опрокид)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 12, 240, 0, 2000] }
		],
		//"s-3103-1000-154-0": [{ type: "text", sub_type: "message", message_ES: "Jumping Kick", message_RU: "Удар в прыжке" }], // 154 310 116
		// 310 116
		"s-3103-1000-310-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro Atras | Haymaker", message_RU: "Сальто назад | Мощный удар" },
			{ type: "func", func: back_kick_event, args: [310] }
		],
		"s-3103-1000-116-0": [{ type: "func", func: back_kick_event, args: [116] }], // Haymaker
		"s-3103-1000-115-0": [{ type: "text", sub_type: "message", message_ES: "Golpe Frontal (Haymaker)", message_RU: "Мощный удар (танк)" }],
		"s-3103-1000-131-0": [{ type: "text", sub_type: "message", message_ES: "Ritmico Golpes", message_RU: "Ураганная серия" }], // 131 132 133
		 // 116 146
		"s-3103-1000-146-0": [
			{ type: "text", sub_type: "message", message_ES: "Patada Aras", message_RU: "Откид назад" },
			{ type: "spawn", func: "vector", args: [553, 90, 120, 170, 600, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 120, -170, 600, 0, 3000] }
		],

		// Shield
		"qb-3103-1000-31031006": [{ type: "text", sub_type: "message", message_ES: "ESCUDO!", message_RU: "Щит!" }],

		// Target "Ha" attacks 308 31031007 125
		"qb-3103-1000-31031007": [
			{ type: "text", sub_type: "message", message_ES: "objetivo", message_RU: "Таргет" },
			{ type: "func", func: target_attack_event }
		],
		"s-3103-1000-124-0": [{ type: "text", sub_type: "message", message_ES: "Patada", message_RU: "Удар" }], // 305 124
		"s-3103-1000-125-0": [{ type: "text", sub_type: "message", message_ES: "Patada", message_RU: "Удар" }],

		// Donuts
		"qb-3103-1000-31031008": [{ type: "text", sub_type: "message", message_ES: "SALIR - ENTRAR (Donuts)", message_RU: "Бублики: От него > К нему > Эвейд" }], // 31031008 303/304 117 155
		"qb-3103-1000-31031009": [{ type: "text", sub_type: "message", message_ES: "ENTRAR - SALIR (Donuts)", message_RU: "Бублики: К нему > От него > Эвейд" }], // 31031009 303/304 118 155
		"s-3103-1000-303-0": [
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 490, 0, 5000] }
		],
		"s-3103-1000-304-0": [
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 490, 0, 5000] }
		],
		"s-3103-1000-155-0": [{ type: "text", sub_type: "message", delay: 400, message_ES: "Esquiva", message_RU: "Эвейд" }],

		// Stun 142 148 129
		"s-3103-1000-142-0": [{ type: "text", sub_type: "message", message_ES: "Ola Atras | Stun", message_RU: "Стан | Волна назад" }],
		"s-3103-1000-148-0": [{ type: "spawn", func: "circle", args: [true, 912, 0, -10, 12, 300, 0, 3000] }],
		"s-3103-1000-129-0": [
			{ type: "text", sub_type: "message", message_ES: "Olas Atras", message_RU: "Волна назад (откид)" },
			{ type: "spawn", func: "vector", args: [912, 90, 210, 390, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 140, 380, 350, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 70, 370, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 70, -370, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 140, -380, 350, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 210, -390, 300, 0, 2000] }
		],

		// Jump 143-0 143-1
		"s-3103-1000-143-0": [{ type: "text", sub_type: "message", message_ES: "Salto (Stun)", message_RU: "Прыжок (стан)" }],
		"s-3103-1000-143-1": [{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 14, 240, 0, 2000] }],

		// AoE 313 314
		"s-3103-1000-313-0": [{ type: "text", sub_type: "message", message_ES: "AOE", message_RU: "AOE" }],
		"s-3103-1000-314-0": [
			{ type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "Выйти" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 470, 0, 4000] }
		],

		// Debuff
		"ae-0-0-31031011": [{ type: "text", sub_type: "alert", message_ES: "Debuff Stack", message_RU: "Дебафф (стаки)" }],
		"am-3103-1000-31031011": [{ type: "text", sub_type: "alert", message_ES: "Debuff Stack", message_RU: "Дебафф (стаки)" }],
		"am-3103-1000-31031012": [{ type: "text", sub_type: "alert", message_ES: "Debuff Stack", message_RU: "Дебафф (стаки)" }]
	};
};