// Draakon Arena (Hard)
//
// made by Kuroine / HSDN

let player, entity, library, effect;

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	// RESS Bait //Range Check
	"s-3202-1000-107-0": [{ "type": "text", "sub_type": "message", "message": "Lanza Spectral", "message_RU": "Спектральный бросок" }],

	// Basic Attacks
	"s-3202-1000-103-0": [{ "type": "text", "sub_type": "message", "message": "2 Hits | Sangrar", "message_RU": "2 удара комба (кровоток)" }],
	"s-3202-1000-113-0": [{ "type": "text", "sub_type": "message", "message": "4 Hits Combo", "message_RU": "4 удара комба" }],
	"s-3202-1000-105-0": [{ "type": "text", "sub_type": "message", "message": "Garra | Stun", "message_RU": "Передний стан" }],
	"s-3202-1000-106-0": [{ "type": "text", "sub_type": "message", "message": "Stun", "message_RU": "Стан" }
//			{"type": "func","func": SpawnCircle.bind(null,true,553,0,20,8,200,100,2000)}
	],

	"s-3202-1000-120-0": [{ "type": "text", "sub_type": "message", "delay": 300, "message": "Stun (iframe)", "message_RU": "Стан 120" },
		{ "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 0, 8, 425, 0, 3000] }
	],
//	"s-3202-1000-114-0": [{"type": "text","sub_type": "message","message": "Stun (AOE)","message_RU": "Стан (AOE)"}],
	
	// Leap
	"s-3202-1000-111-0": [{ "type": "text", "sub_type": "message", "message": "Salto (Stun)", "message_RU": "Прыжок (стан)" }],

	"s-3202-1000-115-0": [{ "type": "text", "sub_type": "message", "message": "AOE Bombas (Juntar)", "message_RU": "AOE бомбы" }],
//						 {"type": "text","sub_type": "message","delay": 3000,"message": "Juntar!","message_RU": "Собраться!"}],

	"s-3202-1000-112-0": [{ "type": "text", "sub_type": "message", "message": "Frente | Atras Empujar", "message_RU": "Удар спереди" },
		{ "type": "spawn_func", "func": "semicircle", "args": [144, 219, 553, 0, 0, 9, 345, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 100, 158, 270, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 100, -158, 270, 0, 3000] }
    ],
	"s-3202-1000-110-0": [{ "type": "text", "sub_type": "message", "message": "Ola DENTRO", "message_RU": "Прыжок (к-от волна)" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 6, 650, 0, 4000] }
	],
	"s-3202-1000-109-0": [{ "type": "text", "sub_type": "message", "message": "Tumbar + Girar", "message_RU": "Удар - Крутилка" },
		{ "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 100, 8, 420, 0, 1000] },
	    { "type": "spawn_func", "delay": 1000, "func": "circle", "args": [true, 553, 180, 0, 8, 415, 0, 3750 ] }
    ],
	"s-3202-1000-304-0": [{ "type": "text", "sub_type": "message", "message": "ESCUDO!", "message_RU": "ЩИТ!" }],
	"ab-3202-1000-32021006": [
	    { "type": "text", "sub_type": "message", "message": "Plague of Exhaustion", "message_RU": "Кайа", "class_position": "priest" },
		{ "type": "text", "sub_type": "message", "message": "Regression", "message_RU": "Кайа", "class_position": "mystic" }
	],	

	// Pizza Boi
	"s-3202-1000-121-0": [{ "type": "text", "sub_type": "message", "message": "Pie Derecho + Ola DENTRO", "message_RU": "Правая нога - входящий удар (волны К > От)"},
//		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 550, 0, 3000] },
//		{ "type": "spawn_func", "func": "semicircle", "args": [-60, 70, 912, 0, 0, 8, 450, 0, 4000] },
//		{ "type": "spawn_func", "func": "semicircle", "args": [120, 250, 912, 0, 0, 8, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 70, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 120, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 250, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 300, 450, 0, 4000] }
	],	
				//		 { "type": "text","sub_type": "message","delay": 1900,"message": 'Esquivar!',"message_RU": "Эвейд!"}],
	"s-3202-1000-122-0": [{ "type": "text","sub_type": "message","message": "Frente | Atras Pizza","message_RU": "Пицца спереди назад" },
        { "type": "spawn_func", "func": "marker", "args": [false, 0, 100, 500, 3000, true, null] }
	],	
	"s-3202-1000-123-0": [{ "type": "text","sub_type": "message","message": "Atras Pizza","message_RU": "Задняя" },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 295, 550, 0, 1500] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 85, 550, 0, 1500] },
		{ "type": "spawn_func", "func": "semicircle", "args": [85, 295, 553, 0, 0, 6, 550, 0, 1500] },
		{ "type": "text", "sub_type": "message", "delay": 100, "message": "Ola DENTRO", "message_RU": "К НЕМУ (волны ОТ)" }
	],
	"s-3202-1000-127-0": [//{"type": "text","sub_type": "message","message": "Onda DENTRO","message_RU": "(волны К > От)"},
						 { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 18, 157, 0, 5000] }
	],						 
//						 {"type": "func","func": SpawnCircle.bind(null,false,553,0,0,12,307,0,5000)}],

	"s-3202-1000-124-0": [{ "type": "text", "sub_type": "message", "message": "Pie Izquierdo + Ola FUERA", "message_RU": "Левая нога - входящий удар (волны От > К)" },
//		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 550, 0, 3000] },
//		{ "type": "spawn_func", "func": "semicircle", "args": [-60, 70, 912, 0, 0, 8, 450, 0, 4000] },
//		{ "type": "spawn_func", "func": "semicircle", "args": [120, 250, 912, 0, 0, 8, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 70, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 120, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 250, 450, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 300, 450, 0, 4000] }
	],	
				//		{"type": "text","sub_type": "message","delay": 1900,"message": 'Esquivar!',"message_RU": "Эвейд"}],
	"s-3202-1000-125-0": [{ "type": "text", "sub_type": "message", "message": "Frente | Atras pizza", "message_RU": "Пицца спереди назад" },
		{ "type": "spawn_func", "func": "marker", "args": [false, 0, 300, 500, 3000, true, null] }
	],
	"s-3202-1000-126-0": [{ "type": "text", "sub_type": "message", "message": "Atras Pizza", "message_RU": "Задняя пицца" },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 295, 550, 0, 1500] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 85, 550, 0, 1500] },
		{ "type": "spawn_func", "func": "semicircle", "args": [85, 295, 553, 0, 0, 6, 550, 0, 1500] },
						{ "type": "text", "sub_type": "message", "delay":100, "message": "Ola FORA", "message_RU": "Волны От > К" }
	],	
						//128
	"s-3202-1000-128-0": [//{"type": "text","sub_type": "message","message": "+ Onda FORA","message_RU": "(волны От > К)"},
	                     { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 6, 650, 0, 4000] }
	]					 
//						 {"type": "func","func": SpawnCircle.bind(null,false,553,0,0,12,293,0,5000)}]
};