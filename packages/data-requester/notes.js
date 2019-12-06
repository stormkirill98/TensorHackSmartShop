var environment = require('./environment');
var api = require('./apiEndpoints');
const axios = require('axios')
// returns array of categories
async function getCategories(name) {
    var params = {}
    if(name){
        params["name"] = name;
    }
    let res = await axios.get(environment.SITE_ADDRESS + "/" + api.categories.n, params);
    return res.data; 
    
}
module.exports = {
    getCategories
}