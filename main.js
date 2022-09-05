let snakeboard = document.getElementById('gameCanvas')
let ctx = gameCanvas.getContext('2d')
let squareSize = 10
let snakePoints = [{ y: 10, x: 10 }]

let direction = 'right'
// if we are moving right then only directions available are up and down
// if we are moving left then only directions available are up and down
// if we are moving down then only directions available are left and right
// if we are moving up then only directions available are left and right

ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight)
let snakeboardPosition = snakeboard.getBoundingClientRect()

function drawApple() {}
function drawSnake(points) {
  points.forEach((point) => {
    ctx.fillStyle = 'lightgreen'
    ctx.fillRect(point.x, point.y, squareSize, squareSize)
  })
}
function moveSnake(points) {
  setInterval(() => {
    points.forEach((point) => {
      if (checkWallCollision(point)) {
        document.location.reload()
      }
      let oldPoint = Object.assign({}, point)
      killOldPoint(oldPoint) // this is the actual moving, we are just manipulating with colors
      // now based on direction we are moving we will increase or decrease coordinates
      if (direction === 'right') {
        point.x += 10
        return
      } else if (direction === 'left') {
        point.x -= 10
        return
      } else if (direction === 'up') {
        point.y -= 10
        return
      } else if (direction === 'down') {
        point.y += 10
        return
      }
      // that way the length of a lightgreen colored points (our snake) is constant (every time we kill one, we make new one 10 points greater)
    })
    drawSnake(points)
  }, 500)
}

function killOldPoint(oldPoint) {
  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.fillRect(oldPoint.x, oldPoint.y, squareSize, squareSize)
}
document.addEventListener('keydown', function (event) {
  if (event.keyCode == 37) {
    direction = 'left'

    // smanjti x koordinatu
  } else if (event.keyCode == 39) {
    direction = 'right'

    // povecati x koordinatu
  } else if (event.keyCode == 38) {
    direction = 'up'

    // smanjiti y koordinatu
  } else if (event.keyCode == 40) {
    direction = 'down'

    // povecati y koordinaty
  }
})

moveSnake(snakePoints)

function checkWallCollision(point) {
  console.log(point)
  return (
    point.x === snakeboardPosition.right - 20 ||
    point.y === snakeboardPosition.bottom - 20 ||
    point.x === 0 ||
    point.y === 0
  )
}

// drawSnake(snakePoints)
