const {query} = require('./db');

module.exports = (app) => {
    app.get('/characteristics', async (req, res) => {
        let category_id = req.query.category_id;
        
        const sqlRequest = `SELECT
                                NAME,
                                TYPE,
                                C_C._id,
                            (SELECT array_agg(value) FROM enum_value WHERE type_id = type)
                            FROM category_characteristic C_C
                            JOIN characteristic C ON category_id = ${category_id}
                            WHERE C_C.characteristic_id = C ._id`
        const answer = await query(sqlRequest);
        if(!answer || !answer.rows || !Array.isArray(answer.rows)) return undefined;
        
        result = answer.rows.map(item => ({
            name: item.name,
            type: item.type,
            enum_values: item.array_agg,
            _id: item._id
        }));
        res.end(JSON.stringify(result));
    })
};