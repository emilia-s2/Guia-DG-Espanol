// Akalath Quarantine
//
// made by michengs

let player, entity, library, effect;

let debuff = 0;
let counter = 0;
let timer1;
let timer2;
let timer3;
let timer4;

function skilld_event(skillid, handlers, event, ent, dispatch) {
	if (skillid === 99020020) { // Debuff removed
		debuff = 0;
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
	}
	if ([3119, 3220].includes(skillid)) {
		switch (skillid) {
		case 3119: // red inside
			if (debuff === 1) {
				handlers['text']({
					"sub_type": "message",
					"message": "SALIR",
					"message_RU": "ОТ НЕГО"
				});
			}
			else if (debuff === 2) {
				handlers['text']({
					"sub_type": "message",
					"message": "ENTRAR",
					"message_RU": "К НЕМУ"
				});
			}
			break;
		case 3220: // blue inside
			if (debuff === 1) {
				handlers['text']({
					"sub_type": "message",
					"message": "ENTRAR",
					"message_RU": "К НЕМУ"
				});
			}
			else if (debuff === 2) {
				handlers['text']({
					"sub_type": "message",
					"message": "SALIR",
					"message_RU": "ОТ НЕГО"
				});
			}
			break;
		}
	}
	if ([30231000, 1000].includes(skillid)) { // Red debuff
		debuff = 1;
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
		timer1 = dispatch.setTimeout(() => debuff = 0, 70000);
	}
	if ([30231001, 1001].includes(skillid)) { // Blue debuff
		debuff = 2;
		dispatch.clearTimeout(timer2);
		dispatch.clearTimeout(timer1);
		timer2 = dispatch.setTimeout(() => debuff = 0, 70000);
	}
	/*if ([1113, 1114].includes(skillid)) { // x4 slash
		dispatch.clearTimeout(timer3);
		counter++;
		if (counter >= 4) {
			dispatch.clearTimeout(timer4);
			timer4 = dispatch.setTimeout(()=> {
				handlers['text']({
					"sub_type": "alert",
					"message": "4x slash",
					"message_RU": "4 полосы"
				});
			}, 70000);
		}
		timer3 = dispatch.setTimeout(() => counter = 0, 20000);
	}*/
}

