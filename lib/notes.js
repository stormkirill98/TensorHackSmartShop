const {query} = require('./db');

module.exports = (app) => {
    app.get('/notes', async (req, res) => {
        const sqlRequest = 'SELECT _id , name FROM notes ORDER BY date desc'
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
};

