const keys = {}
if(process.env.NODE_ENV==='production') {
    const prod = require('./prod');    
    keys = prod;
} else {
    const dev = require('./dev');
    keys = dev;
}
module.exports = keys;