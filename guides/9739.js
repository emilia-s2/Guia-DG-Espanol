// Red Refuge Normal
//
// made by multarix

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-739-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-739-1000-105-0": [{ type: "text", sub_type: "message", message: "Girar + Respiracao", message_RU: "Поворот + дыхание" }],
		"s-739-1000-308-0": [
			{ type: "text", sub_type: "message", message: "Entrar - Salir", message_RU: "К нему > От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 7500] }
		],
		"s-739-1000-308-1": [{ type: "text", sub_type: "message", message: "Salir", message_RU: "От него" }],
		"s-739-1000-112-0": [{ type: "text", sub_type: "message", message: "Spray Atras", message_RU: "Волна назад" }],
		"s-739-1000-107-0": [{ type: "text", sub_type: "message", message: "Salto", message_RU: "Прыжок" }],
		"s-739-1000-306-0": [
			{ type: "text", sub_type: "message", message: "Salir - Entrar", message_RU: "От него > К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 7500] }
		],
		"s-739-1000-306-1": [{ type: "text", sub_type: "message", message: "Dentro", message_RU: "К нему" }],

		// 2 BOSS
		"nd-739-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-739-2000-105-0": [
			{ type: "text", sub_type: "message", message: "Giro (360)", message_RU: "360" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 2500] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 510, 0, 2500] }
		],
		"s-739-2000-113-0": [{ type: "text", sub_type: "message", message: "Stun", message_RU: "Стан" }],
		"s-739-2000-108-0": [{ type: "text", sub_type: "message", message: "Clense", message_RU: "Клинс", class_position: "heal" }],
		"s-739-2000-115-0": [
			{ type: "text", sub_type: "message", message: "Remolino", message_RU: "Вихрь" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 360, 0, 6500] }
		],
		"s-739-2000-119-0": [{ type: "text", sub_type: "message", message: "Spray a Frente", message_RU: "Спереди" }],
		"s-739-2000-120-0": [{ type: "text", sub_type: "message", message: "Disparo Atras", message_RU: "Сзади" }],
		"s-739-2000-303-0": [{ type: "text", sub_type: "message", message: "Latigo", message_RU: "Кнут" }],

		// 3 BOSS
//		"h-739-3001-30": [{ type: "text", sub_type: "message", message: "Reveal soon...", message_RU: "Скоро разоблачение..." }],
		"s-739-3000-201-0": [
		    { type: "text", sub_type: "message", message: "Rugido Fuerte (Stun)", message_RU: "Стан" },
		    { type: "text", sub_type: "message", delay: 3800, message: "Iframe", message_RU: "Эвейд!" }  
		],	
		"s-739-3000-107-0": [{ type: "text", sub_type: "message", message: "Muchos Hits (Garras)", message_RU: "Несколько ударов" }],
		"s-739-3000-115-0": [
			{ type: "text", sub_type: "message", message: "Rugido (Stun)", message_RU: "Стан" },
			{ type: "text", sub_type: "message", delay: 1800, message: "Iframe", message_RU: "Эвейд!" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 630, 0, 4000] }
		],
		"s-739-3000-118-0": [{ type: "text", sub_type: "message", message: "Rasguno", message_RU: "Крутилка" }],
		// Revealed Argog
		"s-739-3000-167-0": [{ type: "text", sub_type: "message", message: "Muchos Hits (Garras)", message_RU: "Несколько ударов" }],
		"s-739-3000-175-0": [
			{ type: "text", sub_type: "message", message: "Rugido (Stun)", message_RU: "Стан" },
			{ type: "text", sub_type: "message", delay: 1800, message: "Iframe", message_RU: "Эвейд!" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 630, 0, 4000] }
		],
		"s-739-3000-178-0": [{ type: "text", sub_type: "message", message: "Rasguno (Sangrar)", message_RU: "Крутилка (Кровоток)" }]
	};
};