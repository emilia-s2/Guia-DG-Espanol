// Gossamer Vault (Dificil)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	let notice = true;
	let boss = null;

	function secondboss_start_event() {
		notice = true;
		boss = null;
	}

	function secondboss_debuff_event(skillid) {
		if (skillid === 32010224) { // false debuff (next true)
			boss = 1;

			dispatch.setTimeout(() => {
				if (boss === 1) {
					handlers.text({
						sub_type: "message",
						message_RU: "Смена дебаффа",
						message_ES: "Cargar Debuff"
					});
					boss = null;
				}
			}, 80000);
		}

		if (skillid === 32010220) { // true debuff (next false)
			boss = 0;

			dispatch.setTimeout(() => {
				if (boss === 0){
					handlers.text({
						sub_type: "message",
						message_RU: "Смена дебаффа",
						message_ES: "Cargar Debuff"
					});
					boss = null;
				}
			}, 80000);
		}

		if ([203, 204].includes(skillid)) {
			notice = false;
			dispatch.setTimeout(() => notice = true, 4000);

			dispatch.setTimeout(() => {
/*				handlers.text({
					sub_type: "alert",
					message_RU: "Скоро дебафф...",
					message_ES: "Debuff Pronto..."
				});*/
			}, 55000);
		}

		if (notice && skillid === 234) {
/*			dispatch.setTimeout(() => {
				handlers.text({
					sub_type: "alert",
					message_RU: "Скоро дебафф...",
					message_ES: "Debuff Pronto..."
				});*/
			}, 55000);
		}
	}

	return {
		// 1 BOSS
		"nd-3201-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		//"s-3201-1000-103-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Dodge", message_RU: "Эвейд!" }],
		"s-3201-1000-104-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Stun Frontal", message_RU: "Стан!" }],
		"s-3201-1000-107-0": [
			{ type: "text", sub_type: "message", message_ES: "Empujar Atras (Lento)", message_RU: "|Полоса|" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 3500] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 3500] } //Adicionado
		],

		"s-3201-1000-111-0": [{ type: "text", sub_type: "message", message_ES: "Spray Atras (Lento)", message_RU: "Волна назад" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 3500] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 3500] }  //Adicionado
		],
		"s-3201-1000-112-0": [{ type: "text", sub_type: "message", message_ES: "<-Spray IZQUIERDO e DERECHO->", message_RU: "Лево + Право" }],
		"s-3201-1000-113-0": [
			{ type: "text", sub_type: "message", message_ES: "Salto (Lento)", message_RU: "Прыжок" },
			{ type: "text", sub_type: "message", delay: 1900, message_ES: "Iframe", message_RU: "Камень!" }
		],
		"s-3201-1000-118-0": [
			{ type: "text", sub_type: "message", message_ES: "Salto (Lento)", message_RU: "Прыжок" },
			{ type: "text", sub_type: "message", delay: 1900, message_ES: "Iframe", message_RU: "Камень!" },
		],
		"s-3201-1000-119-0": [{ type: "text", sub_type: "message", delay: 0, message_ES: "Spray FRENTE e ATRAS", message_RU: "Вперед + Назад" },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }  //Adicionado
	    ],
		//"s-3201-1000-121-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Right", message_RU: "Право" }],
		//"s-3201-1000-122-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Left", message_RU: "Лево" }],
		"s-3201-1000-124-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Stun Frontal", message_RU: "Стан (фаст)" }],
		"s-3201-1000-127-0": [{ type: "text", class_position:"dps", sub_type: "message", message_ES: "Empujar Atras (Rapido)", message_RU: "Полоса (фаст)" },
			{ type: "text", class_position:"heal", sub_type: "message", message_ES: "Empujar Atras (Rapido)", message_RU: "Полоса (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 2000] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 2000] } //Adicionado
		],
		//"s-3201-1000-128-0": [{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Triple Attack", message_RU: "Комба" }],
		"s-3201-1000-131-0": [{ type: "text", class_position:"dps", sub_type: "message", message_ES: "Spray Atras (Rapido)", message_RU: "Волна назад (фаст)" },
			{ type: "text", class_position:"heal", sub_type: "message", message_ES: "Spray Atras (Rapido)", message_RU: "Волна назад (фаст)" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 2000] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 2000] } //Adicionado
		],
		"s-3201-1000-132-0": [{ type: "text", sub_type: "message", message_ES: "<-Spray IZQUIERDO e DERECHO->", message_RU: "Лево + Право (фаст)" }],
		"s-3201-1000-133-0": [{ type: "text", sub_type: "message", delay: 0, message_ES: "Salto (Rapido)", message_RU: "Прыжок (фаст)" },
		{ type: "text", sub_type: "message", delay: 900, message_ES: "Iframe", message_RU: "Камень!" }
		],
		"s-3201-1000-138-0": [{ type: "text", sub_type: "message", delay: 0, message_ES: "Salto (Rapido)", message_RU: "Прыжок (фаст)" },
		{ type: "text", sub_type: "message", delay: 900, message_ES: "Iframe", message_RU: "Камень!" }
		],
		"s-3201-1000-139-0": [{ type: "text", sub_type: "message", message_ES: "Spray FRENTE e ATRAS (Rapido)", message_RU: "Вперед + Назад (фаст)" },
		    { type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },  //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] }, //Adicionado
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }  //Adicionado
	    ],
