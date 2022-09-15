let snake_speed = 1
let lastRenderTime = 0
let snakeSpeed = 15
let snakeBody = [{ x: 10, y: 0 }]
let size = 10
let gameBoard = document.getElementById('gameCanvas')
let ctx = gameCanvas.getContext('2d')
let currentDirection = { x: 10, y: 0 } //right
let previousDirection = { x: 0, y: 0 }
let boundaries = gameBoard.getBoundingClientRect()
let food = { x: 50, y: 50 }
let around = [
  { x: 0, y: -10 }, //down
  { x: 0, y: 10 }, // up
  { x: 10, y: 0 }, //right
  { x: -10, y: 0 }, //left
]
let score = 1
function displayScore() {
  const para = document.getElementById('score')
  para.innerText = `Score: ${snakeBody.length}`
}
function clearScreen() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight)
}
function runGame(currentTime) {
  window.requestAnimationFrame(runGame)
  let secondsAfterRender = (currentTime - lastRenderTime) / 1000
  if (secondsAfterRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime
  clearScreen()
  updateSnake(snakeBody)
  drawSnake(snakeBody)
  drawFood(food)
  displayScore()
}

window.requestAnimationFrame(runGame)

function drawSnake(snakeBody) {
  snakeBody.forEach(({ x, y }) => {
    ctx.fillStyle = 'green'
    ctx.fillRect(x, y, size, size)
  })
}
function drawFood(food) {
  console.log(food.x, food.y)
  ctx.fillStyle = 'red'
  ctx.fillRect(food.x, food.y, size, size)
}

function updateSnake(snakeBody) {
  snakeBody.forEach((point, i) => {
    let pointToFollow = snakeBody[i + 1]
    if (!pointToFollow) {
      let snakeHead = snakeBody[i]
      // then it is a snake head
      // need to check if head pos is equal to food pos
      // need to check if head pos is equal to canvas boundaries
      // check if head pos is equal to pos of some snakeBody point
      if (
        snakeHead.x + getInputDirection().x === -10 ||
        snakeHead.y + getInputDirection().y === -10 ||
        snakeHead.x + getInputDirection().x === 410 ||
        snakeHead.y + getInputDirection().y === 410
      ) {
        gameOver()
      }
      if (
        snakeBody.filter((p) => {
          return (
            p.x === snakeHead.x + getInputDirection().x &&
            p.y === snakeHead.y + getInputDirection().y
          )
        }).length
      ) {
        gameOver()
      }
      if (isEqualPos(point, food)) {
        addTail(point)
        randomizeFood(food)
      }
      moveSnakeHead(point)
    } else {
      point.x = pointToFollow.x
      point.y = pointToFollow.y
    }
  })
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (previousDirection.y !== 0) break

      currentDirection = around[0]
      break

    case 'ArrowDown':
      if (previousDirection.y !== 0) break

      currentDirection = around[1]
      break

    case 'ArrowRight':
      if (previousDirection.x !== 0) break

      currentDirection = around[2]
      break
    case 'ArrowLeft':
      if (previousDirection.x !== 0) break
      currentDirection = around[3]
      break
  }
})

function getInputDirection() {
  previousDirection = currentDirection
  return currentDirection
}

function isEqualPos(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function getRandomCoordinate() {
  let coordinates = []
  let start = 10
  for (let i = 1; i <= 38; i++) {
    coordinates.push(start)
    start += 10
  }
  return {
    x: coordinates[Math.floor(Math.random() * coordinates.length)],
    y: coordinates[Math.floor(Math.random() * coordinates.length)],
  }
}
function randomizeFood(food) {
  food.x = getRandomCoordinate().x
  food.y = getRandomCoordinate().y
}

function addTail(point) {
  snakeBody.unshift({
    x: point.x + previousDirection.x,
    y: point.y + previousDirection.y,
  })
}

function moveSnakeHead(snakeHead) {
  snakeHead.x += getInputDirection().x
  snakeHead.y += getInputDirection().y
}
function gameOver() {
  alert('game over')
  location.reload()
}
