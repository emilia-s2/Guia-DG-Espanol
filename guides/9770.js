// Ruinous Manor (Normal)
// made by michengs/Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	let boss = null;
	return {
	// 1 BOSS
		"nd-770-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
	],
	    "s-770-1000-206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atrás", message_RU: "nao sei russo :c desculpa" }],
        "s-770-1000-106-0": [{ type: "text", sub_type: "message", message_ES: "Salto Frente Stun (Iframe)", message_RU: "nao sei russo :c desculpa" }],
        "s-770-1000-107-0": [{ type: "text", sub_type: "message", message_ES: "Frente Empujar", message_RU: "nao sei russo :c desculpa" },
			{ type: "spawn", func: "semicircle", args: [320, 404, 553, 0, 0, 7, 405, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, 406, 400, 0, 3500] },
			{ type: "spawn", func: "vector", args: [553, 0, 10, -406, 400, 0, 3500] }
	],
        //"s-770-1000-117-0": [{ type: "text", sub_type: "message", message_ES: "Esmagar Frente", message_RU: "nao sei russo :c desculpa" }],
	
	// 2-3 BOSS
			"nd-770-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
	],
	     "s-770-3000-102-0": [{ type: "text", sub_type: "message", message_ES: "Mano Izquierda", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-101-0": [{ type: "text", sub_type: "message", message_ES: "Mano Derecha", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-103-0": [{ type: "text", sub_type: "message", message_ES: "Cola Golpe", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-301-0": [{ type: "text", sub_type: "message", message_ES: "Círculos Explosivos", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-110-0": [{ type: "text", sub_type: "message", message_ES: "Cola AOE (Salte para Frente)", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-304-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-303-0": [{ type: "text", sub_type: "message", message_ES: "Prepararse! (para dentro y fuera)", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-113-0": [{ type: "text", sub_type: "message", message_ES: "SALIR | ENTRAR", message_RU: "nao sei russo :c desculpa" },
	        { type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
	],
	     "s-770-3000-116-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR | SALIR", message_RU: "nao sei russo :c desculpa" },
	        { type: "spawn", func: "circle", args: [false, 553,0, 0, 15, 300, 0, 5000] }
	],
	     "s-770-3000-318-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO!", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-317-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO!", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-319-0": [{ type: "text", sub_type: "message", message_ES: "OBTENER CRÁNEO ROJO", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-322-0": [{ type: "text", sub_type: "message", message_ES:"Iframe los Estándares!", message_RU: "nao sei russo :c desculpa" }],
	     "s-770-3000-311-0": [{ type: "text", sub_type: "message", message_ES: "Juntar Para Cleanse, message_RU: "nao sei russo :c desculpa" }],
	    "qb-770-3000-970023": [{ type: "text", sub_type: "message", message_ES: "Cabezas", message_RU: "nao sei russo :c desculpa" }]
	};
};