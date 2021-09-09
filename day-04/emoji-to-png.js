
// 參考資料 : https://gist.github.com/mnmly/8583502
var fs = require('fs');
var Canvas = require('canvas');
var OpenType = require('opentype.js');

/**
 * Draw `hello` with typeface located at `typeface` then output .png with name `filename`
 * when writing is done, `next` callback is triggered.
 *
 * @param {String} typepath
 * @param {String} filename
 * @param {String} text
 * @param {Number} fontSize
 * @param {Function} onFinish
 */

function drawHello(typepath, filename, text, fontSize, onFinish) {

  OpenType.load(typepath, function (err, font) {

    var canvas = Canvas.createCanvas(fontSize + 20, fontSize + 20);
    var ctx = canvas.getContext('2d');
    var path = font.getPath(text, 0, fontSize, fontSize); // text, x, y, fontSize, options

    path.draw(ctx);

    var out = fs.createWriteStream('output/' + filename);
    var stream = canvas.pngStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });

    stream.on('end', function () {
      onFinish();
    });

  });
}

drawHello('fonts/Roboto-Black.ttf', 'bold.png', 'Hello World',100, function () {
  console.log('done');
});

drawHello('seguiemj.ttf', '100.png', '🙂', 500,function () {
  console.log('done');
});
