const notes = require('./notes');
const categories = require('./categories');
const characteristics = require('./characteristics');
const purchases = require('./purchases');

module.exports = (app, db) => {
    notes(app, db);
    categories(app, db);
    characteristics(app, db);
    purchases(app, db);
};

