import $ from 'jquery';
import _ from 'lodash'

class Grid {
  constructor(width, height, snake, apple) {
    this.width = width
    this.height = height
    this.snake = snake
    this.apple = apple
  }

  clear = () => {
    $('#game').empty()
  }
  
  create = () => {
    for (let y = 0; y < this.height; y++) {
      $("#game").append(`<div id='row-${y}' class='row'></div>`)
      for (let x = 0; x < this.width; x++) {
        const isHead = this.snake.snakeBody[0].x === x && this.snake.snakeBody[0].y === y
        const body = _.tail(this.snake.snakeBody)
        const isBody = _.filter(body, b => b.x === x && b.y === y).length > 0
        const isApple = this.apple.xPos === x && this.apple.yPos === y
        const headClass = isHead ? 'head' : ''
        const bodyClass = isBody ? 'body' : ''
        const appleClass = isApple ? 'apple' : ''
        const deadClass = !this.snake.isAlive && !isBody && !isHead ? 'dead' : ''
         const extraClasses = `${headClass} ${bodyClass} ${deadClass} ${appleClass}`
        $(`#row-${y}`).append(`<div id='cell' class='cell ${extraClasses}'>${x},${y}</div>`)
      }
    }
  }
  
}

export { Grid }
