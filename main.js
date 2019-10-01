var gameData = {
  coconuts: 0,
  isFirstCoco: true,
  coconutPerClick: 1,
  cocoPerClickCost: 10,
  stone: 0,
  stonePerClick: .5,
  log: " "
}

window.onload = function() {
  document.getElementById("cocoCollected").style.display = "none"
  document.getElementById("perClickUpgrade").style.display = "none"
  document.getElementById("stoneCollected").style.display = "none"
  tab("coconutUpgrades")
}

var mainGameLoop = window.setInterval(function() {
  if (gameData.coconuts >= 1) {
    document.getElementById("cocoCollected").style.display = "inline-block"
  }
  if (gameData.stone > 0) {
    document.getElementById("stoneCollected").style.display = "inline-block"
  }
  if (gameData.coconuts >=5) {
    document.getElementById("perClickUpgrade").style.display = "inline-block"
    document.getElementById("buyBasketTip").style.display = "inline-block"
  }
  if (gameData.coconuts < gameData.cocoPerClickCost) {
    document.getElementById("perClickUpgrade").style.opacity = 0.6
    document.getElementById("buyBasketTip").style.opacity = 0.6
  }
  if (gameData.coconuts >= 10) {
    document.getElementById("perClickUpgrade").style.opacity = 1
    document.getElementById("buyBasketTip").style.opacity = 1
  }
}, 500)

function collectStone() {
  gameData.stone += gameData.stonePerClick
  document.getElementById("stoneCollected").innerHTML = gameData.stone + " Stone"
}

function collectCoconut() {
  if (gameData.isFirstCoco == true) {
    document.getElementById("log").innerHTML = "This would feed you, but you can't crack it open. <br><br>" + document.getElementById("log").innerHTML
    gameData.isFirstCoco = false
    gameData.log = document.getElementById("log").innerHTML

  }
  gameData.coconuts += gameData.coconutPerClick
  document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
}

function tab(tab) {
  document.getElementById("coconutUpgrades").style.display = "none"
  document.getElementById("researchUpgrades").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}

function buyCoconutPerClick() {
  if (gameData.coconuts >= gameData.cocoPerClickCost) {
    gameData.coconuts -= gameData.cocoPerClickCost
    gameData.coconutPerClick += 1
    gameData.cocoPerClickCost *= 2
    console.log(gameData.cocoPerClickCost)
    document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
    document.getElementById("perClickUpgrade").innerHTML = "Basket (Level " + gameData.coconutPerClick + ")"
    document.getElementById("collectCoconutTip").innerHTML = "(+" +gameData.coconutPerClick + " coconut/click)<br> ----- <br> Gather a coconut from the sand"
    document.getElementById("buyBasketTip").innerHTML = "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts"
  }
}

/* YOU CANNOT FORGET TO PUT NEW VARIABLES HERE TO MAKE SURE THE LOAD FEATURE WORKS*/
function updateAllVariables() {
  document.getElementById("stoneCollected").innerHTML = gameData.stone + " Stone"
  document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
  document.getElementById("perClickUpgrade").innerHTML = "Basket (Level " + gameData.coconutPerClick + ")"
  document.getElementById("collectCoconutTip").innerHTML = "(+" +gameData.coconutPerClick + " coconut/click)<br> ----- <br> Gather a coconut from the sand"
  document.getElementById("buyBasketTip").innerHTML = "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts"
  document.getElementById("log").innerHTML = gameData.log
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
    updateAllVariables()
  }
}
