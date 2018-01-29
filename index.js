const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
      return true
    }
  }
  return false
}

function createRock(x) {
  const rock = document.createElement('div')
  var top = 0
  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = top
  GAME.appendChild(rock)
  const rockDropInterval = setInterval(window.requestAnimationFrame(moveRock), 500)

  function moveRock() {
    if (checkCollision() === true) {
      endGame()
    }
    if (top >= 360) {
      GAME.removeChild(rock)
      return
    }
    top += 2
  }
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  while (ROCKS.length > 0) {
      ROCKS.pop()
  }
  alert("YOU LOSE!")
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
  return
}

function moveDodgerLeft() {
  function shiftLeft() {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${dodgerLeftEdge - 4}px`
  }
  window.requestAnimationFrame(shiftLeft)
}

function moveDodgerRight() {
  function shiftRight() {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${dodgerLeftEdge + 4}px`
  }
  window.requestAnimationFrame(shiftRight)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
