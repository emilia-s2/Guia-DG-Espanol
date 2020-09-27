// Antaroth's Abyss (Hard)
//
// made by Yuyuko / HSDN

const { Spawn } = module.parent.exports.lib;

let player, entity, library, effect;

let counter = 0;
let timer;

function thirdboss_backattack_event(handlers, event, ent, dispatch) {
	dispatch.clearTimeout(timer);
	counter++;
	if (counter >= 2) {
		handlers["text"]({
			"sub_type": "message",
			"message": "Ataque Atras",
			"message_RU": "Задний"
		});
	}
	timer = dispatch.setTimeout(() => counter = 0, 3000);
}

let colour_to_use = null;
const COLOURS_OFFSETS = {
	"red": 0,
	"yellow": 120,
	"blue": 240,
};
function thirdboss_set_clockwise_event(clockwise, handlers, event, ent, dispatch) {
	const spawn = new Spawn(handlers, event, ent, dispatch);
	dispatch.setTimeout(() => {
		const colour_rotation = clockwise ? ["red", "yellow", "blue"] : ["blue", "yellow", "red"];
		for (let i = 0; i < 3; i++) {
			let current_colour = colour_rotation[(colour_rotation.indexOf(colour_to_use) + i) % 3];
			spawn.marker(false, COLOURS_OFFSETS[current_colour], 150, i * 2600, (i + 1) * 3000, true, null);
		}
		dispatch.setTimeout(()=> clockwise = null, 12000);
	}, 1000);
}
function thirdboss_change_colour_event(colour) {
	colour_to_use = colour;
}
/* ------------------------------------------- */

// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
let SPAWNING_FIRST_CIRCLE_FLOWERS = [
	{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "DERECHA | ENTRAR - SALIR (Donuts)", "message_RU": "Вправо сейф > Волны к" },
//	{"type": "text","class_position":"tank","sub_type": "message","delay": 600,"message": "SAIR","message_RU": "Вправо сейф > Волны к"},	
	{ "type": "text", "class_position":"dps", "sub_type": "message", "message": "IZQUIERDA | ENTRAR - SALIR (Donuts)", "message_RU": "Влево сейф > Волны к" },
//	{"type": "text","class_position":"dps","sub_type": "message","delay": 600,"message": "ENTRAR","message_RU": "Вправо сейф > Волны к"},
	{ "type": "text", "class_position":"heal", "sub_type": "message", "message": "IZQUIERDA | ENTRAR - SALIR (Donuts)", "message_RU": "Влево сейф > Волны к" },
//	{"type": "text","class_position":"heal","sub_type": "message","delay": 600,"message": "ENTRAR","message_RU": "Вправо сейф > Волны к"},
	{ "type": "spawn_func", "func": "marker", "args": [false, 90, -250, 0, 2500, true, null] },
	{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2500] },
	{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 500, 0, 1500] },
//	{ "type": "spawn_func", "func": "circle", "args": [false, 445, 0, 0, 18, 143, 1500, 5000] },
//	{ "type": "spawn_func", "func": "circle", "args": [false, 445, 0, 0, 12, 293, 1500, 5000] }
];
// heart thrust+clockwise spin+left swipe+AOEs from in to out
let SPAWNING_SECOND_CIRCLE_FLOWERS = [
	{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "IZQUIERDA | SALIR - ENTRAR (Donuts)", "message_RU": "Влево сейф > Волны от" },
//	{"type": "text","class_position":"tank","sub_type": "message","delay": 600,"message": "ENTRAR","message_RU": "Вправо сейф > Волны к"},
	{ "type": "text", "class_position":"dps", "sub_type": "message", "message": "DERECHA | SALIR - ENTRAR (Donuts)", "message_RU": "Вправо сейф > Волны от" },
//	{"type": "text","class_position":"dps","sub_type": "message","delay": 600,"message": "SAIR","message_RU": "Вправо сейф > Волны к"},
	{ "type": "text", "class_position":"heal", "sub_type": "message", "message": "DERECHA | SALIR - ENTRAR (Donuts)", "message_RU": "Вправо сейф > Волны от" },
//	{"type": "text","class_position":"heal","sub_type": "message","delay": 600,"message": "SAIR","message_RU": "Вправо сейф > Волны к"},
	{ "type": "spawn_func", "func": "marker", "args": [false, 270, -250, 0, 2500, true, null] },
	{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2500] },
	{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 500, 0, 1500] },
