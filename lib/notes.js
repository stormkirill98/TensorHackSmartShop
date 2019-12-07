const {query} = require('./db');

module.exports = (app) => {
    app.get('/notes', async (req, res) => {
        const sqlRequest = 'SELECT _id , name FROM notes'
        res.send(JSON.stringify(((await query(sqlRequest)).rows)));
    })

    app.put('/notes/:id', async (req, res) => {
        const sqlRequest = `UPDATE notes SET name = '${name}' WHERE (_id = ${id}) RETURNING name;`
        res.send(JSON.stringify(((await query(sqlRequest)).rows[0])));
    })

    app.post('/notes', async (req, res) => {
        const {name, username} = req.body;
        const sqlRequest = `INSERT INTO notes (name, date, username) VALUES ('${name}', now(), ${username}) RETURNING _id;`
        res.send(JSON.stringify(((await query(sqlRequest)).rows)));
    })

    app.delete('/notes/:id', async (req, res) => {
        const _id = req.params.id;
        const sqlRequest = `delete from notes where (_id = ${_id})`
        res.send(JSON.stringify(((await query(sqlRequest)).rowCount)));
    })

    app.get('/test', async (req, res) => {
        const db = getClient();
        db.connect();

        const { notes_id } = req.body;

        const myMass = [1, 2];///FIXME
        

        console.log(`SELECT products_shops.shop_id FROM products_shops WHERE products_shops.product_id in (${myMass}) GROUP BY products_shops.shop_id`);
        const result_shops_id = await db.query(`SELECT products_shops.shop_id FROM products_shops WHERE products_shops.product_id in (${myMass}) GROUP BY products_shops.shop_id`);
        
        console.log(result_shops_id.rows.length);
        const  res_shops_id = result_shops_id.rows.map(item => item.shop_id);

        console.log(res_shops_id);

        console.log(`select shops."name", shops.logo, products_shops.price, products_shops.stock_price
        from shops, products_shops
        where (products_shops.shop_id in (${res_shops_id}) and (products_shops.product_id in (${myMass})) and (shops."_id" = products_shops.shop_id)
        order by products_shops.price;`);
        
        const result = await db.query(`select shops."name", shops.logo, products_shops.price, products_shops.stock_price
         from shops, products_shops 
         where (products_shops.shop_id in (${res_shops_id})) and (products_shops.product_id in (${myMass})) and (shops."_id" = products_shops.shop_id) 
         order by case when products_shops.stock_price is NULL then products_shops.price else products_shops.stock_price end;`);

        //res.end(JSON.stringify(result.rows));
        res.end(JSON.stringify(result.rows[0]));
        db.end();
    })
};

