import { buildGridTesterBuilder } from './helpers.types';
import { ConwaysGameEngine } from '../src/conways-game-engine';

declare const buildGridTesterBuilder: buildGridTesterBuilder;

let engine: ConwaysGameEngine;

beforeEach(() => {
  engine = new ConwaysGameEngine();
})

test('Simple glider', () => {
  /*
  Glider steps
  . . . . . . . . . . . . . . . . . . . . . . . . . . .
  . . . . . . . . . . . . . . . . . . . . . . . . . . .
  . . . . . . . . . . . . . . . . . . . . . . . . . . .
  . . . # . . . . . . . . . . . . . . . . . . . . . . .
  . . . . # . . # . # . . . . # . . # . . . . . # . . .
  . . # # # . . . # # . . # . # . . . # # . . . . # . .
  . . . . . . . . # . . . . # # . . # # . . . # # # . .
  . . . . . . . . . . . . . . . . . . . . . . . . . . .
  . . Step 1    Step 2    Step 3    Step 4    Step 5
*/

  // draw step 1
  engine.draw(3, 4);
  engine.draw(4, 5);
  engine.draw(5, 5);
  engine.draw(5, 4);
  engine.draw(5, 3);

  // prepare tester
  const gridTester = buildGridTesterBuilder(engine, 3, 3);

  // step 1
  gridTester([
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ]);

  // step 2
  engine.step();
  gridTester([
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
  ])

  // step 3
  engine.step();
  gridTester([
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ])

  // step 4
  engine.step();
  gridTester([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ])

  // step 5
  engine.step();
  gridTester([
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 1, 1, 1],
  ])
})

