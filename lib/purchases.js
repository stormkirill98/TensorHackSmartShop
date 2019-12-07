const {getClient} = require('./db');
const format = require('pg-format');


module.exports = (app) => {
    app.post('/purchases', async (req, res) => {
        const db = getClient();
        db.connect();

        let result;
        let {note_id , category_id} = req.body;
        let characteristics = JSON.parse(req.body.characteristics)
        const purchase_id = (await db.query(`INSERT INTO  purchases ("note_id", "category_id", "count") VALUES ($1,$2,1) RETURNING *`, [note_id, category_id])).rows[0]._id
    
        const arr = characteristics.map((item) =>[purchase_id, item._id, item.value])

        let query1 = format('INSERT INTO purchase_characteristic ("purchase_id", "category_characteristic_id", "value") VALUES %L ', arr);

        let {rows} = await db.query(query1);

        res.end(JSON.stringify(result));
        db.end();
    })
};