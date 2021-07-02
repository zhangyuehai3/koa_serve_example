const config = require('./config')
const mysql = require('mysql2');

 const connections= mysql.createPool({
    port:config.MYSQL_PORT,
    host:config.MYSQL_HOST,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
});

connections.getConnection((err,conn) =>{
    conn.connect((err) =>{
       if(err){
        console.log("创建失败",err);
       }
       else{
           console.log("数据库连接成功--"); 
       }

        
    })
})
module.exports = connections.promise()