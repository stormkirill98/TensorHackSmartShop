const notes = require('./notes');
const categories = require('./categories');
const characteristics = require('./characteristics');

module.exports = (app, db) => {
    notes(app, db);
    categories(app, db);
    characteristics(app, db);
};

