// Timescape (Dificil)
//
// made by HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = ES;

	return {
		// Boss 1 (phase 1)
		"s-456-401-104-0": [
			{ type: "text", sub_type: "message", message: "Bomb", message_ES: "Bomba" },
			{ type: "text", sub_type: "warning", message: "(1)", speech: false, delay: 300 },
			{ type: "text", sub_type: "warning", message: "(2)", speech: false, delay: 800 },
			{ type: "text", sub_type: "warning", message: "(3)", speech: false, delay: 1300 },
			{ type: "text", sub_type: "message", message: "(4) Dodge!", message_ES: "(4) Iframe!", delay: 1800  }
		],
		"s-456-1001-107-0": [{ type: "text", sub_type: "alert", message: "Shot", message_ES: "Disparo", speech: false }],

		// Boss 1 (phase 2)
		"s-456-413-104-0": [
			{ type: "text", sub_type: "message", message: "Bomb", message_ES: "Bomba" },
			{ type: "text", sub_type: "warning", message: "(1)", speech: false, delay: 550 },
			{ type: "text", sub_type: "warning", message: "(2)", speech: false, delay: 1300 },
			{ type: "text", sub_type: "warning", message: "(3)", speech: false, delay: 2050 },
			{ type: "text", sub_type: "message", message: "(4) Dodge!", message_ES: "(4) Iframe!", delay: 2800 }
		],
		"s-456-414-104-0": "s-456-413-104-0",
		"s-456-415-104-0": "s-456-413-104-0",
		"s-456-416-104-0": "s-456-413-104-0",
		"s-456-1000-107-0": [{ type: "text", sub_type: "alert", message: "Shot", message_ES: "Disparo", speech: false }],
		"ab-456-1000-905685": [
           { type: "text", sub_type: "message", message: "Plague of Exhaustion", message_ES: "Plague of Exhaustion", "class_position": "priest" },
           { type: "text", sub_type: "message", message: "Regression", message_ES: "Regression", "class_position": "mystic" }
		],

		// Boss 2
		"s-456-1002-102-0": [{ type: "text", sub_type: "message", message: "Jump", message_ES: "Salto" }],
		"s-456-1002-103-0": [{ type: "text", sub_type: "message", message: "Combo", message_ES: "Combo" }],
		"s-456-1002-104-0": [{ type: "text", sub_type: "message", message: "Shot (target)", message_ES: "Disparo (al objetivo)" }],
		"s-456-1002-107-0": [{ type: "text", sub_type: "message", message: "Many Pokes", message_ES: "Muchos Golpes" }],
		"s-456-1002-110-0": [{ type: "text", sub_type: "message", message: "Clap", message_ES: "Aplauso" }],
		"s-456-1002-212-0": [{ type: "text", sub_type: "message", message: "Jump Back", message_ES: "Salto Atrás" }],
		"s-456-1002-3110-0": [{ type: "text", sub_type: "message", message: "Breath", message_ES: "Ataque de Aliento" }],
		"s-456-1002-3113-0": [{ type: "text", sub_type: "message", message: "AOE", message_ES: "АОЕ", delay: 4000 }],

		// Boss 3
		"ab-456-1003-905607": [
		   { type: "text", sub_type: "message", message: "Cleanse + Plague of Exhaustion", message_ES: "Cleanse + Plague of Exhaustion", "class_position": "priest" },
		   { type: "text", sub_type: "message", message: "Cleanse + Regression", message_ES: "Cleanse + Regression", "class_position": "mystic" }
		],
		"s-456-1003-103-0": [{ type: "text", sub_type: "message", message: "Spin", message_ES: "Giro" }],
		"s-456-1003-104-0": [{ type: "text", sub_type: "message", message: "Clap", message_ES: "Aplauso" }],
		"s-456-1003-105-0": [{ type: "text", sub_type: "message", message: "Front", message_ES: "Frente" }],
		"s-456-1003-105-1": [{ type: "text", sub_type: "message", message: "Back", message_ES: "Atrás" }],
		"s-456-1003-107-0": [{ type: "text", sub_type: "message", message: "Swipe", message_ES: "Golpe fuerte" }],
		"s-456-1003-108-0": [{ type: "text", sub_type: "message", message: "Swipe", message_ES: "Golpe fuerte" }],
		"s-456-1003-109-0": [{ type: "text", sub_type: "message", message: "Breath (target)", message_ES: "Ataque de Aliento (al objetivo)" }],
		"s-456-1003-111-0": [{ type: "text", sub_type: "message", message: "Leash (target)", message_ES: "Correa  (al objetivo)" }],
		"s-456-1003-3104-0": [{ type: "text", sub_type: "message", message: "Cage", message_ES: "Jaula" }], // 456016
		"s-456-1003-3108-0": [{ type: "text", sub_type: "message", message: "Waves", message_ES: "Olas" }],
		"qb-456-1003-456015": [{ type: "text", sub_type: "message", message: "AOE", message_ES: "АОЕ" }], // 3103
		"qb-456-1003-456017": [{ type: "text", sub_type: "message", message: "Give Stun", message_ES: "Stun" }], // 3102
		"dm-0-0-905624": [{ type: "text", sub_type: "alert", message: "Wall Change", message_ES: "Cambio de pared", delay: 1000 }], // green
		"dm-0-0-905625": [{ type: "text", sub_type: "alert", message: "Wall Change", message_ES: "Cambio de pared", delay: 1000 }], // red
		"dm-0-0-905626": [{ type: "text", sub_type: "alert", message: "Wall Change", message_ES: "Cambio de pared", delay: 1000 }], // purple
	};
};