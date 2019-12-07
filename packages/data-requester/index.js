var categories = require('./categories');
var characteristics = require('./characteristics');
var notes = require('./notes')
var purchases = require('./purchases')

module.exports = {
    categoryRequester: categories,
    characteristicRequester: characteristics,
    noteRequester: notes,
    purchaseRequester: purchases
}