let playerSchema = require('./player_schema.json')
let player = require('./player.json')

let storyletSchema = require('./storylet_schema.json')
let storylet = require('./storylet.json')

let qualityListSchema = require('./quality_list_schema.json')
let qualityList = require('./quality_list.json')

const ZSchema = require('z-schema')
// let options = ... // see below for possible option values
const validator = new ZSchema()

let playerValid = validator.validate(player, playerSchema)
let playerErrors = validator.getLastErrors()
console.assert(playerValid, 'player schema not valid')
console.assert(!playerErrors, `Received errors in validation of player schema: ${playerErrors}`)

let storyletValid = validator.validate(storylet, storyletSchema)
let storyletErrors = validator.getLastErrors()
console.assert(storyletValid, 'storylet schema not valid')
console.assert(!storyletErrors, `Received errors in validation of storylet schema: ${storyletErrors}`)

let qualitiesValid = validator.validate(qualityList, qualityListSchema)
let qualitiesErrors = validator.getLastErrors()
console.assert(qualitiesValid, 'qualities schema not valid')
console.assert(!qualitiesErrors, `Received errors in validation of qualities schema: ${qualitiesErrors}`)
