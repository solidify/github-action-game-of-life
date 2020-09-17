import { World } from './interface';
import { ConwaysGameEngine } from './conways-game-engine';
export declare function times(iterations: number, callback: (number: number) => void): void;
export declare function getNumberOfNeighbours(engine: ConwaysGameEngine, homeRow: number, homeCol: number): number;
export declare function initWorld(valueToSet: number, rowSize: number, colSize: number): World;
export declare function draw(world: World, row: number, col: number): void;
export declare function calculateNewWorldState(engine: ConwaysGameEngine): World;
