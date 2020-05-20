let mysql=require('mysql');
const env=require('./load-env')
var connect=mysql.createConnection({
    host:env.DB_HOST,
    password:env.DB_PW,
    user:env.DB_USER,
    database:env.DB_NAME
});

module.exports=connect;