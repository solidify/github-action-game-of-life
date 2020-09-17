exports.seed = function seed(engine, hash, [maxRow, maxCol]) {
  var bytes = hexStringToByte(hash);

  let row = 0;
  let col = 0;

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    for (let j = 0; j < 7; j++) {
      const bit = byte & 1;
      if (bit > 0) {
        engine.draw(row, col);
      }
      col++;
      if (col >= maxCol) {
        col = 0;
        row++;
      }
      if (row >= maxRow) row = 0;
    }
  }
}

function hexStringToByte(str) {
  if (!str) {
    return new Uint8Array();
  }
  
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i,2),16));
  }
  
  return new Uint8Array(a);
}