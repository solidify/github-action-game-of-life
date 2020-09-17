import { buildGridTesterBuilder } from "./helpers.types";
import { ConwaysGameEngine } from '../src/conways-game-engine';

declare const buildGridTesterBuilder: buildGridTesterBuilder;

let engine: ConwaysGameEngine;

beforeEach(() => {
  engine = new ConwaysGameEngine({
    rules: [
      {
        name: "Turn off cells that are on",
        matcher: (currState) => currState === 1,
        result: 0
      },
      {
        name: "Turn on cells that are off",
        matcher: (currState) => currState === 0,
        result: 1
      }
    ]
  });
})

test('Erasing multiple times is idempotent', () => {
  const gridTester = buildGridTesterBuilder(engine, 0, 0);

  // draw 0,0 and 1,1
  engine.draw(0, 0);
  engine.draw(1, 1);

  // test that it looks good
  gridTester([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  // step and test inversions
  engine.step();
  gridTester([
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);

  // erase 0,2 in ON state. does it survive as ON after the engine.step()?
  engine.erase(0, 1);
  engine.step();
  gridTester([
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});
