// Gossamer Vault (Normal)
// made by michengs/Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	let boss = null;

	return {
	// 1 BOSS

		"nd-3101-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3101-1000-104-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Stun Frontal", message_RU: "Стан!" }],
		"s-3101-1000-112-0": [{ type: "text", sub_type: "message", message_ES: "<-Spray IZQUIERDO y DERECHO->", message_RU: "Лево + Право" }],
		"s-3101-1000-139-0": [{ type: "text", sub_type: "message", message_ES: "Spray FRENTE e ATRAS", message_RU: "Вперед + Назад (фаст)" },
		    { type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }  //Adicionado
	    ],
		"s-3101-1000-124-0": [{ type: "text", class_position: "tank", sub_type: "message", message_ES: "Stun Frontal", message_RU: "Стан (фаст)" }],
		"s-3101-1000-127-0": [{ type: "text", class_position: "dps", sub_type: "message", message_ES: "Empujar Atrás (Rapido)", message_RU: "Полоса (фаст)" },
			{ type: "text", class_position: "heal", sub_type: "message", message_ES: "Empujar Atrás", message_RU: "Полоса (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 2000] } //Adicionado
		],
		"s-3101-1000-131-0": [{ type: "text", class_position: "dps", sub_type: "message", message_ES: "Spray Atrás", message_RU: "Волна назад (фаст)" },
			{ type: "text", class_position: "heal", sub_type: "message", message_ES: "Spray Atrás", message_RU: "Волна назад (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 2000] } //Adicionado
		],
		"s-3101-1000-132-0": [{ type: "text", sub_type: "message", message_ES: "<-Spray IZQUIERDO y DERECHO->", message_RU: "Лево + Право (фаст)" }],
		"s-3101-1000-133-0": [{ type: "text", sub_type: "message", delay: 0, message_ES: "Salto", message_RU: "Прыжок (фаст)" },
		    { type: "text", sub_type: "message", delay: 1400, message_ES: "Iframe", message_RU: "Iframe!" }
		],
		"s-3101-1000-138-0": [{ type: "text", sub_type: "message", delay: 0, message_ES: "Salto", message_RU: "Прыжок (фаст)" },
		    { type: "text", sub_type: "message", delay: 1400, message_ES: "Iframe", message_RU: "Iframe!" }
		],
		"s-3101-1000-148-0": [{ type: "text", sub_type: "message", message_ES: "Poder de la Mano DERECHA (volando)", message_RU: "Правая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 20, 150, 10, 320, 0, 4000] }  //Adicionado
		],		
		"s-3101-1000-149-0": [{ type: "text", sub_type: "message", message_ES: "Poder de la Mano IZQUIERDA (volando)", message_RU: "Левая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 340, 150, 10, 320, 0, 4000] }  //Adicionado
		],
		"s-3101-1000-151-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Stun", message_RU: "Стан!" }],
		"s-3101-1000-313-0": [
			{ type: "text", sub_type: "message", message_ES: "DENTRO y FUERA (Lento)", message_RU: "Кольцо" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],
		"s-3101-1000-314-0": [
			{ type: "text", sub_type: "message", message_ES: "DENTRO y FUERA (Rapido)", message_RU: "Кольцо (фаст)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],

	// 2 BOSS
	"nd-3101-2000": [
		    { type: "stop_timers" },
		    { type: "despawn_all" }
        ],
		"h-3101-2000-81": [{ type: "text", sub_type: "message", message_ES: "80%", message_RU: "Дебафф" }],
		"h-3101-2000-76": [{ type: "text", sub_type: "message", message_ES: "75%", message_RU: "Камни" }],
		"s-3101-2000-108-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Frente | Atrás", message_RU: "Откид назад!" }],
		"s-3101-2000-150-0": [{ type: "text", sub_type: "message", message_ES: "Fantasma", message_RU: "Фантом" }],
		"s-3101-2000-228-0": [
			{ type: "text", sub_type: "message", message_ES: "Juntar Time", message_RU: "Камни (вместе)!!!" },
		],
		"s-3101-2000-230-0": [{ type: "text", sub_type: "message", message_ES: "AOE", message_RU: "AOE!!" },
			{ type: "text", sub_type: "message", delay: 1300, message_ES: "Iframe", message_RU: "Iframe!" }
		],
		"s-3101-2000-231-0": [
			{ type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] }
		],
		"s-3101-2000-232-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 3, 1000, 0, 3000] }
		],
		"s-3101-2000-235-0": [{ type: "text", sub_type: "message", message_ES: "Debuffs", message_RU: "注视2人吃鉴定" }],
		"s-3101-2000-236-0": [{ type: "text", sub_type: "message", message_ES: "Repeler a Frente", message_RU: "Конус вперед (байт)" }]
    };
};