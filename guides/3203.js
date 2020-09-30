// Forbidden Arena [Nightmare Undying Warlord]
//
// made by HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	let timer1;
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
					message: "Golpe Aleatorio (Haymaker)",
					message_RU: "Мощный удар"
				});
			} else { // 116 -> 146
				handlers.text({
					sub_type: "message",
					message: "Golpe Frontal + Patada Atras (Haymaker)",
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
					message: "El objetivo atacara pronto...",
					message_RU: "Скоро таргет-атака..."
				});
			}, 65000);
		}
	}

	return {
		"nd-3203-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3203-1000-30": [{ type: "text", sub_type: "message", message: "30%", message_RU: "30%" }],

		//"s-3203-1000-101-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Punch", message_RU: "Серия ударов" }],
		"s-3203-1000-113-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Patada Circular", message_RU: "Удар с разворота" }],
		"s-3203-1000-111-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Tumbar", message_RU: "Опрокид" }],
		"s-3203-1000-120-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Tumbar", message_RU: "Опрокид" }],
		//"s-3203-1000-102-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Combo", message_RU: "Комба" }], // 102 153/154 115/116
		"s-3203-1000-153-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "2 Patada", message_RU: "Два удара" }], // 153 108
		//"s-3203-1000-108-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Floor Punch", message_RU: "Удар о землю" }],
		//"s-3203-1000-127-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Many Kicks", message_RU: "Несколько ударов" }],

		"s-3203-1000-121-0": [{ type: "text", sub_type: "message", message: "Giro + Patada (Stun)", message_RU: "Удар в воздухе (стан)" }],
		"s-3203-1000-107-0": [
			{ type: "text", sub_type: "message", message: "Bait", message_RU: "Байт" },
			{ type: "func", func: back_kick_event, args: [107] }
		],
		"s-3203-1000-110-0": [
			{ type: "text", sub_type: "message", message: "Girar", message_RU: "Крутилка" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 12, 420, 0, 3000] }
		],
		"s-3203-1000-114-0": [
			{ type: "text", sub_type: "message", message: "Salto (Derrubar)", message_RU: "Прыжок (опрокид)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 12, 240, 0, 2000] }
		],
		//"s-3203-1000-154-0": [{ type: "text", sub_type: "message", message: "Jumping Kick", message_RU: "Удар в прыжке" }], // 154 310 116
		// 310 116
		"s-3203-1000-310-0": [ 
			{ type: "text", sub_type: "message", message: "Giro Atras | Haymaker", message_RU: "Сальто назад | Мощный удар" },
			{ type: "func", func: back_kick_event, args: [310] }
		],
		"s-3203-1000-116-0": [{ type: "func", func: back_kick_event, args: [116] }], // Haymaker
		"s-3203-1000-115-0": [{ type: "text", sub_type: "message", message: "Golpe Frontal (Haymaker)", message_RU: "Мощный удар (танк)" }],
		"s-3203-1000-131-0": [{ type: "text", sub_type: "message", message: "Ritmico Golpes", message_RU: "Ураганная серия" }], // 131 132 133
		"s-3203-1000-146-0": [
			{ type: "text", sub_type: "message", message: "Patada Atras", message_RU: "Откид назад" }, // 116 146
			{ type: "spawn", func: "vector", args: [553, 90, 120, 170, 600, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 120, -170, 600, 0, 3000] }
		],

		// Shield
		"qb-3203-1000-32031006": [{ type: "text", sub_type: "message", message: "ESCUDO!", message_RU: "Щит!" }],

		// Target "Ha" attacks 308 32031007 125
		"qb-3203-1000-32031007": [
			{ type: "text", sub_type: "message", message: "Alvo", message_RU: "Таргет" },
			{ type: "func", func: target_attack_event }
		],
		"s-3203-1000-124-0": [{ type: "text", sub_type: "message", message: "Patada", message_RU: "Удар" }], // 305 124
		"s-3203-1000-125-0": [{ type: "text", sub_type: "message", message: "Patada", message_RU: "Удар" }],

		// Donuts
		"qb-3203-1000-32031008": [{ type: "text", sub_type: "message", message: "SALIR - ENTRAR (Donuts)", message_RU: "Бублики: От него > К нему > Эвейд" }], // 32031008 303/304 117 155
		"qb-3203-1000-32031009": [{ type: "text", sub_type: "message", message: "ENTRAR - SALIR (Donuts)", message_RU: "Бублики: К нему > От него > Эвейд" }], // 32031009 303/304 118 155
		"s-3203-1000-303-0": [
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 490, 0, 5000] }
		],
		"s-3203-1000-304-0": [
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 490, 0, 5000] }
		],
		"s-3203-1000-155-0": [{ type: "text", sub_type: "message", delay: 400, message: "Esquiva", message_RU: "Эвейд" }],

		// Stun 142 148 129
		"s-3203-1000-142-0": [{ type: "text", sub_type: "message", message: "Olas Atras | Stun", message_RU: "Стан | Волна назад" }],
		"s-3203-1000-148-0": [{ type: "spawn", func: "circle", args: [true, 912, 0, -10, 12, 300, 0, 3000] }],
		"s-3203-1000-129-0": [
			{ type: "text", sub_type: "message", message: "Olas Atras", message_RU: "Волна назад (откид)" },
			{ type: "spawn", func: "vector", args: [912, 90, 210, 390, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 140, 380, 350, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 70, 370, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 70, -370, 400, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 140, -380, 350, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 270, 210, -390, 300, 0, 2000] }
		],

		// Jump 143-0 143-1
		"s-3203-1000-143-0": [{ type: "text", sub_type: "message", message: "Salto (Stun)", message_RU: "Прыжок (стан)" }],
		"s-3203-1000-143-1": [{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 14, 240, 0, 2000] }],

		// AoE 313 314
		"s-3203-1000-313-0": [{ type: "text", sub_type: "message", message: "AOE", message_RU: "AOE" }],
		"s-3103-1000-314-0": [
		    { type: "text", sub_type: "message", message: "SALIR", message_RU: "Выйти" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 470, 0, 4000] }
	    ],

		// Explosion 32031003 152 / 135
		"s-3203-1000-152-0": [
			{ type: "text", sub_type: "message", message: "Explosion (Stun)", message_RU: "Взрыв (стан)" },
			{ type: "spawn", func: "circle", args: [true, 912, 0, 0, 8, 460, 0, 2500] },
			{ type: "text", sub_type: "alert", delay: 58000, message: "Explosion Pronto...", message_RU: "Скоро взрыв..." }
		],
		"s-3203-1000-135-0": [
			{ type: "text", sub_type: "message", message: "Explosion (Stun)", message_RU: "Взрыв (стан)" },
			{ type: "spawn", func: "circle", args: [true, 912, 0, 0, 8, 460, 0, 2500] },
			{ type: "text", sub_type: "alert", delay: 58000, message: "Explosion Pronto...", message_RU: "Скоро взрыв..." }
		],

		// Debuff
		"ae-0-0-32031011": [{ type: "text", sub_type: "alert", message: "Debuff Stack", message_RU: "Дебафф (стаки)" }],
		"am-3203-1000-32031011": [{ type: "text", sub_type: "alert", message: "Debuff Stack", message_RU: "Дебафф (стаки)" }],
		"am-3203-1000-32031012": [{ type: "text", sub_type: "alert", message: "Debuff Stack", message_RU: "Дебафф (стаки)" }]
	};
};