const fs = require('fs');
const path = require("path");
//const { createCanvas } = require('canvas');
const PImage = require('pureimage');


const cellSize = 7;
const marginSize = 1;

async function renderImage(engine, index, dir) {
  const {colSize, rowSize} = engine.config;
  const w = cellSize*colSize;
  const h = cellSize*rowSize;

  const canvas = PImage.make(w, h);
  //const canvas = createCanvas(w, h, "png");
  const context = canvas.getContext('2d');

  context.fillStyle = "#fff";
  context.fillRect(0, 0, w, h);

  context.fillStyle = "#000";
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let y = j * cellSize + marginSize;
      let x = i * cellSize + marginSize;
      
      let sw = cellSize - 2*marginSize;
      let sh = cellSize - 2*marginSize;

      if (engine.getState(i, j) > 0) {
        context.fillRect(x, y, sw, sh);
      }
    }
  }

  const fileName = path.join(dir, `${index.toString().padStart(4, "0")}.png`);
  console.log(fileName);
  
  /*const buffer = canvas.toBuffer('image/png', { compressionLevel: 0, filters: 'PNG_FILTER_NONE'});
  fs.writeFileSync(fileName, buffer);*/
  await PImage.encodePNGToStream(canvas, fs.createWriteStream(fileName));

  return [w, h];
}

exports.cellSize = cellSize;
exports.renderImage = renderImage;