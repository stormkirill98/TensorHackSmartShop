const {getClient} = require('./db');

module.exports = (app) => {
    app.get('/purchases', async (req, res) => {
        const db = getClient();
        db.connect();

        res.send(JSON.stringify((await db.query('SELECT * FROM purchases')).rows));

        db.end();
    })
    app.put('/purchases/:id', async (req, res) => {
        const db = getClient();
        db.connect();

        const {noteId, categoryId, count} = req.body;
        const id = req.params.id;

        res.send(JSON.stringify((await db.query(`UPDATE purchases SET note_id = '${noteId}', category_id = '${categoryId}', count = '${count}'  WHERE (_id = ${id}) RETURNING name;`)).rows[0]))
        db.end();
    })
    app.post('/purchases', async (req, res) => {
        const db = getClient();
        db.connect();

        const {noteId, categoryId, count} = req.body;

        const result = await db.query(`INSERT INTO purchases (note_id, category_id, count) VALUES ('${noteId}', '${categoryId}', ${count}) RETURNING _id;`);

        res.end(JSON.stringify(result.rows[0]));
        db.end();
    })

    app.delete('/purchases/:id', async (req, res) => {
        const db = getClient();
        db.connect();

        const _id = req.params.id;
        const result = await db.query(`delete from purchases where (_id = ${_id})`);

        res.end(JSON.stringify(result.rowCount));
        db.end();
    })
};