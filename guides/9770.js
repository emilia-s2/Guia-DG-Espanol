// Ruinous Manor (Normal)
// made by WIP/Emilia-s2/HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	let boss = null;
	return {
	// 1 BOSS
		"nd-770-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-770-1000-1206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atrás", message_RU: "nao sei russo :c desculpa" }],
		"s-770-1000-2206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atrás", message_RU: "nao sei russo :c desculpa" }],
		"s-770-1000-1106-0": [{ type: "text", sub_type: "message", message_ES: "Salto Frente Stun (Iframe)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-1000-2106-0": [{ type: "text", sub_type: "message", message_ES: "Salto Frente Stun (Iframe)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-1000-1107-0": [{ type: "text", sub_type: "message", message_ES: "Frente Empujar", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "semicircle", args: [320, 404, 553, 0, 0, 7, 405, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, 406, 400, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, -406, 400, 0, 3500] }
		],
		"s-770-1000-2107-0": [{ type: "text", sub_type: "message", message_ES: "Frente Empujar", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "semicircle", args: [320, 404, 553, 0, 0, 7, 405, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, 406, 400, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, -406, 400, 0, 3500] }
		],
	
	// 2-3 BOSS
		"nd-770-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-770-3000-1102-0": [{ type: "text", sub_type: "message", message_ES: "Mano Izquierda", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-2102-0": [{ type: "text", sub_type: "message", message_ES: "Mano Izquierda", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1101-0": [{ type: "text", sub_type: "message", message_ES: "Mano Derecha", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-2101-0": [{ type: "text", sub_type: "message", message_ES: "Mano Derecha", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1103-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1103-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-2301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Salte para Frente)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-2110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Salte para Frente)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1304-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1303-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1113-0": [{ type: "text", sub_type: "message", message_ES: "SALIR | ENTRAR", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],
		"s-770-3000-2113-0": [{ type: "text", sub_type: "message", message_ES: "SALIR | ENTRAR", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],	
		 "s-770-3000-1116-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "circle", args: [false, 553,0, 0, 15, 300, 0, 5000] }
		],
		 "s-770-3000-2116-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "circle", args: [false, 553,0, 0, 15, 300, 0, 5000] }
		],	
		"s-770-3000-1318-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO!", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1317-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO!", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1319-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1322-0": [{ type: "text", sub_type: "message", message_ES:"Iframe los Estándares!", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1311-0": [{ type: "text", sub_type: "message", message_ES: "Juntar Para Cleanse, message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-1120-0": [{ type: "text", sub_type: "message", message_ES: "Cabeças Disparar", message_RU: "nao sei russo :c desculpa" }],
		"s-770-3000-2120-0": [{ type: "text", sub_type: "message", message_ES: "Cabeças Disparar", message_RU: "nao sei russo :c desculpa" }],
	};
};