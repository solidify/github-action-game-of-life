const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const fs = require('fs');
const { cellSize } = require('./render-image');


function renderGif(inDir, outPath, engine) {
  const {colSize, rowSize} = engine.config;
  const w = cellSize*colSize;
  const h = cellSize*rowSize;
  const encoder = new GIFEncoder(w, h);
  
  const stream = pngFileStream(`${inDir}/*.png`)
    .pipe(encoder.createWriteStream({ repeat: 0, delay: 200, quality: 10 }))
    .pipe(fs.createWriteStream(outPath));
}

exports.renderGif = renderGif;