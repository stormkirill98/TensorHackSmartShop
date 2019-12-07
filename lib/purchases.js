const {query} = require('./db');
const format = require('pg-format');

module.exports = (app) => {
    app.post('/purchases', async (req, res) => {

        let result;
        let {note_id , category_id} = req.body;
        let characteristics = JSON.parse(req.body.characteristics)
        const sqlRequest = `INSERT INTO  purchases ("note_id", "category_id", "count") VALUES ($1,$2,1) RETURNING *`;
        const values = [note_id, category_id]
        const purchase_id = (await query(sqlRequest, values)).rows[0]._id;
    
        const arr = characteristics.map((item) =>[purchase_id, item._id, item.value])

        let query1 = format('INSERT INTO purchase_characteristic ("purchase_id", "category_characteristic_id", "value") VALUES %L ', arr);

        let {rows} = await query(query1);

        res.end(JSON.stringify(result));
        db.end();
    })
};