function firstboss_start_event() {
	debuff = 0;
}

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	// 1 BOSS
	"h-3023-1000-99": [{ "type": "func", "func": firstboss_start_event }],
	"h-3023-1000-80": [{ "type": "text", "sub_type": "message", "message": "80%", "message_RU": "80%" }],
	"s-3023-1000-104-0": [{ "type": "text", "sub_type": "message", "message": "Salto Stun", "message_RU": "Прыжок + Стан" }],
	"s-3023-1000-105-0": [{ "type": "text", "sub_type": "message", "message": "CUIDADO!!", "message_RU": "Поворот назад" }],
	"s-3023-1000-110-0": [{ "type": "text", "sub_type": "message", "message": "Frente Stun", "message_RU": "Передний стан" },
						  { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 175, 10, 270, 0, 3000] }  // Alterado 270
	],
	"s-3023-1000-111-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
			              { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 20, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 20, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 6, 302, 270, 200, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 176, 502, 270, 200, 0, 2000] }
	],
	"s-3023-1000-112-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса |" },
	                      { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 20, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 20, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 354, 302, 90, 200, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 184, 502, 90, 200, 0, 2000] }
	],
	"s-3023-1000-113-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Derecha SLASH", "message_RU": "| Левая полоса" },
		                  { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Izquierda SLASH" },
						  { "type": "func", "func": skilld_event.bind(null, 1113) },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 200, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 20, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 20, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 6, 302, 270, 200, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 176, 502, 270, 200, 0, 2000] }
	],
	"s-3023-1000-114-0": [{ "type": "text", "class_position":"tank", "sub_type": "message", "message": "Izquierda SLASH", "message_RU": "Правая полоса |" },
	                      { "type": "text", "class_position":"heal", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "text", "class_position":"dps", "sub_type": "message", "message": "Derecha SLASH" },
						  { "type": "func", "func": skilld_event.bind(null, 1114) },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 200, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 20, 180, 500, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 20, 0, 300, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 354, 302, 90, 200, 0, 2000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 184, 502, 90, 200, 0, 2000] }
	],
	"s-3023-1000-115-0": [{ "type": "text", "sub_type": "message", "message": "Semi-circulo Trasero", "message_RU": "Удар назад" },
		{ "type": "spawn_func", "func": "semicircle", "args": [90, 270, 553, 0, 0, 20, 160, 100, 2000] },
		{ "type": "spawn_func", "func": "semicircle", "args": [90, 270, 553, 0, 0, 12, 220, 100, 2000] },  //                      | 270>280
		{ "type": "spawn_func", "func": "semicircle", "args": [90, 270, 553, 0, 0, 10, 340, 100, 2000] }  //300>340 alterado posiçao | 270>285
//						  {"type": "func","func": SpawnVector.bind(null,445,130,40,90,150,0,2000)}
	],
	"s-3023-1000-116-0": [
		{ "type": "text", "sub_type": "message", "message": "Explosion", "message_RU": "Кайа", "class_position": "dps" },
	    { "type": "text", "sub_type": "message", "message": "Explosion", "message_RU": "Кайа", "class_position": "tank" },
		{ "type": "text", "sub_type": "message", "message": "Kaia's Shield", "message_RU": "Кайа", "class_position": "priest" },
		{ "type": "text", "sub_type": "message", "message": "Thrall of Protection", "message_RU": "Кайа", "class_position": "mystic" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 500, 0, 4000] }
	],
	"am-3023-1000-30231001": [{ "type": "func", "func": skilld_event.bind(null, 1001) }],
	"am-3023-1000-30231000": [{ "type": "func", "func": skilld_event.bind(null, 1000) }],
	"ae-0-0-99020020": [{ "type": "func", "func": skilld_event.bind(null, 99020020) }], // Debuff removed
	"ae-0-0-30231000": [{ "type": "func", "func": skilld_event.bind(null, 30231000) }], // Red debuff
	"ae-0-0-30231001": [{ "type": "func", "func": skilld_event.bind(null, 30231001) }], // Blue debuff
	"s-3023-1000-3107-0": [{ "type": "text", "sub_type": "message", "message": "Ola a Frente", "message_RU": "Конус вперед" },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 80, 10, 1000, 0, 2500] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 80, 350, 1000, 0, 2500] }
	],
	"s-3023-1000-3115-0": [{ "type": "text", "sub_type": "message","message": "Ataque Rotativo", "message_RU": "Крутилка" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 335, 0, 3500] }
	],	
	"s-3023-1000-3116-0": [{ "type": "text", "sub_type": "message", "message": "Circulos + Ataque Rotativo", "message_RU": "Круги + Крутилка" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 10, 335, 0, 5000] }
	],
	"s-3023-1000-3119-0": [{ "type": "func", "func": skilld_event.bind(null, 3119) }
//						   {"type": "func","func": SpawnCircle.bind(null,false,413,0,0,10,270,0,4000)},
//						   {"type": "func","func": SpawnCircle.bind(null,false,553,0,0,8,575,0,4000)}
	],
	"s-3023-1000-3220-0": [{ "type": "func", "func": skilld_event.bind(null, 3220) }
//						   {"type": "func","func": SpawnCircle.bind(null,false,413,0,0,10,270,0,4000)},
//						   {"type": "func","func": SpawnCircle.bind(null,false,553,0,0,8,575,0,4000)}
	],
	//"s-3023-1000-3223-0": [{"type": "text","sub_type": "message","message_RU": "Красный дебаф"}],

	// 2 BOSS
	"s-3023-2000-164-0": [{ "type": "text", "sub_type": "message", "message": "Ataque de sangramiento", "message_RU": "Отпрыжка (Кровоток)" }],
	"s-3023-2000-166-0": [{ "type": "text", "sub_type": "message", "message": "Ataque Atras (dar vueltas)", "message_RU": "Оборот назад" }],
	"s-3023-2000-175-0": [{ "type": "text", "sub_type": "message", "message": "Rugido (Stun)", "message_RU": "Рёв (Эвейд)!!!" },
		{ "type": "text", "sub_type": "message", "delay": 1500, "message": "Iframe", "message_RU": "Эвейд" }
	],
	"s-3023-2000-178-0": [{ "type": "text", "sub_type": "message", "message": "Garras a Frente", "message_RU": "Крутилка (Кровоток)" }],
	"s-3023-2000-181-0": [{ "type": "text", "sub_type": "message", "message": "Rocks", "message_RU": "Полоса вперед" },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 75, 8, 1000, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 75, 352, 1000, 0, 3000] }
	],
	"s-3023-2000-182-0": [{ "type": "text", "sub_type": "message", "message": "Pisar Fuerte (Noquear)", "message_RU": "Опрокид" }],
	"s-3023-2000-185-0": [
		{ "type": "text", "sub_type": "message", "message": "Explosion", "message_RU": "Кайа", "class_position": "dps" },
	    { "type": "text", "sub_type": "message", "message": "Explosion", "message_RU": "Кайа", "class_position": "tank" },
		{ "type": "text", "sub_type": "message", "message": "Kaia's Shield", "message_RU": "Кайа", "class_position": "priest" },
		{ "type": "text", "sub_type": "message", "message": "Thrall of Protection", "message_RU": "Кайа", "class_position": "mystic" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 500, 0, 4000] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 6, 750, 0, 4000] }
	],
	"s-3023-2000-202-0": [{ "type": "text", "sub_type": "message", "message": "Punalada Trasera + Frontal", "message_RU": "Назад + Вперед" },
		{ "type": "spawn_func", "func": "vector", "args": [553, 90, 80, 180, 500, 0, 3000] },
		{ "type": "spawn_func", "func": "vector", "args": [553, 270, 80, 180, 500, 0, 3000] }
	],
	"s-3023-2000-207-0": [{ "type": "text", "sub_type": "message", "message": "Fantasma x5 (Sangramiento)", "message_RU": "Прыжки x5 (Кровоток)" }],
	"s-3023-2000-212-0": [{ "type": "text", "sub_type": "message", "message": "Flash Sangramiento (Bait)", "message_RU": "Байт (Кровоток)" }],
};