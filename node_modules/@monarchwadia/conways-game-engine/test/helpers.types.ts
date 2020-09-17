import { World } from "../src/interfaces";
import { ConwaysGameEngine } from '../src/index';

export type buildGridTester = (expectation: World) => void;
export type buildGridTesterBuilder = (engine: ConwaysGameEngine, originRow: number, originCol: number) => buildGridTester;