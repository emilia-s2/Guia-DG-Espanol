// Catalepticon Normal (BETA)
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-3104-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		"s-3104-1000-116-0": [{ type: "text", sub_type: "message", message_ES: "Ataque en medio (Pequeño)", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-120-0": [{ type: "text", sub_type: "message", message_ES: "Explosión Ampla Stun", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-114-0": [{ type: "text", sub_type: "message", message_ES: "Explosión Dentro Fuera", message_RU: "nao sei russo :c desculpa" }],

		"s-3104-1000-107-0": [{ type: "text", sub_type: "message", message_ES: "Ataque en Medio (Grande)", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-110-0": [{ type: "text", sub_type: "message", message_ES: "Atrás - Frente (Stun)", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-127-0": [{ type: "text", sub_type: "message", message_ES: "Ataque en Medio (Grande)", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-104-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Dentro", message_RU: "nao sei russo :c desculpa" }],
//		"s-3104-1000-200-0": [{ type: "text", sub_type: "message", message_ES: "meio ataque rajada", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-148-0": [{ type: "text", sub_type: "message", message_ES: "Giros", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-112-0": [{ type: "text", sub_type: "message", message_ES: "Empujar a Frente", message_RU: "nao sei russo :c desculpa" }],
//		"s-3104-1000-159-0": [{ type: "text", sub_type: "message", message_ES: "Escudo", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-158-0": [{ type: "text", sub_type: "message", message_ES: "Ataque Giratorio", message_RU: "nao sei russo :c desculpa" }],
		"s-3104-1000-156-0": [{ type: "text", sub_type: "message", message_ES: "Cabezas", message_RU: "nao sei russo :c desculpa" }]	
	};
};