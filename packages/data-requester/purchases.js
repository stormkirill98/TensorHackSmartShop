var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')
//[]->characteristics
async function addPurchase(note_id, category_id, characteristics) {
    if(!note_id || !usercategory_idname) return
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
module.exports = {
    addPurchase
}