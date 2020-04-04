let {DungeonInfo,
	 DW_BOSS_1, DW_TipMsg1,  DW_BOSS_2, DW_TipMsg2,
	 FI_BOSS_1,  FI_BOSS_2,  FI_BOSS_3, FI_TipMsg,
	 DF_BOSS_1,  DF_BOSS_2,  DF_BOSS_3,
	 RM_BOSS_1,  RM_BOSS_2,  RM_BOSS_3,
	 VS_BOSS_1,  VS_BOSS_2,  VS_BOSS_3, VS_TipMsg,
	 RK_BOSS_1,  RK_BOSS_2,  RK_BOSS_3, RK_TipMsg,
	 RR_BOSS_1,  RR_BOSS_2,  RR_BOSS_3,
	 AA_BOSS_1,  AA_BOSS_2,  AA_BOSS_3,
	DRC_BOSS_1, DRC_BOSS_2, DRC_BOSS_3, DRC_TipMsg,
	GLS_BOSS_1, GLS_BOSS_2, GLS_BOSS_3,
	 GV_BOSS_1,  GV_BOSS_2,
	 AQ_BOSS_1,  AQ_BOSS_2,
	 SI_BOSS_1,  SI_BOSS_2,  SI_BOSS_3, SI_TipMsg,
	 CK_BOSS,    CK_TipMsg,
	 KQ_BOSS,    KQ_TipMsg
} = require('./boss');

