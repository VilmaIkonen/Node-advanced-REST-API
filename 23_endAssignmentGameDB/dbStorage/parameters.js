'use strict'

const toArrayInsert = game => [
  +game.number,
  game.name,
  +game.quantity,
  game.genre,
  game.rating,  
]

const toArrayUpdate = game => [
  game.name,
  +game.quantity,
  game.genre,
  game.rating,
  +game.number
]

module.exports = {toArrayInsert, toArrayUpdate}