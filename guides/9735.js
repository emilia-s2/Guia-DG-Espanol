// RK-9 Kennel
//
// made by michengs

let player, entity, library, effect;

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	 },

	// 1 BOSS
	"s-735-1000-104-0": [{ "type": "text", "sub_type": "message", "message": "Stun Frontal", "message_RU": "Удар назад" }], // Adicionado
	"s-735-1000-112-0": [{ "type": "text", "sub_type": "message", "message": "Ataque Atras", "message_RU": "Удар назад" },
//		{"type": "func","func": SpawnCircle.bind(null,false,553,180,250,10,184,0,2750)}   //Atras | 270>182 = tamanh0 Adicionado test
],		
	"s-735-1000-205-0": [{ "type": "text", "sub_type": "message", "message": "Ventilador", "message_RU": "Ветер!!！" }],
	"s-735-1000-304-0": [{ "type": "text", "sub_type": "message", "message": "SALIR", "message_RU": "ОТ НЕГО" }, { "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 0, 8, 350, 100, 4000] }], // Adicionado
	"s-735-1000-305-0": [{ "type": "text", "sub_type": "message", "message": "ENTRAR", "message_RU": "К НЕМУ" }, { "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 0, 8, 290, 100, 4000] }], // Adicionado
	"s-735-1000-306-0": [{ "type": "text", "sub_type": "message", "message": "Bombs", "message_RU": "Бомбы!!!" }],
	"s-735-1000-307-0": [{ "type": "text", "sub_type": "message", "message": "Jalar", "message_RU": "Стяжка!!!" }],
	"s-735-1000-309-0": [{ "type": "text", "sub_type": "message", "message": "Misiles Iniciados!!", "message_RU": "Запуск 4 ракет" },
	    { "type": "text", "sub_type": "message", "delay": 12000, "message": "Disparar Misiles", "message_TW": "快跳！" }  // Adicionado
],
	// 2 BOSS

/*	"h-735-2000-99": [
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32904, y: 59440, z: 0} }, //direito 1 original
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32704, y: 59325, z: 0} }, //direito 1 clone
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32900, y: 58824, z: 0} }, //frente original 
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32700, y: 58946, z: 0} }, //frente clone
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32372, y: 58520, z: 0} }, //Esquerdo 1 original
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32372, y: 58755, z: 0} }, //Esquerdo 1 Clone
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31842, y: 58833, z: 0} }, //Esquerdo 2 original
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32045, y: 58945, z: 0} }, //Esquerdo 2 Clone 
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31846, y: 59444, z: 0} }, //Atras original
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32044, y: 59327, z: 0} }, //Atras Clone
		{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32379, y: 59750, z: 0} }, //Direito 2 original
		{ "type": "spawn", "id": 445, "sub_delay": 99999999, "pos": { x: -32375, y: 59515, z: 0} }, //Direito 2 Clone
   ],*/
    "s-735-2000-102-0": [{ "type": "text", "sub_type": "message", "message": "Frente Ataque", "message_RU": "Пила (Эвейд)" }], // Alterado de Tank para Geral
	"s-735-2000-105-0": [{ "type": "text", "sub_type": "message", "message": "Girar (Repeler)", "message_RU": "Крутилка (откид)" }, { "type": "spawn_func", "func": "circle", "args": [false,553, 0, 0, 10, 278, 100, 4000] }], // Alterado 250>278 Tamanho 
	"s-735-2000-108-0": [{ "type": "text", "sub_type": "message", "message": "Atras (Repeler)", "message_RU": "Откид назад" },
		{ "type": "spawn_func", "func": "semicircle", "args": [120, 245, 553, 0, 0, 10, 385, 0, 2000] },  // Adicionado 
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 120, 390, 0, 2000] },             // Adicionado  novao ID flor rosa 913
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 240, 390, 0, 2000] }              // Adicionado
	],	
				
	"s-735-2000-301-0": [{ "type": "text", "sub_type": "message", "message": "Jugar (Bombs)", "message_RU": "Бомба" }, { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 12, 200, 100, 6000] }],  // adicionado
	"s-735-2000-304-0": [{ "type": "text", "sub_type": "message", "message": "SALIR (Explosion)", "message_RU": "ОТ НЕГО" },  { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 400, 100, 4000] }], // Adicionado
	"s-735-2007-201-0": [
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 0, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 90, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 180, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 270, 500, 0, 4000] }
	],
	"s-735-2007-306-0": [
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 0, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 90, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 180, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 270, 500, 0, 4000] }
	],
	"s-735-2007-307-0": [
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 0, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 90, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 180, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "vector", "args": [912, 0, 0, 270, 500, 0, 4000] }
	],

	// 3 BOSS
	"s-735-3000-116-0": [{ "type": "text", "sub_type": "message", "message": "S-DERECHA Seguro", "message_RU": "Справа" },
		{ "type": "spawn_func", "func": "point", "args": [548, 120, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 130, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 140, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 150, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 160, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 170, 210, 180, 290, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 300, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 310, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 320, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 330, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 340, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 350, 210, 0, 290, 0, 3000] }
	],
	"s-735-3000-117-0": [{ "type": "text", "sub_type": "message", "message": "S-IZQUIERDA Seguro", "message_RU": "Слева" },
		{ "type": "spawn_func", "func": "vector", "args": [548, 10, 210, 0, 290, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 20, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 30, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 40, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 50, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 60, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 240, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 230, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 220, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 210, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 200, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 190, 210, 180, 290, 0, 3000] }
	],
	"s-735-3000-118-0": [{ "type": "text", "sub_type": " message", "message": "S-IZQUIERDA Seguro", "message_RU": "Слева" },
		{ "type": "spawn_func", "func": "vector", "args": [548, 10, 210, 0, 290, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 20, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 30, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 40, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 50, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 60, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 240, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 230, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 220, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 210, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 200, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 190, 210, 180, 290, 0, 3000] }
	],
	"s-735-3000-119-0": [{ "type": "text", "sub_type": "message", "message": "S-DERECHA Seguro", "message_RU": "Справа" },
		{ "type": "spawn_func", "func": "point", "args": [548, 120, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 130, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 140, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 150, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 160, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 170, 210, 180, 290, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 300, 250, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 310, 240, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 320, 230, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 330, 220, 0, 3000] },
		{ "type": "spawn_func", "func": "point", "args": [548, 340, 210, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [548, 350, 210, 0, 290, 0, 3000] }
	],
	"s-735-3000-128-0": [{ "type": "text", "sub_type": "message", "message": "Atras | Puno Esxplosivo", "message_RU": "Эвейд" }, // Alterado de Tank para Geral
//			           { "type": "spawn_func", "func": "vector", "args": [110, 240, 553, 0, 0, 7, 800, 0, 4000] }, //Adicionado
					   { "type": "spawn_func", "func": "vector", "args": [553, 180, 40, 240, 800, 0, 4000] },  // Adicionado
					   { "type": "spawn_func", "func": "vector", "args": [553, 180, 40, 120, 800, 0, 4000] }  //  Adicionado
	],				   
	"s-735-3000-305-0": [{ "type": "spawn_func", "func": "circle", "args": [false, 912, 0, 0, 8, 300, 100, 7000] }],
	"s-735-3000-321-0": [
		{ "type": "text", "sub_type": "message", "message": "ESCUDO!", "message_RU": "Щит!" },
		{ "type": "text", "sub_type": "message", "delay": 90000, "message": "Escudo em 10 Segundos", "message_RU": "Через 10 сек. щит!" }
	],

	// Radar
	"qb-735-3000-3034312": [{ "type": "text", "sub_type": "message", "message": "!!! Radar !!!", "message_RU": "!!! Радар !!!" }],
	"s-735-3000-324-0": [
		{ "type": "text", "sub_type": "message", "message": "SALIR", "message_RU": "ОТ НЕГО" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 280, 0, 3000] }
	],
	"s-735-3000-325-0": [
		{ "type": "text", "sub_type": "message", "message": "ENTRAR", "message_RU": "К НЕМУ" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 280, 0, 3000] }
	]
};