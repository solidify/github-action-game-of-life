export interface ConwaysGameEngineInterface {
    world: World;
    config: Config;
    getState(row: number, col: number): number;
    step(): void;
    draw(row: number, col: number): void;
    erase(row: number, col: number): void;
}
export declare type Config = {
    rowSize?: number;
    colSize?: number;
    rules?: Rule[];
    allowMultipleRuleMatches?: boolean;
};
export declare type World = number[][];
export declare type Rule = {
    name: string;
    matcher: (currState: number, numberOfNeighbours: number) => boolean;
    result: number;
};
