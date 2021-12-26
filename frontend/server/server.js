/*
 * @Date: 2021-12-26 14:17:09
 * @LastEditTime: 2021-12-26 16:58:58
 * @FilePath: /new-simple-todo/my-todo/frontend/server/server.js
 */

// notice that this file is only for uploading local files due to strange properties of chromium

const PORT = 8001; 
var http = require('http'); 
var fs = require('fs'); 
var url = require('url');
var path = require('path');


var server = http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;;
   
   
  var realPath = path.join('../',pathname);
  
  console.log(realPath);
  
  fs.readFile(realPath,function(err,data){
   
    if(err){
      
      res.writeHead(404,{
        'content-type':'text/plain'
      });
      res.write('404,页面不在');
      res.end();
    }else{
      
      res.writeHead(200,{
        'content-type':'image/png'
      });
      res.write(data);
    
      res.end();
    }
  })
});
server.listen(PORT); 
console.log('服务成功开启')

