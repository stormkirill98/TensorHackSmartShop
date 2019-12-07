const {query} = require('./db');

module.exports = (app) => {
    app.get('/categories', async (req, res) => {
        let result;
        let name = req.query.name;
        let sqlRequest;
        if (name) {
            sqlRequest = `SELECT _id, name FROM category WHERE name ilike \'%${name}%\'`;
        } else {
            sqlRequest = 'SELECT _id, name FROM category';
        }
        result = await query(sqlRequest)
        if(result.rows) res.end(JSON.stringify(result.rows));
        res.end(undefined);
    })
};