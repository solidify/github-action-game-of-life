import ConwaysGameEngine from '@monarchwadia/conways-game-engine';
import { renderer } from './renderer';

console.log(ConwaysGameEngine);
// debugger;
const engine = new ConwaysGameEngine({
  rowSize: 100,
  colSize: 100
});

// draw a glider
engine.draw(3, 4);
engine.draw(4, 5);
engine.draw(5, 5);
engine.draw(5, 4);
engine.draw(5, 3);
renderer(engine);

setInterval(() => {
  engine.step()
  renderer(engine);
}, 100);


