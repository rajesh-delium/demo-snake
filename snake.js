import { Block } from './block'
import _, { xor } from 'lodash'


class Snake {
  constructor(length, initialXPos, initialYPos, direction) {
    this.length = length
    this.initialXPos = initialXPos
    this.initialYPos = initialYPos
    this.direction = direction
    this.isAlive = true
    this.snakeBody = this.createBody()
  }


  getOppositeDirection = (direction) => {
    const oppositeDirections = {
      'N': 'S',
      'S': 'N',
      'E': 'W',
      'W': 'E'
    }
    return oppositeDirections[direction]
  }


  createBody = () => {
    const head = new Block(this.initialXPos, this.initialYPos)
    const oppositeDirection = this.getOppositeDirection(this.direction)
    const body = _.map(_.range(1, this.length), step => (head.nextCell(oppositeDirection, step)))
    return [head, ...body]
  }

  move = (isGrowth) => {
    if(!this.isAlive) return
    const head = this.snakeBody[0]
    const newHead = head.nextCell(this.direction, 1)
    if(!isGrowth) this.snakeBody.pop()
    this.snakeBody = [newHead, ...this.snakeBody]
    console.log(this.snakeBody)
  }

  turn = (directionToTurn) => {
    if(directionToTurn === this.getOppositeDirection(this.direction) || !this.isAlive) return
    this.direction = directionToTurn
  }

  // doesTheSnake = ()

}

export { Snake }