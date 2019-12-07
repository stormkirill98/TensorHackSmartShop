var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')
//[]->characteristics
async function addPurchase(note_id, category_id, characteristics) {
    if(!note_id || !category_id ) return
    let res ;

    try{
        res = await axios.post(environment.SITE_ADDRESS + "/" + api.purchases.n,{
            note_id,
            category_id,
            characteristics
        });
    } catch(e) {
        return e
    }
    return res.data; 
}
async function getBestPurchase(noteId) {
    if(!noteId) return []
    let res;
    try{ 
        res = await axios.get(environment.SITE_ADDRESS + "/" + api.purchases.n + "/" + noteId);
    }catch(e){
        return e
    }
    return res.data; 
}
module.exports = {
    addPurchase,
    getBestPurchase
}