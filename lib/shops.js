const {query} = require('./db');

module.exports = (app) => {

    app.put('/shops', async (req, res) => {
        const check = req.body.check;
        const id_shop  = req.body.id_shop;
        const sqlReq = `UPDATE shops SET ignored = $1 WHERE (_id = $2) RETURNING ignored;`
        const values = [check,id_shop]
        const answer = (await query(sqlReq,values)).rows[0]
        res.send(JSON.stringify(answer))
    })

    app.get('/shops', async (req, res) => {
        const sqlReq = `SELECT * FROM shops`;
        res.send(JSON.stringify((await query(sqlReq)).rows));
    })
};

