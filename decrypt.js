var Jimp = require('jimp');
var fs = require('fs')

const optionDefinitions = [{
  name: 'image',
  alias: 'i',
  type: String,
  defaultOption: true
},
{
  name: 'key',
  alias: 'k',
  type: String
}
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

var readOrder = JSON.parse(fs.readFileSync(options.key, "utf8"))

Jimp.read(options.image)
  .then(image => {
    // Do stuff with the image.
    var hidden = ""
    for(var i = 0; i < readOrder.length; i++){
        hidden += String.fromCharCode((Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).r + Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).g + Jimp.intToRGBA(image.getPixelColor(readOrder[i].x, readOrder[i].y)).g - (readOrder[i].caesar * 3))/3)
    }
    console.log(hidden)
  })
  .catch(err => {
    // Handle an exception.
    console.log(err)
  });


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}