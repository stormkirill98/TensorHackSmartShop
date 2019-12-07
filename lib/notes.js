const {getClient} = require('./db');

module.exports = (app) => {
    app.get('/notes', async (req, res) => {
        const db = getClient();
        db.connect();

        res.send(JSON.stringify((await db.query('SELECT _id , name FROM notes')).rows));

        db.end();
    })

    app.put('/notes/:id', async (req, res) => {
        const db = getClient();
        db.connect();

        const name = req.body.name;
        const id = req.params.id;

        res.send(JSON.stringify((await db.query(`UPDATE notes SET name = '${name}' WHERE (_id = ${id}) RETURNING name;`)).rows[0]))
        db.end();
    })

    app.post('/notes', async (req, res) => {
        const db = getClient();
        db.connect();

        const {name, username} = req.body;

        const result = await db.query(`INSERT INTO notes (name, date, username) VALUES ('${name}', now(), ${username}) RETURNING _id;`);

        res.end(JSON.stringify(result.rows));
        db.end();
    })

    app.delete('/notes/:id', async (req, res) => {
        const db = getClient();
        db.connect();

        const _id = req.params.id;
        const result = await db.query(`delete from notes where (_id = ${_id})`);

        res.end(JSON.stringify(result.rowCount));
        db.end();
    })
};

