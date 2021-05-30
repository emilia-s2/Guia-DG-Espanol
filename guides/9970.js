// Ruinous Manor (Dificil)
// made by WIP/Emilia-s2/HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	return {
		// 3 BOSS

		"nd-970-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// 3 BOSS

		"s-970-3000-1102-0": [{ type: "text", sub_type: "message", message_ES: "Mano Izquierda", message_RU: "Левая рука" }],
		"s-970-3000-2102-0": [{ type: "text", sub_type: "message", message_ES: "Mano Izquierda", message_RU: "Левая рука" }],
		"s-970-3000-1101-0": [{ type: "text", sub_type: "message", message_ES: "Mano Derecha", message_RU: "Правая рука" }],
		"s-970-3000-2101-0": [{ type: "text", sub_type: "message", message_ES: "Mano Derecha", message_RU: "Правая рука" }],
		"s-970-3000-1103-0": [{ type: "text", sub_type: "message", message_ES: "Coletazo Atrás", message_RU: "Хвост" },
			{ type: "spawn", func: "vector", args: [553, 283, 127, 180, 500, 0, 1400] },
			{ type: "spawn", func: "vector", args: [553, 77, 127, 180, 500, 0, 1400] },
			{ type: "spawn", func: "vector", args: [553, 165, 488, 270, 200, 0, 1400] }
		],
		"s-970-3000-2103-0": [{ type: "text", sub_type: "message", message_ES: "Coletazo Atrás ", message_RU: "Хвост" },
			{ type: "spawn", func: "vector", args: [553, 283, 127, 180, 500, 0, 1400] },
			{ type: "spawn", func: "vector", args: [553, 77, 127, 180, 500, 0, 1400] },
			{ type: "spawn", func: "vector", args: [553, 165, 488, 270, 200, 0, 1400] }
		],
		"s-970-3000-1301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "Круги" }],
		"s-970-3000-2301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "Круги" }],
		"s-970-3000-1106-0": [{ type: "text", sub_type: "message", message_ES: "Empuje Frontal", message_RU: "Передний удар" }],
		"s-970-3000-2106-0": [{ type: "text", sub_type: "message", message_ES: "Empuje Frontal", message_RU: "Передний удар" }],
		"s-970-3000-1110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Frente Seguro)", message_RU: "Хвост АОЕ (прыгать вперед)" },
			{ type: "spawn", func: "semicircle", args: [26, 340, 553, 0, 0, 7, 630, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 4, 40, 338, 600, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, -4, 40, -338, 600, 0, 3000] }
		],	
		"s-970-3000-2110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Frente Seguro)", message_RU: "Хвост АОЕ (прыгать вперед)" },
			{ type: "spawn", func: "semicircle", args: [26, 340, 553, 0, 0, 7, 630, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 4, 40, 338, 600, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, -4, 40, -338, 600, 0, 3000] }
		],	
		"s-970-3000-1304-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (Dentro y Fuera)", message_RU: "Готовность!" }],
		"s-970-3000-1303-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (Dentro y Fuera)", message_RU: "Готовность!" }],
		"s-970-3000-1113-0": [
			{ type: "text", sub_type: "alert", message_ES: "SALIR", message_RU: "От него > К нему" },
			{ type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "От него > К нему", delay: 1300 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 14, 300, 0, 5000] }
		],		
		"s-970-3000-2113-0": [
			{ type: "text", sub_type: "alert", message_ES: "SALIR", message_RU: "От него > К нему" }, 
			{ type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "От него > К нему", delay: 1300 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 14, 300, 0, 5000] }
		],
		"s-970-3000-1116-0": [
			{ type: "text", sub_type: "alert", message_ES: "ENTRAR", message_RU: "К нему > От него" },
			{ type: "text", sub_type: "message", message_ES: " SALIR", message_RU: "К нему > От него", delay: 1300 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 14, 300, 0, 5000] }
		],		
		"s-970-3000-2116-0": [
			{ type: "text", sub_type: "alert", message_ES: "ENTRAR", message_RU: "К нему > От него" }, 
			{ type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "К нему > От него", delay: 1300 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 14, 300, 0, 5000] }
		],
		"s-970-3000-1108-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "Cola Golpe" },
			{ type: "spawn", func: "circle", args: [false, 553, -7, 280, 20, 155, 0, 2000] }
		],
		"s-970-3000-2108-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "Cola Golpe" },
			{ type: "spawn", func: "circle", args: [false, 553, -7, 280, 20, 155, 0, 2000] }
		],
		"s-970-3000-1318-0": [{ type: "text", sub_type: "message", message_ES: "Cráneos Rojos!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1317-0": [{ type: "text", sub_type: "message", message_ES: "Cráneos Rojos!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1319-0": [{ type: "text", sub_type: "message", message_ES: "Cráneos Rojos!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1322-0": [{ type: "text", sub_type: "message", message_ES: "Esquiva los PATTERNS!", message_RU: "Эвейд!" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 14, 230, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 12, 430, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 630, 0, 5000] }
		],
		"s-970-3000-1311-0": [{ type: "text", sub_type: "message", message_ES: "Juntar para Cleanse", message_RU: "Очищение" }],
		"s-970-3000-1120-0": [{ type: "text", sub_type: "message", message_ES: "Cabezas Laser (Triple)", message_RU: "nao sei russo :c desculpa" }],
		"s-970-3000-2120-0": [{ type: "text", sub_type: "message", message_ES: "Cabezas Laser (Triple)", message_RU: "nao sei russo :c desculpa" }],
		"s-970-3000-1121-0": [{ type: "text", sub_type: "message", message_ES: "Cabezas Laser (Doble)", message_RU: "Double shooting skulls" }],
		"s-970-3000-2121-0": [{ type: "text", sub_type: "message", message_ES: "Cabezas Laser (Doble)", message_RU: "Double shooting skulls" }]
	};
};