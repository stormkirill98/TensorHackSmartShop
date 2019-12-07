const notes = require('./notes');
const categories = require('./categories');
const characteristics = require('./characteristics');
const purchases = require('./purchases');
const shops = require('./shops');


module.exports = (app) => {
    notes(app);
    categories(app);
    characteristics(app);
    purchases(app);
    shops(app);
};

