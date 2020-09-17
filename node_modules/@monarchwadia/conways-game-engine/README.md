# Conway's Game of Life

Author: [Monarch Wadia](https://linkedin.com/in/monarchwadia)

## Introduction

This is a very simple implementation of Conway's Game of Life, whipped up in about ~5 hours. It features a node-compatible engine, configurable board height and width, and configurable rules.

The configurable rules are pretty interesting and are worth playing around with.

## Read the changeblog!

Starting with v1.1.0 (which adds Typescript support), I'm documenting all changes to this project. You can read the changeblog [here](changeblog/2020-04-25-adding-ts-and-jest.md). I hope you enjoy it!

## Usage

See [examples/simple-node](./examples/simple-node/index.js)

## Configuring cellular automaton rules

See [examples/custom-rules](./examples/custom-rules/index.js)

## Configuration Options

Below are configuration options with their default values.

```javascript
const { ConwaysGameEngine, defaultRules } = require('@monarchwadia/conways-game-engine');

const config = {
  // Width of the board. 
  // Defaults to 10.
  rowSize: 10

  // Height of the board. 
  // Defaults to 10.
  colSize: 10,

  // The cellular automata rules. The default is Conway's Game of Life. 
  // You can modify these. See "Configuring Rules" section.
  // Defaults to the result of `defaultRules()`, which is called internally.
  rules: defaultRules(), 

  // Usually, each cell can only match a single rule, otherwise it throws an error. Set to 'true' to allow multiple rules.
  // Defaults to false.
  allowMultipleRuleMatches: false 
}

const engine = ConwaysGameEngine(config);
```