module.exports = function Tera_Guide(mod) {
	let Enabled            =  true, // 总开关
		SendToStream       = false; // true 关闭队长通知, 并将消息发送到聊天[代理]频道
	// 定义变量
	let hooks              = [],
		TipMsg             = "",    // 可变文字
		partyMembers       = [],    // 队员信息
		partyMakers        = [],    // 队员标记
		whichzone          = null,  // 登陆地区(zone)
		whichmode          = null,  // 副本地图(huntingZoneId)
		whichboss          = null,  // 区域位置(templateId)
		boss_GameID        = null,  // BOSS gameId
		boss_HP            = 0,     // BOSS 血量%
		skillid            = 0,     // BOSS 攻击技能编号
		// DW
		circleCount        = 0,     // 累计点名圆圈数
		ballColor          = 0,     // 打投掷颜色
		// VS
		checked            = false, // 鉴定
		inverted           = false, // 恢复正常 / 进入灵魂
		nextMsg            = 0,     // 预告下一次[鉴定消息数组]角标
		// RK
		FirstMsg           = "X",   // 第一技能
		SecondMsg          = "X",   // 第二技能
		switchMsg          = false, // 正常顺序 / 反向顺序
		// AA
		lastTwoUpDate      = 0,
		lastRotationDate   = 0,
		rotationDelay      = 0,
		// GLS
		power              = false, // 充能计数
		Level              = 0,     // 充能层数
		levelMsg           = [],    // 充能文字 数组
		// AQ
		myColor            = null,  // 红蓝诅咒
		// SI
		bossBuff           = 0,     // 紫绿武器
		// CK
		myDeBuff           = null,  // 业火/寒气
		bossWord           = null;  // 愤怒/恐惧
	// 控制命令
	mod.command.add(["辅助", "guide"], (arg) => {
		if (!arg) {
			Enabled = !Enabled;
			mod.command.message("辅助提示(Guide) " + (Enabled ? "启用(ON)" : "禁用(OFF)"));
		} else {
			switch (arg) {
				case "st":
				case "stream":
				case "主播":
					SendToStream = !SendToStream;
					mod.command.message("主播模式(Stream) " + (SendToStream ? "启用(ON)" : "禁用(OFF)"));
					break;
				case "info":
				case "状态":
					mod.command.message("模块开关: " + Enabled);
					mod.command.message("主播模式: " + SendToStream);
					mod.command.message("登陆地区: " + whichzone);
					mod.command.message("副本地图: " + whichmode);
					mod.command.message("区域位置: " + whichboss);
					mod.command.message("bossID: "   + boss_GameID);
					mod.command.message("partyMembers: " + partyMembers.length);
					break;
				default :
					mod.command.message("无效的参数!");
					break;
			}
		}
	});
	// 切换场景
	mod.game.me.on('change_zone', (zone, quick) => {
		whichzone = zone;
		whichmode = zone % 9000;
		
		if (mod.game.me.inDungeon && DungeonInfo.find(obj => obj.zone == zone)) {
			mod.command.message(DungeonInfo.find(obj => obj.zone == zone).string);
			if (whichmode < 100) whichmode = whichmode + 400;
			load();
		} else {
			whichmode = null;
			unload();
		}
	});
	
	mod.hook('S_PARTY_MEMBER_LIST', 7, (event) => {
		partyMembers = event.members;
		// partyMembers = event.members.filter(m => !mod.game.me.is(m.gameId));
	});
	
	mod.hook('S_LEAVE_PARTY_MEMBER', 2, (event) => {
		partyMembers = partyMembers.filter(m => m.playerId != event.playerId);
	});
	
	mod.hook('S_LEAVE_PARTY', 1, (event) => {
		partyMembers = [];
	});
	
	function load() {
		if (!hooks.length) {
			hook('S_BOSS_GAGE_INFO',        3, sBossGageInfo);
			hook('S_CREATURE_ROTATE',       2, sCreatureRotate);
			hook('S_DUNGEON_EVENT_MESSAGE', 2, sDungeonEventMessage);
			hook('S_QUEST_BALLOON',         1, sQuestBalloon);
			hook('S_ABNORMALITY_BEGIN',     4, sAbnormalityBegin);
			// hook('S_ABNORMALITY_REFRESH',   2, UpdateAbnormality);
			hook('S_ABNORMALITY_END',       1, sAbnormalityEnd);
			hook('S_ACTION_STAGE',          9, sActionStage);
		}
	}
	
	function hook() {
		hooks.push(mod.hook(...arguments));
	}
	
	function unload() {
		if (hooks.length) {
			for (let h of hooks) {
				mod.unhook(h);
			}
			hooks = [];
		}
		reset();
	}
	
	function reset() {
		TipMsg             = "";
		// 清除所有定时器
		mod.clearAllTimeouts();
		// 清除队员标记
		partyMakers        = [];
		UpdateMarkers();
		// 清除BOSS信息
		whichboss          = null;
		boss_GameID        = null;
		// DW
		circleCount        = 0;
		ballColor          = 0;
		// VS_3王
		checked            = false;
		inverted           = false;
		nextMsg            = 0;
		// RK_3王
		FirstMsg           = "X";
		SecondMsg          = "X";
		switchMsg          = false;
		// GLS_3王
		power              = false;
		Level              = 0;
		levelMsg           = [];
		// AQ_1王
		myColor            = null;
		// SI_3王
		bossBuff           = 0;
		// CK
		myDeBuff           = null;
		bossWord           = null;
	}
	
	function sBossGageInfo(event) {
		if (!whichboss || whichboss != event.templateId) whichboss = event.templateId;
		if (!boss_GameID || boss_GameID != event.id) boss_GameID = event.id;
		
		boss_HP = (Number(event.curHp) / Number(event.maxHp));
		if (boss_HP <= 0 || boss_HP == 1) reset();
	}
	
	function sCreatureRotate(event) {
		if (!Enabled || !whichmode) return;
		// AA_3王 后砸
		if (lastTwoUpDate && boss_GameID==event.gameId) {
			lastRotationDate = Date.now();
			rotationDelay = event.time;
		}
	}
	
	function sDungeonEventMessage(event) {
		if (!Enabled || !whichmode) return;
		var msg_Id = parseInt(event.message.match(/\d+/ig)) % 1000;
		// DRC_1王 能量满100提醒 下级-9783103 上级-9983103
		if ([783, 983, 3018].includes(whichmode) && whichboss==1000 && msg_Id==103) {
			sendMessage(DRC_TipMsg[0]);
		}
		// VS_3王 下一次鉴定提示(翻译王说话)
		if ([781, 981].includes(whichmode) && whichboss==3000) {
			// 1 注 - 9781043 9981043  2 闪 - 9781044 9981044  3 炸 - 9781045 9981045
			if ([43, 44, 45].includes(msg_Id)) {
				nextMsg = msg_Id % 42;
				if (inverted) nextMsg = nextMsg+3;
				sendMessage((VS_TipMsg[0] + VS_TipMsg[nextMsg]), 25);
			}
		}
		// RK_3王 上级鉴定
		if (whichmode==935 && whichboss==3000) {
			// 传送协议  近- 9935302 远- 9935303 全- 9935304
			if ([302, 303, 304].includes(msg_Id)) {
				FirstMsg = RK_TipMsg[msg_Id % 301];
				SecondMsg = "X";
				sendMessage((RK_TipMsg[0] + FirstMsg + " + " + SecondMsg), 25);
			}
			if (msg_Id==311) { // 变更协议-绿  9935311
				switchMsg = false;
				sendMessage((RK_TipMsg[0] + FirstMsg + " + " + SecondMsg), 25);
			}
			if (msg_Id==312) { // 变更协议-红  9935312
				switchMsg = true;
				sendMessage((RK_TipMsg[0] + SecondMsg + " + " + FirstMsg), 25);
			}
		}
	}
	
	function sQuestBalloon(event) {
		if (!Enabled || !whichmode) return;
		var msg_Id = parseInt(event.message.match(/\d+/ig)) % 1000;
		// DW_2王 轮盘选中球的颜色(王的说话)
		if (whichmode==466 && whichboss==46602) {
			// 逆-466054 [红色] 顺-466050 | 逆-466055 [白色] 顺-466051 | 逆-466056 [蓝色] 顺-466052
			if ([50, 51, 52, 54, 55, 56].includes(msg_Id)) {
			//    1   2   3   5   6   7
				ballColor = msg_Id % 49;
				sendMessage((DW_TipMsg2[0] + DW_TipMsg2[ballColor]), 25);
			}
		}
		// FI_1王 
		if ([459, 759].includes(whichmode) && [1001, 1004].includes(whichboss)) {
			// 459015 谁要被我诅咒看看吗(伯恩斯坦的诅咒)
			if (msg_Id==15) sendMessage(FI_TipMsg[0], 25);
			// 459021 有人撑不住我的诅咒(拉道斯的诅咒)
			if (msg_Id==21) sendMessage(FI_TipMsg[1], 25);
		}
		// FI_2王 
		if ([459, 759].includes(whichmode) && [1002, 1005].includes(whichboss)) {
			// 459022 亡灵会暂时醒来
			if (msg_Id==22) sendMessage(FI_TipMsg[2], 25);
		}
		// VS_3王 鉴定
		if ([781, 981].includes(whichmode) && whichboss==3000) {
			if (msg_Id==142) { // 死于混乱之中吧(开始鉴定) - 78142
				checked = true;
				mod.setTimeout(() => { checked = false; }, 1000);
				if (boss_HP > 0.5) {
					nextMsg = nextMsg+1;
					if (!inverted && nextMsg>3) nextMsg = 1; // VS_TipMsg[1] - VS_TipMsg[2] - VS_TipMsg[3]
					if ( inverted && nextMsg>6) nextMsg = 4; // VS_TipMsg[4] - VS_TipMsg[5] - VS_TipMsg[6]
				} else {
					nextMsg = nextMsg-1;
					if (!inverted && nextMsg<1) nextMsg = 3; // 1注(近)-2闪(分)-3炸(解)
					if ( inverted && nextMsg<4) nextMsg = 6; // 4注(远)-5闪(集)-6炸(不)
				}
				mod.setTimeout(() => { sendMessage((VS_TipMsg[0] + VS_TipMsg[nextMsg]), 25); }, 5000);
			}
			if (msg_Id==151) { // 进入灵魂 - 78151
				inverted = true;
				nextMsg = nextMsg+3;
				sendMessage(("Into -> " + VS_TipMsg[nextMsg]), 25);
			}
			if (msg_Id==152) { // 挺能撑的 - 78152
				inverted = false;
				nextMsg = nextMsg-3;
				sendMessage(("Out  -> " + VS_TipMsg[nextMsg]), 25);
			}
			// 在神的面前不要掉以轻心 - 78155
		}
		// RK_3王 上级鉴定
		if (whichmode==935 && whichboss==3000) {
			// 执行协议-935300  近-935301 远-935302 全-935303
			if ([301, 302, 303].includes(msg_Id)) {
				SecondMsg = RK_TipMsg[msg_Id % 300];
				if (!switchMsg) { // switchMsg - false(绿) / true(红)
					sendMessage(FirstMsg + " -> " + SecondMsg);
					// 下一次鉴定提示
					FirstMsg = SecondMsg;
					SecondMsg = "X";
					mod.setTimeout(() => {
						sendMessage((RK_TipMsg[0] + FirstMsg + " -> " + SecondMsg), 25);
					}, 6500);
				} else {
					sendMessage(SecondMsg + " -> " + FirstMsg);
					// 下一次鉴定提示
					FirstMsg = SecondMsg;
					SecondMsg = "X";
					mod.setTimeout(() => {
						sendMessage((RK_TipMsg[0] + SecondMsg + " -> " + FirstMsg), 25);
					}, 6500);
				}
			}
		}
		// 凯尔 鉴定
		if ([3026, 3126].includes(whichmode) && whichboss==1000) {
			// 感受毁灭的愤怒吧-3026004-3126004 感受毁灭的恐惧吧-3026005-3126005
			bossWord = parseInt(event.message.match(/\d+/ig));
		}
	}
	
	function sAbnormalityBegin(event) {
		if (!Enabled || !whichmode) return;
		// 金鳞船 亡靈閃電的襲擊 / 海洋魔女的氣息
		if (event.id==30209101||event.id==30209102) {
mod.log("id:" + event.id + "target:"+ event.target + "source:" + event.source);
			partyMakers.push({
				color: event.id % 30209101,
				target: event.target
			});
			UpdateMarkers();
			
			mod.setTimeout(() => {
				partyMakers = [];
				UpdateMarkers();
			}, 3500);
			
			if (mod.game.me.is(event.target)) {
				mod.setTimeout(() => { sendMessage(SI_TipMsg[2], 25); }, 2000);
			}
		}
		
		if (!mod.game.me.is(event.target)) return;
		// AQ_1王 内外圈-鉴定 紅色詛咒氣息 藍色詛咒氣息
		if (event.id==30231000||event.id==30231001) {
			myColor = event.id;
		}
		
		// 凯尔       破灭业火 / 破灭寒气
		if ([30260001, 31260001, 30260002, 31260002].includes(event.id)) {
			myDeBuff = event.id;
		}
	}
	
	function sAbnormalityEnd(event) {
		if (!Enabled || !whichmode) return;
		
		if (!mod.game.me.is(event.target)) return;
		// AQ_1王 内外圈-鉴定 紅色詛咒氣息 藍色詛咒氣息
		if (event.id==30231000||event.id==30231001) {
			myColor = null;
		}
		
		// 凯尔       破灭业火 / 破灭寒气
		if ([30260001, 31260001, 30260002, 31260002].includes(event.id)) {
			myDeBuff = null;
		}
	}
	
	function sActionStage(event) {
		// 模块关闭 或 不在副本中
		if (!Enabled || !whichmode || whichboss != event.templateId) return;
		
		skillid = event.skill.id % 1000;     // 愤怒简化 取1000余数运算
		
		var bossSkillID = null;
		// DW_1王
		if (whichmode==466 && event.templateId==46601) {
			if (event.stage!=0 || !(bossSkillID = DW_BOSS_1.find(obj => obj.id==skillid))) return;
			// BOSS HP > 50%  +1圈 +2圈 +3圈 +4圈 +5圈
			if ([306, 307, 308, 309, 310].includes(skillid)) {
				circleCount += skillid % 305;
				sendMessage((bossSkillID.msg + "=" + circleCount + " | " + DW_TipMsg1[circleCount % 2]), 25);
				return;
			}
			// BOSS HP < 50%  +1圈 +2圈 +3圈 +4圈 +5圈
			if ([319, 320, 321, 322, 323].includes(skillid)) {
				circleCount += skillid % 318;
				sendMessage((bossSkillID.msg + "=" + circleCount + " | " + DW_TipMsg1[circleCount % 2]), 25);
				return;
			}
			// 鉴定-出圈 重置圈数
			if ([311, 315, 313, 317].includes(skillid) || [312, 316, 314, 318].includes(skillid)) {
				circleCount = 0;
			}
			sendMessage(bossSkillID.msg);
		}
		// DW_2王
		else if (whichmode==466 && event.templateId==46602) {
			if (event.stage!=0 || !(bossSkillID = DW_BOSS_2.find(obj => obj.id==skillid))) return;
			// 举球 内外圈 (开场 / 30%重新进场)
			if (skillid==309||skillid==310) {
				ballColor = 4;
			}
			// 鉴定 打投掷
			if (skillid==303) {
				sendMessage(bossSkillID.msg + " -> " + DW_TipMsg2[ballColor]);
				return;
			}
			sendMessage(bossSkillID.msg);
		}
		
		// FI_1王
		else if ([459, 759].includes(whichmode) && [1001, 1004].includes(event.templateId)) {
			if (event.stage!=0 || !(bossSkillID = FI_BOSS_1.find(obj => obj.id==event.skill.id))) return;
			sendMessage(bossSkillID.msg);
		}
		// FI_2王
		else if ([459, 759].includes(whichmode) && [1002, 1005].includes(event.templateId)) {
			if (event.stage!=0 || !(bossSkillID = FI_BOSS_2.find(obj => obj.id==event.skill.id))) return;
			sendMessage(bossSkillID.msg);
		}
		// FI_3王
		else if ([459, 759].includes(whichmode) && event.templateId==1003) {
			if (event.stage!=0 || !(bossSkillID = FI_BOSS_3.find(obj => obj.id==event.skill.id))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// DF_1王
		else if ([767, 467].includes(whichmode) && event.templateId==46701) {
			if (event.stage!=0 || !(bossSkillID = DF_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// DF_2王
		else if ([767, 467].includes(whichmode) && event.templateId==46703) {
			if (event.stage!=0 || !(bossSkillID = DF_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// DF_3王
		else if ([767, 467].includes(whichmode) && event.templateId==46704) {
			if (event.stage!=0 || !(bossSkillID = DF_BOSS_3.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// RM_1王
		else if ([770, 970].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = RM_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// RM_2王
		else if ([770, 970].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = RM_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// RM_3王
		else if ([770, 970].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = RM_BOSS_3.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// VS_1王
		else if ([781, 981].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = VS_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// VS_2王
		else if ([781, 981].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = VS_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// VS_3王
		else if ([781, 981].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = VS_BOSS_3.find(obj => obj.id==skillid))) return;
			if (skillid==103 && !checked) return;
			sendMessage(bossSkillID.msg);
		}
		
		// RK_1王
		else if ([735, 935].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = RK_BOSS_1.find(obj => obj.id==skillid))) return;
			// 全屏轰炸
			if (skillid==309) {
				mod.setTimeout(() => { sendMessage(bossSkillID.msg); }, 12000);
				return;
			}
			sendMessage(bossSkillID.msg);
		}
		// RK_2王
		else if ([735, 935].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = RK_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// RK_3王
		else if ([735, 935].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = RK_BOSS_3.find(obj => obj.id==skillid))) return;
			// 破盾
			if (skillid==321) {
				mod.setTimeout(() => { sendMessage(RK_TipMsg[4]); }, 90000);
			}
			sendMessage(bossSkillID.msg);
		}
		
		// RR_1王
		else if ([739, 939].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = RR_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// RR_2王
		else if ([739, 939].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = RR_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// RR_3王
		else if ([739, 939].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = RR_BOSS_3.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// AA_1王
		else if ([720, 920, 3017].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = AA_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// AA_2王
		else if ([720, 920, 3017].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = AA_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// AA_3王
		else if ([720, 920, 3017].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = AA_BOSS_3.find(obj => obj.id==skillid))) return;
			// 后砸技能判定
			if (skillid==104) {
				if (Date.now() - lastRotationDate > 1200) {
					rotationDelay = 0;
				}
				if (Date.now() - lastTwoUpDate - rotationDelay < 2900) {
					sendMessage(bossSkillID.msg);
				}
				lastTwoUpDate = Date.now();
			} else {
				lastTwoUpDate = 0;
				lastRotationDate = 0;
				sendMessage(bossSkillID.msg);
			}
		}
		
		// DRC_1王
		else if ([783, 983, 3018].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = DRC_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// DRC_2王
		else if ([783, 983, 3018].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = DRC_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// DRC_3王
		else if ([783, 983, 3018].includes(whichmode) && event.templateId==3000) {
			if (event.stage!=0 || !(bossSkillID = DRC_BOSS_3.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// GLS_1王
		else if ([782, 982, 3019].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = GLS_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// GLS_2王
		else if ([782, 982, 3019].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = GLS_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// GLS_3王
		else if ([782, 982, 3019].includes(whichmode) && event.templateId==3000) {
			if (!(bossSkillID = GLS_BOSS_3.find(obj => obj.id==skillid))) return;
			// 蓄电层数计数系统
			if (whichmode==982) {
				if (skillid==300) Level = 0, levelMsg = bossSkillID.level_Msg, power = true; // 一次觉醒 开始充能计数
				if (skillid==360) Level = 0;                                                 // 放电爆炸 重置充能计数
				if (skillid==399) Level = 0, levelMsg = bossSkillID.level_Msg;               // 二次觉醒 重置充能计数
				// 充能开关打开 并且 施放以下技能 则增加一层
				if (power) {
					// 三连击, 左后, 左后 (扩散), 右后, 右后 (扩散), 后砸前砸, 尾巴
					if ([118, 143, 145, 146, 154, 144, 147, 148, 155, 161, 162, 213, 215].includes(skillid)) {
						TipMsg = " | " + levelMsg[Level];
						Level++;
					} else {
						TipMsg = "";
					}
				}
				// 屏蔽[三连击]技能连续触发充能
				if (power && (skillid==118)) {
					power = false;
					mod.setTimeout(() => { power = true }, 4000);
				}
			}
			sendMessage(bossSkillID.msg + TipMsg);
		}
		
		// GV_1王
		else if ([3101, 3201].includes(whichmode) && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = GV_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// GV_2王
		else if ([3101, 3201].includes(whichmode) && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = GV_BOSS_2.find(obj => obj.id==skillid))) return;
			if (whichmode==3101 && skillid==227) return;
			sendMessage(bossSkillID.msg);
		}
		
		// AQ_1王
		else if (whichmode==3023 && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = AQ_BOSS_1.find(obj => obj.id==event.skill.id))) return;
			// 诅咒
			if (myColor && (event.skill.id==3119||event.skill.id==3220)) {
				sendMessage(bossSkillID.msg + bossSkillID.TIP[myColor%30231000]);
				return;
			}
			sendMessage(bossSkillID.msg);
		}
		// AQ_2王
		else if (whichmode==3023 && event.templateId==2000) {
			if (event.stage!=0 || !(bossSkillID = AQ_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		
		// SI_1王
		else if (whichmode==3020 && event.templateId==1900) {
			if (event.stage!=0 || !(bossSkillID = SI_BOSS_1.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// SI_2王
		else if (whichmode==3020 && event.templateId==1200) {
			if (event.stage!=0 || !(bossSkillID = SI_BOSS_2.find(obj => obj.id==skillid))) return;
			sendMessage(bossSkillID.msg);
		}
		// SI_3王
		else if (whichmode==3020 && event.templateId==2200) {
			if (!(bossSkillID = SI_BOSS_3.find(obj => obj.id==skillid))) return;
			// 后擒 -> 转圈 | ↓30% 前砸
			if (skillid==127) {
				if (boss_HP > 0.3) {
					sendMessage(bossSkillID.msg + bossSkillID.TIP[0]);
					return;
				} else {
					sendMessage(bossSkillID.msg + bossSkillID.TIP[1]);
					return;
				}
			}
			// 三连击 开始技能
			if (skillid==121 || skillid==122) {
				bossBuff = skillid;
				return;
			}
			// 三连击 结束技能
			if (skillid==120 || skillid==123) {		// 126 大前砸 / 134 大转圈
				sendMessage(SI_TipMsg[(bossBuff+skillid) % 241]);
				return;
			}
			sendMessage(bossSkillID.msg);
		}
		// 凯尔
		else if ([3026, 3126].includes(whichmode) && [1000, 1001, 1002].includes(event.templateId)) {
			if (event.stage!=0 || !(bossSkillID = CK_BOSS.find(obj => obj.id==skillid))) return;
			// 内火-外冰
			if ([212, 215].includes(skillid)) {
				sendMessage(bossSkillID.msg + CK_TipMsg[(bossWord+myDeBuff)%2]);
				return;
			}
			// 内冰-外火
			if ([213, 214].includes(skillid)) {
				sendMessage(bossSkillID.msg + CK_TipMsg[(bossWord+myDeBuff+1)%2]);
				return;
			}
			sendMessage(bossSkillID.msg);
		}
		// 狂气
		else if (whichmode==3027 && event.templateId==1000) {
			if (event.stage!=0 || !(bossSkillID = KQ_BOSS.find(obj => obj.id==skillid))) return;
			// 紫红 鉴定预测
			if ([350, 357].includes(skillid)) {
				mod.setTimeout(() => { sendMessage(KQ_TipMsg[0], 25); }, 58000);
			}
			sendMessage(bossSkillID.msg);
		} else {
			
		}
	}
	// 发送提示文字
	function sendMessage(msg, chl) {
		if (SendToStream) {
			mod.command.message(msg);
		} else {
			mod.send('S_CHAT', 3 , {
				channel: chl ? chl : 21, // 21 = 队长通知, 1 = 组队, 2 = 公会, 25 = 团长通知
				name: 'DG-Guide',
				message: msg
			});
		}
	}
	// 更新 队内玩家 标记
	function UpdateMarkers() {
		mod.send('S_PARTY_MARKER', 1, {
			markers: partyMakers
		});
	}
	
}
