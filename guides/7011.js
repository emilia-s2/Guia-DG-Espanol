// Guardian Blightwood
//
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-622-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-622-1000-206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atras", message_RU: "no se russo :c sorry" }],
		"s-622-1000-108-1": [{ type: "text", sub_type: "message", message_ES: "Salto a Frente", message_RU: "no se russo :c sorry" }],
		"s-622-1000-120-0": [
		    { type: "text", sub_type: "message", message_ES: "Mano Derecha (Ataque)", message_RU: "no se russo :c sorry", class_position: "tank" },
			{ type: "text", sub_type: "message", message_ES: "Mano Izquierda (Ataque)", message_RU: "no se russo :c sorry", class_position: "heal" },
			{ type: "text", sub_type: "message", message_ES: "Mano Izquierda (Ataque)", message_RU: "no se russo :c sorry", class_position: "dps" }
        ],
		"s-622-1000-119-0": [
		    { type: "text", sub_type: "message", message_ES: "Mano Izquierda (Ataque)", message_RU: "no se russo :c sorry", class_position: "tank" },
		    { type: "text", sub_type: "message", message_ES: "Mano Derecha (Ataque)", message_RU: "no se russo :c sorry", class_position: "heal" },
		    { type: "text", sub_type: "message", message_ES: "Mano Derecha (Ataque)", message_RU: "no se russo :c sorry", class_position: "dps" }
		],
		"s-622-1000-107-0": [{ type: "text", sub_type: "message", message_ES: "Stun Frontal", message_RU: "no se russo :c sorry" },
		    { type: "spawn", func: "semicircle", args: [320, 404, 553, 0, 0, 7, 405, 0, 3500] },   //  85
			{ type: "spawn", func: "vector", args: [553, 0, 10, 406, 400, 0, 3500] },    //  380
			{ type: "spawn", func: "vector", args: [553, 0, 10, -406, 400, 0, 3500] }   //   380
		],
		"s-622-1000-124-0": [{ type: "text", sub_type: "message", message_ES: "3 Circulos Stun (Horizontal)", message_RU: "no se russo :c sorry" }],
		"s-622-1000-123-0": [{ type: "text", sub_type: "message", message_ES: "3 Circulos Stun (Vertical)", message_RU: "no se russo :c sorry" }],
        "s-622-1000-117-0": [{ type: "text", sub_type: "message", message_ES: "Patadas (Aplastar)", message_RU: "no se russo :c sorry" }],
		"am-622-1000-622001": [{ type: "text", sub_type: "message", message_ES: "Circulos en Todos (Stun)", message_RU: "no se russo :c sorry" }],
		"qb-622-1000-622004": [{ type: "text", sub_type: "message", message_ES: "Olas Explosivas", message_RU: "no se russo :c sorry" }]
	};
};