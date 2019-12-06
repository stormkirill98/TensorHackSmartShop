const notes = require('./notes-tmp');
const categories = require('./categories');

module.exports = (app, db) => {
    notes(app, db);
    categories(app, db);
};

