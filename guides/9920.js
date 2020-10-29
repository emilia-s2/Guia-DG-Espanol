// Antaroth's Abyss (Dificil)
//
// made by Yuyuko / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let counter = 0;
	let timer = null;

	function thirdboss_backattack_event() {
		dispatch.clearTimeout(timer);
		counter++;

		if (counter >= 2) {
			handlers.text({
				sub_type: "message",
				message_ES: "Ataque Atras",
				message_RU: "Задний"
			});
		}

		timer = dispatch.setTimeout(() => counter = 0, 3000);
	}

	let colour_to_use = null;

	const COLOURS_OFFSETS = {
		"red": 0,
		"yellow": 120,
		"blue": 240
	};

	function thirdboss_set_clockwise_event(clockwise, ent) {
		dispatch.setTimeout(() => {
			const colour_rotation = clockwise ? ["red", "yellow", "blue"] : ["blue", "yellow", "red"];

			for (let i = 0; i < 3; i++) {
				const current_colour = colour_rotation[(colour_rotation.indexOf(colour_to_use) + i) % 3];

				handlers.spawn({
					func: "marker",
					args: [false, COLOURS_OFFSETS[current_colour], 150, i * 2600, (i + 1) * 3000, true, null] 
				}, ent);
			}
			
			// eslint-disable-next-line no-param-reassign
			dispatch.setTimeout(()=> clockwise = null, 12000);
		}, 1000);
	}

	function thirdboss_change_colour_event(colour) {
		colour_to_use = colour;
	}

	const SPAWNING_FIRST_CIRCLE_FLOWERS = [
		{ type: "text", class_position: "tank", sub_type: "message", message_ES: "DERECHA | ENTRAR - SALIR (Donuts)", message_RU: "Вправо сейф > Волны внутрь" },
		{ type: "text", class_position: "dps", sub_type: "message", message_ES: "IZQUIERDA | ENTRAR - SALIR (Donuts)", message_RU: "Влево сейф > Волны внутрь" },
		{ type: "text", class_position: "heal", sub_type: "message", message_ES: "IZQUIERDA | ENTRAR - SALIR (Donuts)", message_RU: "Влево сейф > Волны внутрь" },
		{ type: "spawn", func: "marker", args: [false, 90, -250, 0, 2500, true, null] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 2500] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 143, 1500, 5000] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 293, 1500, 5000] }
	];

	const SPAWNING_SECOND_CIRCLE_FLOWERS = [
		{ type: "text", class_position: "tank", sub_type: "message", message_ES: "IZQUIERDA | SALIR - ENTRAR (Donuts)", message_RU: "Влево сейф > Волны наружу" },
		{ type: "text", class_position: "dps", sub_type: "message", message_ES: "DERECHA | SALIR - ENTRAR (Donuts)", message_RU: "Вправо сейф > Волны наружу" },
		{ type: "text", class_position: "heal", sub_type: "message", message_ES: "DERECHA | SALIR - ENTRAR (Donuts)", message_RU: "Вправо сейф > Волны наружу" },
		{ type: "spawn", func: "marker", args: [false, 270, -250, 0, 2500, true, null] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 2500] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 5000] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 5000] }
	];

	return {
		// 1 BOSS

		"nd-920-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Not enraged
		"s-920-1000-1117-0": [
		    { type: "text", sub_type: "message", message_ES: "Entrar | Salir", message_RU: "К нему > От него" },
			{ type: "spawn", func: "circle", args: [false, 913, 180, 340, 14, 210, 100, 4700] } //Adicionado
		],
		"s-920-1000-1116-0": [
		    { type: "text", sub_type: "message", message_ES: "Salir | Entrar", message_RU: "От него > К нему" },
			{ type: "spawn", func: "circle", args: [false, 913, 0, 0, 14, 210, 100, 3700] }     //Adicionado
		],
		"s-920-1000-1109-0": [{ type: "text", sub_type: "message", message_ES: "Escudo Atras (Izquierda)", message_RU: "Откид назад" }],
		"s-920-1000-1130-0": [{ type: "text", sub_type: "message", message_ES: "FULL | ENTRAR - SALIR", message_RU: "Общий > Внешний > Внутренний" }],

		// Enraged
		"s-920-1000-2117-0": [
		    { type: "text", sub_type: "message", message_ES: "Entrar | Salir", message_RU: "К нему > От него" },
		    { type: "spawn", func: "circle", args: [false, 913, 180, 340, 14, 210, 100, 4700] } //Adicionado
		],	
		"s-920-1000-2116-0": [
		   { type: "text", sub_type: "message", message_ES: "Salir | Entrar", message_RU: "От него > К нему" },
		   { type: "spawn", func: "circle", args: [false, 913, 0, 0, 14, 210, 100, 3700] }      //Adicionado
		],   
		"s-920-1000-2109-0": [{ type: "text", sub_type: "message", message_ES: "Escudo Atras (Izquierda)", message_RU: "Откид назад" }],
		"s-920-1000-2130-0": [{ type: "text", sub_type: "message", message_ES: "FULL | SALIR - ENTRAR", message_RU: "Общий > Внутренний > Внешний" }],
		
		// 1 BOSS, SPECIAL ATTACKS
		"s-920-1000-1300-0": [{ type: "text", sub_type: "message", delay: 400, message_ES: "Jugar al Alto (iframe)", message_RU: "Эвейд!" }],


		// 2 BOSS

		"nd-920-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-920-2000-50": [{ type: "text", sub_type: "message", message_ES: "50%", message_RU: "50%" }],
		"h-920-2000-20": [{ type: "text", sub_type: "message", message_ES: "20%", message_RU: "20%" }],

		"s-920-2000-1113-0": [
		    { type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "tank" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "heal" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "dps" },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },     //Adicionado
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }  //Adicionado
		],			
		"s-920-2000-1114-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "tank" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "heal" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "dps" },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }   //Adicionado
		],	

		"s-920-2000-1111-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "tank" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "heal" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "dps" },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },     //Adicionado
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }  //Adicionado
		],
		"s-920-2000-1112-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "tank" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "heal" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "dps" },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }   //Adicionado
		],	
		"s-920-2000-2113-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "tank" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "heal" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "dps" },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },     //Adicionado
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }  //Adicionado
		],	
		"s-920-2000-2114-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "tank" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "heal" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "dps" },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }   //Adicionado
		],
		"s-920-2000-2111-0": [
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "tank" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "heal" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "dps" },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },     //Adicionado
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }  //Adicionado
		],
		"s-920-2000-2112-0": [
			{ type: "text", sub_type: "message", message_ES: "Izquierda SLASH", message_RU: "Левая полоса", class_position: "tank" }, //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "heal" },  //Adicionado
			{ type: "text", sub_type: "message", message_ES: "Derecha SLASH", message_RU: "Левая полоса", class_position: "dps" },   //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },    //Adicionado
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }   //Adicionado
		],
		
		   //Bos 2 no Enraged
		
		"s-920-2000-1106-0": [{ type: "text", sub_type: "message", message_ES: "GIRO", message_RU: "Крутилка" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 335, 0, 3500] }
		],
		"s-920-2000-1105-0": [{ type: "text", sub_type: "message", message_ES: "!!", message_RU: "Удар назад" }],
		"s-920-2000-1104-0": [{ type: "text", sub_type: "message", message_ES: "Salto Aleatorio (stun)", message_RU: "Прыжок (стан)" }],
		"s-920-2000-1110-0": [
		    { type: "text", sub_type: "message", message_ES: "Frente Stun", message_RU: "Передний стан" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 176, 10, 270, 0, 3000] }  // Adicionado
		],
		
		    //Enraged
		
		"s-920-2000-2106-0": [{ type: "text", sub_type: "message", message_ES: "GIRO", message_RU: "Крутилка" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 335, 0, 3500] }
		],
		"s-920-2000-2105-0": [{ type: "text", sub_type: "message", message_ES: "!!", message_RU: "Удар назад" }],
		"s-920-2000-2104-0": [{ type: "text", sub_type: "message", message_ES: "Salto Aleatorio (stun)", message_RU: "Прыжок (стан)" }],
		"s-920-2000-2110-0": [
		    { type: "text", sub_type: "message", message_ES: "Frente Stun", message_RU: "Передний стан" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 176, 10, 270, 0, 3000] }  // Adicionado
		],

		// Special attacks
		"s-920-2000-3119-0": [{ type: "text", sub_type: "message", message_ES: "FUERA Seguro", message_RU: "Красный: Наружу сейф" }],
		"s-920-2000-3220-0": [{ type: "text", sub_type: "message", message_ES: "DENTRO Seguro", message_RU: "Синий: Внутрь сейф" }],
		"s-920-2000-3116-0": [{ type: "text", sub_type: "message", message_ES: "Circulos (stun)", message_RU: "Круги" }],


		// 3 BOSS

		"nd-920-3000-0": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Not enraged
		"s-920-3000-1315-0": [{ type: "text", sub_type: "message", message_ES: "Empujar (Repeler)", message_RU: "Откид (кайа)" }],
		"s-920-3000-1107-0": [{ type: "text", sub_type: "message", message_ES: "Salto Aleatorio (stun)", message_RU: "Прыжок (стан)" }],
		"s-920-3000-1204-0": [{ type: "text", sub_type: "message", message_ES: "Haz de Energia", message_RU: "Волна" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-1109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-1111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-1113-0": [{ type: "text", sub_type: "message", message_ES: "Frente | Atras Stun", message_RU: "Передний | Задний" }],
		"s-920-3000-1115-0": [{ type: "text", sub_type: "message", message_ES: "Ataque  Giratorio", message_RU: "Круговая" }],
		"s-920-3000-1104-0": [{ type: "func", func: thirdboss_backattack_event }],
		//"s-920-3000-1202-0": [{ type: "text", sub_type: "message", message_ES: "spin or front, back slam", message_RU: "Круговая | Задний" }],
		"s-920-3000-1120-0": [{ type: "text", sub_type: "message", message_ES: "Haz de Energia", message_RU: "Волна" }],

		// Enraged
		"s-920-3000-2204-0": [{ type: "text", sub_type: "message", message_ES: "Haz de Energia", message_RU: "Волна" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-2109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-2111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-2113-0": [{ type: "text", sub_type: "message", message_ES: "Frente | Atras Stun", message_RU: "Передний | Задний" }],
		"s-920-3000-2104-0": [{ type: "func", func: thirdboss_backattack_event }],
		"s-920-3000-2115-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Giratorio", message_RU: "Круговая" }],
		"s-920-3000-2107-0": [{ type: "text", sub_type: "message", message_ES: "Salto Aleatorio (stun)", message_RU: "Прыжок (стан)" }],
		//"s-920-3000-2202-0": [{ type: "text", sub_type: "message", message_ES: "spin or front, back slam", message_RU: "Круговая | Задний" }],
		"s-920-3000-2120-0": [{ type: "text", sub_type: "message", message_ES: "Haz de Energia", message_RU: "Волна" }],

		// 3 BOSS, SPECIAL ATTACKS
		"s-920-3000-1400-0": [{ type: "text", sub_type: "message", message_ES: "Clones: Slash x3", message_RU: "Копии: волны" }],
		"s-920-3000-1401-0": [{ type: "text", sub_type: "message", message_ES: "Clones: Circulo x3", message_RU: "Копии: круговые" }],
		
		"s-920-3000-1310-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-1311-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-1312-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-1313-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-1314-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		
		"s-920-3000-2310-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-2311-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-2312-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-2313-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		"s-920-3000-2314-0": [{ type: "text", sub_type: "message", message_ES: "Olas de Agua", message_RU: "Копии: волны" }], //Adicionado
		
		
		// color marks in cage
		"ae-0-0-9203037": [{ type: "text", sub_type: "message", message_ES: "Rojo", message_RU: "Красный" }, { type: "func", func: thirdboss_change_colour_event, args: ["red"] }],
		"ae-0-0-9203038": [{ type: "text", sub_type: "message", message_ES: "Amarillo", message_RU: "Желтый" }, { type: "func", func: thirdboss_change_colour_event, args: ["yellow"] }],
		"ae-0-0-9203039": [{ type: "text", sub_type: "message", message_ES: "Azul", message_RU: "Синий" }, { type: "func", func: thirdboss_change_colour_event, args: ["blue"] }],
		// anti-clockwise
		"s-920-3000-1317-0": [{ type: "func", func: thirdboss_set_clockwise_event, args: [false] }],
		// clockwise
		"s-920-3000-1318-0": [{ type: "func", func: thirdboss_set_clockwise_event, args: [true] }]
	};
};