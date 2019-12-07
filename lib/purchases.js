const {query} = require('./db');
const format = require('pg-format');

module.exports = (app) => {
    app.post('/purchases', async (req, res) => {

        let {note_id , category_id, characteristics} = req.body;
        const sqlRequest = `INSERT INTO  purchases ("note_id", "category_id", "count") VALUES ($1,$2,1) RETURNING *`;
        const values = [note_id, category_id]

        const purchaseRes = (await query(sqlRequest, values));
        if(!purchaseRes) return undefined
        const purchase_id = purchaseRes.rows[0]._id
        if(!purchase_id) return undefined
        
        const arr = characteristics.map((item) =>[purchase_id, item._id, item.value])

        let query1 = format('INSERT INTO purchase_characteristic ("purchase_id", "category_characteristic_id", "value") VALUES %L ', arr);

        let {rows} = await query(query1);

        res.end(JSON.stringify(purchase_id));
    })
};