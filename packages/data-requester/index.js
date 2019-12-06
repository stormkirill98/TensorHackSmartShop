var categories = require('./categories');
var characteristics = require('./characteristics');
var notes = require('./notes')

module.exports = {
    categoryRequester: categories,
    characteristicRequester: characteristics,
    noteRequester: notes
}

notes.getNotes().then(x=>
    console.log(x))