//	{ "type": "spawn_func", "func": "circle", "args": [false, 445, 0, 0, 18, 157, 1500, 5000] },
//	{ "type": "spawn_func", "func": "circle", "args": [false, 445, 0, 0, 12, 307, 1500, 5000] }
];

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	// 1 BOSS, NOT ENRAGED
	"s-920-1000-1117-0": [{ "type": "text", "sub_type": "message", "delay": 500, "message": "Entrar | Salir", "message_RU": "К нему > От него" }, { "type": "spawn_func", "delay": 500, "func": "circle", "args": [false, 913, 180, 340, 14, 210, 100, 4700] }], //Adicionado
	"s-920-1000-1116-0": [{ "type": "text", "sub_type": "message", "message": "Salir | Entrar", "message_RU": "От него > К нему" }, { "type": "spawn_func", "func": "circle", "args": [false, 913, 0, 0, 14, 210, 100, 3700] }], //Adicionado
	"s-920-1000-1109-0": [{ "type": "text", "sub_type": "message", "message": "Escudo Atras (Izquierda)", "message_RU": "Откид назад" }], 
	"s-920-1000-1130-0": [{ "type": "text", "sub_type": "message", "message": "FULL | ENTRAR > SALIR", "message_RU": "Общий > Внешний > Внутренний" }],//{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 14, 230, 100, 400] }], //Adicionado
	// 1 BOSS, ENRAGED
	"s-920-1000-2117-0": [{ "type": "text", "sub_type": "message", "delay": 500, "message": "Entrar | Salir", "message_RU": "К нему > От него" }, { "type": "spawn_func", "delay": 500, "func": "circle", "args": [false, 913, 180, 340, 14, 210, 100, 4700] }], //Adicionado
	"s-920-1000-2116-0": [{ "type": "text", "sub_type": "message", "message": "Salir | Entrar", "message_RU": "От него > К нему" }, { "type": "spawn_func", "func": "circle", "args": [false, 913, 0, 0, 14, 210, 100, 3700] }], //Adicionado
	"s-920-1000-2109-0": [{ "type": "text", "sub_type": "message", "message": "Escudo Atras (Izquierda)", "message_RU": "Откид назад" }],
	"s-920-1000-2130-0": [{ "type": "text", "sub_type": "message", "message": "FULL | SALIR < ENTRAR", "message_RU": "Общий > Внутренний > Внешний" }],//{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 14, 230, 100,4 000] }], //Adicionado

	// 1 BOSS, SPECIAL ATTACKS
	"s-920-1000-1300-0": [{ "type": "text", "sub_type": "message", "delay": 400, "message": "Jugar al Alto (iframe)", "message_RU": "Эвейд!" }],
 //                      {"type": "text","sub_type": "message","delay": 700,"message": "Iframe"}
 //   ],
	// 2 BOSS, NOT ENRAGED
