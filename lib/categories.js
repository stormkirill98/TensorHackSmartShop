const {getClient} = require('./db');

module.exports = (app) => {
    app.get('/categories', async (req, res) => {
        const db = getClient();
        db.connect();

        let result;
        let name = req.query.name;

        if (name) {
            result = await db.query(`SELECT _id, name FROM category WHERE name ilike \'%${name}%\'`);
        } else {
            result = await db.query('SELECT _id, name FROM category');
        }

        db.end();
        res.end(JSON.stringify(result.rows));
    })
};