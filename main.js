const core = require('@actions/core');
const github = require('@actions/github');
const { ConwaysGameEngine, defaultRules } = require('@monarchwadia/conways-game-engine');
const { seed } = require('./seed');
const { renderImage } = require('./render-image');
const { renderGif } = require('./render-gif');
const fs = require('fs');

async function run() {
  try {
    const golPath = core.getInput('gol-path');
    const columns = core.getInput('columns');
    const rows = core.getInput('rows');
    const generations = core.getInput('generations');
  
    const dir = './images';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);  
    }
  
    const seedHash = github.context.payload.head_commit.id;
    console.log('seed hash', seedHash);
    const config = {
      rowSize: rows,
      colSize: columns,
      rules: defaultRules(),
    }
  
    const engine = new ConwaysGameEngine(config);
    seed(engine, seedHash, [rows, columns]);
    await renderImage(engine, 0, dir);
  
    for (var i = 0; i < generations; i++) {
      engine.step();
      await renderImage(engine, i+1, dir);
    }
    
    renderGif(dir, golPath, engine);
    console.log("Done");
  } catch (error) {
    console.log(JSON.stringify(error));
    core.setFailed(error.message);
  }
}

run();
