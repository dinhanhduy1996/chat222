const express = require('express');
const app  = express();
const server  = require('http').createServer(app);
const io = require('socket.io')(server, {  
    cors:  {origin: "*"}
});


var mysql = require('mysql');
//Khởi tao kết nối với MySQL Server
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat" 
});
        //Tiến hàng kết nối
       
        con.connect(function(err) {
          if (err) throw err;
          //Kết nôi thành công
          console.log("Connected!");
          //Tiến hành khởi tạo databse
 

            io.on('connection',(socket)=>{

              socket.on('chat message', function(msg){
                  
                  
                con.query("INSERT INTO chat2(noidung) VALUES('"+msg+"')", function (err, result) {
                  if (err) throw err;
                  console.log("add complete!!!");
            
                  io.emit('chat message', msg);
                });
          });

          });
        });


server.listen(3000,()=>{
    console.log('server is running');
});