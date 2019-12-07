var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')
// returns array of categories
async function getCategories(name) {
    var params = {}
    if(name){
        params["name"] = name;
    }
    let res;
    try{
        res = await axios.get(environment.SITE_ADDRESS + "/" + api.categories.n, {params});
    } catch(e){
        return e
    }
    return res.data; 
    
}
module.exports = {
    getCategories
}