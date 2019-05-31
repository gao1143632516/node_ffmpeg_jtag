var ffmpeg = require('fluent-ffmpeg');

var source1 = 'rtmp://live.hkstv.hk.lxdns.com/live/hks1'

var outimg = './html/html/img/bg.png';
//var source = '"Logitech HD Webcam C525"';


var source2 = 'video=Logitech HD Webcam C525';

var ffmpegObj1  =  function(){
    new ffmpeg()
        .input(source2)
        .inputOptions(['-f dshow'])
        .outputOptions(['-vframes 1'])
        .videoCodec("png")
        .on('start',function(commandLine){
            console.log('Spawned Ffmpeg with command ' + commandLine)
        })
        .on('error', function (err, stdout, stderr) {
            console.log(err);
            console.log(stdout);
            console.log(stderr);
            //log.error(err.message);
            // log.info('stdout: ' + stdout); log.info('stderr: ' + stderr);
        })
        .on('end', function () {
            console.log('Screenshots taken');
        })
       .save(outimg);
}
       

var ffmpegObj2  = function(){
    new ffmpeg(source1)
        .outputOptions(['-vframes 1'])
        .videoCodec("png")
        .on('start',function(commandLine){
            console.log('Spawned Ffmpeg with command' + commandLine)
        })
        .on('error', function (err, stdout, stderr) {
            console.log(err);
            //log.error(err.message);
            // log.info('stdout: ' + stdout); log.info('stderr: ' + stderr);
        })
        .on('end', function () {
            console.log('Screenshots taken');
        })
       .save(outimg);
}
  

 module.exports ={ffmpegObj1,ffmpegObj2,outimg};  
  
