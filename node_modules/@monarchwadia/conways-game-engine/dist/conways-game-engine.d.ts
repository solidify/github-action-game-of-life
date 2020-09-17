import { ConwaysGameEngineInterface, World, Config, Rule } from './interface';
export declare class ConwaysGameEngine implements ConwaysGameEngineInterface {
    world: World;
    config: Config;
    constructor(config?: Config);
    getState(row: number, col: number): number;
    step(): World;
    draw(row: number, col: number): void;
    erase(row: number, col: number): void;
}
export declare const defaultRules: () => Rule[];
export default ConwaysGameEngine;
