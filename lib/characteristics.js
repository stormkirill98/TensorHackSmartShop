module.exports = (app, db) => {
    app.get('/characteristics', async (req, res) => {
        let result;
        let category_id = req.query.category_id;

        if (category_id) {
            result = await db.query(
                 `SELECT
                                    name,
                                    type
                                FROM
                                    category_characteristic C_C
                                JOIN characteristic C ON category_id = ${category_id}
                                WHERE C_C.characteristic_id = C._id`
            ).rows;
        } else {
            res.statusCode(400);
            result = '400 Bad request';
        }


        console.log(result);

        res.end(JSON.stringify(result));
    })
};