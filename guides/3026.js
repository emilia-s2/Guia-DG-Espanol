// Corrupted Skynest (Normal)
//
// made by michengs / HSDN / ZC

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	const { player } = dispatch.require.library;
	const { MARKER_ITEM } = module.parent.exports.spawn;

	let debuff = null;
	let timer1 = null;
	let timer2 = null;
	let timer3 = null;
	let timer4 = null;
	let timer5 = null;
	let boss_ent = null;
	let boss_offset = 0;
	let qbacting = null;
	let blue = false;
	let red = false;
	let debuff_tracker_started = false;

	const mech_messages = {
		0: { message_ES: "ENTRAR", message_RU: "К НЕМУ" },
		1: { message_ES: "SALIR", message_RU: "ОТ НЕГО" }
	};

	const qbacting_messages = {
		0: { message_ES: "Diferente", message_RU: "разные" },
		1: { message_ES: "Igual", message_RU: "одинаковые" }
	};

	const debuff_messages = {
		0: { message_ES: "Listo para obter Debuff de FUEGO", message_RU: "Готовность к переключению на Огонь" },
		1: { message_ES: "Listo para obter Debuff de HIELO", message_RU: "Готовность к переключению на Лед" }
	};

	// NULL % 2 = 0
	//	  1 % 2 = 1
	//	  0 % 2 = 0
	//	  2 % 2 = 0

	function spawn_marker(out) {
		if (!boss_ent) return;

		let distance = 220;
		let caption = "IN";

		if (out) {
			distance = 620;
			caption = "OUT";
		}

		handlers.event([
//			{ type: "spawn", func: "marker", args: [false, 45 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
//			{ type: "spawn", func: "marker", args: [false, 135 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
//			{ type: "spawn", func: "marker", args: [false, 225 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
//			{ type: "spawn", func: "marker", args: [false, 315 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] }
		], boss_ent);
	}

	function debuff_added(id) {
		debuff_removed();
		debuff = id; // debuff event id

		timer1 = dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers.text({
					sub_type: "message",
					message_ES: "Fin del Debuff en 20 secundos",
					message_RU: "Дебафф 20 сек."
				});
			}
		}, 70000);

		timer2 = dispatch.setTimeout(() => {
			if (debuff != null) {
				dispatch.setTimeout(() => {
					handlers.text({
						sub_type: "alert",
						message_ES: (`${debuff_messages[debuff % 2].message_ES}`),
						message_RU: (`${debuff_messages[debuff % 2].message_RU}`)
					});
				}, 2000);

/*				handlers.text({
					sub_type: "message",
					message_ES: "Debuff 50 seconds",
					message_RU: "Дебафф 50 сек."
				});*/
			}
		}, 40000);

		timer3 = dispatch.setTimeout(() => {
			if (debuff != null) {
/*				handlers.text({
					sub_type: "message",
					message_ES: "Warning! Debuff 15 seconds",
					message_RU: "Дебафф 15 сек."
				});*/
			}
		}, 75000);

		timer4 = dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers.text({
					sub_type: "message",
					message_ES: "Fin del Debuff en 10 secundos",
					message_RU: "Дебафф 10 сек."
				});
			}
		}, 80000);

		timer5 = dispatch.setTimeout(() => {
			if (debuff != null) {
/*				handlers.text({
					sub_type: "message",
					message_ES: "Warning! Debuff 5 seconds",
					message_RU: "Дебафф 5 сек."
				});*/
			}
		}, 85000);

		if (blue) {
			handlers.text({
				sub_type: "message",
				message_ES: (`${mech_messages[(qbacting + debuff + 1) % 2].message_ES}`),
				message_RU: (`${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`)
			});

			spawn_marker((qbacting + debuff + 1) % 2);
		} else if (red) {
			handlers.text({
				sub_type: "message",
				message_ES: (`${mech_messages[(qbacting + debuff) % 2].message_ES}`),
				message_RU: (`${mech_messages[(qbacting + debuff) % 2].message_RU}`)
			});

			spawn_marker((qbacting + debuff) % 2);
		}
	}

	function debuff_removed() {
		debuff = null;
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
		dispatch.clearTimeout(timer3);
		dispatch.clearTimeout(timer4);
		dispatch.clearTimeout(timer5);
	}

	function skilld_event(skillid, ent) {
		const abnormality_change = (added, event) => {
			// Fire/Ice debuff
			if (player.isMe(event.target.toString()) && [30260001, 30260002, 31260001, 31260002].includes(event.id)) {
				if (added) {
					debuff_added(event.id);
				} else {
					debuff_removed();
				}
			}

			// Argon Priest Essence buff
			if (player.isMe(event.target.toString()) && [30261701, 31261701].includes(event.id)) {
				if (added && boss_ent) {
					handlers.spawn({ // spawn teleport mark
						sub_type: "item",
						id: MARKER_ITEM,
						sub_delay: 50000,
						pos: {
							x: 53192,
							y: 100761,
							z: 14233
						}
					}, boss_ent);
				}
			}
		};

		// In-Out quest balloons (qbacting => ярость 0, ужас 1)
		if ([3026004, 3126004, 3026005, 3126005].includes(skillid)) {
			qbacting = skillid % 2;
		}

		// Fire/Ice debuff (debuff % 2 => синий 0, красный 1)
		if ([30260001, 31260001, 30260002, 31260002].includes(skillid) && !debuff_tracker_started) {
			debuff_added(skillid);
		}

		// In-Out identification
		if ([212, 213, 214, 215].includes(skillid)) {
			boss_ent = ent;
			handlers.event([
				{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 440, 200, 8000] },
				{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 4, 840, 200, 8000] }
			]);
		}

		if ([212, 214].includes(skillid)) { // Fire claw (141, 142)
			boss_offset = 10;
			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 840, 200, 8000] }, // Alterado 190>180 Rotaçao
				{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 840, 200, 8000] }	  // Alterado 10>0 Rotaçao
			]);
		}

		if ([213, 215].includes(skillid)) { // Ice claw (143, 144)
			boss_offset = -10;
			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 840, 200, 8000] }, // Alterado 170>180 Rotaçao
				{ type: "spawn", func: "vector", args: [553, 0, 0, 360, 840, 200, 8000] }  // Alterado 350>360 Rotaçao
			]);
		}

		if ([213, 214].includes(skillid)) { // Ice inside
			dispatch.setTimeout(() => {
				if (debuff != null) {
					handlers.text({
						sub_type: "message",
						message_ES: (`Hielo (${qbacting_messages[qbacting].message_ES}) | ${mech_messages[(qbacting + debuff + 1) % 2].message_ES}`),
						message_RU: (`Внутри лед (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`)
					});

					spawn_marker((qbacting + debuff + 1) % 2);
				} else {
					handlers.text({
						sub_type: "message",
						message_ES: (`Hielo (${qbacting_messages[qbacting].message_ES})`),
						message_RU: (`Внутри лед (${qbacting_messages[qbacting].message_RU})`)
					});
				}
			}, 500);

			blue = true;
			red = false;

			dispatch.setTimeout(() => blue = false, 6500); //6700
		}

		if ([212, 215].includes(skillid)) { // Fire inside
			dispatch.setTimeout(() => {
				if (debuff != null) {
					handlers.text({
						sub_type: "message",
						message_ES: (`Fuego (${qbacting_messages[qbacting].message_ES}) | ${mech_messages[(qbacting + debuff) % 2].message_ES}`),
						message_RU: (`Внутри огонь (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[(qbacting + debuff) % 2].message_RU}`)
					});

					spawn_marker((qbacting + debuff) % 2);
				} else {
					handlers.text({
						sub_type: "message",
						message_ES: (`Fuego (${qbacting_messages[qbacting].message_ES})`),
						message_RU: (`Внутри огонь (${qbacting_messages[qbacting].message_RU})`)
					});
				}
			}, 500);

			blue = false;
			red = true;

			dispatch.setTimeout(() => red = false, 6500);
		}

		if (!debuff_tracker_started) {
			dispatch.hook("S_ABNORMALITY_BEGIN", dispatch._mod.majorPatchVersion >= 107 ? 5 : 4, abnormality_change.bind(null, true));
			dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));

			debuff_tracker_started = true;
		}
	}

	return {
		"s-3026-1000-1112-0": [{ type: "text", sub_type: "message", message_ES: "Mano de HIELO (Fuera)", message_RU: "Лед (полоса)" }],
		"s-3026-1000-2112-0": [{ type: "text", sub_type: "message", message_ES: "Mano de HIELO (Fuera)", message_RU: "Лед (полоса)" }],
		"s-3026-1000-1110-0": [{ type: "text", sub_type: "message", message_ES: "Mano de FUEGO (Fuera)", message_RU: "Огонь (лужа)" }],
		"s-3026-1000-2110-0": [{ type: "text", sub_type: "message", message_ES: "Mano de FUEGO (Fuera)", message_RU: "Огонь (лужа)" }],
		"s-3026-1000-1108-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Derecha (Derribo!!)", message_RU: "Поворот вправо (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-2108-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Derecha (Derribo!!)", message_RU: "Поворот вправо (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-1158-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Derecha (Derribo!!)", message_RU: "Поворот вправо (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-2158-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Derecha (Derribo!!)", message_RU: "Поворот вправо (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-1109-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Izquierda (Derribo!!)", message_RU: "Поворот влево (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-2109-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Izquierda (Derribo!!)", message_RU: "Поворот влево (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-1159-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Izquierda (Derribo!!)", message_RU: "Поворот влево (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-2159-0": [
			{ type: "text", sub_type: "message", message_ES: "Giro a la Izquierda (Derribo!!)", message_RU: "Поворот влево (откид)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"s-3026-1000-1120-0": [{ type: "text", sub_type: "message", message_ES: "JUNTAR", message_RU: "Яростный рев" }],
		"s-3026-1000-2120-0": [{ type: "text", sub_type: "message", message_ES: "JUNTAR", message_RU: "Яростный рев" }],
		"s-3026-1000-1145-0": [{ type: "text", sub_type: "message", message_ES: "Pies (Stun)", message_RU: "Стан" }],
		"s-3026-1000-2145-0": [{ type: "text", sub_type: "message", message_ES: "Pies (Stun)", message_RU: "Стан" }],
		"s-3026-1000-1103-0": [
			{ type: "text", sub_type: "message", message_ES: "Cola (Vuela!!)", message_RU: "Хвост (полет)" },
			{ type: "text", sub_type: "message", message_ES: "Arise!", message_RU: "Удочка!", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 260, 500, 0, 2000] }
		],
		"s-3026-1000-2103-0": [
			{ type: "text", sub_type: "message", message_ES: "Cola (Vuela!!)", message_RU: "Хвост (полет)" },
			{ type: "text", sub_type: "message", message_ES: "Arise!", message_RU: "Удочка!", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 260, 500, 0, 2000] }
		],
		"s-3026-1000-1153-0": [
			{ type: "text", sub_type: "message", message_ES: "Cola (Vuela!!)", message_RU: "Хвост (полет!!)" },
			{ type: "text", sub_type: "message", message_ES: "Arise!", message_RU: "Удочка!", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 260, 500, 0, 2000] }
		],
		"s-3026-1000-2153-0": [
			{ type: "text", sub_type: "message", message_ES: "Cola (Vuela!!)", message_RU: "Хвост (полет!!)" },
			{ type: "text", sub_type: "message", message_ES: "Arise!", message_RU: "Удочка!", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 553, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 260, 500, 0, 2000] }
		],
		"s-3026-1000-1118-0": [{ type: "text", sub_type: "message", message_ES: "Jugar al Alto (iframe)", message_RU: "Прыжок" }],
		"s-3026-1000-2118-0": [{ type: "text", sub_type: "message", message_ES: "Jugar al Alto (iframe)", message_RU: "Прыжок" }],
		"s-3026-1000-1118-1": [{ type: "text", sub_type: "message", message_ES: "Iframe", message_RU: "Эвейд!", delay: 615 }],
		"s-3026-1000-2118-1": [{ type: "text", sub_type: "message", message_ES: "Iframe", message_RU: "Эвейд!", delay: 625 }],

		// AOE лед (большой)
		"s-3026-1000-1104-0": [
			{ type: "text", sub_type: "message", message_ES: "Magia de HIELO (GRANDE)", message_RU: "Ледяные лужи" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 73, 8, 520, 0, 6500] }
		],
		"s-3026-1000-2104-0": [
			{ type: "text", sub_type: "message", message_ES: "Magia de HIELO (GRANDE)", message_RU: "Ледяные лужи" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 73, 8, 520, 0, 6500] }
		],
		// AOE огонь (большой)
		"s-3026-1000-1105-0": [
			{ type: "text", sub_type: "message", message_ES: "AOE de FUEGO (GRANDE)", message_RU: "Огненные бомбы" },
			{ type: "spawn", func: "circle", args: [false, 553, 135, 500, 10, 270, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 315, 500, 10, 270, 0, 3250] },
			{ type: "spawn", func: "circle", args: [false, 553, 45, 500, 10, 270, 0, 3500] },
			{ type: "spawn", func: "circle", args: [false, 553, 235, 500, 10, 270, 0, 3750] },
			{ type: "spawn", func: "circle", args: [false, 553, 90, 500, 10, 270, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 270, 500, 10, 270, 0, 4250] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 500, 10, 270, 0, 4500] },
			{ type: "spawn", func: "circle", args: [false, 553, 180, 500, 10, 270, 0, 4750] }
		],
		"s-3026-1000-2105-0": [
			{ type: "text", sub_type: "message", message_ES: "AOE de FUEGO (GRANDE)", message_RU: "Огненные бомбы" },
			{ type: "spawn", func: "circle", args: [false, 553, 135, 500, 10, 270, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 315, 500, 10, 270, 0, 3250] },
			{ type: "spawn", func: "circle", args: [false, 553, 45, 500, 10, 270, 0, 3500] },
			{ type: "spawn", func: "circle", args: [false, 553, 235, 500, 10, 270, 0, 3750] },
			{ type: "spawn", func: "circle", args: [false, 553, 90, 500, 10, 270, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 270, 500, 10, 270, 0, 4250] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 500, 10, 270, 0, 4500] },
			{ type: "spawn", func: "circle", args: [false, 553, 180, 500, 10, 270, 0, 4750] }
		],
		// AOE лед (малый)
		"s-3026-1000-1154-0": [
			{ type: "text", sub_type: "message", message_ES: "Magia de HIELO (Pequeno)", message_RU: "Ледяной шторм" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 73, 8, 520, 0, 6500] }
		],
		"s-3026-1000-2154-0": [
			{ type: "text", sub_type: "message", message_ES: "Magia de HIELO (Pequeno)", message_RU: "Ледяной шторм" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 73, 8, 520, 0, 6500] }
		],
		// AOE огонь (малый)
		"s-3026-1000-1155-0": [{ type: "text", sub_type: "message", message_ES: "AOE de FUEGO (Pequeno)", message_RU: "Огненный столб (опрокид)" }],
		"s-3026-1000-2155-0": [{ type: "text", sub_type: "message", message_ES: "AOE de FUEGO (Pequeno)", message_RU: "Огненный столб (опрокид)" }],

		"s-3026-1000-1206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atras", message_RU: "Прыжок назад" }],
		"s-3026-1000-2206-0": [{ type: "text", sub_type: "message", message_ES: "Salto Atras", message_RU: "Прыжок назад" }],
		"s-3026-1000-1164-0": [{ type: "text", sub_type: "message", message_ES: "R.I.P xD e.e (100%)", message_RU: "Прыжок назад" }], 
		"s-3026-1000-2164-0": [{ type: "text", sub_type: "message", message_ES: "R.I.P xD e.e (100%)", message_RU: "Прыжок назад" }],
		"s-3026-1000-1165-0": [{ type: "text", sub_type: "message", message_ES: "R.I.P xD e.e (0%)", message_RU: "Прыжок назад" }],
		"s-3026-1000-2165-0": [{ type: "text", sub_type: "message", message_ES: "R.I.P xD e.e (0%)", message_RU: "Прыжок назад" }],
		"s-3026-1000-1137-0": [{ type: "text", sub_type: "message", message_ES: "Tumbar + Explosión Ampla (50metros)", message_RU: "Опрокидывание" }],
		"s-3026-1000-2137-0": [{ type: "text", sub_type: "message", message_ES: "Tumbar + Explosión Ampla (50metros)", message_RU: "Опрокидывание" }],
		"s-3026-1000-1138-0": [{ type: "text", sub_type: "message", message_ES: "Explosión (Esquiva)", message_RU: "AOE", delay: 1720 }],
		"s-3026-1000-2138-0": [{ type: "text", sub_type: "message", message_ES: "Explosión (Esquiva)", message_RU: "AOE", delay: 1720 }],

		"die": [{ type: "func", func: debuff_removed }],
		"nd-3026-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3026-1000-1212-0": [{ type: "func", func: skilld_event, args: [212] }],
		"s-3026-1000-1215-0": [{ type: "func", func: skilld_event, args: [215] }],
		"s-3026-1000-1213-0": [{ type: "func", func: skilld_event, args: [213] }],
		"s-3026-1000-1214-0": [{ type: "func", func: skilld_event, args: [214] }],
		"qb-3026-1000-3026005": [{ type: "func", func: skilld_event, args: [3026005] }], // ужас, одинаковые цвета
		"qb-3026-1000-3026004": [{ type: "func", func: skilld_event, args: [3026004] }], // ярость, разные цвета
		"qb-3026-1000-3126005": [{ type: "func", func: skilld_event, args: [3126005] }], // ужас, одинаковые цвета
		"qb-3026-1000-3126004": [{ type: "func", func: skilld_event, args: [3126004] }], // ярость, разные цвета
		"am-3026-1000-30260001": [{ type: "func", func: skilld_event, args: [30260001] }], // красный
		"am-3026-1000-30260002": [{ type: "func", func: skilld_event, args: [30260002] }], // синий
		"am-3026-1000-31260001": [{ type: "func", func: skilld_event, args: [31260001] }], // красный
		"am-3026-1000-31260002": [{ type: "func", func: skilld_event, args: [31260002] }] // синий
	};
};