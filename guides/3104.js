// Catalepticon (Normal)
//
// made by HSDN

module.exports = (dispatch, handlers, guide, lang) => {

	return {
		"nd-3104-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		"qb-3104-1000-32042000": [{ type: "text", sub_type: "message", message: "Arrows", message_ES: "Flechas" }],
		"h-3104-1000-35": [{ type: "text", sub_type: "message", message: "35%", message_ES: "35%" }],

		"s-3104-1000-104-0": [{ type: "text", sub_type: "message", message: "Stun (AOE)", message_ES: "Stun (AOE)" }],
		"s-3104-1000-107-0": [{ type: "text", sub_type: "message", message: "Line Forward + Side Lines", message_ES: "Línea hacia Adelante + Líneas Laterales" }],
		"s-3104-1000-110-0": [{ type: "text", sub_type: "message", message: "Target + Wave", message_ES: "Atrás - Frente (Stun)" }],
		"s-3104-1000-112-0": [{ type: "text", sub_type: "message", message: "Wave Forward", message_ES: "Empujar a Frente" }],
		"s-3104-1000-114-0": [{ type: "text", sub_type: "message", message: "Inner + Outer AOEs", message_ES: "AOEs Dentro e Fuera" }],
		"s-3104-1000-116-0": [{ type: "text", sub_type: "message", message: "Line Forward", message_ES: "Línea en Medio" }],
		"s-3104-1000-119-0": [{ type: "text", sub_type: "message", message: "Two Strikes", message_ES: "Dos Golpes" }],
		"s-3104-1000-120-0": [{ type: "text", sub_type: "message", message: "Two Strikes + Stun (AOE)", message_ES: "Explosión Ampla Stun" }],
		"s-3104-1000-123-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro" }],
		"s-3104-1000-125-0": [{ type: "text", sub_type: "message", message: "Strun (Tank)", message_ES: "Stun (Tank)" }],
		"s-3104-1000-127-0": [{ type: "text", sub_type: "message", message: "Pizza", message_ES: "Pizza" }],
		"s-3104-1000-128-0": [{ type: "text", sub_type: "message", message: "Pizza", message_ES: "Pizza" }],
		"s-3104-1000-148-0": [{ type: "text", sub_type: "message", message: "Pizza", message_ES: "Pizza" }],
		"s-3104-1000-156-0": [{ type: "text", sub_type: "message", message: "Get Skulls", message_ES: "Cabezas" }],
		"s-3104-1000-157-0": [{ type: "text", sub_type: "message", message: "Gather!", message_ES: "Juntar!", delay: 5000 }],
		"s-3104-1000-158-0": [{ type: "text", sub_type: "message", message: "Gather!", message_ES: "Juntar!", delay: 5000 }],
		"s-3104-1000-159-0": [{ type: "text", sub_type: "message", message: "AOE", message_ES: "АОЕ" }]
	};
};