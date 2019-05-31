const http = require('http');
const router = require('./router.js');
const querystring = require('querystring');
var fs = require('fs');

 
function handleHello(request, response) {
  // 设置响应头
  response.writeHeader(200, {
    "Content-Type" : "text/plain"
  });
  // 响应主体为 "Hello world!"
  response.write("Hello world!");
  response.end();
}

function handleSave(request,response){
    var post = '';
    request.on('data',function(chunk){
      post += chunk;
    });
    request.on('end',function(){
      post = querystring.parse(post);
      response.writeHeader(200, {
        "Content-Type" : "application/json"
      });
      fs.writeFileSync('./conf/cfg.ini',
      `[detect]\r\nwidth=${post.width}\r\nskip_frame=2\r\npositions=${post.points}`
      );
      
      response.write(JSON.stringify({'status':'ok'}));
      response.end();
    })
}

function handleFind(request,response){
  var data = fs.readFileSync('./conf/cfg.ini','utf-8');
  //console.log(data);
   var arr =  data.match(/\[detect\]\r\nwidth=(.*)\r\nskip_frame=(.*)\r\npositions=(.*);/);
  //var arr = data.match(/\[detect\].*/g);
 // var arr = data.match(/\r\n/g);
 console.log(arr);
 if(arr != null){
  var width = arr[1];
  var skip_frame = arr[2];
  var positions = arr[3];
  // 设置响应头
 response.writeHeader(200, {
   "Content-Type" : "application/json"
 });
 var obj = JSON.stringify({'width':width,'skip_frame':skip_frame,'positions':positions,'status':true});
 
 response.write(obj);
 }

  response.end();
 

}
function handleGetDevicePic(request,response){
  var obj = require('./getUsbCamramPic');
  var outImg = obj.outimg;
  //obj.ffmpegObj2();
  obj.ffmpegObj1();
  response.writeHeader(200, {
    "Content-Type" : "application/json"
  });
  response.write(JSON.stringify({'status':'ok'}));
  response.end();

  
}

http.createServer(function(request, response) {
  // 注册路径和其对应回调函数
  router.register(request, response, [
    {
      'url': '/hello',
      'handler': handleHello
    },
    {
      'url':'/save',
      'handler':handleSave
    },{
      'url':'/find',
      'handler':handleFind
    },
    {
      'url':'/getDevicePic',
      'handler':handleGetDevicePic
    }
  ]);
})
// 设置监听端口为9000
.listen(9999);
console.log("Listen 127.0.0.1:9999");