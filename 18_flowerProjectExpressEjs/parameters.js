'use strict';

const toArray = flower => [
  flower.name, 
  +flower.unitPrice,
  flower.site,
  +flower.stock,
  +flower.flowerId
]

module.exports = toArray;