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
  monkeyAddRate: 1,

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
    console.log('we set b3 to true')
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
  gameData.coconuts += gameData.coconutPerS

}, 1000)


function collectCoconut() {
  if (gameData.isFirstCoco == true) {
    document.getElementById("log").innerHTML = "This would feed you, but you can't crack it open. <br><br>" + document.getElementById("log").innerHTML
    gameData.isFirstCoco = false
    gameData.log = document.getElementById("log").innerHTML
  }
  gameData.coconuts += gameData.coconutPerClick
  document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
}

function buyCoconutPerClick() {
  if (gameData.coconuts >= gameData.cocoPerClickCost) {
    gameData.coconuts -= gameData.cocoPerClickCost
    gameData.coconutPerClick += 1
    gameData.cocoPerClickCost *= 2.5
    document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
    document.getElementById("perClickUpgrade").innerHTML = "Basket (Level " + gameData.coconutPerClick + ")"
    document.getElementById("collectCoconutTip").innerHTML = "(+" +gameData.coconutPerClick + " coconut/click)<br> ----- <br> Gather a coconut from the sand"
    document.getElementById("buyBasketTip").innerHTML = "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts"
  }
}

function collectStone() {
  gameData.stone += gameData.stonePerClick
  document.getElementById("stoneCollected").innerHTML = gameData.stone + " Stone"
}

function crackOpenCoconut() {
  if (gameData.coconuts >= gameData.crackOpenCocoCost && gameData.stone >= gameData.crackOpenStoneCost) {
    if (gameData.isFirstCrack == true) {
      update("log", "The stones are dull, and most of the milk quickly seeped into the sand, but you managed to store some.  You wonder what this will attract. <br><br>" + document.getElementById("log").innerHTML)
      gameData.isFirstCrack = false
      updateGameLog()
    }
    gameData.coconuts -= gameData.crackOpenCocoCost
    gameData.stone -= gameData.crackOpenStoneCost
    gameData.milk += gameData.milkPerCrack
    update("milkCollected", gameData.milk + " Coconut Milk")
    update("cocoCollected", gameData.coconuts + " Coconuts")
    update("stoneCollected", gameData.stone + " Stone")
  }
}

function befriendMonkey() {
  if (gameData.milk > gameData.monkeyCost) {
    console.log('monky time')
    gameData.monkeys += 1
    gameData.coconutPerS += gameData.monkeyAddRate
    gameData.milk -= gameData.monkeyCost
    gameData.monkeyCost *= gameData.monkey + 10(ln(gameData.monkeyCost))
    update("monkeys", gameData.monkeys + " monkeys")
    update("milkCollected", gameData.milk + " Coconut Milk")
  }
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

function format(number, type) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

/* YOU CANNOT FORGET TO PUT NEW VARIABLES HERE TO MAKE SURE THE LOAD FEATURE WORKS*/
function updateAllVariables(savegame) {
  update("stoneCollected", gameData.stone + " Stone")
  update("cocoCollected", gameData.coconuts + " Coconuts")
  update("milkCollected", gameData.milk + " Coconut Milk")
  if (savegame.b2) {
    console.log("please display baskets")
    display("perClickUpgrade")
  }
  if (savegame.b3) {
    console.log("please display stone collection")
    display("collectStone")
  }
  if (gameData.b4) {
    display("crackOpenCoco")
  }

  update("perClickUpgrade", "Basket (Level " + gameData.coconutPerClick + ")")

  update("collectCoconutTip", "Gather a coconut from the sand")
  update("buyBasketTip", "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts")
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
