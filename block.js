class Block {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  nextCell = (direction, steps) => {
    const nextCellMapper = {
      'N': () => new Block(this.x, this.y - steps),
      'S': () => new Block(this.x, this.y + steps),
      'W': () => new Block(this.x - steps, this.y),
      'E': () => new Block(this.x + steps, this.y)
    }
    return nextCellMapper[direction]()
  }
}

export { Block }