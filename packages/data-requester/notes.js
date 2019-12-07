var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')

async function getNotes() {
    let res ;
    try{
        res = await axios.get(environment.SITE_ADDRESS + "/" + api.notes.n);
    } catch(e) {
        return e
    }
    return res.data; 
}
async function addNote(name, username) {
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
async function updateNode(name , id) {
    if(!name || !id) return []
    let res ;
    try{
        res = await axios.put(environment.SITE_ADDRESS + "/" + api.notes.n+ "/" + id,{
            name,
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
    deleteNode,
    updateNode,
    getNotes
}
