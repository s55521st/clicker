//名前処理
let plyername = prompt("名前は？");
plySt0.textContent =plyername;
//プレイヤーデータ
let flag = true;
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = [5, 10, 15, 30, 50, 100, 150, 200, 300];
let plyExpNeed = [5, 10, 15, 30, 50, 100, 150, 200, 300];
let plyImg = document.getElementById("plyImg");
let plySt = new Array(7);
for (let i = 0; plySt.length > i; i++) {
  plySt[i] = document.getElementById("plySt" + i);
  console.log(plySt[i]);
}

//敵データ
let eneLv = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let eneHp = new Array(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
let eneHpMax = new Array(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
let eneAtt = new Array(2, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let eneKill = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let eneExp = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let eneCnt = new Array(5, 3, 3, 4, 7, 5, 7, 8, 9, 10);
let eneCntMax = new Array(5, 3, 3, 4, 7, 5, 7, 8, 9, 10);
let eneName =new Array("スライム","コウモリ","ネズミ","へビ","おおかみ","おに","ゴースト","ゾンビ","火の玉","【BOSS】くま")
let eneNum = 0;
let eneImg = document.getElementById("eneImg");
let eneSec = document.getElementById("eneSec");
let eneSt = new Array(5);
for (let i = 0; eneSt.length > i; i++) {
  eneSt[i] = document.getElementById("eneSt" + i);
  console.log(eneSt[i]);
}
function change() {
  eneHp[eneNum] = eneHpMax[eneNum];
  eneImg.src = "img/enemyA" + eneNum + ".png";
  eneSt0.textContent = eneName[eneNum];
  eneSt1.textContent = "レベル:" + eneLv[eneNum];
  eneSt2.textContent = "HP:" + eneHp[eneNum];
  eneSt3.textContent = "攻撃力:" + eneAtt[eneNum];
  eneSt4.textContent = "倒した回数" + eneKill[eneNum];
}
//プレイヤー回復

plyImg.addEventListener("mousedown", () => {
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpMax) {
      plyHp = plyHpMax;
    }
    plySt2.textContent = "HP:" + plyHp;
  }
});

//敵を攻撃

eneImg.addEventListener("mousedown", () => {
  if (flag) {
    eneImg.src = "img/enemyB" + eneNum + ".png";
  }
});
eneImg.addEventListener("mouseup", () => {
  if (flag) {
    eneImg.src = "img/enemyA" + eneNum + ".png";
    if (eneHp[eneNum] > 0) {
      eneHp[eneNum] -= plyAtt;
      if (eneHp[eneNum] < 0) {
        eneHp[eneNum] = 0;
      }
    } else {
      eneHp[eneNum] = eneHpMax[eneNum];
      eneKill[eneNum]++;
      eneSt4.textContent = "倒した回数:" + eneKill[eneNum];
      //クリア
      if (eneKill[9] > 0) {
        flag = false;
        eneImg.src = "img/clear.png";
        clearInterval(loop);
      }
      //経験値の処理
      plyExp += eneExp[eneNum];
      if (plyExp <= 300) {
        plySt5.textContent = "経験値" + plyExp;
        plyExpNext[plyLv] -= eneExp[eneNum];
      } else {
        plySt5.textContent = "経験値:MAX";
        plySt6.textContent = "次のレベルまでの経験値∞ポイント";
      }
      //レベルアップの処理
      if (plyExpNext[plyLv] <= 0) {
        plyLv++;
        console.log(plyExpNext[plyLv]);
        plyExpNext[plyLv] = plyExpNeed[plyLv];
        plySt1.textContent = "レベル:" + plyLv;
        plyHpMax = plyLv * 2 + 6;
        plyHp = plyHpMax; //全回復
        plySt2.textContent = "HP:" + plyHp;
        plyAtt++;
        plySt3.textContent = "攻撃力:" + plyAtt;
        plyHeal++;
        plySt4.textContent = "回復魔法:" + plyHeal;
      }
      console.log(plyLv);
      console.log(plyExpNext[plyLv]);
      plySt6.textContent =
        "次のレベルまでの経験値" + plyExpNext[plyLv] + "ポイント";
    }
    eneSt2.textContent = "HP:" + eneHp[eneNum];
  }
});

let left = document.getElementById("left");
let right = document.getElementById("right");
//逃げる
left.addEventListener("click", () => {
  if (flag) {
    if (eneNum > 0) {
      eneNum--;
      change();
    }
  }
});
//次の敵
right.addEventListener("click", () => {
  if (flag) {
    if (eneNum < 9) {
      eneNum++;
      change();
    }
  }
});
//攻撃カウントなど
let loop = setInterval(() => {
  if (eneCnt[eneNum] > 0) {
    eneCnt[eneNum]--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNum] + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp -= eneAtt[eneNum];
    if (plyHp > 0) {
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNum] + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySt2.textContent = "HP:" + plyHp;
      eneSec.textContent = "ゲームオーバー";z
    }

    setTimeout(() => {
      if (flag) {
        plyImg.src = "img/playerA.png";
        eneCnt[eneNum] = eneCntMax[eneNum];
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneNum] + "秒";
      }
    }, 500);
  }
}, 1000);
