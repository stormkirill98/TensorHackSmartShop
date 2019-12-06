module.exports = (app, db) => {
  app.get('/notes', async (req, res) => {
        res.send(JSON.stringify((await db.query('SELECT _id , name FROM notes')).rows))
    })
};
    app.put('/notes/:id', async (req, res) =>{
        const name = req.body.name
        const id = req.params.id
        res.send(JSON.stringify((await db.query(`UPDATE notes SET name = '${name}' WHERE (_id = ${id}) RETURNING name;` )).rows[0]))
    })
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

