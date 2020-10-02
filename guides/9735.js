// RK-9 Kennel Normal
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-735-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-1000-111-0": [{ type: "text", sub_type: "message", message: "Stun Frontal", message_RU: "Удар назад + вперед" }],
		"s-735-1000-112-0": [{ type: "text", sub_type: "message", message: "Ataque Atras", message_RU: "Удар назад" }],
		"s-735-1000-304-0": [{ type: "text", sub_type: "message", message: "SALIR", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 350, 100, 4000] } // Adicionado
		],
		"s-735-1000-305-0": [{ type: "text", sub_type: "message", message: "ENTRAR", message_RU: "К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 4000] } // Adicionado
		],
		"s-735-1000-306-0": [{ type: "text", sub_type: "message", message: "Bombs", message_RU: "Бомбы" }],
		"s-735-1000-307-0": [{ type: "text", sub_type: "message", message: "Jalar", message_RU: "Стяжка" }],
		"s-735-1000-309-0": [{ type: "text", sub_type: "message", message: "Misiles Iniciados!!", message_RU: "Запуск 4 ракет" },
			{ type: "text", sub_type: "message", delay: 12000, message: "Disparar Misiles", message_RU: "Эвейд" } // Adicionado
		],

		// 2 BOSS
		"nd-735-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-2000-102-0": [
			{ type: "text", sub_type: "message", message: "Frente Ataque", message_RU: "Пила (Эвейд)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 300, 12, 228, 0, 3000] }
		],
		"s-735-2000-105-0": [
			{ type: "text", sub_type: "message", message: "Girar (Repeler)", message_RU: "Крутилка (откид)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 278, 0, 4000] }
		],
		"s-735-2000-108-0": [
			{ type: "text", sub_type: "message", message: "Atras (Repeler)", message_RU: "Откид назад" },
			{ type: "spawn", func: "semicircle", args: [120, 245, 553, 0, 0, 10, 385, 0, 2000] },  // Adicionado 
			{ type: "spawn", func: "vector", args: [553, 0, 0, 240, 380, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 120, 380, 0, 2000] }
		],
		"s-735-2000-301-0": [{ type: "text", sub_type: "message", message: "Jugar (Bombs)", message_RU: "Бомба" },
		    { type: "spawn", func: "circle", args: [false, 553, 0, 0, 12, 200, 100, 6000] } // Adicionado
		],	
		"s-735-2000-304-0": [
			{ type: "text", sub_type: "message", message: "SALIR (Explosion)", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 400, 0, 4000] }
		],
		"s-735-2007-201-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],
		"s-735-2007-306-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],
		"s-735-2007-307-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],

		// 3 BOSS
		"nd-735-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-3000-116-0": [{ type: "text", sub_type: "message", message: "S-DERECHA Seguro", message_RU: "Справа сейф" },
			{ type: "spawn", func: "point", args: [553, 120, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 130, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 140, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 170, 210, 180, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 300, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 310, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 320, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 330, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 340, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 350, 210, 0, 290, 0, 3000] }
		],
		"s-735-3000-117-0": [{ type: "text", sub_type: "message", message: "S-IZQUIERDA Seguro", message_RU: "Слева сейф" },
			{ type: "spawn", func: "vector", args: [553, 10, 210, 0, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 20, 210, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 30, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 40, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 50, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 60, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 240, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 230, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 220, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 190, 210, 180, 290, 0, 3000] }
		],
		"s-735-3000-118-0": [{ type: "text", sub_type: "message", message: "S-IZQUIERDA Seguro", message_RU: "Слева сейф" },
			{ type: "spawn", func: "vector", args: [553, 10, 210, 0, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 20, 210, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 30, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 40, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 50, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 60, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 240, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 230, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 220, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 190, 210, 180, 290, 0, 3000] }
		],
		"s-735-3000-119-0": [{ type: "text", sub_type: "message", message: "S-DERECHA Seguro", message_RU: "Справа сейф" },
			{ type: "spawn", func: "point", args: [553, 120, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 130, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 140, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 170, 210, 180, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 300, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 310, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 320, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 330, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 340, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 350, 210, 0, 290, 0, 3000] }
		],
		"s-735-3000-128-0": [
			{ type: "text", sub_type: "message", message: "Atras Puno Esxplosivo", message_RU: "Комба | Конус назад" },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 120, 900, 2000, 3000] },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 240, 900, 2000, 3000] }
		],
		"s-735-3000-129-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Esquiva", message_RU: "Эвейд" }],
	    "s-735-3000-321-0": [
			{ type: "text", sub_type: "message", message: "ESCUDO!", message_RU: "Щит!" },
			{ type: "text", sub_type: "message", delay: 105000, message: "ESCUDO en 10 secundos!", message_RU: "Через 10 сек. Щит!" }
		],
		"s-735-3000-305-0": [{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 300, 0, 7000] }],
		"s-735-3000-324-0": [
			{ type: "text", sub_type: "message", message: "SALIR", message_RU: "ОТ НЕГО" },
		    { type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 285, 0, 3000] }
		],	
		"s-735-3000-325-0": [
			{ type: "text", sub_type: "message", message: "ENTRAR", message_RU: "К НЕМУ" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 285, 0, 3000] }
		]
	};
};