// Commander's Residence
//
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	let print_test = true;
	return {
		
		// 1 Maknakh
		"nd-3030-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3030-1000-114-0": [{ type: "text", sub_type: "message", message_ES: "Empujar (Repeler)", message_RU: "não sei russo :c" }],
		"s-3030-1000-303-0": [{ type: "text", sub_type: "message", message_ES: "Meteoritos AOE", message_RU: "não sei russo :c" }],
		"s-3030-1000-120-0": [{ type: "text", sub_type: "message", message_ES: "Empujar Frente", message_RU: "não sei russo :c" }],
		"s-3030-1000-104-0": [{ type: "text", sub_type: "message", message_ES: "Fuego Frente", message_RU: "não sei russo :c" }],
		"s-3030-1000-113-0": [{ type: "text", sub_type: "message", message_ES: "Círculo AOE Frente", message_RU: "não sei russo :c" }],
		"s-3030-1000-108-0": [{ type: "text", sub_type: "message", message_ES: "Espinas	Frontal", message_RU: "não sei russo :c" }],
		"s-3030-1000-305-0": [{ type: "text", sub_type: "message", message_ES: "Círculo AOE Frente", message_RU: "não sei russo :c" }],
		"s-3030-1000-301-0": [{ type: "text", sub_type: "message", message_ES: "Hit Frontal | Stun", message_RU: "não sei russo :c" }],
		"s-3030-1000-307-0": [{ type: "text", sub_type: "message", message_ES: "Cola Stun", message_RU: "não sei russo :c" }],
		"s-3030-1000-112-0": [{ type: "text", sub_type: "message", message_ES: "Salto", message_RU: "não sei russo :c" }],
		"s-3030-1000-105-0": [{ type: "text", sub_type: "message", message_ES: "Fuego Frontal", message_RU: "não sei russo :c" }],
		"am-3030-1000-99000580": [{ type: "text", sub_type: "message", message_ES: "Hit Espinas ", message_RU: "não sei russo :c" }],

		// 2 LB-1
		"nd-3030-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],	
		"s-3030-2000-309-0":  [
			{ type: "text", sub_type: "message", message: "Círculos AOE | Stun", check_func: () => print_test },
			{ type: "func", func: () => print_test = false },
			{ type: "func", func: () => print_test = true, delay: 4000 }
		],
		"s-3030-2000-105-0":  [
			{ type: "text", sub_type: "message", message: "Laser Frontal (Stun)", check_func: () => print_test },
			{ type: "func", func: () => print_test = false },
			{ type: "func", func: () => print_test = true, delay: 15000 }
		],
		"s-3030-2000-103-0": [{ type: "text", sub_type: "message", message_ES: "Hit Frontal", message_RU: "não sei russo :c" }],
		"s-3030-2000-101-0": [{ type: "text", sub_type: "message", message_ES: "Garras Frente", message_RU: "não sei russo :c" }],
		"s-3030-2000-104-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Frente | Stun", message_RU: "não sei russo :c" }],
		"s-3030-2000-112-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Atrás (Fogo)", message_RU: "não sei russo :c" }],
		"s-3030-2000-305-0": [{ type: "text", sub_type: "message", message_ES: "Círculos AOE", message_RU: "não sei russo :c" }],
		"s-3030-2000-109-0": [{ type: "text", sub_type: "message", message_ES: "Laser Atrás | Stun", message_RU: "não sei russo :c" }],	
		"s-3030-2000-301-0": [{ type: "text", sub_type: "message", message_ES: "Giro Debuff", message_RU: "não sei russo :c" }]
	};
};