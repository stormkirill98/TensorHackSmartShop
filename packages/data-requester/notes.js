var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')

async function addNote(name , username) {
    if(!name || !username) return
    let res ;
    try{
        res = await axios.post(environment.SITE_ADDRESS + "/" + api.notes.n,{
            name,
            username
        });
    } catch(e) {
        return e
    }
    return res.data; 
}
async function deleteNode(noteId) {
    noteId = parseInt(noteId)
    if(!noteId) return
    let res ;
    try{
        res = await axios.delete(environment.SITE_ADDRESS + "/" + api.notes.n + "/" + noteId);
    } catch(e) {
        return e
    }
    return res.data; 
}
module.exports = {
    addNote,
    deleteNode
}

// module.exports = (app, db) => {
//     app.post('/notes', async (req, res) => {
//         const { name , date, username } = req.body;
        
//         const result = await db.query(`INSERT INTO notes (name, date, username) VALUES ('${name}', ${date}, ${username}) returning _id;`)
           
//         res.end(JSON.stringify(result.rows));
//     })

//     app.delete('/notes/:id', async (req, res) => {
//         const _id = req.params.id;
//         const result = await db.query(`delete from notes where (_id = ${_id})`);

//         res.end(JSON.stringify(result.rows));
//     })
// };