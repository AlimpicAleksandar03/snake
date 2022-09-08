let snake_speed = 1
let lastRenderTime = 0
let snakeSpeed = 3
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

ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight)

function runGame(currentTime) {
  window.requestAnimationFrame(runGame)
  let secondsAfterRender = (currentTime - lastRenderTime) / 1000
  if (secondsAfterRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime
  updateSnake(snakeBody)
  drawSnake(snakeBody)
}
drawFood(food)

window.requestAnimationFrame(runGame)

function drawSnake(snakeBody) {
  snakeBody.forEach(({ x, y }) => {
    ctx.fillStyle = 'blue'
    ctx.fillRect(x, y, size, size)
  })
}
function drawFood(food) {
  ctx.fillStyle = 'red'
  ctx.fillRect(food.x, food.y, size, size)
}
function updateSnake(snakeBody) {
  snakeBody.forEach((point, i) => {
    let prevX = point.x
    let prevY = point.y
    point.x = point.x + getInputDirection().x
    point.y = point.y + getInputDirection().y
    ctx.fillStyle = 'black'
    ctx.fillRect(prevX, prevY, size, size)
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
