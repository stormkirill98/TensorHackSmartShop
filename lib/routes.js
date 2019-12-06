const notes = require('./notes');

module.exports = (app, db) => {
    notes(app, db);
};

