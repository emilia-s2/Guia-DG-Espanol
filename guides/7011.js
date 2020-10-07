// Guardian Blightwood
//
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-7011-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-622-1000-206-0": [{ type: "text", sub_type: "message", message: "Salto Atras", message_RU: "no se russo :c sorry" }],
		"s-622-1000-108-1": [{ type: "text", sub_type: "message", message: "Salto a Frente", message_RU: "no se russo :c sorry" }],
		"s-622-1000-120-0": [
		    { type: "text", sub_type: "message", message: "Mano Derecha", message_RU: "no se russo :c sorry", class_position: "tank"},
			{ type: "text", sub_type: "message", message: "Mano Izquierda", message_RU: "no se russo :c sorry", class_position: "heal"},
			{ type: "text", sub_type: "message", message: "Mano Izquierda", message_RU: "no se russo :c sorry", class_position: "dps"}
        ],
		"s-622-1000-119-0": [
		    { type: "text", sub_type: "message", message: "Mano Izquierda", message_RU: "no se russo :c sorry", class_position: "tank"},
		    { type: "text", sub_type: "message", message: "Mano Derecha", message_RU: "no se russo :c sorry", class_position: "heal"},
		    { type: "text", sub_type: "message", message: "Mano Derecha", message_RU: "no se russo :c sorry", class_position: "dps"}
		],
		"s-622-1000-107-0": [{ type: "text", sub_type: "message", message: "Stun Frontal", message_RU: "no se russo :c sorry" },
		    { type: "spawn", func: "semicircle", args: [320, 404, 553, 0, 0, 7, 405, 0, 3500] },   //  85
			{ type: "spawn", func: "vector", args: [553, 0, 10, 406, 400, 0, 3500] },    //  380
			{ type: "spawn", func: "vector", args: [553, 0, 10, -406, 400, 0, 3500] }   //   380
		],
		"s-622-1000-124-0": [{ type: "text", sub_type: "message", message: "3 Bolas Frente Stun (Horizontal)", message_RU: "no se russo :c sorry" }],
		"s-622-1000-123-0": [{ type: "text", sub_type: "message", message: "3 Bolas Frente Stun (Vertical)", message_RU: "no se russo :c sorry" }],
        "s-622-1000-117-0": [{ type: "text", sub_type: "message", message: "Patadas (Aplastar)", message_RU: "no se russo :c sorry" }],
		"am-622-1000-622001": [{ type: "text", sub_type: "message", message: "Bolas en Todos (Stun)", message_RU: "no se russo :c sorry" }],
		"qb-622-1000-622004": [{ type: "text", sub_type: "message", message: "Olas Explosivas", message_RU: "no se russo :c sorry" },
        ]
	};
};