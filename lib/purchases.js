const {query} = require('./db');
const format = require('pg-format');

module.exports = (app) => {
    app.post('/purchases', async (req, res) => {

        let {note_id, category_id, characteristics} = req.body;
        const sqlRequest = `INSERT INTO  purchases ("note_id", "category_id", "count") VALUES ($1,$2,1) RETURNING *`;
        const values = [note_id, category_id]

        const purchaseRes = (await query(sqlRequest, values));
        if (!purchaseRes || !purchaseRes.rows) return purchaseRes
        const purchase_id = purchaseRes.rows[0]._id;
        if (!purchase_id) return undefined

        const arr = characteristics.map((item) => [purchase_id, item._id, item.value])

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
                            
                        T3 AS (
                            SELECT product_id, MIN (COALESCE (stock_price, price)) as price FROM PROD_IDS
                            JOIN products_shops P_S ON P_S.product_id = PROD_IDS.prod_id
                            GROUP BY product_id),
                            
                        T4 AS (
                            SELECT PR._id as product_id, PR.name as product_name, 
                                PR.logo as product_logo, 
                                P_S.price, P_S.stock_price,
                                SH.name as shop_name, SH.logo as shop_logo, P_S.shop_id
                            FROM T3
                            LEFT JOIN products_shops P_S ON P_S.product_id = T3.product_id AND (COALESCE (stock_price, P_S.price)) = T3.price
                            JOIN shops SH ON SH._id = P_S.shop_id
                            JOIN products PR ON PR._id = P_S.product_id
                            ),
                            
                            
                        PC AS (
                            SELECT T4.product_id, CH.name, P_C.value, CH.abbr FROM T4
                            LEFT JOIN product_characteristic P_C ON P_C.product_id = T4.product_id
                            LEFT JOIN category_characteristic C_C ON C_C._id = P_C.category_characteristic_id 
                            LEFT JOIN characteristic CH ON CH._id = C_C.characteristic_id
                            ),
                            
                        CHARACTERS AS (
                            SELECT PC.product_id, 
                                array_agg(name) as characters_names, 
                                array_agg(value) as characters_values,
                                array_agg(abbr) as characters_abbr 
                            FROM PC
                            JOIN T4 ON T4.product_id = PC.product_id
                            GROUP BY PC.product_id
                            )
                            
                            SELECT T4.product_name, T4.product_logo, 
                                T4.price, T4.stock_price, PUR._id as purchase_id,
                                characters_names, characters_values, characters_abbr,
                                T4.shop_name, T4.shop_logo, T4.shop_id
                            FROM T4
                            JOIN CHARACTERS ON CHARACTERS.product_id = T4.product_id
                            JOIN products PR ON PR._id = T4.product_id
                            JOIN purchases PUR ON PUR.note_id = ${note_id} AND PUR.category_id = PR.category_id`)

        result = group(result.rows)

        res.end(JSON.stringify(result));
    })
};

function group(rows) {
    const result = [];

    for (let item in rows) {
        item = rows[item]

        let index = indexByShopName(rows, item.shop_name)

        let characteristics = parseCharacteristics(item.characters_names, item.characters_values, item.characters_abbr)

        if (index === -1) {
            result.push({
                id: item.shop_id,
                name: item.shop_name,
                logo: item.shop_logo,
                total_price: item.stock_price ? item.stock_price : item.price,
                products: [
                    {
                        purchase_id: item.purchase_id,
                        name: item.product_name,
                        price: item.price,
                        stock_price: item.stock_price,
                        logo: item.product_logo,
                        characteristics: characteristics
                    }
                ]
            })
        } else {
            result[index].total_price += item.stock_price ? item.stock_price : item.price

            result[index].products.push({
                purchase_id: item.purchase_id,
                name: item.product_name,
                price: item.price,
                stock_price: item.stock_price,
                logo: item.product_logo,
                characteristics: characteristics
            })
        }
    }

    return result
}

function indexByShopName(array, name) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i].name === name) {
            return i;
        }
    }

    return -1;
}

function parseCharacteristics(names, values, abbrs) {
    const result = [];

    for (let index in names) {
        let name = names[index]
        let value = values[index]
        let abbr = abbrs[index] ? abbrs[index] : ''

        result.push(name + ': ' + value + abbr)
    }

    return result.join(', ')
}
