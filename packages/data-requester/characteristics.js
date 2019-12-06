var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')

async function getCharacteristicsByCategoryId(categoryId) {
    categoryId = parseInt(categoryId);
    if(!categoryId) return []
    var params = {
        category_id: categoryId
    }
    let res;
    try{ 
        res = await axios.get(environment.SITE_ADDRESS + "/" + api.characteristics.n, {params});
    }catch(e){
        return e
    }
    return res.data; 
}
module.exports = {
    getCharacteristicsByCategoryId,
}