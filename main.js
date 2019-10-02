var gameData = {
  isFirstCoco: true,
  isFirstCrack: true,
  log: " ",

  coconuts: 0,
  stone: 0,
  milk: 0,

  timeHour: new Date().getMinutes(),
  timePrevHour: 0,
  timeMinute: new Date().getMinutes(),
  timeSeconds: new Date().getSeconds(),

  temperature: 0,
  //hunger and thirst scale of 0-100
  hunger: 50,
  thirst: 50,

  coconutPerClick: 1,
  stonePerClick: .5,
  milkPerCrack: 0.75,

  cocoPerClickCost: 10,
  crackOpenCocoCost: 50,
  crackOpenStoneCost: 5
}

window.onload = function() {
  hide("collectStone")
  hide("stoneTip")
  hide("perClickUpgrade")
  hide("crackOpenCoco")
  hide("crackOpenTip")
  tab("coconutUpgrades")
}

var checkToShow = window.setInterval(function() {
  var d = new Date()
  gameData.timeHour = d.getHours()
  gameData.timeMinute = d.getMinutes()
  gameData.timeSeconds = d.getSeconds()
  document.getElementById("timeHour").innerHTML = gameData.timeHour;
  document.getElementById("timeMinute").innerHTML = gameData.timeMinute;
  document.getElementById("timeSeconds").innerHTML = gameData.timeSeconds;
  document.getElementById("temperature").innerHTML = gameData.temperature;

  if (gameData.coconuts >= 1) {
    document.getElementById("cocoCollected").style.display = "inline-block"
  }
  if (gameData.stone > 0) {
    document.getElementById("stoneCollected").style.display = "inline-block"
  }
  if (gameData.coconuts >= 75) {
    display("collectStone")
  }


  if (gameData.coconuts >=5) {
    document.getElementById("perClickUpgrade").style.display = "inline-block"
    document.getElementById("buyBasketTip").style.display = "inline-block"
  }
  if (gameData.coconuts < gameData.cocoPerClickCost) {
    document.getElementById("perClickUpgrade").style.opacity = 0.6
    document.getElementById("buyBasketTip").style.opacity = 0.6
  }


  if (gameData.coconuts >= gameData.cocoPerClickCost) {
    document.getElementById("perClickUpgrade").style.opacity = 1
    document.getElementById("buyBasketTip").style.opacity = 1
  }

  if (gameData.timePrevHour != gameData.timeHour){
    if(gameData.timeHour <=4 || gameData.timeHour >= 18)
    {
      gameData.temperature = randomNumInRange(30, 75)
    }
    else{
      gameData.temperature = randomNumInRange(75, 105)
    }
  }

  //if too cold log a message and suggest a course of action
  if (gameData.temperature <= 50){
    update("log", "It's getting cold tonight, perhaps I should find a way to get warm")
  }

  gameData.timePrevHour = gameData.timeHour

}, 500)

var automationLoop = window.setInterval(function() {
  console.log("gar gar cum jar")

}, 1000)

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

function crackOpenCoconut() {
  if (gameData.coconuts >= gameData.crackOpenCocoCost && gameData.stone >= crackOpenStoneCost) {
    if (isFirstCrack == true) {update("log", "The stones are dull, and most of the milk quickly seeped into the sand, but you managed to store some.  I wonder what this will attract.")}
    gameData.coconuts -= gameData.crackOpenCocoCost
    gameData.milk += gameData.milkPerCrack
    update("milkCollected", gameData.milk + " Coconut Milk")
  }
}

function randomNumInRange(min, max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min

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
    gameData.cocoPerClickCost *= 2.5
    document.getElementById("cocoCollected").innerHTML = gameData.coconuts + " Coconuts"
    document.getElementById("perClickUpgrade").innerHTML = "Basket (Level " + gameData.coconutPerClick + ")"
    document.getElementById("collectCoconutTip").innerHTML = "(+" +gameData.coconutPerClick + " coconut/click)<br> ----- <br> Gather a coconut from the sand"
    document.getElementById("buyBasketTip").innerHTML = "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts"
  }
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
  document.getElementById("buyBasketTip").style.opacity = 1
}

function format(number, type) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

/* YOU CANNOT FORGET TO PUT NEW VARIABLES HERE TO MAKE SURE THE LOAD FEATURE WORKS*/
function updateAllVariables() {
  update("stoneCollected", gameData.stone + " Stone")
  update("cocoCollected", gameData.coconuts + " Coconuts")
  update("perClickUpgrade", "Basket (Level " + gameData.coconutPerClick + ")")
  update("collectCoconutTip", "Gather a coconut from the sand")
  update("buyBasketTip", "+1 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts")
  update("log", gameData.log)
  update("timeHour", gameData.timeHour)
  update("timeMinute", gameData.timeMinute)
  update("timeSeconds", gameData.timeSeconds)
  update("timePrevHour", gameData.timePrevHour)
  update("temperature", gameData.timePrevHour)
  update("hunger", gameData.hunger)
  update("thirst", gameData.thirst)
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
