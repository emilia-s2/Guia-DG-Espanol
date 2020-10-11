// Guardian Balder's Refuge
//
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-620-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-620-1000-107-0": [{ type: "text", sub_type: "message", message: "Ataque (Atras)", message_RU: "no se russo :c sorry" }],
		"s-620-1000-115-0": [{ type: "text", sub_type: "message", message: "Bolas de Fuego", message_RU: "no se russo :c sorry" }],
		"s-620-1000-127-0": [{ type: "text", sub_type: "message", message: "Salto Atras", message_RU: "no se russo :c sorry" },
			{ type: "spawn", func: "circle", args: [false, 553, 180, 376, 12, 232, 0, 5000] }
		],	
		"s-620-1000-120-0": [{ type: "text", sub_type: "message", message: "Ola de Fuego", message_RU: "no se russo :c sorry" }],
		"s-620-1000-121-0": [{ type: "text", sub_type: "message", message: "Repeler (iframe)", message_RU: "no se russo :c sorry" }],
		"s-620-1000-119-0": [{ type: "text", sub_type: "message", message: "Explosion | Entrar", message_RU: "no se russo :c sorry" },
		    { type: "spawn", func: "circle", args: [false, 553, 0, 8, 14, 216, 100, 6000] }  
		],
		"s-620-1000-108-0": [{ type: "text", sub_type: "message", message: "Ataque (Atras)", message_RU: "no se russo :c sorry" }],
		"s-620-1000-103-0": [{ type: "text", sub_type: "message", message: "Stun Frontal", message_RU: "no se russo :c sorry" }],
		"s-620-1000-209-0": [{ type: "text", sub_type: "message", message: "Regresar al Medio + Bolas de Fuego", message_RU: "no se russo :c sorry" }],
		"s-620-1000-125-0": [{ type: "text", sub_type: "message", message: "Bolas de Fuego", message_RU: "Поворот + дыхание" }],
		
		"s-620-1001-303-0": [{ type: "text", sub_type: "message", message: "AOE", message_RU: "no se russo :c sorry" }],
		"s-620-1002-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1003-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1004-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1005-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		
		"s-620-1000-129-0": [{ type: "text", sub_type: "message", message: "Bolas de Fuego", message_RU: "no se russo :c sorry" }],
		"s-620-1000-106-0": [{ type: "text", sub_type: "message", message: "Salto Aleatorio", message_RU: "no se russo :c sorry" }],

	};
};