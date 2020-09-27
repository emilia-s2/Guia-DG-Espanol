// Corrupted Skynest (Hard)
//
// made by michengs / HSDN / ZC

const { MARKER_ITEM, Spawn } = module.parent.exports.lib;

let player, entity, library, effect;

let debuff = null;
let timer1;
let timer2;
let timer3;
let timer4;
let timer5;
let boss_ent;
let boss_offset = 0;
let qbacting = null;
let blue = false;
let red  = false;
let debuff_tracker_started = false;

const mech_messages = {
	0: { message: "ENTRAR",    message_RU: "К НЕМУ" },
	1: { message: "SALIR",   message_RU: "ОТ НЕГО" },
	2: { message: "IZQUIERDA",  message_RU: "Лево" },
	3: { message: "DERECHA", message_RU: "Право" }
};
const qbacting_messages = {
	0: { message: "Diferente", message_RU: "разные" },
	1: { message: "Igual",      message_RU: "одинаковые" }
};
const debuff_messages = {
	0: { message: "Listo para obter Debuff de FUEGO", message_RU: "Готовность к переключению на Огонь" },
	1: { message: "Listo para obter Debuff de HIELO",  message_RU: "Готовность к переключению на Лед" }
};

// NULL % 2 = 0
//    1 % 2 = 1
//    0 % 2 = 0
//    2 % 2 = 0

function spawn_marker(out, handlers, dispatch) {
	if (!boss_ent) return;
	const boss_spawn = new Spawn(handlers, null, boss_ent, dispatch);
	let distance = 220;
	let caption  = "ENTRAR";
	if (out) {
		distance = 620;
		caption  = "SALIR";
	}
//	boss_spawn.marker(false,  45 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]);
//	boss_spawn.marker(false, 135 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]);
//	boss_spawn.marker(false, 225 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]);
//	boss_spawn.marker(false, 315 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]);
}
function debuff_added(id, handlers, dispatch) {
	debuff_removed(dispatch);
	debuff = id; // debuff event id
	timer1 = dispatch.setTimeout(() => {
		if (debuff != null) {
			handlers["text"]({
				"sub_type": "message",
				"message": "Fim o Debuff en 20s",
				"message_RU": "Дебафф 20 сек."
			});
		}
	}, 50000);
	timer2 = dispatch.setTimeout(() => {
		if (debuff != null) {
			dispatch.setTimeout(() => {
				handlers["text"]({
					"sub_type": "alert",
					"message": (`${debuff_messages[debuff % 2].message}`),
					"message_RU": (`${debuff_messages[debuff % 2].message_RU}`)
				});
			}, 2000);
/*			handlers['text']({
				"sub_type": "message",
				"message": "Debuff 50s",
				"message_RU": "Дебафф 50 сек."
			});*/
		}
	}, 70000);
	timer3 = dispatch.setTimeout(() => {
		if (debuff != null) {
/*			handlers['text']({
				"sub_type": "message",
				"message": "Warning! Debuff 15s",
				"message_RU": "Дебафф 15 сек."
			});*/
		}
	}, 55000);
	timer4 = dispatch.setTimeout(() => {
		if (debuff != null) {
			handlers["text"]({
				"sub_type": "message",
				"message": "Fim do Debuff en 10s",
				"message_RU": "Дебафф 10 сек."
			});
		}
	}, 60000);
	timer5 = dispatch.setTimeout(() => {
		if (debuff != null) {
/*			handlers["text"]({
				"sub_type": "message",
				"message": "Warning! Debuff 5s",
				"message_RU": "Дебафф 5 сек."
			});*/
		}
	}, 65000);
	//
	if (blue) {
		handlers["text"]({
			"sub_type": "message",
			"message": (`${mech_messages[(qbacting + debuff + 1) % 2].message}`),
			"message_RU": (`${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`)
		});
		spawn_marker((qbacting + debuff + 1) % 2, handlers, dispatch);
	} else if (red) {
		handlers["text"]({
			"sub_type": "message",
			"message": (`${mech_messages[(qbacting + debuff) % 2].message}`),
			"message_RU": (`${mech_messages[(qbacting + debuff) % 2].message_RU}`)
		});
		spawn_marker((qbacting + debuff) % 2, handlers, dispatch);
	}
}

function debuff_removed(dispatch) {
	debuff = null;
	dispatch.clearTimeout(timer1);
	dispatch.clearTimeout(timer2);
	dispatch.clearTimeout(timer3);
	dispatch.clearTimeout(timer4);
	dispatch.clearTimeout(timer5);
}

