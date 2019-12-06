module.exports = (app, db) => {
    app.post('/notes', async (req, res) => {
        const { name , date, username } = req.body;
        
        const result = await db.query(`INSERT INTO notes (name, date, username) VALUES ('${name}', ${date}, ${username}) returning _id;`)
           
        res.end(JSON.stringify(result.rows));
    })

    app.delete('/notes/:id', async (req, res) => {
        const _id = req.params.id;
        const result = await db.query(`delete from notes where (_id = ${_id})`);

        res.end(JSON.stringify(result.rows));
    })
};