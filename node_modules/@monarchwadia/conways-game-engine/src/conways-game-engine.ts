import { initWorld, getNumberOfNeighbours, calculateNewWorldState } from './utils';
import { ON, OFF } from './constants';
import { ConwaysGameEngineInterface, World, Config, Rule } from './interface';

export class ConwaysGameEngine implements ConwaysGameEngineInterface {
  world: World;
  config: Config;

  constructor(config?: Config) {
    this.config = {
      rowSize: config && config.rowSize || 10,
      colSize: config && config.colSize || 10,
      rules: config && config.rules || defaultRules(),
      allowMultipleRuleMatches: config && config.allowMultipleRuleMatches || false
    }

    this.world = initWorld(OFF, this.config.rowSize, this.config.colSize);
  }

  getState(row: number, col: number) {
    return this.world[row][col];
  }

  step() {
    this.world = calculateNewWorldState(this);
    return this.world;
  }

  draw(row: number, col: number) {
    this.world[row][col] = ON;
  }

  erase(row: number, col: number) {
    this.world[row][col] = OFF;
  }
}

export const defaultRules = (): Rule[] => [
  // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  {
    name: "Loneliness",
    matcher: (currState, numberOfNeighbours) => currState === ON && numberOfNeighbours < 2,
    result: OFF
  },
  // 2. Any live cell with two or three live neighbours lives on to the next generation.
  {
    name: "Survival",
    matcher: (currState, numberOfNeighbours) => currState === ON && (numberOfNeighbours === 2 || numberOfNeighbours === 3),
    result: ON
  },
  // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
  {
    name: "Overpopulation",
    matcher: (currState, numberOfNeighbours) => currState === ON && numberOfNeighbours > 3,
    result: OFF
  },
  // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  {
    name: "Reproduction",
    matcher: (currState, numberOfNeighbours) => currState === OFF && numberOfNeighbours === 3,
    result: ON
  }
];

export default ConwaysGameEngine;