function skilld_event(skillid, handlers, event, ent, dispatch) {
	const spawn = new Spawn(handlers, event, ent, dispatch);
	const abnormality_change = (added, event) => {
		// Fire/Ice debuff
		if (player.isMe(event.target.toString()) && [30260001, 30260002, 31260001, 31260002].includes(event.id)) {
			if (added) {
				debuff_added(event.id, handlers, dispatch);
			} else {
				debuff_removed(dispatch);
			}
		}
		// Argon Priest Essence buff
		if (player.isMe(event.target.toString()) && [30261701, 31261701].includes(event.id)) {
			if (added && boss_ent) {
				let shield_loc = boss_ent["loc"].clone();
				shield_loc.w = boss_ent["loc"].w;
				handlers["spawn"]({ // spawn teleport mark
					"sub_type": "item",
					"id": MARKER_ITEM,
					"sub_delay": 50000,
					"pos": {
						x: 53192,
						y: 100761,
						z: 14233
					}
				}, {
					loc: shield_loc
				});
			}
		}
	};
	// In-Out quest balloons (qbacting => ярость 0, ужас 1)
	if ([3026004, 3126004, 3026005, 3126005].includes(skillid)) {
		qbacting = skillid % 2;
	}
	// Fire/Ice debuff (debuff % 2 => синий 0, красный 1)
	if ([30260001, 31260001, 30260002, 31260002].includes(skillid) && !debuff_tracker_started) {
		debuff_added(skillid, handlers, dispatch);
	}
	if ([212, 213, 214, 215].includes(skillid)) {
		boss_ent = ent;
		spawn.circle(false, 553, 0, 0, 8, 440, 200, 8000);
		spawn.circle(false, 553, 0, 0, 4, 840, 200, 8000);
	}
	if ([212, 214].includes(skillid)) {   // Fire claw (141, 142)
		boss_offset = 10;
		spawn.vector(553, 0, 0, 180, 840, 200, 8000); // Alterado 190>180 Rotaçao
	    spawn.vector(553, 0, 0,  0, 840, 200, 8000);  // Alterado 10>0 Rotaçao
	}
	if ([213, 215].includes(skillid)) {   // Ice claw (143, 144)
		boss_offset = -10;
		spawn.vector(553, 0, 0, 180, 840, 200, 8000);  // Alterado 170>180 Rotaçao
		spawn.vector(553, 0, 0, 360, 840, 200, 8000);  // Alterado 350>360 Rotaçao
	}
	if ([213, 214].includes(skillid)) { // Ice inside
		dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Hielo (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff + 1) % 2].message}`),
					"message_RU": (`Внутри лед (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[debuff % 2 + 2].message_RU} | ${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`),
				});
				spawn_marker((qbacting + debuff + 1) % 2, handlers, dispatch);
			} else {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Hielo (${qbacting_messages[qbacting].message})`),
					"message_RU": (`Внутри лед (${qbacting_messages[qbacting].message_RU})`)
				});
			}
		}, 500);
		blue = true;
		red  = false;
		dispatch.setTimeout(() => {
			blue = false;
			red  = true;
		}, 6600);
		dispatch.setTimeout(() => red = false, 9400);
	}
	if ([212, 215].includes(skillid)) { // Fire inside
		dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Fuego (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff) % 2].message}`),
					"message_RU": (`Внутри огонь (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[debuff % 2 + 2].message_RU} | ${mech_messages[(qbacting + debuff) % 2].message_RU}`)
				});
				spawn_marker((qbacting + debuff) % 2, handlers, dispatch);
			} else {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Fuego (${qbacting_messages[qbacting].message})`),
					"message_RU": (`Внутри огонь (${qbacting_messages[qbacting].message_RU})`)
				});
			}
		}, 500);
		blue = false;
		red  = true;
		dispatch.setTimeout(() => {
			blue = true;
			red  = false;
		}, 6600);
		dispatch.setTimeout(() => blue = false, 9400);
	}
	if (skillid === 99020020) { // Death release debuff
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
	}
	if (!debuff_tracker_started) {
		dispatch.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change.bind(null, true));
		dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));
		debuff_tracker_started = true;
	}
}

