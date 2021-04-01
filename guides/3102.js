// Draakon Arena (Normal)
//
// made by Kuroine / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;
	return {
		"nd-3102-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Ress bait / range check
		"s-3102-1000-1107-0": [{ type: "text", sub_type: "message", message_ES: "Lanza Spectral", message_RU: "Спектральный бросок (байт)" },
			{ type: "text", sub_type: "message", delay: 1400, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-2107-0": [{ type: "text", sub_type: "message", message_ES: "Lanza Spectral", message_RU: "Спектральный бросок (байт)" },
			{ type: "text", sub_type: "message", delay: 1400, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		// Basic attacks
		"s-3102-1000-1103-0": [{ type: "text", sub_type: "message", message_ES: "2 Hits | Sangrar", message_RU: "2 удара | Кровоток" }],
		"s-3102-1000-2103-0": [{ type: "text", sub_type: "message", message_ES: "2 Hits | Sangrar", message_RU: "2 удара | Кровоток" }],
		"s-3102-1000-1113-0": [{ type: "text", sub_type: "message", message_ES: "4 Hits Combo", message_RU: "4 удара комба" }],
		"s-3102-1000-2113-0": [{ type: "text", sub_type: "message", message_ES: "4 Hits Combo", message_RU: "4 удара комба" }],
		"s-3102-1000-1105-0": [{ type: "text", sub_type: "message", message_ES: "Gancho | Stun", message_RU: "Удар снизу | Стан" }],
		"s-3102-1000-2105-0": [{ type: "text", sub_type: "message", message_ES: "Gancho | Stun", message_RU: "Удар снизу | Стан" }],
		"s-3102-1000-1106-0": [{ type: "text", sub_type: "message", message_ES: "Stun", message_RU: "Стан" }],
		"s-3102-1000-2106-0": [{ type: "text", sub_type: "message", message_ES: "Stun", message_RU: "Стан" }],
		// 120 > 114
		"s-3102-1000-1120-0": [
			{ type: "text", sub_type: "message", delay: 400, message_ES: "Stun", message_RU: "Несколько ударов | Стан (AOE)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 8, 425, 100, 3000] }
		],
		"s-3102-1000-2120-0": [
			{ type: "text", sub_type: "message", delay: 400, message_ES: "Stun", message_RU: "Несколько ударов | Стан (AOE)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 8, 425, 100, 3000] }
		],
		"s-3102-1000-1114-0": [
			{ type: "text", sub_type: "message", delay: 140, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-2114-0": [
			{ type: "text", sub_type: "message", delay: 230, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-1111-0": [{ type: "text", sub_type: "message", message_ES: "Salto (Stun)", message_RU: "Прыжок (стан)" },
			{ type: "text", sub_type: "message", delay: 1800, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-2111-0": [{ type: "text", sub_type: "message", message_ES: "Salto (Stun)", message_RU: "Прыжок (стан)" },
			{ type: "text", sub_type: "message", delay: 1800, message_ES: "Iframe!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-1115-0": [
			{ type: "text", sub_type: "message", message_ES: "AOE Bombas (Juntar)", message_RU: "AOE бомбы (вместе)" }
		],
		"s-3102-1000-2115-0": [
			{ type: "text", sub_type: "message", message_ES: "AOE Bombas (Juntar)", message_RU: "AOE бомбы (вместе)" }
		],		
		"s-3102-1000-1112-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente | Atras Patada", message_RU: "Разворот | Откид назад" },
			{ type: "spawn", func: "vector", args: [553, 70, 110, 160, 350, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 290, 110, -160, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 360, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 190, 343, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 360, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 170, 343, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 180, 340, 0, 3000] }
		],
		"s-3102-1000-2112-0": [
			{ type: "text", sub_type: "message", message_ES: "Frente | Atras Patada", message_RU: "Разворот | Откид назад" },
			{ type: "spawn", func: "vector", args: [553, 70, 110, 160, 350, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 290, 110, -160, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 360, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 190, 343, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 360, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 350, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 170, 343, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 180, 340, 0, 3000] }
		],
		"s-3102-1000-1110-0": [
			{ type: "text", sub_type: "message", message_ES: "Ola DENTRO", message_RU: "Бублики + Волна" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 650, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 4000] }
		],
		"s-3102-1000-2110-0": [
			{ type: "text", sub_type: "message", message_ES: "Ola DENTRO", message_RU: "Бублики + Волна" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 650, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 4000] }
		],
		"s-3102-1000-1109-0": [
			{ type: "text", sub_type: "message", message_ES: "Tumbar + Girar", message_RU: "Опрокид + Крутилка" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 100, 8, 420, 0, 1000] },
			{ type: "spawn", func: "circle", delay: 1000, args: [true, 553, 180, 0, 8, 415, 0, 3000] }
		],
		"s-3102-1000-2109-0": [
			{ type: "text", sub_type: "message", message_ES: "Tumbar + Girar", message_RU: "Опрокид + Крутилка" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 100, 8, 420, 0, 1000] },
			{ type: "spawn", func: "circle", delay: 1000, args: [true, 553, 180, 0, 8, 415, 0, 3000] }
		],
		"s-3102-1000-1304-0": [{ type: "text", sub_type: "message", message_ES: "ESCUDO!", message_RU: "ЩИТ!" }],
		"s-3102-1000-2304-0": [{ type: "text", sub_type: "message", message_ES: "ESCUDO!", message_RU: "ЩИТ!" }],
		"ab-3102-1000-31021006": [
			{ type: "text", sub_type: "message", message_ES: "Plague of Exhaustion", message_RU: "Чума/регресс", class_position: "priest" },
			{ type: "text", sub_type: "message", message_ES: "Regression", message_RU: "Чума/регресс", class_position: "mystic" }
		],	

		// Right Foot
		"s-3102-1000-1121-0": [
			{ type: "text", sub_type: "message", message_ES: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 60, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 240, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1700, message_ES: "Esquiva!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-2121-0": [
			{ type: "text", sub_type: "message", message_ES: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 60, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 240, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1800, message_ES: "Esquiva!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-1122-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 2000, true, null] }],
		"s-3102-1000-1123-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 553, 0, 0, 6, 550, 0, 2000] }
		],
		"s-3102-1000-2122-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 2000, true, null] }],
		"s-3102-1000-2123-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 553, 0, 0, 6, 550, 0, 2000] }
		],
		// Left Foot
		"s-3102-1000-1124-0": [
			{ type: "text", sub_type: "message", message_ES: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 60, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 240, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1550, message_ES: "Esquiva!", message_RU: "Эвейд!" }
		],
		"s-3102-1000-2124-0": [
			{ type: "text", sub_type: "message", message_ES: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 60, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 240, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1550, message_ES: "Esquiva!", message_RU: "Эвейд!" }
		],		
		"s-3102-1000-1125-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 3000, true, null] }],
		"s-3102-1000-1126-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 553, 0, 0, 6, 550, 0, 2000] }
		],	
		"s-3102-1000-2125-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 3000, true, null] }],
		"s-3102-1000-2126-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 553, 0, 0, 6, 550, 0, 2000] }
		]
	};
};