/*		"s-3201-1000-143-0": [
			{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Left > Right", message_RU: "Слева > Справа" },
			{ type: "text", class_position:"dps", sub_type: "message", message_ES: "Right > Left", message_RU: "Справа > Слева" },
			{ type: "text", class_position:"heal", sub_type: "message", message_ES: "Right > Left", message_RU: "Справа > Слева" },
			{ type: "spawn", func: "marker", args: [false, 150, 300, 100, 2715, true, null] },  // 1
			{ type: "spawn", func: "marker", args: [false, 225, 300, 2800, 4175, true, null] }, // 6
			{ type: "spawn", func: "marker", args: [false, 30, 300, 100, 1000, true, null] },   // 1
			{ type: "spawn", func: "marker", args: [false, 330, 300, 1100, 5000, true, null] }  // 7
		],
		"s-3201-1000-145-0": [
			{ type: "text", class_position:"tank", sub_type: "message", message_ES: "Left > Right", message_RU: "Слева > Справа" },
			{ type: "text", class_position:"dps", sub_type: "message", message_ES: "Right > Left", message_RU: "Справа > Слева" },
			{ type: "text", class_position:"heal", sub_type: "message", message_ES: "Right > Left", message_RU: "Справа > Слева" },
			{ type: "spawn", func: "marker", args: [false, 30, 300, 100, 1000, true, null] },   // 1
			{ type: "spawn", func: "marker", args: [false, 330, 300, 1100, 5000, true, null] }, // 7
			{ type: "spawn", func: "marker", args: [false, 150, 300, 100, 2000, true, null] },  // 1
			{ type: "spawn", func: "marker", args: [false, 225, 300, 2500, 5000, true, null] }  // 6
		],*/
		"s-3201-1000-148-0": [{ type: "text", sub_type: "message", message_ES: "Golpe Mano Derecha (volando)", message_RU: "Правая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 20, 150, 10, 320, 0, 4000] }  //Adicionado
		],
		"s-3201-1000-149-0": [{ type: "text", sub_type: "message", message_ES: "Golpe Mano Izquierda (volando)", message_RU: "Левая рука (подлет)" },
			{ type: "spawn", func: "circle", args: [false, 553, 340, 150, 10, 320, 0, 4000] }  //Adicionado
		],
		"s-3201-1000-151-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Stun", message_RU: "Стан!" }],
		"s-3201-1000-305-0": [{ type: "text", sub_type: "message", message_ES: "Pizza", message_RU: "Pizza" }],
		"s-3201-1000-311-0": [
			{ type: "text", sub_type: "message", message_ES: "Ataque en Pantalla Llena (Lento)", message_RU: "Правая рука (подлет)" },
			{ type: "text", sub_type: "message", delay: 4200, message_ES: "Iframe", message_RU: "Откид!" }
		],
		"s-3201-1000-312-0": [
			{ type: "text", sub_type: "message", message_ES: "Ataque en Pantalla Llena (Radio)", message_RU: "Правая рука (подлет)" },
			{ type: "text", sub_type: "message", delay: 2200, message_ES: "Iframe", message_RU: "Откид!" }
		],
		"s-3201-1000-313-0": [
			{ type: "text", sub_type: "message", message_ES: "DENTRO y FUERA (Lento)", message_RU: "Кольцо" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],
		"s-3201-1000-314-0": [
			{ type: "text", sub_type: "message", message_ES: "DENTRO y FUERA (Rapido)", message_RU: "Кольцо (фаст)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],

		// 2 BOSS
		"nd-3201-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3201-2000-99": [{ type: "func", func: secondboss_start_event }],
		"h-3201-2000-81": [{ type: "text", sub_type: "message", message_ES: "80%", message_RU: "Дебафф" }],
		"h-3201-2000-76": [{ type: "text", sub_type: "message", message_ES: "75%", message_RU: "Камни" }],
		"s-3201-2000-108-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Frente | Atras", message_RU: "Откид назад!" }],
		"s-3201-2000-150-0": [{ type: "text", sub_type: "message", message_ES: "Fantasma", message_RU: "Фантом" }],
		"s-3201-2000-203-0": [{ type: "func", func: secondboss_debuff_event, args: [203] }],
		"s-3201-2000-204-0": [{ type: "func", func: secondboss_debuff_event, args: [204] }],

		"am-3201-320126-32010224": [
			{ type: "text", sub_type: "alert", delay: 52000, message_ES: "REAL Debuff en 5 secundos", message_RU: "След. правда" }, //Alterado
			{ type: "func", func: secondboss_debuff_event, args: [32010224] }
		],
		"am-3201-2000-32010220": [
			{ type: "text", sub_type: "alert", delay: 52000, message_ES: "FAKE Debuff en 5 secundos", message_RU: "След. ложь" },   //Alterado
			{ type: "func", func: secondboss_debuff_event, args: [32010220] }
		],
		"s-3201-2000-228-0": [ 
			{ type: "text", sub_type: "message", message_ES: "Juntar Time", message_RU: "Камни (вместе)!!!" },
			{ type: "text", sub_type: "message", delay: 4000, message_ES: "Esquiva", message_RU: "Эвейд" }
		],
		"s-3201-2000-230-0": [{ type: "text", sub_type: "message", message_ES: "AOE", message_RU: "AOE!!" }],

		"s-3201-2000-231-0": [
			{ type: "text", sub_type: "message", message_ES: "SALIR", message_RU: "От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] }
		],
		"s-3201-2000-232-0": [{ type: "text", sub_type: "message", message_ES: "ENTRAR", message_RU: "К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 3, 1000, 0, 3000] }
		],
		"s-3201-2000-234-0": [{ type: "func", func: secondboss_debuff_event, args: [234] }],
		"s-3201-2000-235-0": [{ type: "text", sub_type: "message", message_ES: "Debuffs", message_RU: "注视2人吃鉴定" }],
		"s-3201-2000-236-0": [{ type: "text", sub_type: "message", message_ES: "Repeler a Frente", message_RU: "Конус вперед (байт)" }],
	};
};