const {getClient} = require('./db');

module.exports = (app) => {

    app.put('/shops', async (req, res) => {
        const db = getClient();
        db.connect();
        const id_shop  = req.body.id_shop;
        const check = req.body.check;
        res.send(JSON.stringify((await db.query(`UPDATE shops SET ignored = $1 WHERE (_id = $2) RETURNING ignored;`, [check,id_shop])).rows[0]))
        db.end();
    })

    app.get('/shops', async (req, res) => {
        const db = getClient();
        db.connect();
        res.send(JSON.stringify((await db.query('SELECT * FROM shops')).rows));
        db.end();
    })


};

