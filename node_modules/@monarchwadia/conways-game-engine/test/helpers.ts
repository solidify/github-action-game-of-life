import { ConwaysGameEngine } from "../src/conways-game-engine";
import { World } from "../src/interface";
import { buildGridTesterBuilder } from './helpers.types';

declare const global: any;
declare const expect: any;

const buildGridTesterBuilder: buildGridTesterBuilder = (engine: ConwaysGameEngine, originRow: number, originCol: number) => (expectation: World) => {
  for (var row = 0; row < expectation.length; row++) {
    for (var col = 0; col < expectation[row].length; col++) {

      // the "origin" here refers to the top-left corner of the metaphorical "viewport"
      const worldRow = originRow + row, // pan the metaphorical "viewport" over to the origin
        worldCol = originCol + col; // pan the metaphorical "viewport" down to the origin


      const expectedState = expectation[row][col];
      const worldState = engine.getState(worldRow, worldCol);

      expect(worldState, `Was testing [Row: ${worldRow}][Col: ${worldCol}]`).toBe(expectedState);
    }
  }
}

global.buildGridTesterBuilder = buildGridTesterBuilder;