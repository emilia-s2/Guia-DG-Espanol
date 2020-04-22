module.exports = {
	// 进入副本提示文
	DungeonInfo : [
		{zone: 9767, string: 'Bien-venido a <font color="#56B4E9">Demokron Factory</font> <font color="#E69F00">Normal</font>'},
		{zone: 9067, string: 'Bien-venido a <font color="#56B4E9">Demokron Factory</font> <font color="#b603fc">Dificil</font>'},
		{zone: 9770, string: 'Bien-venido a <font color="#56B4E9">Ruinous Manor</font> <font color="#E69F00">Normal</font>'},
		{zone: 9970, string: 'Bien-venido a <font color="#56B4E9">Ruinous Manor</font> <font color="#b603fc">Dificil</font>'},
		{zone: 9781, string: 'Bien-venido a <font color="#56B4E9">Velik Sanctuary</font> <font color="#E69F00">Normal</font>'},
		{zone: 9981, string: 'Bien-venido a <font color="#56B4E9">Velik Sanctuary</font> <font color="#b603fc">Dificil</font>'},
		{zone: 9735, string: 'Bien-venido a <font color="#56B4E9">RK-9Kenel</font> <font color="#E69F00">Normal</font>'},
		{zone: 9935, string: 'Bien-venido a <font color="#56B4E9">RK-9Kenel</font> <font color="#b603fc">Dificil</font>'},
		{zone: 9739, string: 'Bien-venido a <font color="#56B4E9">Red Refuge</font> <font color="#E69F00">Normal</font>'},
		{zone: 9939, string: 'Bien-venido a <font color="#56B4E9">Red Refuge</font> <font color="#b603fc">Dificil</font>'},
		{zone: 9720, string: 'Bien-venido a <font color="#56B4E9">Antaroth Abyss</font> <font color="#E69F00">Normal</font>'},
		{zone: 9920, string: 'Bien-venido a <font color="#56B4E9">Antaroth Abyss</font> <font color="#b603fc">Dificil</font>'},
		{zone: 3017, string: 'Bien-venido a <font color="#56B4E9">Antaroth Abyss</font> <font color="#FF0000"> 7 Pessoas</font>'},
		{zone: 9783, string: 'Bien-venido a <font color="#56B4E9">Dark Reach Citadel</font> <font color="#E69F00">Normal</font>'},
		{zone: 9983, string: 'Bien-venido a <font color="#56B4E9">Dark Reach Citadel</font> <font color="#b603fc">Dificil</font>'},
		{zone: 3018, string: 'Bien-venido a <font color="#56B4E9">Dark Reach Citadel</font> <font color="#FF0000"> 7 Pessoas</font>'},
		{zone: 9782, string: 'Bien-venido a <font color="#56B4E9">Grotto of Lost Souls</font> <font color="#E69F00">Normal</font>'},
		{zone: 9982, string: 'Bien-venido a <font color="#56B4E9">Grotto of Lost Souls</font> <font color="#b603fc">Dificil</font>'},
		{zone: 3019, string: 'Bien-venido a <font color="#56B4E9">Grotto of Lost Souls</font> <font color="#FF0000"> 7 Pessoas</font>'},
		{zone: 3101, string: 'Bien-venido a <font color="#56B4E9">Gossamer Vault</font> <font color="#E69F00">Normal</font>'},
		{zone: 3201, string: 'Bien-venido a <font color="#56B4E9">Gossamer Vault</font> <font color="#b603fc">Dificil</font>'},
		{zone: 3023, string: 'Bien-venido a <font color="#56B4E9">Akalath Quarantine</font>'},
		{zone: 3020, string: 'Bien-venido a <font color="#56B4E9">Sea Of Honor</font>'},
		{zone: 3026, string: 'Bien-venido a <font color="#56B4E9">Corrupted Skynest</font> <font color="#E69F00">Normal</font>'},
		{zone: 3126, string: 'Bien-venido a <font color="#56B4E9">Corrupted Skynest</font> <font color="#b603fc">Dificil</font>'},
		{zone: 3027, string: 'Bien-venido a <font color="#56B4E9">Forbidden Arena Challenge</font>'}
	],
	// 费勒诺的实验室 (Demokron Factory)
	DF_BOSS_1 : [
		
	],
	DF_BOSS_2 : [
		
	],
	DF_BOSS_3 : [
		{id: 205, msg: 'Empujar (Lento)'},
		{id: 218, msg: 'Empujar'},
		{id: 211, msg: 'Difusion (Dentro-> Fuera)'},
		{id: 212, msg: 'Difusion (Fuera-> Dentro)'},
		{id: 219, msg: 'Ataque Dentro e Fuera'}
	],
	// 拉坎里斯的废墟 (Ruinous Manor)
	RM_BOSS_1 : [
		{id: 107, msg: 'Spray adelante (castano)'}
	],
	RM_BOSS_2 : [
		{id: 106, msg: 'Inserir tierra (Stun)'},
		{id: 111, msg: 'Ataque continuo (imparable)'}
	],
	RM_BOSS_3 : [
		// 102 101 103          后喷
		{id: 103, msg: 'Empujar (manos)'},
		// 101 102 104 105     不推
		// 101 102 104 106 107 推坦
		{id: 106, msg: 'Empujar adelante(Bronceado)'},
		{id: 110, msg: 'Barrido de la cola!!'}, // 108 110 111
		// 317 分散吃球
		// 319 分散吃球 愤怒
		{id: 113, msg: 'FUEORA do circulo'}, // 113  114 115
		{id: 116, msg: 'DENTRO do Circulo'}, // 116  117 118
		// < 30% 
		{id: 311, msg: 'EMPUJANDO personas!!'},
		{id: 322, msg: 'Destino!!(buff)'}
	],
	// 贝里克神殿 (Velik's Sanctuary)
	VS_BOSS_1 : [
		{id: 301, msg: 'Veneno(General)'},
		{id: 304, msg: 'Ataque Dentro y Fuera'},
		{id: 401, msg: '<<<<IZQUIERDO Seguro'},
		{id: 402, msg: 'DERECHO Seguro>>>>'}
	],
	VS_BOSS_2 : [
		{id: 106, msg: 'Atras'},
		{id: 108, msg: 'Frente'},
		{id: 131, msg: '<--IZQUIERDO seguro'},
		{id: 130, msg: 'DERECHO Seguro-->'},
		{id: 134, msg: 'Debuff'}
	],
	VS_BOSS_3 : [
		{id: 116, msg: 'Escudo Adelante Donut (Volando)'},
		{id: 138, msg: 'Ataque Circulo -Preparate-!!'},
		{id: 144, msg: 'Fuera Seguro'},
		{id: 145, msg: 'Dentro seguro'},
		// 149 前刺(坦)
		{id: 151, msg: 'Stun + Tres capturas)'},
		{id: 152, msg: 'Escudo Adelante - Empujar Atras (repeler)'},
		{id: 701, msg: 'Empujar atras - Ataque Frontal '},
		{id: 103, msg: 'Rayos (Alejarse)'},
		{id: 301, msg: 'Bomb (Juntar) Cleanse'},
		{id: 404, msg: 'Debuff (Cerca)'},
		{id: 105, msg: 'Rayos (Juntar)'},
		{id: 302, msg: 'Bomb (Juntar) Cleanse'},
		{id: 405, msg: 'Debuff (Lejos)'},
		{id: 401, msg: 'Disipar!!'},
		{id: 402, msg: 'Halo!!'}
	],
	//            0           1           2           3           1+3=4       2+3=5       3+3=6
	VS_TipMsg : ["Next -> ", "(Cercax2)", "Flash(Dispersos)", "Bomb(Decolar)", "Atencion(Lejosx2)", "Flash(Concentracion)", "Bomb(Agregar Sangre)"],
	// RK-9机库 (RK-9 Kennel)
	RK_BOSS_1 : [
		{id: 104, msg: 'Stun Adelantente'},
		{id: 112, msg: 'Ataque ATRAS'},
		{id: 304, msg: 'SALIR!!'},
		{id: 305, msg: 'ENTRAR!!'},
		{id: 306, msg: 'Bomb y demolicion!!'},
		{id: 307, msg: 'Jalar'},
		{id: 309, msg: 'SALTAR'},
		// 上级披萨鉴定
		{id: 315, msg: 'Adelante Derecha'}, // 1
		{id: 319, msg: 'Adelante Derecha'},
		{id: 311, msg: 'Superior Derecho'}, // 2
		{id: 323, msg: 'Superior Derecho'},
		{id: 312, msg: 'Canto inferior Derecho'}, // 3
		{id: 324, msg: 'Canto inferior Derecho'},
		{id: 316, msg: 'Atras a Derecha'}, // 4
		{id: 320, msg: 'Atras a Derecha'},
		{id: 313, msg: 'Atras a Izquierda'}, // 5
		{id: 321, msg: 'Atras a Izquierda'},
		{id: 317, msg: 'Inferior Izquierdo'}, // 6
		{id: 325, msg: 'Inferior Izquierdo'},
		{id: 318, msg: 'Superior Izquierdo'}, // 7
		{id: 322, msg: 'Superior Izquierdo'},
		{id: 314, msg: 'Frente Izquierda'}, // 8
		{id: 326, msg: 'Frente Izquierda'}
	],
	RK_BOSS_2 : [
		{id: 102, msg: 'Ataque a Frente'},
		{id: 108, msg: 'Ataque ATRAS (Repeler)'},
		{id: 105, msg: 'Rotar (Repeler)'},
		// 上级
		{id: 305, msg: 'Adsorcin (Cerrar)'},
		{id: 304, msg: 'Explosion (Lejo)!!'}
	],
	RK_BOSS_3 : [
		{id: 117, msg: 'S Mano IZQUIERDA'}, // 117 121 123
		{id: 118, msg: 'S Mano IZQUIERDA'}, // 118 121 123
		{id: 116, msg: 'S Mano DERECHA'}, // 116 120 122
		{id: 119, msg: 'S Mano DERECHA'}, // 119 120 122
		{id: 128, msg: 'Puno de Cohete - Atras'},
		// 128 129 火箭拳 | 130 131 后喷
		{id: 321, msg: 'Escudo!!'},
		{id: 323, msg: 'Radar!!'},
		{id: 324, msg: 'SALIR Circulo'}
		// 305 鉴定
	],
	RK_TipMsg : ["Siguiente -> ", "SALIR", "ENTRAR", "OLA", "BOSS Activara ESCUDO en 10s"],
	// 革命团总部 (Red Refuge)
	RR_BOSS_1 : [
	
	],
	RR_BOSS_2 : [
		{id: 119, msg: 'Spray Adelante'},
		{id: 120, msg: 'Empujar (Repeler)'}
	],
	RR_BOSS_3 : [
		{id: 115, msg: 'Rugir (Stun)!!'},
		{id: 175, msg: 'Rugir verdadero (Stun)'},
		{id: 201, msg: 'Cara verdadera (Rasgo)'}
	],
	// 安塔洛斯的深渊 (Antaroth's Abyss)
	AA_BOSS_1 : [
		{id: 116, msg: 'Fuera del circulo'},
		{id: 117, msg: 'Dentro del circulo'},
		{id: 300, msg: 'Esquivar (Jugar al Alto)'}
	],
	AA_BOSS_2 : [
		{id: 119, msg: 'Maldicion !!'}
	],
	AA_BOSS_3 : [
		{id: 104, msg: 'ATRAS STURN'},
		{id: 113, msg: 'Frente - ATRAS STURN'},
		{id: 202, msg: 'Retirada - Circulo'},
		{id: 109, msg: ' <<<IZQUIERDO SEGURO'},
		{id: 111, msg: 'DERECHO SEGURO>>>'},
		{id: 310, msg: 'OLA de agua'},
		{id: 311, msg: 'OLA de agua'},
		{id: 312, msg: 'OLA de agua'},
		{id: 313, msg: 'OLA de agua'},
		{id: 314, msg: 'OLA de agua'},
		{id: 400, msg: 'Fantasma x3'}, // 三幻影-剑气 205 500 400 204 204
		{id: 401, msg: 'Circulo fantasma x3'}  // 三幻影-转圈 205 500 401 115 309
	],
	// 泰内布利斯城堡 (Dark Reach Citadel)
	DRC_BOSS_1 : [
		{id: 108, msg: 'Salto atras (Stun)'},
		{id: 109, msg: 'Empujar Atras (repeler)'},
		{id: 119, msg: 'Poderoso'},
		{id: 127, msg: 'Trueno!!'}
	],
	DRC_BOSS_2 : [
		{id: 105, msg: '(Golpear la mosca)'},
		{id: 110, msg: 'sentadilla frontal'},
		{id: 111, msg: 'Patada en el lado Derecho (repeler)'},
		{id: 115, msg: 'Patada en el lado Izquierdo (repeler)'},
		{id: 119, msg: 'Salto (Stun)'},
		{id: 120, msg: 'Golpe Frontal - Patada Traseira (repeler)'},
		{id: 316, msg: 'Llama (explosion)'},
		{id: 317, msg: 'OLA de agua'},
		{id: 318, msg: 'Tapete (Stun)'}
	],
	DRC_BOSS_3 : [
		{id: 106, msg: 'Empujar Adelante'},
		{id: 109, msg: 'Insercion frontal (Stun)'},
		{id: 112, msg: 'Empujar atras (repelir)'},
		{id: 301, msg: 'Espina en el Suelo'},
		{id: 303, msg: 'DERECHO>>>>'},
		{id: 306, msg: '<<<<IZQUIERDA'},
		{id: 309, msg: 'Mirar!!'},
		{id: 315, msg: 'Miedo (succion de sangre)'}
	],
	DRC_TipMsg : ["100%Energia!!"],
	// 费尔奎娜巢穴 (Gossamer Vault)
	GV_BOSS_1 : [
		{id: 124, msg: 'Esputo Frente'},
		{id: 104, msg: 'Esputo Frente'},
		{id: 133, msg: 'SALTAR'},
		{id: 113, msg: '(Lento) SALTAR (Volar)'},
		{id: 138, msg: 'SALTAR'},
		{id: 118, msg: '(Lento) PSALTAR (Volar)'},
		// 147 向前连续攻击
		{id: 149, msg: 'Poder de la mano IZQUIERDA (volando)'},
		{id: 148, msg: 'Poder de la mano DERECHA (volando)'},
		
		{id: 127, msg: '|EMPUJAR ATRAS|'},
		{id: 107, msg: '(Lento) | EMPUJAR ATRAS|'},
		{id: 131, msg: 'SPRAY ATRAS'},
		{id: 111, msg: '(Lento) SPRAY ATRAS'},
		{id: 132, msg: '<-Spray IZQUIERDO e DERECHO->'},
		{id: 112, msg: '<-Spray IZQUIERDO e DERECHO->'},
		{id: 139, msg: 'Spray FRENTE e ATRAS'},
		{id: 119, msg: 'Spray FRENTE e ATRAS'},
		{id: 314, msg: 'Circulo DENTRO e FUERA'},
		{id: 313, msg: 'Circulo DENTRO e FUERA'},
		
		{id: 305, msg: 'Pizza'}, // 143 / 145
		
		{id: 312, msg: 'Pantalla completa (Repeler)'},
		{id: 311, msg: '(LENTO) Tela cheia (Repeler)'}
	],
	GV_BOSS_2 : [
		{id: 105, msg: 'Espina delantera'}, // 104 105
		{id: 109, msg: 'Esquivar (Lento)'},
		{id: 108, msg: 'Ataque Adelante - Ataque ATRAS'},
		{id: 228, msg: 'Juntar time'},
		{id: 227, msg: 'Explosion!!'},
		{id: 230, msg: 'AOE!!'},
		{id: 231, msg: 'FUERA circulo'},
		{id: 232, msg: 'DENTRO circulo'},
		{id: 235, msg: 'Debuff!!'},
		{id: 236, msg: '(Repeler a frente)'}
	],
	// 贝尔亚克城堡 (Akalath Quarantine)
	AQ_BOSS_1 : [
		{id: 1104, msg: 'Saltar Stun'},
		{id: 2104, msg: 'Saltar Stun'},
		{id: 1110, msg: 'Adelante Stun'},
		{id: 2110, msg: 'Adelante Stun'},
		{id: 1111, msg: 'Izquierda Slash'},
		{id: 1113, msg: 'Izquierda Slash'}, // 1112 1113
		{id: 2111, msg: 'Izquierda Slash'},
		{id: 2113, msg: 'Izquierda Slash'}, // 2112 2113
		{id: 1112, msg: 'Derecho Slash'},
		{id: 1114, msg: 'Derecho Slash'}, // 1111 1114
		{id: 2112, msg: 'Derecho Slash'},
		{id: 2114, msg: 'Derecho Slash'}, // 2111 2114
		{id: 1115, msg: 'Semicirculo trasero'},
		{id: 2115, msg: 'Semicirculo trasero'},
		{id: 1116, msg: 'Explosion (Shield/Kaias)'}, // 1117
		{id: 2116, msg: 'Explosion (Shield/Kaias)'}, // 2117
		{id: 3107, msg: 'Onda Delantera'},
		{id: 3115, msg: 'Ataque Rotativo'}, // 1106 2106
		{id: 3116, msg: 'Circulos + Ataque Rotativo'}, // 1106 2106
		{id: 3119, msg: 'Maldicion ', TIP: ["SALIR", "ENTRAR"]}, // Red OUT | Blue IN
		{id: 3220, msg: 'Maldicion ', TIP: ["ENTRAR", "SALIR"]}  // Red IN | Blue OUT
	],
	AQ_BOSS_2 : [
		{id: 164, msg: 'Ataque de (Sangrado)'},
		{id: 166, msg: 'Ataque Atras (dar vueltas)'}, // 169 166 ?? ??? ???
		{id: 175, msg: 'Rugido (iframe)'},
		{id: 181, msg: 'Rock'},
		// 214 Triple Rocks 181
		{id: 182, msg: 'Pisar fuerte (Noquear)'}, // 183 184
		// 302 209 Stomp (Knockdown) 182 183 184
		{id: 185, msg: 'Explosion (Shield/Kaias)'},
		{id: 202, msg: 'Punalada Trasera + Delantera'},  // 177
		{id: 207, msg: 'Fantasma x5 (Sangrar)'}, // 204 206 205
		{id: 212, msg: 'Flash (Sangrar)'}    // 180
	],
	// 金麟號 (Sailing Instance)
	SI_BOSS_1 : [
		{id: 104, msg: 'Succion Azul (Esquivar)'}
	],
	SI_BOSS_2 : [
		{id: 103, msg: 'Succion Azul (Esquivar)'}
	],
	SI_BOSS_3 : [
		{id: 108, msg: 'Carga (Halo Tan)'},
		{id: 128, msg: 'Golfe (volar)'},
		{id: 129, msg: 'Ataque Fuerte a Frente'},
		{id: 135, msg: "saltar la cuerda"},
		{id: 204, msg: "30% Transformar"},
		{id: 137, msg: 'Difundir'},
		{id: 139, msg: 'Encogerse'},
		{id: 133, msg: 'Difundir (volar)'},
		{id: 127, msg: '', TIP: ["Sigue el BOS", "Antes de aplastar"]},
		
		{id: 121, msg: ''},         // Antes de esmagar(Fora) | Circulo (dentro) (verde)_venha  +No.1 buff
		{id: 122, msg: ''},         // Circulo(Dentro) | Esmagar (fora) (Roxo)_Saia  +No.1 buff
	//  {id: 124, msg: 'Antes de Aplastar'},     // Primeiro hit / Segundo Hit
	//  {id: 125, msg: 'Circulo'},     // Primeiro hit / Segundo Hit
		{id: 123, msg: ''},         // Carregue antes de esmagar | (Fora) (Verde)_Explosão  +No.2 buff
		{id: 120, msg: ''},         // Circulo carregado | (Dentro) (Roxo)_Abismo  +No.2 buff
	//  {id: 126, msg: 'Aplastar'},  // Terceiro Hit
	//  {id: 134, msg: 'Grande circulo'},  // Terceiro Hit
	],
	//           121+120=241 122+120=242           121+123=244 122+123=245
	SI_TipMsg : ["FUERA-DENTRO-DENTRO", "Dentro-Fuera-Dentro 1","Stun(ESQUIVAR)!!!", "FUERA-DENTRO-FUERA", "Dentro-Fuera-Dentro 2"],
	// 凯尔赛克隐藏地(Corrupted Skynest)
	CK_BOSS : [
		// 120 猛烈的咆哮
		// 162 猛烈的咆哮
		// 106 前方-驴打滚
		// 156 前方-驴打滚
		// 205 前方跳跃(回避)
		// 206 后方跳跃(闪避)
		// 131 广域1实例
		{id: 103, msg: 'Coletazo (Vuela!!)'},
		{id: 153, msg: 'Coletazo (Vuela!!)'},
		{id: 108, msg: 'Giro a la derecha (Derribo!!)'},
		{id: 158, msg: 'Giro a la derecha (Derribo!!)'},
		{id: 109, msg: 'Giro a la izquierda (Derribo!!)'},
		{id: 159, msg: 'Giro a la izquierda (Derribo!!)'},
		{id: 118, msg: '~Jugar al Alto~'},
		{id: 160, msg: '~Jugar al Alto~'},
		{id: 137, msg: '[Rugido] Alejate 50m'},
		{id: 138, msg: 'Ataque amplio!!'},
		{id: 110, msg: 'Mano de Fuego (Alejate)'},
		{id: 112, msg: 'Mano de Hielo (Alejate)'},
		{id: 114, msg: 'Fuego Quemadura Adelante (Alejate)'},
		{id: 139, msg: '[Temperatura] 60% todos (Hielo)'},
		{id: 140, msg: '[Temperatura] 40% todos (Fuego)'},
		// 164 [温度] 100° 全灭
		// 165 [温度] 0° 全灭
		// 切换DeBuff
		// 101 右脚(火_闪避)
		// 151 右脚(火_闪避)
		// 102 左脚(冰_格挡)
		// 152 左脚(冰_格挡)
		// 107 双脚_快
		// 157 双脚_快
		{id: 145, msg: 'Ataque Lento (Stun)'},
		{id: 104, msg: 'AOE-Magia de HIELO (Grande)'},
		{id: 154, msg: 'AOE-Magia de HIELO (Chico)'},
		{id: 105, msg: 'AOE-Magia de FUEGO (Grande)'},
		{id: 155, msg: 'AOE-Magia de FUEGO (Chico)'},
		// 内外鉴定
		{id: 212, msg: 'Fuego Adentro '}, // 212 -> 141
		{id: 213, msg: 'Hielo Adentro '}, // 213 -> 143
		{id: 214, msg: 'Hielo Adentro '}, // 214 -> 142
		{id: 215, msg: 'Fuego Adentro '}, // 215 -> 144
	// 以下未知
		{id: 119, msg: 'Rugido Debil'},
		{id: 161, msg: 'Rugido Debil'},
		{id: 124, msg: 'Altitud Debil'},
		{id: 163, msg: 'Altitud Debil'},
		
		{id: 116, msg: '(Aliento de Fuego) Correr'},// "(화염브레스용)액티브무브_Run_노멀"
		{id: 117, msg: 'Aliento de hielo'},// "화염브레스_breath_노멀"
		
		{id: 121, msg: 'Maldicion de resurreccion'},// "부활저주_SpwanNpc_노멀"
		{id: 122, msg: 'Invocando bichos'},// "부하소환_reactionAtk_노멀"
		{id: 123, msg: 'Espera-Conjuro de Buff Magico'},// "자기버프_Wait_노멀"
		
		{id: 125, msg: 'Prohibido Atacar de cerca'},// "근거리금지_발동_SpawnNpc_노멀"
		{id: 126, msg: 'Prohibido Atacar de lejos'},// "원거리금지_발동_SpawnNpc_노멀"
		{id: 127, msg: 'Prohibido Curar'},// "회복금지_발동_SpawnNpc_노멀"
		{id: 128, msg: 'Prohibicion de Ataque cerca Finalizada'},// "근거리금지_종료_SpawnNpc_노멀"
		{id: 129, msg: 'Prohibicion Ataque lejos Finalizada'},// "원거리금지_종료_SpawnNpc_노멀"
		{id: 130, msg: 'Prohibicion de curar Finalizada'},// "회복금지_종료_SpawnNpc_노멀"
		
		{id: 132, msg: 'Cambio de objetivo(475)'},// "오브젝트소환(475)_aggrochange_노말"
		{id: 133, msg: 'Cambio de objetivo(3026)'},// "오브젝트소환(3026)_aggrochange_노말"
		{id: 134, msg: 'Area Amplia un esclavo'},// "광역1인노예_aggrochange_노말"
		
		{id: 135, msg: '[Corre]Kelsaik Rugido Fuerte'},// "[폭주]켈사이크_강한포효_Roar_노멀"
		{id: 136, msg: '[Corre]Kelsaik Accion de Anillos'},// "[폭주]켈사이크_루프동작_노멀"
		
		{id: 150, msg: 'Muevete Correr'},// "액티브무브_Run_노멀"
		{id: 201, msg: 'Ronquidos'},// "헉헉동작_Groggy_노멀"
		{id: 204, msg: 'Sustitucion-Cambio de objetivo'},// "어그로체인지_aggrochange_노멀"
		{id: 209, msg: 'Alarma de modo'},// "모드알람_ModeAlarm_더미"
		{id: 210, msg: 'Accion de Invocacion'},// "스폰동작_Spawn_노멀"
		{id: 211, msg: 'Fin de rotacion'},// "회전종료용_ModeAlarm_노멀"
		{id: 302, msg: 'Random Buff Invencible'}// "무적버프_wait_노멀"
	],
	//            0     1
	CK_TipMsg : ["(ENTRAR)", "(SALIR)"],
	// 狂气竞技场 (Forbidden Arena)
	FA_BOSS : [
		{id: 108, msg: 'Espadazo Frontal (Lento)'},    // 101 121 122 連續攻擊 -> 108 One size兩斷(坦)
		{id: 355, msg: 'Rompemandibulas'},    // 102 121 103 連續攻擊 -> 355 右手蓄力 -> 114 下巴粉碎
		{id: 135, msg: 'Espadazo Frontal (Lento)'},    //         104 連續攻擊 -> 135 左手蓄力 -> 130 One size兩斷
		{id: 111, msg: 'Stun - Espadazo Frontal'}, //         104 連續攻擊 -> 111 刀背打擊 -> 130 One size兩斷
		{id: 112, msg: 'Salto Detras - Espadazo'}, //     121 102 連續攻擊 -> 112 後退踢擊 -> 130 One size兩斷
		{id: 109, msg: 'Salto Adelante - Espadazo'},         // 109 向下劈擊 -> 402 等待     -> 130 One size兩斷
		
		{id: 116, msg: 'Bloqueo perfecto (Iframe)'},    // 116 斬擊
		{id: 140, msg: 'Bloqueo perfecto (Iframe)'},    // 140 斬擊
		
		{id: 145, msg: '3 Ataques Circulares de Corte'},  // 145 重擊斬 139 迴旋砍擊x2 -> 140 斬擊
		{id: 136, msg: '2 Ataques Circulares - Un Golpe Frontal'},  // 136 重擊斬 144 迴旋砍擊x1 -> 130 One size兩斷
		
		{id: 141, msg: 'Ataque Circular - Espadazo Frontal'}, // 141 破壞氣魄+迴旋砍擊x2 -> 146 114 130
		{id: 146, msg: 'Ataque Barbilla - Espadazo Frontal'}, // 146 One size兩斷       -> 114 下巴粉碎 -> 130 One size兩斷
		{id: 142, msg: 'Ataque con Giro - Ataque Barbilla'}, // 142 破壞氣魄+迴旋砍擊x2 -> 143 114 130
		{id: 143, msg: 'Un Espdazo Frontal'},        // 143 One size兩斷(取消) -> 114 下巴粉碎 -> 130 One size兩斷
		
		{id: 151, msg: '3 Cortes - Un Ataque Frontal'}, // 151 149 148三斬 -> 130 One size兩斷
		{id: 117, msg: 'Flash (Iframe)'},  //    117 瞬閃点名 -> 130 One size兩斷
		{id: 356, msg: 'Flash (Iframe)'},  //    356 瞬閃点名 -> 147 One size兩斷
		{id: 134, msg: 'Cuidado (Ataque hacia atras)'},  //    134 要害攻擊 -> 147 One size兩斷
		
		{id: 357, msg: 'Morado-> Explosion (Salir!!)'}, // 357 吸收力量 -> 110 起身攻擊 -> 氣斬
		{id: 350, msg: 'Rojo-> Donas'},     // 350 吸收力量                 -> 302 甜甜圈
		
		{id: 351, msg: 'Romper Escudo !!'},       // 护盾开始 环形爆发
		{id: 401, msg: '30% (Iframe)'}           // 开始
	],
	FA_TipMsg : ["Carga de Skill Completa (Cuidado)!!!"]
}