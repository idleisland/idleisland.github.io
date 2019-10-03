/* Coconut Collection */
function collectCoconut() {
  if (gameData.isFirstCoco == true) {
    document.getElementById("log").innerHTML = "This would feed you, but you can't crack it open. <br><br>" + document.getElementById("log").innerHTML
    gameData.isFirstCoco = false
    gameData.log = document.getElementById("log").innerHTML
  }
  gameData.coconuts += gameData.coconutPerClick
  document.getElementById("cocoCollected").innerHTML = Number(gameData.coconuts.toPrecision(6)) + " Coconuts"
}

/* Basket Upgrades
 * Rate: 2.5x
 */
function buyCoconutPerClick() {
  if (gameData.coconuts >= gameData.cocoPerClickCost) {
    gameData.coconuts -= gameData.cocoPerClickCost
    gameData.coconutPerClick += 1
    gameData.cocoPerClickCost *= 2.5
    document.getElementById("cocoCollected").innerHTML = Number(gameData.coconuts.toPrecision(6)) + " Coconuts"
    document.getElementById("perClickUpgrade").innerHTML = "Basket (Level " + gameData.coconutPerClick + ")"
    document.getElementById("collectCoconutTip").innerHTML = "(+" +gameData.coconutPerClick + " coconut/click)<br> ----- <br> Gather a coconut from the sand"
    document.getElementById("buyBasketTip").innerHTML = "+2.5 coconut/click<br> ----- <br> Weave a basket out of coconut husks<br> ----- <br> Cost: " + gameData.cocoPerClickCost + " coconuts"
  }
}

/* Stone Collection */
function collectStone() {
  gameData.stone += gameData.stonePerClick
  document.getElementById("stoneCollected").innerHTML = gameData.stone + " stone"
}

/* Coconut Milk Collection
 * Rate: not increasing
 */
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
    update("milkCollected", gameData.milk + " coconut milk")
    update("cocoCollected", Number(gameData.coconuts.toPrecision(6)) + " Coconuts")
    update("stoneCollected", gameData.stone + " stone")
  }
}

/* Monky
 * Rate: 1.15x
 */
function befriendMonkey() {
  if (gameData.milk >= gameData.monkeyCost) {
    console.log('monky time')
    gameData.monkeys += 1
    gameData.coconutPerS += gameData.monkeyAddRate
    gameData.milk = Number((gameData.milk - gameData.monkeyCost).toPrecision(2))
    gameData.monkeyCost = Number((gameData.monkeyCost*1.75).toPrecision(2))
    update("monkeys", gameData.monkeys + " monkeys")
    update("milkCollected", gameData.milk + " coconut milk")
    update("monkyTip", "(+2.5 coconut/s) <br> ----- <br> They seem to like the milk! Make a friend. <br> ----- <br> Cost: " + gameData.monkeyCost + " coconut milk")
  }
}
