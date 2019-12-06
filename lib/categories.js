module.exports = (app, db) => {
    app.get('/categories', async (req, res) => {
        let result;
        let name = req.query.name;

        if (name) {
            result = await db.query(`SELECT _id, name FROM category WHERE name ilike \'%${name}%\'`);
        } else {
            result = await db.query('SELECT _id, name FROM category');
        }

        res.end(JSON.stringify(result.rows));
    })
};