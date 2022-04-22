import $ from 'jquery';
import './styles.css';
import _ from 'lodash'
import { Grid } from './grid';
import { Snake } from './snake'
import {Apple} from './apple';

const width = 10
const height = 10

const snake = new Snake(10, 2, 3, "N")

const generateApple = () => {
  let xPos = _.random(width - 1)
  let yPos = _.random(height - 1)
  return new Apple(xPos, yPos)
}


let apple = generateApple()
const grid = new Grid(width, height, snake, apple)

const keyMapping = {
  'w': 'N',
  'a': 'W',
  'd': 'E',
  's': 'S',
  'ArrowUp': 'N',
  'ArrowLeft': 'W',
  'ArrowRight': 'E',
  'ArrowDown': 'S'
}



const keyfunction = (event) => {
  if (keyMapping[event.key]) snake.turn(keyMapping[event.key])
}

document.addEventListener("keyup", keyfunction)

const doesTheSnakeDie = (nextCell, body) => {
  const isEscape = nextCell.x < 0 || nextCell.y < 0 || nextCell.x > width - 1 || nextCell.y > height - 1
  const selfBite = _.some(body, b => b.x === nextCell.x && b.y === nextCell.y)
  return isEscape || selfBite
}


const startGame = () => {
  let game = setInterval(() => {
    console.log("sasdas")
    grid.create()
    const nextCell = snake.snakeBody[0].nextCell(snake.direction, 1)
    if (doesTheSnakeDie(nextCell, snake.snakeBody)) {
      snake.isAlive = false
      clearInterval(game)
    }
    else {
      let isGrowth = false
      if (nextCell.x === grid.apple.xPos && nextCell.y === grid.apple.yPos) {
        isGrowth = true
        grid.apple = generateApple()      
      }
      snake.move(isGrowth)
    }
    grid.clear()
    grid.create()
  }, 1000)
}

startGame()

//creation of snake