let skills = {
	"112-0": [{ "type": "text", "sub_type": "message", "message": "Mano de HIELO (Fuera)", "message_RU": "Лед (полоса)" }],
	"110-0": [{ "type": "text", "sub_type": "message", "message": "Mano de FUEGO (Fuera)", "message_RU": "Огонь (лужа)" }],
	"108-0": [{ "type": "text", "sub_type": "message", "message": "Giro a la Derecha (Derribo!!)", "message_RU": "Поворот вправо (откид!!)" }, { "type": "spawn_func", "func": "circle", "args": [false, 912, 0, 0, 8, 440, 0, 2000] }],
	"158-0": [{ "type": "text", "sub_type": "message", "message": "Giro a la Derecha (Derribo!!)", "message_RU": "Поворот вправо (откид!!)" }, { "type": "spawn_func", "func": "circle", "args": [false, 912, 0, 0, 8, 440, 0, 2000] }],
	"109-0": [{ "type": "text", "sub_type": "message", "message": "Giro a la izquierda (Derribo!!)", "message_RU": "Поворот влево (откид!!)" }, { "type": "spawn_func", "func": "circle", "args": [false, 912, 0, 0, 8, 440, 0, 2000] }],
	"159-0": [{ "type": "text", "sub_type": "message", "message": "Giro a la izquierda (Derribo!!)", "message_RU": "Поворот влево (откид!!)" }, { "type": "spawn_func", "func": "circle", "args": [false, 912, 0, 0, 8, 440, 0, 2000] }],
	"120-0": [{ "type": "text", "sub_type": "message", "message": "JUNTAR", "message_RU": "Яростный рев" }], 
	"145-0": [{ "type": "text", "sub_type": "message", "message": "Stun", "message_RU": "Стан" }],
//	"157-0": [{ "type": "text", "sub_type": "message", "message": "Change", "message_RU": "Смена" }],
	"103-0": [{ "type": "text", "sub_type": "message", "message": "Cola (Vuela!!)", "message_RU": "Хвост (полет!!)" },
		{ "type": "spawn_func", "func": "semicircle", "args": [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 140, 500, 0, 2000] },  //135>140 alterado Dentro
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 260, 500, 0, 2000] }
	],
	"153-0": [{ "type": "text","sub_type": "message", "message": "Cola (Vuela!!)", "message_RU": "Хвост (полет!!)" },
		{ "type": "spawn_func", "func": "semicircle", "args": [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 140, 500, 0, 2000] },  //135>140 alterado Dentro
	    { "type": "spawn_func", "func": "vector", "args": [553, 0, 0, 260, 500, 0, 2000] }
	],
	"114-0": [{ "type": "text", "sub_type": "message", "message": "Frente | Fuego", "message_RU": "Огонь впереди" }],
	"118-0": [{ "type": "text", "sub_type": "message", "message": "Jugar al Alto (iframe)", "message_RU": "Прыжок" }],
