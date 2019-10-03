var gameData = {
  isFirstCoco: true,
  isFirstCrack: true,
  log: " ",

  coconuts: 0,
  stone: 0,
  milk: 0,
  monkeys: 0,

  coconutPerClick: 1,
  stonePerClick: .5,
  milkPerCrack: 0.75,
  monkeyAddRate: 1.75,

  coconutPerS: 0,

  b1: true,
  b2: false,
  b3: false,
  b4: false,
  b5: false,

  cocoPerClickCost: 10,
  crackOpenCocoCost: 50,
  crackOpenStoneCost: 5,
  monkeyCost:6,
}

window.onload = function() {
  hide("cocoCollected")
  hide("collectStone")
  hide("stoneTip")
  hide("perClickUpgrade")
  hide("crackOpenCoco")
  hide("crackOpenTip")
  hide("befriendMonkey")
  tab("coconutUpgrades")
}

var checkToShow = window.setInterval(function() {
  if (gameData.coconuts >= 1) {
    document.getElementById("cocoCollected").style.display = "inline-block"
  }
  if (gameData.stone > 0) {
    document.getElementById("stoneCollected").style.display = "inline-block"
  }
  if (gameData.coconuts >=5) {
    display("perClickUpgrade")
    display("buyBasketTip")
    gameData.b2 = true
  }
  if (gameData.coconuts >= 75) {
    display("collectStone")
    display("stoneTip")
    gameData.b3 = true
  }
  if (gameData.stone >= 9.9) {
    display("crackOpenCoco")
    display("crackOpenTip")
    gameData.b4 = true
  }
  if (gameData.milk >= 3.74) {
    display("befriendMonkey")
    display("monkyTip")
    gameData.b5 = true
  }
  if (gameData.coconuts >= gameData.cocoPerClickCost) {
    enable("perClickUpgrade")
  }
  else {
    disable("perClickUpgrade")
  }
  if (gameData.coconuts >= gameData.crackOpenCocoCost && gameData.stone >= gameData.crackOpenStoneCost) {
    enable("crackOpenCoco")
    disable("crackOpenTip")
  }
  else {
    disable("crackOpenCoco")
    disable("crackOpenTip")
  }
  if (gameData.milk >= gameData.monkeyCost) {
    enable("befriendMonkey")
    enable("monkyTip")
  }
  else {
    disable("befriendMonkey")
    disable("monkyTip")
  }
}, 500)

var automationLoop = window.setInterval(function() {
  automateCoconuts()
}, 1000)

function automateCoconuts() {
  gameData.coconuts += gameData.coconutPerS
  update("cocoCollected", Number(gameData.coconuts.toPrecision(6)) + " Coconuts")
}

function tab(tab) {
  document.getElementById("coconutUpgrades").style.display = "none"
  document.getElementById("researchUpgrades").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}
function update(id, content) {
  document.getElementById(id).innerHTML = content
}
function display(id) {
  document.getElementById(id).style.display = "inline-block"
}
function hide(id) {
  document.getElementById(id).style.display = "none"
}
function disable(id) {
  document.getElementById(id).style.opacity = 0.6
}
function enable(id) {
  document.getElementById(id).style.opacity = 1
}
function updateGameLog() {
  gameData.log = document.getElementById("log").innerHTML
}
/* YOU CANNOT FORGET TO PUT NEW VARIABLES HERE TO MAKE SURE THE LOAD FEATURE WORKS*/
function updateAllVariables(savegame) {
  update("stoneCollected", gameData.stone + " Stone")
  update("cocoCollected", gameData.coconuts + " Coconuts")
  update("milkCollected", gameData.milk + " Coconut Milk")
  update("monkeys", gameData.monkeys + " monkeys")

  if (savegame.b2) {
    display("perClickUpgrade")
  }
  if (savegame.b3) {
    display("collectStone")
  }
  if (gameData.b4) {
    display("crackOpenCoco")
  }
  if (gameData.b5) {
    display("befriendMonkey")
  }

  update("perClickUpgrade", "Basket (Level " + gameData.coconutPerClick + ")")

  update("collectCoconutTip", "Gather a coconut from the sand")
  update("buyBasketTip", "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts")
  update("monkyTip", "(+1 coconut/s) <br> ----- <br> They seem to like the milk! Make a friend. <br> ----- <br> Cost: " + gameData.monkeyCost + " coconut milk")
  display("crackOpenTip")
  display("stoneTip")


  update("log", gameData.log)
}

/*
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('islandSave', JSON.stringify(gameData))
}, 20000)
*/
function saveGame() {
    localStorage.setItem('islandSave', JSON.stringify(gameData))
}
function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("islandSave"))
  if (savegame !== null) {
    gameData = savegame
    updateAllVariables(savegame)
  }
}
