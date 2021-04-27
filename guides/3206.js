// Crimson Killing Grounds
//
// made by HSDN / Kuroine

module.exports = (dispatch, handlers, guide, lang) => {

	let combo_start = false;

	dispatch.hook("S_USER_EFFECT", 1, event => {
		if (event.circle == 3 && event.operation == 1) {
			handlers.marker({ id: event.target, color: "yellow", sub_delay: 1000000 });
		} else if (event.circle == 3 && event.operation == 2) {
			handlers.marker_remove_all({ delay: 1000 });
		}
	});

	return {
		"nd-3206-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "marker_remove_all" }
		],
		"h-3206-1000-99": [
			{ type: "spawn", func: "marker", args: [false, 3, -700, 100, 60000000, false, ["Giant", "Giant Dirección"]] }
		],

		"qb-3206-1000-32061001": [
			{ type: "text", sub_type: "message", message: "Debuff (Close)", message_ES: "Debuff (Cercano)" },
			{ type: "text", sub_type: "alert", message: "Soon to give stun...", message_ES: "Usar Stun Pronto...", delay: 2000 }
		],
		"qb-3206-1000-32061002": [
			{ type: "text", sub_type: "message", message: "Debuff (Furthest)", message_ES: "Debuff (Más lejos)" },
			{ type: "text", sub_type: "alert", message: "Soon to give stun...", message_ES: "Usar Stun Pronto...", delay: 2000 }
		],
		"s-3206-1000-102-0": [
			{ type: "func", func: () => combo_start = true },
			{ type: "func", func: () => combo_start = false, delay: 1400 }
		],
		"s-3206-1000-105-0": [{ type: "text", sub_type: "message", message: "Knockback Spin (Kaia)", message_ES: "Giro Atrás Empujón (KAIA)", check_func: () => combo_start === true }],
		"s-3206-1000-106-0": [
			{ type: "text", sub_type: "message", message: "Knockback", message_ES: "Atrás (Empujón)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 50, 10, 350, 0, 3000] }
		],
		"s-3206-1000-109-0": [{ type: "text", sub_type: "message", message: "Jump (Knockdown)", message_ES: "Salto (Tumbar)" }],
		"s-3206-1000-201-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-3206-1000-202-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente AoE" }],
		"s-3206-1000-203-0": [{ type: "text", sub_type: "message", message: "Front + Wave", message_ES: "Frente AoE + Ola" }],
		"s-3206-1000-205-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro" }],
		"s-3206-1000-206-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro (Sangrar)" }],
		"s-3206-1000-207-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro (Sangrar)" }],
		"s-3206-1000-209-0": [
			{ type: "text", sub_type: "notification", message: "Give Stun! (Knockdown)", message_ES: "Usar Stun (Tumbar)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 50, 10, 400, 0, 2500] }
		],
		"s-3206-1000-210-0": [
			{ type: "text", sub_type: "notification", message: "Give Stun! (Knockdown)", message_ES: "Usar Stun (Tumbar)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 50, 10, 400, 0, 2500] }
		],
		"s-3206-1000-211-0": [{ type: "text", sub_type: "message", message: "Push", message_ES: "Empujar" }],
		"s-3206-1000-216-0": [{ type: "text", sub_type: "message", message: "Somersault", message_ES: "Salto Mortal" }],
		"s-3206-1000-508-0": [
			{ type: "text", sub_type: "message", message: "Waves Outward", message_ES: "Olas ADENTRO" },
			{ type: "text", sub_type: "message", message: "Entrar", message_ES: "Entrar", delay: 2800 },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 16, 180, 200, 5000] },
			{ type: "spawn", func: "circle", args: [false, 413, 0, 0, 10, 350, 200, 5000] }
		],
		"s-3206-1000-509-0": [
			{ type: "text", sub_type: "message", message: "Waves Inward", message_ES: "Olas AFUERA" },
			{ type: "text", sub_type: "message", message: "Sair", message_ES: "Salir", delay: 3000 },
			{ type: "spawn", func: "circle", args: [false, 413, 0, 0, 16, 180, 200, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 350, 200, 5000] }
		],
		"s-3206-1000-512-0": [{ type: "text", sub_type: "message", message: "Turn | Spin", message_ES: "Turn | Girar" }],	
		
		"s-3206-1000-507-0": [{ type: "text", sub_type: "message", message: "Leash + Jump (Knockdown)", message_ES: "Jalar + Salto (Tumbar)" }],

		"s-3206-1000-502-0": [{ type: "text", sub_type: "message", message: "Unleash", message_ES: "Liberar" }],
		"s-3206-1000-518-0": [{ type: "text", sub_type: "message", message: "Unleash", message_ES: "Liberar" }],
		"s-3206-1000-519-0": [{ type: "text", sub_type: "message", message: "Unleash", message_ES: "Liberar" }],
		"s-3206-1000-306-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro" }],
		"s-3206-1000-309-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-3206-1000-321-0": [{ type: "text", sub_type: "message", message: "AoE", message_ES: "АоЕ" }],
		"s-3206-1000-324-0": [{ type: "text", sub_type: "message", message: "AoE", message_ES: "АоЕ" }]
	};
};