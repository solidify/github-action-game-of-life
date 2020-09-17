const { ConwaysGameEngine } = require('../../dist/conways-game-engine');
const { renderer } = require('./renderer');

// init engine
const engine = new ConwaysGameEngine();

/*
  Draw a glider
  . . . . . . . . . .
  . . . . . . . . . .
  . . . . . . . . . .
  . . . . . . . . . .
  . . . . # . . . . .
  . . . . . # . . . .
  . . . # # # . . . .
  . . . . . . . . . .
  . . . . . . . . . .
  . . . . . . . . . .
*/

engine.draw(3, 4);
engine.draw(4, 5);
engine.draw(5, 5);
engine.draw(5, 4);
engine.draw(5, 3);

renderer(engine);

// CALCULATE
for (var i = 0; i < 10; i++) {
  engine.step();
  renderer(engine);
}
