// Forbidden Arena [Hagufna]
//
// made by michengs / HSDN

const { HIGHLIGHT_ITEM } = module.parent.exports.lib;

let player, entity, library, effect;

let timer1;
let timer2;
let shield_notices = true;
let print_shield = true;
let print_hp = true;
let is_hp_74_39 = false;

function skilld_event(skillid, handlers, event, ent, dispatch) {
	if ([351].includes(skillid)) { // щит
		if (shield_notices) {
			dispatch.clearTimeout(timer1);
			dispatch.clearTimeout(timer2);
			shield_notices = false;
			dispatch.setTimeout(() => shield_notices = true, 5000);
			timer1 = dispatch.setTimeout(()=> {
				if (!is_hp_74_39) {
					handlers['text']({
						"sub_type": "message",
						"message": "ESCUDO en 5 Secundos",
						"message_RU": "Через 5 сек. щит!"
					});
				}
			}, 85000);
			timer2 = dispatch.setTimeout(()=> {
				if (!is_hp_74_39) {
					handlers['text']({
						"sub_type": "message",
						"message": "ESCUDO en 15 Secundos",
						"message_RU": "Через 15 сек. щит!"
					});
				}
			}, 75000);
		}
	}
	if ([74, 39].includes(skillid)) {
		if (print_hp) {
			dispatch.clearTimeout(timer1);
			dispatch.clearTimeout(timer2);
			print_hp = false;
			is_hp_74_39 = true;
			dispatch.setTimeout(() => print_hp = true, 15000);
		}
	}
	if ([89, 59, 29].includes(skillid)) { // до щита
		if (print_shield) {
			print_shield = false;
			is_hp_74_39 = false;
			dispatch.setTimeout(() => print_shield = true, 15000);
/*			handlers['text']({
				"sub_type": "alert",
				"message": "Ready for Shield",
				"message_RU": "Готовность ломать щит"
			});*/
		}
	}
}

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	"h-3027-1000-89": [{ "type": "func", "func": skilld_event.bind(null, 89) }],
	"h-3027-1000-59": [{ "type": "func", "func": skilld_event.bind(null, 59) }],
	"h-3027-1000-29": [{ "type": "func", "func": skilld_event.bind(null, 29) }],
	"h-3027-1000-74": [{ "type": "func", "func": skilld_event.bind(null, 74) }],
	"h-3027-1000-39": [{ "type": "func", "func": skilld_event.bind(null, 39) }],

	"s-3027-1001-255-0": [{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //0
	"s-3027-1002-256-0": [{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //60
	"s-3027-1003-257-0": [{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //0
	"s-3027-1004-258-0": [{ "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //60

	"s-3027-1000-108-0": [{ "type": "text", "sub_type": "message", "message": "Espadada Frontal (CUIDADO)", "message_RU": "Меч (медленный)" }], // 101 121 122 -> 108
	"s-3027-1000-355-0": [{ "type": "text", "sub_type": "message", "message": "Rompe Mandibula", "message_RU": "Потрошение" }],                                 // 102 121 103 -> 355 -> 114
	"s-3027-1000-135-0": [{ "type": "text", "sub_type": "message", "message": "Espadada Frontal (Lenta)", "message_RU": "Меч (медленный)" }],                         //         104 -> 135 -> 130
	"s-3027-1000-111-0": [{ "type": "text", "sub_type": "message", "message": "Stun Frontal", "message_RU": "Стан | Меч" }],                              //         104 -> 111 -> 130
	"s-3027-1000-112-0": [{ "type": "text", "sub_type": "message", "message": "Salto Aleatorio (Espada)", "message_RU": "Прыжок назад | Меч" }],                 //     121 102 -> 112 -> 130

	// прыжок
	"s-3027-1000-116-0": [{ "type": "text", "sub_type": "message", "message": "Bloco Perfecto", "message_RU": "прыжок)" }],//{"type": "func","func": SpawnCircle.bind(null,true,413,0,180,8,560,0,1000)}],
	"s-3027-1000-116-1": [{ "type": "text", "sub_type": "message", "message": "Esquiva", "message_RU": "Эвейд!" }, { "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 180, 8, 560, 0, 1000] }],

	// 3 оборота -> прыжок (145 -> 139 -> 140)
	"s-3027-1000-145-0": [{ "type": "text", "sub_type": "message", "message": "Salto SLASH", "message_RU": "3 оборота | Прыжок" }],
	"s-3027-1000-139-0": [{ "type": "text", "sub_type": "message", "delay": 1000, "message": "Bloco Perfecto", "message_RU": "прыжок)" }],//{"type": "func","func": SpawnCircle.bind(null,true,413,0,180,8,660,1000,4000)}],
	"s-3027-1000-140-0": [{ "type": "text", "sub_type": "message", "message": "Esquiva", "message_RU": "Эвейд!" }, { "type": "spawn_func", "func": "circle", "args": [true, 553, 0, 180, 8, 500, 0, 1000] }],

	// 109 -> 402 -> 130
	"s-3027-1000-109-0": [{ "type": "text", "sub_type": "message", "message": "Salto a Frente | Espadada", "message_RU": "Прыжок вперед" }],
	"s-3027-1000-402-0": [{ "type": "text", "sub_type": "message", "message": "Salto Smash", "message_RU": "Прыжок" }, { "type": "spawn_func", "func": "circle", "args": [true, 912, 0, 180, 20, 120, 0, 3000] }],

	// 136 -> 144 -> 130
	"s-3027-1000-136-0": [{ "type": "text", "sub_type": "message", "message": "2x360 (Giro) | Golpe Frontal", "message_RU": "2 оборота | Меч" }],
//	"s-3027-1000-144-0": [{"type": "text","sub_type": "message","message": "Strike","message_RU": "Меч"}],

	// 134 -> 147
	"s-3027-1000-134-0": [{ "type": "text", "sub_type": "message", "message": "Cuidado (Ataque Atras)", "message_RU": "Поворот | Удар назад" }],
//	"s-3027-1000-134-1": [{"type": "text","sub_type": "message","message": "Cuidado (Ataque Atras)","message_RU": "Удар назад"}],
//	"s-3027-1000-147-0": [{"type": "text","sub_type": "message","message": "Strike","message_RU": "Меч"}],

	// 142 -> 143 114 130
	"s-3027-1000-142-0": [{ "type": "text", "sub_type": "message", "message": "2x360 (Giro) | Espadada Frontal", "message_RU": "2 оборота | Меч" }],
	"s-3027-1000-143-0": [{ "type": "text", "sub_type": "message", "message": "Espadada Frontal", "message_RU": "Меч" }],

	"s-3027-1000-141-0": [{ "type": "text", "sub_type": "message", "message": "2x360 (Giro) | Espadada Frontal", "message_RU": "2 оборота | Потрошение" }], // 141 -> 146 114 130
	"s-3027-1000-146-0": [{ "type": "text", "sub_type": "message", "message": "Espadada Frontal", "message_RU": "Потрошение | Меч" }],      // 146 ->         114 -> 130

	// стяжка -> бублики (350 -> 302)
	"s-3027-1000-350-0": [{ "type": "text", "sub_type": "message", "message": "SALIR - ENTRAR (Donuts)", "message_RU": "Стяжка | Бублики" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 12, 240, 0, 5000] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 480, 0, 5000] },
//		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 3, 950, 0, 5000] },
		{ "type": "spawn_func", "func": "item", "args": [HIGHLIGHT_ITEM, 0, 0, 3800, 1000] },
//		{ "type": "spawn_func", "func": "marker", "args": [false, 180, 100, 3800, 1000, false, ["CENTER", "IN"]] },
//		{ "type": "spawn_func", "func": "marker", "args": [false, 0, 100, 3800, 1000, false, ["CENTER", "IN"]] },
//		{ "type": "spawn_func", "func": "marker", "args": [false, 90, 100, 3800, 1000, false, ["CENTER", "IN"]] },
//		{ "type": "spawn_func", "func": "marker", "args": [false, 270, 100, 3800, 1000, false, ["CENTER", "IN"]] },
		{ "type": "text", "sub_type": "alert", "delay": 58000, "message": "Mecanica pronto...", "message_RU": "Скоро стяжка..." }
	],
	// стяжка -> волна (357 -> 110)
	"s-3027-1000-357-0": [{ "type": "text", "sub_type": "message", "message": "SALIR + Explosion (iframe)", "message_RU": "Стяжка | От него" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 8, 500, 2000, 5000] },
		{ "type": "text", "sub_type": "alert", "delay": 58000, "message": "Mecanica pronto...", "message_RU": "Скоро стяжка..." }
	],

	//"s-3027-1000-114-0": [{"type": "text","sub_type": "message","message": "Eviscerate (slow)","message_RU": "Потрошение (медленно)"}],
	//"s-3027-1000-130-0": [{"type": "text","sub_type": "message","message": "Target","message_RU": "Таргет"}],
//	"s-3027-1000-151-0": [{"type": "text","sub_type": "message","message": "Flash | Atras","message_RU": "Телепорт назад | Меч"}], // 151 149 148 -> 130
//	"s-3027-1000-149-1": [{"type": "text","sub_type": "message","message": "Flash Atras (Bait)","message_RU": "Телепорт назад (таргет)"}],
	"s-3027-1000-117-0": [{ "type": "text", "sub_type": "message", "message": "FLASH (Bait)", "message_RU": "Телепорт (таргет)" }],         //         117 -> 130
	"s-3027-1000-356-0": [{ "type": "text", "sub_type": "message", "message": "FLASH (Bait)", "message_RU": "Телепорт (таргет)" }],         //         356 -> 147
//	"s-3027-1000-148-1": [{"type": "text","sub_type": "message","message": "Flash (Bait)","message_RU": "Телепорт (таргет)"}],

	"s-3027-1000-351-0": [
		{ "type": "text", "sub_type": "message", "message": "ESCUDO!", "message_RU": "Щит!" },
		{ "type": "func", "func": skilld_event.bind(null, 351) }
	],
	"s-3027-1000-401-0": [
		{ "type": "text", "sub_type": "message", "message": "30% AOE!", "message_RU": "АОЕ" },
		{ "type": "text", "sub_type": "message", "delay": 1600, "message": "Esquiva!", "message_RU": "Эвейд!" }
	]
};