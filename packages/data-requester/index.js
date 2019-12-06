var categories = require('./categories');
var characteristics = require('./characteristics');
var notes = require('./notes')

module.exports = {
    categoryRequester: categories,
    characteristicRequester: characteristics,
    noteRequester: notes
}

notes.addNote(`1233`, 123).then(x=>
    console.log(x))