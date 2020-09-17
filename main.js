const core = require('@actions/core');
const github = require('@actions/github');
const { ConwaysGameEngine, defaultRules } = require('@monarchwadia/conways-game-engine');
const { seed } = require('./seed');
const { renderImage } = require('./render-image');
const { renderGif } = require('./render-gif');
//const tmp = require("tmp");
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  //const nameToGreet = core.getInput('who-to-greet');
  //console.log(`Hello ${nameToGreet}!`);
  //const time = (new Date()).toTimeString();
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);

  /*const { name: dir, removeCallback: cleanUp } = tmp.dirSync({
    unsafeCleanup: true,
  });*/

  const dir = './images';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);  
  }

  const seedHash = github.context.payload.head_commit.id;
  console.log('seed hash', seedHash);
  const config = {
    rowSize: 14,
    colSize: 10,
    rules: defaultRules(),
  }

  const engine = new ConwaysGameEngine(config);
  seed(engine, seedHash, [14, 10]);
  await renderImage(engine, 0, dir);

  for (var i = 0; i < 100; i++) {
    engine.step();
    await renderImage(engine, i+1, dir);
  }
  
  renderGif(dir, './gol.gif', engine);
  core.setOutput("gif", './gol.gif');
  console.log("Done");
} catch (error) {
  console.log(JSON.stringify(error));
  core.setFailed(error.message);
}