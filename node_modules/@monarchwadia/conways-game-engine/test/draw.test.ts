import { ConwaysGameEngine } from "../src/conways-game-engine";

let engine: ConwaysGameEngine;

beforeEach(() => {
  engine = new ConwaysGameEngine();
})

test('It can draw and then erase a simple cell', () => {
  // initial state should be 0
  expect(engine.getState(1, 1)).toBe(0);

  // draw once and expect it to be 1
  engine.draw(1, 1);
  expect(engine.getState(1, 1)).toBe(1);

  // erase and expect it to be 0
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);
})

test('Drawing multiple times is idempotent', () => {
  // initial state should be 0
  expect(engine.getState(1, 1)).toBe(0);

  // draw and expect 1
  engine.draw(1, 1);
  expect(engine.getState(1, 1)).toBe(1);

  // draw and expect 1 still
  engine.draw(1, 1);
  expect(engine.getState(1, 1)).toBe(1);

  // and one more time
  engine.draw(1, 1);
  expect(engine.getState(1, 1)).toBe(1);

  // erase and expect 0
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);
})

test('Erasing multiple times is idempotent', () => {
  // initial state should be 0
  expect(engine.getState(1, 1)).toBe(0);

  // erasing first time, expect 0 still
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);

  // draw and expect 1
  engine.draw(1, 1);
  expect(engine.getState(1, 1)).toBe(1);

  // erase and expect 0 a few times
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);
  engine.erase(1, 1);
  expect(engine.getState(1, 1)).toBe(0);
})