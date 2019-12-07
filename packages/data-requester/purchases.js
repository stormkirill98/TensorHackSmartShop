var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')
//[]->characteristics
async function addPurchase(note_id, category_id, characteristics, count) {
    if(!note_id || !category_id ) return
    let res ;

    try{
        res = await axios.post(environment.SITE_ADDRESS + "/" + api.purchases.n,{
            note_id,
            category_id,
            count,
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

async function deletePurchase(purchaseId) {
    purchaseId = parseInt(purchaseId)
    if(!purchaseId) return
    let res ;
    try{
        res = await axios.delete(environment.SITE_ADDRESS + "/" + api.purchases.n + "/" + purchaseId);
    } catch(e) {
        return e
    }
    return res.data;
}

module.exports = {
    addPurchase,
    getBestPurchase,
    deletePurchase
}