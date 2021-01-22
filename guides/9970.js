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
		"s-970-3000-1103-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "Хвост" }],
		"s-970-3000-2103-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "Хвост" }],
		"s-970-3000-1301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "Круги" }],
		"s-970-3000-2110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Salte para Frente)", message_RU: "Хвост АОЕ (прыгать вперед)" }],
		"s-970-3000-1110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Salte para Frente)", message_RU: "Хвост АОЕ (прыгать вперед)" }],
		"s-970-3000-1304-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "Готовность!" }],
		"s-970-3000-1303-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "Готовность!" }],
		"s-970-3000-2113-0": [{ type: "text", sub_type: "message", message_ES: "SALIR | ENTRAR", message_RU: "От него > К нему" },
	        	{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],		
		"s-970-3000-1113-0": [{ type: "text", sub_type: "message", message_ES: "SALIR | ENTRAR", message_RU: "От него > К нему" }, 
		        { type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
        ],
		"s-970-3000-2116-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "К нему > От него" },
		        { type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],		
		"s-970-3000-1116-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "К нему > От него" }, 
		        { type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],		
		"s-970-3000-1318-0": [{ type: "text", sub_type: "message", message_ES: "Obtener Cráneo Rojo!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1317-0": [{ type: "text", sub_type: "message", message_ES: "Obtener Cráneo Rojo!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1319-0": [{ type: "text", sub_type: "message", message_ES: "Obtener Cráneo Rojo!", message_RU: "Взять красную голову!" }],
		"s-970-3000-1322-0": [{ type: "text", sub_type: "message", message_ES: "Iframe los Estándares!", message_RU: "Эвейд!" }],
		"s-970-3000-1311-0": [{ type: "text", sub_type: "message", message_ES: "Juntar para Cleanse", message_RU: "Очищение" }]
		"qb-770-3000-970023": [{ type: "text", sub_type: "message", message_ES: "Cabezas", message_RU: "nao sei russo :c desculpa" }]
	};
};