//	"118-1": [{"type": "text","sub_type": "message","delay": 95,"message": "(Iframe)","message_RU": "Эвейд!"}],
	// AOE лед (большой)
	"104-0": [{ "type": "text", "sub_type": "message", "message": "Magia de HIELO (GRANDE)", "message_RU": "Ледяные лужи" }, { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 80, 8, 520, 0, 6500] }], //0>80 | 500>520 alterado
	// AOE огонь (большой)
	"105-0": [{ "type": "text", "sub_type": "message", "message": "AOE de FUEGO (GRANDE)", "message_RU": "Огненные бомбы" },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 135, 500, 10, 270, 0, 3000] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 315, 500, 10, 270, 0, 3250] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 45, 500, 10, 270, 0, 3500] }, 
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 232, 500, 10, 270, 0, 3750] }, //Alterado 235>232
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 90, 500, 10, 270, 0, 4000] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 270, 500, 10, 270, 0, 4250] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 500, 10, 270, 0, 4500] },
		{ "type": "spawn_func", "func": "circle", "args": [false, 553, 180, 500, 10, 270, 0, 4750] }  
	],
	// AOE лед (малый)
	"154-0": [{ "type": "text", "sub_type": "message", "message": "Magia de HIELO (Pequeno)", "message_RU": "Ледяной шторм" }, { "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 80, 8, 520, 0, 6500] }], //0>80 | 500>520 alterado
	// AOE огонь (малый)
	"155-0": [{ "type": "text", "sub_type": "message", "message": "AOE de FUEGO (Pequeno)", "message_RU": "Огненный столб (опрокид)" }
//		{"type": "text","sub_type": "message","delay": 1200,"message": "Dodge","message_RU": "Эвейд"}
	],
	//
	"206-0": [{ "type": "text", "sub_type": "message", "message": "Salto Atras", "message_RU": "Прыжок назад" }],
	//	"206-2": [{ "type": "spawn_func", "func": "circle", "args": [false, 553, 0, 0, 15, 350, 0, 3000] }],
    "164-0": [{ "type": "text", "sub_type": "message", "message": "R.I.P xD e.e (100%)", "message_RU": "Прыжок назад" }],
	"165-0": [{ "type": "text", "sub_type": "message", "message": "R.I.P xD e.e (0%)", "message_RU": "Прыжок назад" }],
	"137-0": [{ "type": "text", "sub_type": "message", "message": "Tumbar + Explosion Ampla (50metros)", "message_RU": "Опрокидывание" }],
	"138-0": [{ "type": "text", "sub_type": "message", "message": "Explosion Ampla!!", "message_RU": "AOE" }],
	"139-0": [{ "type": "text", "sub_type": "message", "message": "60+ Todos (Fuego)", "message_RU": "60° (Огонь всем)" },
			  { "type": "text", "sub_type": "message", "delay": 4000, "message": "Suba la temperatura", "message_RU": "Снизить температуру" }
	],
	"140-0": [{ "type": "text", "sub_type": "message", "message": "40- Todos (Hielo)", "message_RU": "40° (Лед всем)" },
	     	  { "type": "text", "sub_type": "message", "delay": 4000, "message": "Abaja la temperatura", "message_RU": "Повысить температуру" }
	], 
	//
	"s-3126-1000-1212-0": [{ "type": "func", "func": skilld_event.bind(null, 212) }],
	"s-3126-1000-1215-0": [{ "type": "func", "func": skilld_event.bind(null, 215) }],
	"s-3126-1000-1213-0": [{ "type": "func", "func": skilld_event.bind(null, 213) }],
	"s-3126-1000-1214-0": [{ "type": "func", "func": skilld_event.bind(null, 214) }],
	"qb-3126-1000-3026005": [{ "type": "func", "func": skilld_event.bind(null, 3026005) }], // ужас, одинаковые цвета
	"qb-3126-1000-3026004": [{ "type": "func", "func": skilld_event.bind(null, 3026004) }], // ярость, разные цвета
	"qb-3126-1000-3126005": [{ "type": "func", "func": skilld_event.bind(null, 3126005) }], // ужас, одинаковые цвета
	"qb-3126-1000-3126004": [{ "type": "func", "func": skilld_event.bind(null, 3126004) }], // ярость, разные цвета
	"ae-0-0-99020020": [{ "type": "func", "func": skilld_event.bind(null, 99020020) }],
	"am-3126-1000-30260001": [{ "type": "func", "func": skilld_event.bind(null, 30260001) }], // красный
	"am-3126-1000-30260002": [{ "type": "func", "func": skilld_event.bind(null, 30260002) }], // синий
	"am-3126-1000-31260001": [{ "type": "func", "func": skilld_event.bind(null, 31260001) }], // красный
	"am-3126-1000-31260002": [{ "type": "func", "func": skilld_event.bind(null, 31260002) }], // синий

	"s-3126-1000-1107-0": [{ "type": "text", "sub_type": "message", "message": "[Debuff] Mas Lejos", "message_RU": "[Дебафф] Дальние" }],
	"s-3126-1000-2107-0": [{ "type": "text", "sub_type": "message", "message": "[Debuff] Mas Cerca", "message_RU": "[Дебафф] Ближние" }],
	"am-3126-1000-31260251": [{ "type": "text", "sub_type": "message", "message": "[Debuff] Layer 1", "message_RU": "[Дебафф] 1 стак" }],
	"am-3126-1000-31260067": [{ "type": "text", "sub_type": "message", "message": "[Debuff] Layer 2", "message_RU": "[Дебафф] 2 стак" }],
	"am-3126-1000-31260068": [
		{ "type": "text", "sub_type": "message", "message": "[Debuff] Layer 3", "message_RU": "[Дебафф] 3 стак" },
		{ "type": "text", "sub_type": "message", "delay": 145000, "message": '[Debuff] 2.5 minutos pasados', "message_RU": "[Дебафф] Прошло 2.5 минуты (стаки удалены)" }
	]
};
module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	}
};

for (let [key, value] of Object.entries(skills)) {
	if (key.length === 5) {
		module.exports["s-3126-1000-1" + key] = value;
		module.exports["s-3126-1000-2" + key] = value;
	} else {
		module.exports[key] = value;
	}
}