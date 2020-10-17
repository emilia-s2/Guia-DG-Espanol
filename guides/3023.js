// Akalath Quarantine
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = ES;

	let debuff = 0;
	let timer1 = null;
	let timer2 = null;

	function firstboss_debuff_event(skillid) {
		switch (skillid) {
			case 3119: // red inside
				if (debuff === 1) {
					handlers.text({
						sub_type: "message",
						message_ES: "SALIR",
						message_RU: "ОТ НЕГО"
					});
				}
				if (debuff === 2) {
					handlers.text({
						sub_type: "message",
						message_ES: "ENTRAR",
						message_RU: "К НЕМУ"
					});
				}
				break;
				
			case 3220: // blue inside
				if (debuff === 1) {
					handlers.text({
						sub_type: "message",
						message_ES: "ENTRAR",
						message_RU: "К НЕМУ"
					});
				}
				if (debuff === 2) {
					handlers.text({
						sub_type: "message",
						message_ES: "SALIR",
						message_RU: "ОТ НЕГО"
					});
				}
				break;

			case 30231000: // red debuff
				debuff = 1;

				dispatch.clearTimeout(timer1);
				dispatch.clearTimeout(timer2);

				timer1 = dispatch.setTimeout(() => debuff = 0, 70000);
				break;

			case 30231001: // blue debuff
				debuff = 2;

				dispatch.clearTimeout(timer2);
				dispatch.clearTimeout(timer1);

				timer2 = dispatch.setTimeout(() => debuff = 0, 70000);
				break;

			case 99020020: // debuff removed
				debuff = 0;

				dispatch.clearTimeout(timer1);
				dispatch.clearTimeout(timer2);
				break;
		}
	}

	function firstboss_start_event() {
		debuff = 0;
	}

	return {
		// 1 BOSS
		"nd-3023-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"ns-3023-1000": [{ type: "func", func: firstboss_start_event }],
		"s-3023-1000-104-0": [{ type: "text", sub_type: "message", message_ES: "Salto Stun", message_RU: "Прыжок + Стан" }],
		"s-3023-1000-105-0": [{ type: "text", sub_type: "message", message_ES: "CUIDADO", message_RU: "Поворот назад" }],
		"s-3023-1000-110-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente Stun", message_RU: "Передний стан" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 175, 10, 270, 0, 3000] } // Alterado 260>270
		],
		"s-3023-1000-111-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "heal" },
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "dps" },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }
		],
		"s-3023-1000-112-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "heal" },
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "dps" },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }
		],
		"s-3023-1000-113-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "heal" },
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "dps" },
			{ type: "func", func: firstboss_debuff_event, args: [1113] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }
		],
		"s-3023-1000-114-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Правая полоса", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "heal" },
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Правая полоса", class_position: "dps" },
			{ type: "func", func: firstboss_debuff_event, args: [1114] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }
		],
		"s-3023-1000-115-0": [
			{ type: "text", sub_type: "message", message_ES: "Semi-circulo Trasero", message_RU: "Удар назад" },
			{ type: "spawn", func: "semicircle", args: [90, 280, 553, 0, 0, 15, 160, 100, 2000] }, //alterado 270>280  | 20>15
			{ type: "spawn", func: "semicircle", args: [90, 275, 553, 0, 0, 10, 220, 100, 2000] }, //alterado 280>275  | 12>10
			{ type: "spawn", func: "semicircle", args: [90, 270, 553, 0, 0, 10, 340, 100, 2000] }, //alterado 300>340  | 270>285
		    { type: "spawn", func: "vector", args: [553, 90, 150, 90, 150, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 150, 270, 150, 0, 2000] }  //Adicionado
		],
		"s-3023-1000-116-0": [
			{ type: "text", sub_type: "message", message_ES: "Explosion", message_RU: "Кайа", class_position: "dps" },
			{ type: "text", sub_type: "message", message_ES: "Explosion", message_RU: "Кайа", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Kaia's Shield", message_RU: "Кайа", class_position: "priest" },
			{ type: "text", sub_type: "message", message_ES: "Thrall of Protection", message_RU: "Кайа", class_position: "mystic" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 0, 4000] }
		],
		"am-3023-1000-30231000": [{ type: "func", func: firstboss_debuff_event, args: [30231000] }],
		"am-3023-1000-30231001": [{ type: "func", func: firstboss_debuff_event, args: [30231001] }],
		"ae-0-0-99020020": [{ type: "func", func: firstboss_debuff_event, args: [99020020] }], // Debuff removed
		"ae-0-0-30231000": [{ type: "func", func: firstboss_debuff_event, args: [30231000] }], // Red debuff
		"ae-0-0-30231001": [{ type: "func", func: firstboss_debuff_event, args: [30231001] }], // Blue debuff
		"s-3023-1000-3107-0": [
			{ type: "text", sub_type: "message", message_ES: "Ola a Frente", message_RU: "Конус вперед" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 10, 1000, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 350, 1000, 0, 2500] }
		],
		"s-3023-1000-3115-0": [
			{ type: "text", sub_type: "message", message_ES: "Ataque Rotativo", message_RU: "Крутилка" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 335, 0, 3500] } // Alterado 320>335 abrir
		],
		"s-3023-1000-3116-0": [
			{ type: "text", sub_type: "message", message_ES: "Circulos + Ataque Rotativo", message_RU: "Круги + Крутилка" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 335, 0, 5000] } // Alterado 320>335 abrir
		],
		"s-3023-1000-3119-0": [
			{ type: "func", func: firstboss_debuff_event, args: [3119] }
//			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 270, 0, 4000] },
//			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 575, 0, 4000] }
		],
		"s-3023-1000-3220-0": [
			{ type: "func", func: firstboss_debuff_event, args: [3220] }
//			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 270, 0, 4000] },
//			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 575, 0, 4000] }
		],

		// 2 BOSS
		"nd-3023-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3023-2000-164-0": [{ type: "text", sub_type: "message", message_ES: "Ataque de sangramiento", message_RU: "Отпрыжка (Кровоток)" }],
		"s-3023-2000-166-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Atras (dar vueltas)", message_RU: "Оборот назад" }],
		"s-3023-2000-175-0": [
			{ type: "text", sub_type: "message", message_ES: "Rugido (Stun)", message_RU: "Рёв" },
			{ type: "text", sub_type: "message", delay: 1500, message_ES: "Iframe", message_RU: "Эвейд" }
		],
		"s-3023-2000-178-0": [{ type: "text", sub_type: "message", message_ES: "Garras a Frente", message_RU: "Крутилка (Кровоток)" }],
		"s-3023-2000-181-0": [
			{ type: "text", sub_type: "message", message_ES: "Rocks", message_RU: "Полоса вперед" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 10, 1000, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 350, 1000, 0, 3000] }
		],
		"s-3023-2000-182-0": [{ type: "text", sub_type: "message", message_ES: "Tumbar  (Pisar)", message_RU: "Опрокид" }],
		"s-3023-2000-185-0": [
			{ type: "text", sub_type: "message", message_ES: "Explosion", message_RU: "Кайа", class_position: "dps" },
			{ type: "text", sub_type: "message", message_ES: "Explosion", message_RU: "Кайа", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Kaia's Shield", message_RU: "Кайа", class_position: "priest" },
			{ type: "text", sub_type: "message", message_ES: "Thrall of Protection", message_RU: "Кайа", class_position: "mystic" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 500, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 750, 0, 4000] }
		],
		"s-3023-2000-202-0": [
			{ type: "text", sub_type: "message", message_ES: "Salto Atras | Ataque", message_RU: "Назад + Вперед" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 180, 500, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 180, 500, 0, 3000] }
		],
		"s-3023-2000-207-0": [{ type: "text", sub_type: "message", message_ES: "Fantasma x5 (Sangramiento)", message_RU: "Прыжки x5 (Кровоток)" }],
		"s-3023-2000-212-0": [{ type: "text", sub_type: "message", message_ES: "Flash Sangramiento (Bait)", message_RU: "Байт (Кровоток)" }]
	};
};