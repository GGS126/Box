let turnCount = 1;
let playerName = "플레이어";
let nameLocked = false;

function setPlayerName() {
if (nameLocked) return;

const input = document.getElementById("player-name-input").value.trim();


if (input) {
    playerName = input;
    document.getElementById("player-name-display").innerText = `🧙 ${playerName} 님의 상태`;
    logMessage(`👋 안녕하세요, ${playerName}님! 이름이 설정되었습니다.`);

    document.getElementById("player-name-input").disabled = true;
    document.querySelector('button[onclick="setPlayerName()"]').disabled = true;

    nameLocked = true;
    }
}

    // 몬스터 정보 숨기기
    function initializeMonsterUI() {
    document.getElementById("monster-name").innerText = "???";
    document.getElementById("monster-hp").innerText = "???";
    document.getElementById("monster-atk").innerText = "???";
    document.getElementById("monster-hp-bar-wrapper").style.display = "none";
    }

    document.addEventListener("DOMContentLoaded", () => {
    initializeMonsterUI();
    });



function startGame() {
    if (!nameLocked || playerName === "") {
        alert("🎯 먼저 플레이어 이름을 입력하고 설정해주세요!");
        return;
        }

    turnCount = 1;
    document.getElementById("turn-count").innerText = turnCount;

    const log = document.getElementById("log");
    log.innerHTML = "";

    currentRound = 1;
    currentMonsterIndex = 0;
    player.hp = player.maxHp;
    player.mp = player.maxMp;
    document.getElementById("player-hp").innerText = player.hp;
    document.getElementById("player-mp").innerText = player.mp;
    updatePlayerHPBar();
    updateMPBar();



  
    document.getElementById("monster-hp-bar-wrapper").style.display = "block";
    updateMonsterHPBar(60, 60);
    logMessage(`🎮 ${playerName}님, 게임이 시작되었습니다!`);
    loadNextMonster();

    const actionButtons = document.querySelectorAll("button.btn-action, button.btn-shop");
    actionButtons.forEach(btn => btn.disabled = false);


    updateItemCounts();
    updatePlayerAtkText();

    }




    function logMessage(message) {
    const logContainer = document.getElementById("log");
    const logScrollArea = document.getElementById("log-area");

    const p = document.createElement("p");
    p.innerText = message;
    logContainer.appendChild(p);

    logScrollArea.scrollTop = logScrollArea.scrollHeight;
    }





    const player = {
    hp: 100,
    maxHp: 100,
    mp: 100,
    maxMp: 100,
    atk: 30,
    crit: 25,
    coins: 10,
    level: 1,
    defending: false,
    skills: {
        sneak: { cooldown: 0, upgraded: false },
        improvise: { cooldown: 0, upgraded: false }
    },
    noActionTurns: 0,
    debuff: {
        weakened: 0,
        threatened: 0
    },
    items: {
        hpPotion: 5,
        mpPotion: 5,
        dumpling: 3
    },
    buff: {
        atkBonus: 0,
        buffTurns: 0
    }
    };










    //몬스터
    const monsterStatus = {
    burnTurn: 0,
    shockTurn: 0,
    weakenTurn: 0,
    critDownTurn: 0
    };




    //몬스터 정보
    const monstersByRound = {
    1: [
        {
        name: "고블린",
        maxHp: 60,
        atk: 20,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "오우거",
        maxHp: 80,
        atk: 30,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "슬라임 대장",
        maxHp: 100,
        atk: 15,
        dmgRate: [0.5, 1.0],
        special: {
            type: "증식",
            triggerHpRate: 0.33,
            effect: {
            healRate: 0.33,
            atkBoost: 10,
            },
        },
        },
    ],
    2: [
        {
        name: "레드 고블린",
        maxHp: 80,
        atk: 40,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "빅 오우거",
        maxHp: 100,
        atk: 50,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "골렘",
        maxHp: 200,
        atk: 15,
        dmgRate: [0.7, 0.8],
        special: {
            type: "격분",
            triggerHpRate: 0.5,
            effect: {
            damageTakenReduction: 15,
            damageGivenBonus: 15,
            },
        },
        },
    ],
    3: [
        {
        name: "블루 고블린",
        maxHp: 100,
        atk: 60,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "암컷 오우거",
        maxHp: 130,
        atk: 70,
        dmgRate: [0.3, 0.4],
        },
        {
        name: "레드 드래곤",
        maxHp: 300,
        atk: 70,
        dmgRate: [0.5, 0.6],
        skill: {
            name: "브레스",
            chance: 0.33,
            dmgRate: 0.4,
            effect: "burn",
        },
        },
    ],
    4: [
        {
        name: "고블린 대장",
        maxHp: 130,
        atk: 75,
        dmgRate: [0.4, 0.5],
        },
        {
        name: "오우거 대장",
        maxHp: 160,
        atk: 80,
        dmgRate: [0.45, 0.5],
        },
        {
        name: "살인토끼",
        maxHp: 300,
        atk: 70,
        dmgRate: [0.25, 0.9],
        skill: {
            name: "야습",
            interval: 3, 
            dmgRate: [0.25, 0.9],
            effect: "threaten", 
        },
        },
    ],
    5: [
        {
        name: "아이언 골렘",
        maxHp: 300,
        atk: 20,
        dmgRate: [0.33, 0.5],
        skill: {
            chance: 0.3,
            effect: {
            heal: 30,
            atkBoost: 10,
            },
            enragedTrigger: 0.5,
            enragedEffect: {
            extraDamageTaken: 15,
            extraDamageDealt: 15,
            },
        },
        },
    ],
    };




    let currentRound = 1;
    let currentMonsterIndex = 0;
    let currentMonster = null;



    function loadNextMonster() {
    const monsters = monstersByRound[currentRound];


    if (currentMonsterIndex >= monsters.length) {
        logMessage(`🌟 라운드 ${currentRound} 완료! 다음 라운드로 넘어갑니다.`);
        currentRound++;
        currentMonsterIndex = 0;

        if (!player.level) player.level = 1;
        player.level++; 

        // 플레이어 능력치 증가
        player.maxHp += 30;
        player.maxMp += 25;
        player.atk += 20;
        updatePlayerAtkText();
        player.hp = player.maxHp;
        player.mp = player.maxMp;

        updatePlayerHPBar();
        updateMPBar();
        document.getElementById("player-hp").innerText = player.hp;
        document.getElementById("player-mp").innerText = player.mp;
        document.getElementById("player-atk").innerText = player.atk;
        updatePlayerAtkText();

        logMessage(`🆙 레벨업! 현재 레벨 ${player.level}`);
        return;
    }

    // 다음 몬스터 불러오기
    const monster = monsters[currentMonsterIndex];
    currentMonster = { ...monster, hp: monster.maxHp };

    logMessage(`[ 👹 ${currentMonster.name} 등장! ]`);

    document.getElementById("monster-name").innerText = currentMonster.name;
    document.getElementById("monster-hp").innerText = currentMonster.hp;
    document.getElementById("monster-atk").innerText = currentMonster.atk;
    document.getElementById("monster-hp-bar-wrapper").style.display = "block";
    updateMonsterHPBar(currentMonster.hp, currentMonster.maxHp);

    currentMonsterIndex++;
}



    








    //HP 바
    function updatePlayerHPBar() {
    const hpBar = document.getElementById("hp-bar");
    const percent = Math.max(0, (player.hp / player.maxHp) * 100);
    hpBar.style.width = percent + "%";
    }


    //MP 바
    function updateMPBar() {
    const mpBar = document.getElementById("mp-bar");
    const percent = Math.max(0, (player.mp / player.maxMp) * 100);
    mpBar.style.width = percent + "%";
    }




    function nextTurn() {
    turnCount++;
    document.getElementById("turn-count").innerText = turnCount;

    processTurnEffects(); 

    updateSkillCooldownUI();

    }









    function logMessage(message) {
    const logContainer = document.getElementById("log");        
    const logScrollArea = document.getElementById("log-area"); 

    const p = document.createElement("p");
    p.innerText = message;
    logContainer.appendChild(p);


    logScrollArea.scrollTop = logScrollArea.scrollHeight;
    }


    function updateMonsterHPBar(current, max) {
        const bar = document.getElementById("monster-hp-bar");
        const percent = Math.max(0, (current / max) * 100);
        bar.style.width = percent + "%";
    }









    function basicAttack() {
    if (player.noActionTurns > 0) {
        logMessage("[😶 무적 상태 중에는 행동할 수 없습니다.]");
        return;
    }


    defendAttemptCount = 0;
    defendLocked = false;

    nextTurn(); 

    const playerAtk = player.atk + player.buff.atkBonus;
    const monsterHpElement = document.getElementById("monster-hp");
    let monsterHp = parseInt(monsterHpElement.innerText);

    const dmgRate = Math.random() * (0.4 - 0.3) + 0.3;
    let damage = Math.floor(playerAtk * dmgRate);

    const isCrit = Math.random() < (player.crit / 100);
    if (isCrit) {
        damage = Math.floor(damage * 1.5);
        logMessage(`[💥 치명타 발동! ]`);
    }

    monsterHp -= damage;
    monsterHp = Math.max(0, monsterHp);
    monsterHpElement.innerText = monsterHp;
    updateMonsterHPBar(monsterHp, currentMonster.maxHp);

    logMessage(`⚔️ ${playerName}님의 기본 공격! ${damage} 데미지!`);

    if (monsterHp <= 0) {
        logMessage("🎉 몬스터를 처치했습니다!");
        setTimeout(() => {
            loadNextMonster();
        }, 1000);
        return;
    }

   
    setTimeout(enemyAttack, 500);
}






    //방어
    let defendAttemptCount = 0;
    let defendLocked = false; 


    function defend() {

    if (player.noActionTurns > 0) {
    logMessage("[😶 무적 상태 중에는 행동할 수 없습니다.]");
    return;
    }


    if (defendLocked) {
        logMessage(`⛔ 연속 방어 제한! 기본 공격 또는 스킬을 사용해야 다시 방어할 수 있습니다.`);
        return;
    }

    nextTurn(); 

    defendAttemptCount++;

    // 연속 4회째 방어 시도
    if (defendAttemptCount > 3) {
        defendLocked = true;
        logMessage(`❌ 방어를 연속으로 4회 사용했습니다. 방어가 금지됩니다. 기본 공격 또는 스킬을 사용해 해제하세요.`);
        return; 
    }

    // 확률 설정
    let successRate = 1.0;
    if (defendAttemptCount === 2) {
        successRate = 0.33;
    } else if (defendAttemptCount === 3) {
        successRate = 0.10;
    }

    const success = Math.random() < successRate;

    if (success) {
        player.defending = true;
        logMessage(`[🛡️ 방어 준비! (연속 ${defendAttemptCount}회) ]`);
    } else {
        player.defending = false;
        logMessage(`[⚠️ 방어 실패! (연속 ${defendAttemptCount}회) ]`);
    }

    setTimeout(() => {
        enemyAttack(); 
    }, 500);

    
    }



    function enemyAttack() {
    if (player.noActionTurns > 0) {
        logMessage("💥 몬스터의 공격!");
        logMessage("🛡️ 무적 상태! 몬스터의 공격을 완전히 방어했습니다.");
        return;
    }

    if (applyStatusEffects()) return;

    const monsterAtk = parseInt(document.getElementById("monster-atk").innerText);
    let damage = Math.floor(monsterAtk * (Math.random() * 0.1 + 0.3));

    if (player.defending) {
        logMessage(`🛡️ 방어 성공! 피해를 입지 않았습니다.`);
        player.defending = false;
        return;
    }

    const hpEl = document.getElementById("player-hp");
    let playerHp = parseInt(hpEl.innerText);
    if (isNaN(playerHp)) playerHp = player.maxHp;
    playerHp = Math.max(0, playerHp - damage);
    hpEl.innerText = playerHp;
    player.hp = playerHp;

    updatePlayerHPBar();
    logMessage(`💥 몬스터의 공격! ${damage} 데미지를 입었습니다`);
}






    //스킬
    let skillUIVisible = false;


    function useSkill() {

    if (player.noActionTurns > 0) {
    logMessage("[😶 무적 상태 중에는 행동할 수 없습니다.]");
    return;
    }


  
    defendAttemptCount = 0;
    defendLocked = false;

    const skillUI = document.getElementById("skill-select");
    skillUIVisible = !skillUIVisible;
    skillUI.style.display = skillUIVisible ? "block" : "none";
    }



    function closeSkillUI() {
    document.getElementById("skill-select").style.display = "none";
    skillUIVisible = false;
    }

    //스킬 쿨타임
    function reduceCooldownsEachTurn() {
    const skills = player.skills;
    for (let key in skills) {
        if (skills[key].cooldown > 0) skills[key].cooldown--;
    }

    if (player.noActionTurns > 0) player.noActionTurns--;
    }



    //화염구
    function castFireball() {
    closeSkillUI();

    player.skills.fireball = player.skills.fireball || { cooldown: 0, upgraded: false };
    if (player.skills.fireball.cooldown > 0) {
        logMessage(`⏳ 화염구는 ${player.skills.fireball.cooldown}턴 후 사용 가능합니다.`);
        return;
    }
    nextTurn();

    if (player.mp < 15) {
        logMessage("❌ MP가 부족합니다!");
        return;
    }

    player.mp -= 15;
    document.getElementById("player-mp").innerText = player.mp;
    updateMPBar();

    const rate = Math.random() * (0.45 - 0.35) + 0.35;
    const damage = Math.floor(player.atk * rate);
    logMessage(`🔥 화염구 발사! ${damage} 데미지!`);

    const monsterHpEl = document.getElementById("monster-hp");
    let hp = parseInt(monsterHpEl.innerText);
    hp = Math.max(0, hp - damage);
    monsterHpEl.innerText = hp;
    updateMonsterHPBar(hp, currentMonster.maxHp);

    if (Math.random() < 0.45) {
        monsterStatus.burnTurn = 3;
        logMessage("[🔥 몬스터 화상! ]");
    }

    player.skills.fireball.cooldown = 3;
    updateSkillCooldownUI();


    if (hp <= 0) {
        logMessage("🎉 몬스터를 처치했습니다!");
        setTimeout(() => {
        loadNextMonster();
        }, 1000);
        return;
    }

    setTimeout(enemyAttack, 500);
    }





    //뇌전
    function castThunder() {
    closeSkillUI();

    player.skills.thunder = player.skills.thunder || { cooldown: 0, upgraded: false };

    if (player.skills.thunder.cooldown > 0) {
        logMessage(`⏳ 뇌전은 ${player.skills.thunder.cooldown}턴 후 사용 가능합니다.`);
        return;
    }
    nextTurn();

    if (player.mp < 25) {
        logMessage("❌ MP가 부족합니다!");
        return;
    }

    player.mp -= 25;
    document.getElementById("player-mp").innerText = player.mp;
    updateMPBar();

    const rate = Math.random() * (0.6 - 0.5) + 0.5;
    const damage = Math.floor(player.atk * rate);
    logMessage(`⚡ 뇌전 발동! ${damage} 데미지!`);

    const monsterHpEl = document.getElementById("monster-hp");
    let hp = parseInt(monsterHpEl.innerText);
    hp = Math.max(0, hp - damage);
    monsterHpEl.innerText = hp;
    updateMonsterHPBar(hp, currentMonster.maxHp);

    if (Math.random() < 0.33) {
        monsterStatus.shockTurn = 1;
        logMessage("[⚡ 몬스터 감전 됨! ]");
    }

   
    player.skills.thunder.cooldown = player.skills.thunder.upgraded ? 3 : 4;
    updateSkillCooldownUI();


    if (hp <= 0) {
        logMessage("🎉 몬스터를 처치했습니다!");
        setTimeout(() => {
        loadNextMonster();
        }, 1000);
        return;
    }

    setTimeout(enemyAttack, 500);
    }

        





    //기습
    function castSneakAttack() {
    closeSkillUI();

    const skill = player.skills.sneak;

  
    if (skill.cooldown > 0) {
        logMessage(`⏳ 기습은 ${skill.cooldown}턴 후 사용 가능합니다.`);
        return;
    }

    const mpCost = skill.upgraded ? 20 : 15;
    if (player.mp < mpCost) {
        logMessage("❌ MP가 부족합니다!");
        return;
    }

 
    nextTurn();

    player.mp -= mpCost;
    document.getElementById("player-mp").innerText = player.mp;
    updateMPBar();

    const rate = skill.upgraded ? 0.20 : 0.15;
    const damage = Math.floor(player.atk * rate);
    logMessage(`🗡️ 기습 공격! ${damage} 데미지`);


        
    // 몬스터 HP 감소
    let hp = parseInt(document.getElementById("monster-hp").innerText);
    hp = Math.max(0, hp - damage);
    document.getElementById("monster-hp").innerText = hp;
    updateMonsterHPBar(hp, currentMonster.maxHp);

    // 상태이상 적용
    monsterStatus.weakenTurn = 1;
    if (skill.upgraded) monsterStatus.critDownTurn = 3;

    logMessage(`[😈 몬스터 약화! ]`);
    if (skill.upgraded) logMessage(`📉 치명타 확률 감소! (3턴)`);

    // 쿨타임 설정
    skill.cooldown = 4;
    updateSkillCooldownUI();

    if (hp <= 0) {
        logMessage("🎉 몬스터를 처치했습니다!");
        setTimeout(() => loadNextMonster(), 1000);
        return;
    }

    setTimeout(enemyAttack, 500);
}





    // 임기응변
    function castImprovise() {
    closeSkillUI();

    const skill = player.skills.improvise;
    if (skill.cooldown > 0) {
        logMessage(`⏳ 임기응변은 ${skill.cooldown}턴 후 사용 가능합니다.`);
        return;
    }

    const mpCost = skill.upgraded ? 30 : 40;
    if (player.mp < mpCost) {
        logMessage("❌ MP가 부족합니다!");
        return;
    }

    player.mp -= mpCost;
    document.getElementById("player-mp").innerText = player.mp;
    updateMPBar();

    player.noActionTurns = 2;
    logMessage(`[🛡️ 임기응변 발동! 2턴간 무적 / 행동금지 ]`);

    player._wasInvincible = true; 

    skill.cooldown = skill.upgraded ? 6 : 7;
    updateSkillCooldownUI();


    autoSkipTurnsDuringImprovise(2);
}



    function autoSkipTurnsDuringImprovise(turnsLeft) {
    if (turnsLeft <= 0 || player.hp <= 0) {
        logMessage(`🕐 무적 해제 / ${playerName}님의 턴 입니다 !`);
        player._wasInvincible = false; 
        return;
    }

    nextTurn(); 

    setTimeout(() => {
        logMessage("💢 몬스터의 공격 !"); 
        logMessage("🛡️ 무적 상태 ! ");

        setTimeout(() => {
            autoSkipTurnsDuringImprovise(turnsLeft - 1); 
        }, 800);
    }, 500);
}







    //강화 스킬
    function updateSkillCooldownUI() {
    const sneakBtn = document.getElementById("sneak-btn");
    const cd = player.skills.sneak.cooldown;
    sneakBtn.innerText = cd > 0 ? `🗡️ 기습 (${cd})` : "🗡️ 기습";

    const improvBtn = document.getElementById("improvise-btn");
    const improvCd = player.skills.improvise.cooldown;
    improvBtn.innerText = improvCd > 0 ? `🛡️ 임기응변 (${improvCd})` : "🛡️ 임기응변";

    // 화염구
    const fireballBtn = document.getElementById("fireball-btn");
    const fireballCd = player.skills.fireball?.cooldown || 0;
    fireballBtn.innerText = fireballCd > 0 ? `🔥 화염구 (${fireballCd})` : "🔥 화염구";

    // 뇌전
    const thunderBtn = document.getElementById("thunder-btn");
    const thunderCd = player.skills.thunder?.cooldown || 0;
    thunderBtn.innerText = thunderCd > 0 ? `⚡ 뇌전 (${thunderCd})` : "⚡ 뇌전";
    }






    function processTurnEffects() {
    for (let key in player.skills) {
        if (player.skills[key].cooldown > 0) {
        player.skills[key].cooldown--;
        }
    }

    if (player.noActionTurns > 0) {
        player.noActionTurns--;
    }

    if (monsterStatus.weakenTurn > 0) monsterStatus.weakenTurn--;
    if (monsterStatus.critDownTurn > 0) monsterStatus.critDownTurn--;
    }



    function applyStatusEffects() {
    const monsterHpEl = document.getElementById("monster-hp");
    let hp = parseInt(monsterHpEl.innerText);

    // 화상 데미지
    if (monsterStatus.burnTurn > 0) {
        logMessage("[🔥 몬스터가 화상 피해를 입습니다!(-5) ]");
        hp = Math.max(0, hp - 5);
        monsterHpEl.innerText = hp;
        updateMonsterHPBar(hp, currentMonster.maxHp);
        monsterStatus.burnTurn--;
        if (hp <= 0) {
            logMessage("🎉 몬스터가 화상으로 쓰러졌습니다!");
            return true; 
        }
    }

    // 감전 상태
    if (monsterStatus.shockTurn > 0) {
        monsterStatus.shockTurn--;
        logMessage("⚡ 몬스터가 감전되어 움직이지 못합니다! ");
        return true; 
    }

    // 약화 상태
    if (monsterStatus.weakenTurn > 0) {
        logMessage("[🌀 약화 상태 - 공격력 감소 ]");
        monsterStatus.weakenTurn--;
    }

    // 무적 해제 확인
    if (player.noActionTurns === 0 && player._wasInvincible) {
        player._wasInvincible = false;
        logMessage(`🕐 무적 해제 / ${playerName}님의 턴 !`);
        return true; 
    }

    // 만두 버프 효과
    if (player.buff.buffTurns > 0) {
    player.buff.buffTurns--;
    if (player.buff.buffTurns === 0) {
        player.buff.atkBonus = 0;
        logMessage("🥟 만두 효과가 종료되었습니다.");
        updatePlayerAtkText();
        }

    }



    return false;
}



    //아이템
    let itemUIVisible = false;

    function useItem() {
    if (player.noActionTurns > 0) {
        logMessage("[😶 무적 상태 중에는 행동할 수 없습니다.]");
        return;
    }

    defendAttemptCount = 0;
    defendLocked = false;

    const itemUI = document.getElementById("item-select");
    itemUIVisible = !itemUIVisible;
    itemUI.style.display = itemUIVisible ? "block" : "none";
    }



    //HP포션
    function useHpPotion() {
    document.getElementById("item-select").style.display = "none";
    itemUIVisible = false;

    if (player.items.hpPotion <= 0) {
        logMessage("❌ HP 물약이 없습니다!");
        return;
    }

    nextTurn();
    player.items.hpPotion--;

    const heal = Math.floor(player.maxHp * 0.33);
    player.hp = Math.min(player.hp + heal, player.maxHp);
    document.getElementById("player-hp").innerText = player.hp;
    updatePlayerHPBar();

    logMessage(`[🧪 HP 물약 사용! ${heal} 회복 ]`);
    updateItemCounts();
    setTimeout(enemyAttack, 500);



    }


    //MP포션
    function useMpPotion() {
    document.getElementById("item-select").style.display = "none";
    itemUIVisible = false;

    if (player.items.mpPotion <= 0) {
        logMessage("❌ MP 물약이 없습니다!");
        return;
    }

    nextTurn();
    player.items.mpPotion--;

    const gain = Math.floor(player.maxMp * 0.33);
    player.mp = Math.min(player.mp + gain, player.maxMp);
    document.getElementById("player-mp").innerText = player.mp;
    updateMPBar();

    logMessage(`[🔋 MP 물약 사용! ${gain} 회복 ]`);
    updateItemCounts();
    setTimeout(enemyAttack, 500);
    
    }


    //만두
    function useDumpling() {
    document.getElementById("item-select").style.display = "none";
    itemUIVisible = false;

    if (player.items.dumpling <= 0) {
        logMessage("❌ 만두가 없습니다!");
        return;
    }

    nextTurn();
    player.items.dumpling--;

    player.buff.atkBonus = 15;
    player.buff.buffTurns = 4;
    updatePlayerAtkText(); 

    logMessage("[🥟 만두 섭취! 3턴간 공격력 +15 ]");
    updateItemCounts();
    
    setTimeout(enemyAttack, 500);
    

    }

    function updatePlayerAtkText() {
    const baseAtk = player.atk;
    const bonus = player.buff.atkBonus || 0;
    const atkText = bonus > 0 ? `${baseAtk} (+${bonus})` : `${baseAtk}`;
    document.getElementById("player-atk").innerText = atkText;
    }



    
    function updateItemCounts() {
    document.getElementById("hp-potion-count").innerText = player.items.hpPotion;
    document.getElementById("mp-potion-count").innerText = player.items.mpPotion;
    document.getElementById("dumpling-count").innerText = player.items.dumpling;

    }