//	"s-920-2000-1108-0": [{"type": "text","sub_type": "message","message": "Balanco do Alvo","message_RU": "Таргет"}],
	"s-920-2000-1113-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
			              { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, //  //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },       //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 270, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 270, 200, 0, 2000] }  //Adicionado
	],
	"s-920-2000-1114-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса |" },
	                      { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, // //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },      //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 90, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 90, 200, 0, 2000] }  //Adicionado
	],
	"s-920-2000-1106-0": [{ "type": "text", "sub_type": "message", "message": "GIRO", "message_RU": "Крутилка" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 320, 0, 3500] }
	],
	"s-920-2000-1105-0": [{ "type": "text", "sub_type": "message", "message": "!!", "message_RU": "Удар назад" }],
	"s-920-2000-1104-0": [{ "type": "text", "sub_type": "message", "message": "Pulo Aleatorio (stun)", "message_RU": "Прыжок (стан)" }],
	"s-920-2000-1110-0": [{ "type": "text", "sub_type": "message", "message": "Frente Stun", "message_RU": "Передний стан" },
       { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 176, 10, 270, 0, 3000] } // Adicionado
	],
	"s-920-2000-1111-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
			              { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, //  //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },       //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 270, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 270, 200, 0, 2000] }  //Adicionado
	],
	"s-920-2000-1112-0": [{ "type": "text","class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса |" },
	                      { "type": "text","class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text","class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, // //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },      //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 90, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 90, 200, 0, 2000] }  //Adicionado
	],
	// 2 BOSS, ENRAGED
//	"s-920-2000-2108-0": [{"type": "text","sub_type": "message","message": "Balanco do Alvo","message_RU": "Таргет"}],
	"s-920-2000-2113-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
			              { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, //  //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },       //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 270, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 270, 200, 0, 2000] }  //Adicionado
	],
	"s-920-2000-2114-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса |" },
	                      { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, // //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },      //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 90, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 90, 200, 0, 2000] }  //Adicionado
	],	
	"s-920-2000-2106-0": [{ "type": "text", "sub_type": "message", "message": "GIRO", "message_RU": "Крутилка" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 330, 0, 3500] } 
	],
	"s-920-2000-2105-0": [{ "type": "text", "sub_type": "message", "message": "!!", "message_RU": "Удар назад" }],
	"s-920-2000-2104-0": [{ "type": "text", "sub_type": "message", "message": "Pulo Aleatorio (stun)", "message_RU": "Прыжок (стан)" }],
	"s-920-2000-2110-0": [{ "type": "text", "sub_type": "message", "message": "Frente Stun", "message_RU": "Передний стан" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 176, 10, 270, 0, 3000] } // Adicionado
	],
	"s-920-2000-2111-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
				          { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, //  //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },       //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 270, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 270, 200, 0, 2000] }  //Adicionado
	],
	"s-920-2000-2112-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса" },
	                      { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },	
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] }, //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 180, 500, 0, 2000] }, // //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 300, 0, 2000] },      //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 0, 300, 90, 200, 0, 2000] },   //Adicionado
						  { "type": "spawn_func", "func": "vector", "args": [553, 180, 500, 90, 200, 0, 2000] }  //Adicionado
	],

	// 2 BOSS, SPECIAL ATTACKS
	"s-920-2000-3119-0": [{ "type": "text", "sub_type": "message", "message": "FUERA Seguro", "message_RU": "Красный: Наружу сейф" }, { "type": "spawn_func", "func": "circle", "args": [false, 413, 0, 0, 8, 270, 0, 4000] }],
	"s-920-2000-3220-0": [{ "type": "text", "sub_type": "message", "message": "DENTRO Seguro", "message_RU": "Синий: Внутрь сейф" }, { "type": "spawn_func", "func": "circle", "args": [false, 413, 0, 0, 8, 270, 0, 4000] }],
	"s-920-2000-3116-0": [{ "type": "text", "sub_type": "message", "message": "Circulos (stun)", "message_RU": "Круги" }],
	"h-920-2000-50": [{ "type": "text", "sub_type": "message", "message": "50%", "message_RU": "50%" }],
	"h-920-2000-20": [{ "type": "text", "sub_type": "message", "message": "20%", "message_RU": "20%" }],

	// 3 BOSS, UNENRAGED
	"s-920-3000-1315-0": [{ "type": "text", "sub_type": "message", "message": "Empujar", "message_RU": "Откид (кайа)" }],
	"s-920-3000-1107-0": [{ "type": "text", "sub_type": "message", "message": "Salto Random (stun)", "message_RU": "Прыжок (стан)" }],
	"s-920-3000-1204-0": [{ "type": "text", "sub_type": "message", "message": "Haz de Energia", "message_RU": "Волна" }],
	// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
	"s-920-3000-1109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
	// heart thrust+clockwise spin+left swipe+AOEs from in to out
	"s-920-3000-1111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
	//
	"s-920-3000-1113-0": [{ "type": "text", "sub_type": "message", "message": "Frente | Atras Stun", "message_RU": "Передний | Задний" }],
	"s-920-3000-1115-0": [{ "type": "text", "sub_type": "message", "message": "Ataque  Giratorio", "message_RU": "Круговая" }],
	"s-920-3000-1104-0": [{ "type": "func", "func": thirdboss_backattack_event }],    
	//"s-920-3000-1202-0": [{"type": "text","sub_type": "message","message": "spin or front,back slam","message_RU": "Круговая | Задний"}],
	"s-920-3000-1120-0": [{ "type": "text", "sub_type": "message", "message": "Haz de Energia", "message_RU": "Волна" }],

	// 3 BOSS, ENRAGED
	"s-920-3000-2204-0": [{ "type": "text", "sub_type": "message", "message": "Enraged: Haz de Energia", "message_RU": "Волна" }],
	// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
	"s-920-3000-2109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
	// heart thrust+clockwise spin+left swipe+AOEs from in to out
	"s-920-3000-2111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
	//
	"s-920-3000-2113-0": [{ "type": "text", "sub_type": "message", "message": "Frente | Atras Stun", "message_RU": "Передний | Задний" }],
	"s-920-3000-2104-0": [{ "type": "func", "func": thirdboss_backattack_event }],
	"s-920-3000-2115-0": [{ "type": "text", "sub_type": "message", "message": "Ataque Giratorio", "message_RU": "Круговая" }],
	"s-920-3000-2107-0": [{ "type": "text", "sub_type": "message", "message": "Salto Aleatorio (stun)", "message_RU": "Прыжок (стан)" }],
	//"s-920-3000-2202-0": [{"type": "text","sub_type": "message","message": "spin or front,back slam","message_RU": "Круговая | Задний"}],
	"s-920-3000-2120-0": [{ "type": "text", "sub_type": "message", "message": "Haz de Energia", "message_RU": "Волна" }],

	// 3 BOSS, SPECIAL ATTACKS
	"s-920-3000-1400-0": [{ "type": "text", "sub_type": "message", "message": "Clones: Slash x3", "message_RU": "Копии: волны" }],
	"s-920-3000-1401-0": [{ "type": "text", "sub_type": "message", "message": "Clones: Circulo x3", "message_RU": "Копии: круговые" }],
	"s-920-3000-1310-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-1311-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-1312-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-1313-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-1314-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	
	"s-920-3000-2310-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-2311-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-2312-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-2313-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	"s-920-3000-2314-0": [{ "type": "text", "sub_type": "message", "message": "Olas de Agua", "message_RU": "Копии: круговые" }], //Adicionado
	
	// color marks in cage
	"ae-0-0-9203037": [{ "type": "text", "sub_type": "message", "message": "Rojo", "message_RU": "Красный" }, { "type": "func", "func": thirdboss_change_colour_event.bind(null, "red") }],
	"ae-0-0-9203038": [{ "type": "text", "sub_type": "message", "message": "Amarillo", "message_RU": "Желтый" }, { "type": "func", "func": thirdboss_change_colour_event.bind(null, "yellow") }],
	"ae-0-0-9203039": [{ "type": "text", "sub_type": "message", "message": "Azul", "message_RU": "Синий" }, { "type": "func", "func": thirdboss_change_colour_event.bind(null, "blue") }],
	// anti-clockwise
	"s-920-3000-1317-0": [{ "type": "func", "func": thirdboss_set_clockwise_event.bind(null, false) }],
	// clockwise
	"s-920-3000-1318-0": [{ "type": "func", "func": thirdboss_set_clockwise_event.bind(null, true) }]
};