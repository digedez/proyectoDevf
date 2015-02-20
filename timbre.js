var mic = require('microphone');
var Cylon = require('cylon');
var fs = require('fs');

var wstream = fs.createWriteStream('hola.mp3');


Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    button: { driver: 'button', pin: 7 }
  },

  work: function(my) {
    my.button.on('push', function() {
      console.log("Button pushed!");


      mic.startCapture({'mp3output' : true});
      mic.audioStream.on('data', function (data) {
      wstream.write(data);
      });


    });
  }
}).start();
