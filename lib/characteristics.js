const {getClient} = require('./db');

module.exports = (app) => {
    app.get('/characteristics', async (req, res) => {
        const db = getClient();
        db.connect();

        let result;
        let category_id = req.query.category_id;

        result = await db.query(
            `SELECT
                                NAME,
                                TYPE,
                            (SELECT array_agg(value) FROM enum_value WHERE type_id = type)
                            FROM category_characteristic C_C
                            JOIN characteristic C ON category_id = ${category_id}
                            WHERE C_C.characteristic_id = C ._id`
        );

        result = result.rows.map(item => ({
            name: item.name,
            type: item.type,
            enum_values: item.array_agg
        }));

        db.end();

        res.end(JSON.stringify(result));
    })
};