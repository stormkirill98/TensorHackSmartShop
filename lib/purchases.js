const {query} = require('./db');
const format = require('pg-format');


module.exports = (app) => {
    app.post('/purchases', async (req, res) => {

        let {note_id , category_id, characteristics} = req.body;
        const sqlRequest = `INSERT INTO  purchases ("note_id", "category_id", "count") VALUES ($1,$2,1) RETURNING *`;
        const values = [note_id, category_id]

        const purchaseRes = (await query(sqlRequest, values));
        if(!purchaseRes || !purchaseRes.rows) return purchaseRes
        const purchase_id = purchaseRes.rows[0]._id;
        if(!purchase_id) return undefined

        const arr = characteristics.map((item) =>[purchase_id, item._id, item.value])

        let query1 = format('INSERT INTO purchase_characteristic ("purchase_id", "category_characteristic_id", "value") VALUES %L ', arr);

        let {rows} = await query(query1);

        res.end(JSON.stringify(purchase_id));
    })

    app.get('/purchases/:note_id', async (req, res) => {
        const note_id = req.params.note_id;

        let result = await query(
            `WITH T AS (
                            SELECT
                                PUR._id as purch_id, PUR.note_id, PUR. category_id, 
                                PR._id as prod_id, PR.name, 
                                PU_C.category_characteristic_id as purch_cat_char_id, PU_C.value as purch_cat_char_value, 
                                PR_C.category_characteristic_id as prod_cat_char_id, PR_C.value as prod_char_value
                            FROM purchases PUR
                            JOIN products PR ON PUR.category_id = PR.category_id
                            JOIN product_characteristic PR_C ON PR_C.product_id = PR._id
                            LEFT JOIN purchase_characteristic PU_C ON PU_C.purchase_id = PUR._id and PU_C.category_characteristic_id = PR_C.category_characteristic_id
                            WHERE (note_id = ${note_id}) AND PU_C.value IS NOT NULL
                            ORDER BY PR._id
                            ),
                        T2 AS (
                            SELECT prod_id, array_agg(purch_cat_char_value) as purch_values, array_agg(prod_char_value) as prod_values FROM T
                            GROUP BY prod_id
                            ),
                            PROD_IDS AS (SELECT prod_id FROM T2 WHERE purch_values = prod_values),
                            
                        T3 AS (SELECT product_id, MIN (COALESCE (stock_price, price)) as price FROM PROD_IDS
                            JOIN products_shops P_S ON P_S.product_id = PROD_IDS.prod_id
                            GROUP BY product_id)
                            
                            SELECT PR._id as product_id, PR.name as product_name, 
                                PR.logo as product_logo, 
                                P_S.price, P_S.stock_price,
                                SH.name as shop_name, SH.logo as shop_logo
                            FROM T3
                            LEFT JOIN products_shops P_S ON P_S.product_id = T3.product_id AND (COALESCE (stock_price, P_S.price)) = T3.price
                            JOIN shops SH ON SH._id = P_S.shop_id
                            JOIN products PR ON PR._id = P_S.product_id`)


        //result = groupBy(result.rows, 'shop_name', 'shop_item')

        result = [{
            name: "shop name",
            logo: "shop logo",
            products: [
                {
                    name: 'product name',
                    price: '22',
                    stock_price: '10',
                    logo: 'product logo',
                    characteristics: [
                        {
                            name: 'value'
                        }
                    ]
                }
            ]
        }]

        res.end(JSON.stringify(result));
    })
};
