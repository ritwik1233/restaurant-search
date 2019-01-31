var dev=require('./dev');
var prod=require('./prod');
var keys={}
if(process.env.NODE_ENV==='production')
{
    keys=prod
}
else
{
    keys=dev
}
module.exports=keys