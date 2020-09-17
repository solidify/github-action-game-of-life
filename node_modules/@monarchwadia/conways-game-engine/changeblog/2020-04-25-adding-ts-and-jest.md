# First Changeblog entry: adding unit testing (jest), typescript, and browser support (webpack + babel) to an already-published Node package.

## Background about why I'm doing this.
I love simulation games. I grew up playing SimAnt, CimCity, SimTower, Railroad Tycoon, Rollercoaster Tycoon, SimEarth -- bunches and bunches of simulation games made up a large part of my childhood.

And cellular automata are the haiku of simulation games -- they come with tiny rules, which you can tinker with ad-infinitum to create worlds out of thin air. They're really quite elegant and fun to play with.

I wanted to have a way to experiment with cellular automata by tweaking rules and what not. [Conway's Game Engine](https://www.npmjs.com/package/@monarchwadia/conways-game-engine) is an implementation of Conway's Game of Life that lets you configure your own rulesets.

I built this as part of a [Mintbean Hackathon](https://github.com/MintbeanHackathons/2020-04-19-Conways-Game-of-Life-4-day-extended), so it was really a quick and dirty creation. I left it in a working state, but it was going to be difficult to use without static typing.

So I'm writing this document as I go, implementing static typing. I hope it's useful as a case study for people some time in the future.

## Starting point

The game engine as it exists right now is Node-compatible, and can be installed using `npm install @monarch/conways-game-engine`. It totally works and you can read the docs to get an idea for how it works. It is NOT browser-friendly without further modifications, and does not come out-of-the-box with any GUI of any sort (although there are some simple terminal-based examples in the `/examples` folder). It is strictly a game engine.

I started with v1.0.1 of the project: [v1.0.1][starting-commit], and I had a few specific changes I wanted to make.

## Target state

Here are a few modifications that needed to be made:

| Feature | Current state | What I want to do with it | Why |
|---|---|---|---|
| Language | Vanilla JavaScript  | I want to add Typescript | This is intended to be an importable library. Typescript would make code hinting and error detection wayyyy better.   |
| Example projects | Node only  | I want some browser examples | It makes no sense to make a game backend-only. I want to create a frontend game out of this project and then deploy it to a website. |
| Testing | None | I want to use Jest | Adding testing isn't ALWAYS a good idea. For example, in personal projects like this one, they're often unnecessary and can really suck the fun out of development. Testing is just a tool, and I don't buy into the test-driven fetish our industry is plagued with. But when you're expanding an existing backend project that has no GUI, automatic test runners make you go much faster without breaking things. I'm using Jest because it's more fun and less fiddly to use than Mocha/Chai |

## Constraints

Here are the constraints I'm working with:

1. I only have max. 4 hours to spend on this project, and any extra time spent on this project would take away from my business.
1. I am documenting all of my changes, which further eats into those 4 hours.

## Strategy

Typescript works pretty well with plain JavaScript. It is completely possible to gradually port JS over to TS one step at a time, rather than as a whole. So I will start porting JS over one small step at a time.

I decided that I'd first install unit testing and fully test the project in plain Javascript. The little time I have right now to work on a personal project needs to be efficiently used, and any errors would leave an impact on the amount of time I have available to dedicate to my business.

This current commit adds the HOW-I-DID-IT md file to this project.

# Phase 1 -Adding unit tests

## Phase 0 - I started the changeblog

I've never done this before, but `changeblog` sounds like a good name for documenting changes as you go in a project. So I'm committing this file here.

So, here's the [link to the git commit for this section][commit-0] in case you want to follow along. Each section below will have a link to the git commit associated with it.

## Phase 1a - Adding unit tests for drawing and erasing.

I first installed `jest`, then added a `test` script to `package.json`

```
# terminal
yarn add -D jest

# package.json
{
  "scripts": {
    "test": "jest --watchAll"
  }
}
```

( I used `--watchAll` instead of `--watch`. Jest's `--watch` command only runs tests on files that have diffed. For now, I have so few tests, and my project is so lightweight, that a comprehensive test of all files would let me sleep better at night. So, I'm using `--watchAll`).

I added a few simple tests in `/test`, then run `yarn test`, and here is our output:

```
 PASS  test/draw.test.js
  ✓ It can draw and then erase a simple cell (4ms)
  ✓ Drawing multiple times is idempotent (2ms)
  ✓ Erasing multiple times is idempotent (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.21s
Ran all test suites.

Watch Usage: Press w to show more.

```

Excellent! Here's the [link to the git commit for this section][commit-1a] in case you want to follow along.

## Phase 1b - Adding a simple test for the engine's default Game of Life ruleset

Now I will actually test the game engine itself, with the default rules. I will test the rules by seeing if a simple glider survives and behaves as expected in the normal rules of the game of life. This will be sufficient to give me enough confidence in the game to start moving to typescript.

Here is an illustration of how the glider works. Note that the 5th step is identical to the 1st step, except moved down and to the right by exactly 1,1. This is pretty fascinating to me.


![5 steps of a glider in Conway's game of life.](./glider-steps.png)
```
Cumming, Graeme. (2011). Introduction to Mechanistic Spatial Models for Social-Ecological Systems. 10.1007/978-94-007-0307-0_4. 
```

Unit tests should ideally be easy to modify once they have been written. They don't have to be as well-written as the actual software itself, but they should be written so that they're easy to reason about when you go back and read them a few weeks/months/years after the fact.

Now, it would be very painful to actually program this test line-by-line, inserting coordinates and on/off expectations in a typical `expect().toBe()` format. So I created a utility function that does that for me.

```javascript
function testConfiguration(expectation, engine, originRow, originCol) {
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
```

Now, I can test a step like so:

```javascript

  // step 4
  engine.step();
  testConfiguration([
    [0,0,0,0],
    [0,1,0,0],
    [0,0,1,1],
    [0,1,1,0],
  ], engine, 3, 3)

```

I have a glider test fully operational now. Here's the [link to the commit for this section][commit-1b] in case you want to follow along.

## Phase 1c - Adding a simple test for the engine's configurable rules.

The engine is supposed to be able to take various different rulesets, not just Conway's game of life. I'll now add a simple test for the rulesets.

I created `test/customRules.test.js`, and then realized that I would want to share `testConfiguration` across files. I didn't know how to do it, so I googled it and found [this helpful thread](https://stackoverflow.com/questions/50411719/shared-utils-functions-for-testing-with-jest/52910794) that described how to use Jest's `setupFilesAfterEnv` to add a global helper. 

I refactored the [function signature](https://hackernoon.com/function-type-signatures-in-javascript-5c698c1e9801) of the helper a bit, put it into its own file, and exposed it as a global. Now, I can share it between multiple files.

I added a very simple ruleset -- 
 1. OFF cells become ON
 2. ON cells become OFF

So essentially, all cells are blinking lights that go ON-OFF-ON-OFF-ON, etc.

Then I tested it. It worked as expected.

Great! Now I'm confident enough to move on to actual typescript conversion. "Testing" is now done.

Here's the [link to the git commit for this section][commit-1c] in case you want to follow along.

## Minor changes: adding commit hashes, and exposing this on README.md, formatting this README.md

I want people to be able to follow along with my thought process. So I've added links to hashes at the end of each section above. I also added the link to this file on README.md. Also formatted the README so it's easier to read, and changed the title to make it more clear about what I'm doing here.

Copious use of `git commit --amend` and `git push --force` let me keep this commit clean. Thank you, Linus Torvalds, for making a sensible version control system that is easy to work with.

# Phase 2 - Adding Typescript

To start adding Typescript, I must, of course, install Typescript. But I also need to make sure that Jest doesn't freak out about it -- and that TS like show the JS files look, and vice versa. So writing this sentence, I'm expecting a few issues that could possibly make me spend a lot of time in tinkering around with build processes. (I think of that stuff as the "plumbing". Not necessarily fun work, but it is rewarding when you've finished up and built a good, solid build process that really works.)

To avoid unnecessary issues when converting JS files to TS, I usually start with the fringes of my project's dependency tree and work towards the main files. This way, I don't fall into the trap of resolving long chains of TS typechecking errors. Instead, the leaves and branches of my dependency tree -- the files that have the least number of imports -- are converted to TS first. For every file thus converted, Intellisense starts offering much more useful hints, making working with other JS files incrementally easier. Essentially, I'm not going against the grain. Instead, I'm working WITH the toolset, in an incremental way.

This project is super easy. There aren't that many files. I'll start with `constants.js`, then move on to `utils.js`, then convert `index.js`. Then I will convert the `test` files I just made in the previous phase. Finally, I'll modify the examples to use typescript, and I will be done. 

So let's have at it.

## Phase 2a - Installing Typescript and converting my first file

### Installing Typescript

Installing typescript is pretty easy.

```
yarn add -D typescript
```

But that's just the beginning. According to [Jest's getting started guide](https://jestjs.io/docs/en/getting-started.html), Jest will NOT type-check files as the tests are run. Furthermore, it also relies on Babel presets. I didn't really want to get involved with Babel right away, because I'll be looking that in the next phase anyway to build browser support.

Fortunately, I found an alternative pretty quickly. The same Jest getting started guide references a community package, [ts-jest](https://github.com/kulshekhar/ts-jest), which seems a bit nicer to use with Typescript in the mix. I don't usually like installing community packages, but this seems like the easiest way to get up and running.

```
## I didn't need jest or typescript since I had already installed them by this point.
# yarn add -D jest typescript

## But I still needed ts-jest, and @typefiles for jest.
yarn add -D ts-jest @types/jest

## And I also needed to create the ts-jest config. This overrides my existing jest config. I just copied entries from the old config over after re-initializing the config like so:
npx ts-jest config:init
```

At this point, `yarn test` goes off without a fight, and I'm happily running with a typescript-based Jest config.

Now, I can actually start working with the files themselves.

### Converting my first file

Thanks to the great interop between Typescript and vanilla Javascript, converting a file to Typescript is a simple 2-step process:

1. Rename the file from `*.js` to `*.ts`
1. Resolve any errors that may have occurred

As soon as I renamed `constants.js`, it was no longer found by `jest`. However, Jest's error messages were super helpful and immediately gave me the solution to the problem:

```
    You might want to include a file extension in your import, or update your 'moduleFileExtensions', which is currently ['js', 'json', 'jsx', 'ts', 'tsx', 'node'].
```

Armed with this info, I added the following line to my `jest.config.js`:

```
{
  // ...
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"]
}
```

This seemed to work, and `constants.ts` was now being recognized correctly.

I was also happy to discover that our static-phase typechecking was working just fine. My CommonJS syntax was now being rejected by typescript:

```
 FAIL  test/defaultRules.test.js
  ● Test suite failed to run

    constants.ts:1:1 - error TS2304: Cannot find name 'exports'.

    1 exports.ON = 1;
      ~~~~~~~
    constants.ts:2:1 - error TS2304: Cannot find name 'exports'.

    2 exports.OFF = 0;
      ~~~~~~~
    constants.ts:3:1 - error TS2304: Cannot find name 'exports'.

    3 exports.INHERIT = undefined;
      ~~~~~~~
```

The solution to this issue is to use ES6 Module syntax (i.e. `export` and `import`). 

Here's what the new file looks like:
```javascript
// OLD constants.js, as it was
exports.ON = 1;
exports.OFF = 0;
exports.INHERIT = undefined;

// RENAMED constants.ts, with the new entries
export const ON = 1;
export const OFF = 0;
export const INHERIT = undefined;
```

I'm expecting this to be an issue with every single file I edit. 

Next, I'm going to convert the rest of the project over.

So now that that's done, [here's the commit][commit-2a] for this section.

## Phase 2b - Converting the rest of the JS files to TS

Now I'm going to convert all the files over to I'm going to use the Typescript compiler to make this work a lot easier. For starters, I'll disable implicit `any`. This will make it so that any variables that aren't explicitly typed in our entire project start throwing errors:

```
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

Now, wherever the type of a variable is not clear to Typescript, it will complain to me -- and I'll be able to go in and declare the type explicitly.

I also have a class and several types that I am going to dump in `interfaces.ts` for now. This way I can use those types immediately. Eventually, once the project is entirely typescript-driven, I may move these interfaces into more appropriate locations -- global things are not usually a great idea for many reasons. I prefer having my interfaces closer to my classes. But a global `interfaces.ts` file will suffice for now.

...

After plugging through all the files and removing the errors, the conversion to Typescript is now complete.

I see the need now for a bit of a refactor. The project is a bit messy right now. But that'll have to wait until next time. I want to build a browser-based example project now, showing the Engine being used in a browser.

[Here's the commit][commit-2b] for Phase 2b

# Phase 3 - Frontend Example Project

Finally, I'm done with building unit testing and converting the project to typescript. Now, I can focus on building a browser-based project.

As you know, browsers don't support Typescript out of the box, so I have to compile our project down into a format that can be ingested by other projects.

## Phase 3a - Creating the build step

I actually hadn't built the project at all yet. I was just running off Jest. It's now finally time to create a build step.

The build step will output JS files from the TS source. To do this, I need to add a `.babelrc`, add `@babel/core` and `@babel-preset-typescript`. [This blog article](https://medium.com/collaborne-engineering/typescript-create-library-for-nodejs-and-browser-fece291d517f) helped point me in the right direction. After messing around with the dependencies a bit, I finally had a working TSConfig. Now I am outputting the files into `/dist`

Unfortunately, there is a little bit more work that needs to be done, since I see that `dist/` includes my `test` files as well. This isn't right, and it's because of the glob pattern I defined in my `tsconfig.json`:

```json
// tsconfig.json
{
  // ...
  "include": [
    "./**/*.ts"
  ]
}
```

This won't do, so I've refactored the project into a proper `src` directory and changed the `include` to say `"./src/**/*.ts"` instead.

Project build process is now successfully occurring using `tsc`. However, it is not a single `bundle.js` file, which is how I'm used to bundling my projects. I went ahead and installed `webpack`, which is a more flexible build system than `tsc` anyway.  I also added `webpack.config.js`. Now, `yarn build` outputs `dist/bundle.js`, which I will attempt to import in a browser project. I redefine my `package.json::main` to be `dist/bundle.js`. I had added `dist/` to gitignore in the previous commit, but i carefully remove that entry, to ensure that my published package on NPM is able to be imported successfully.

In order to test the exports, I've started a simple browser project, `./examples/browser`, which uses Parcel bundler to import dependencies. I use `yarn link` to make the main module available for imports without depending on relative paths. Then, I initialize my project and run `yarn add @monarchwadia/conways-game-engine`. VSCode is immediately aware of the Typescript types of my imports within the example project. 

Unfortunately, I quickly found out that my project was not able to be imported correctly. After some research, I found out that my module bundling method has to be UMD. Without packaging the project as a UMD module, the `bundle.js`'s exports were `undefined`. So I had to add the following properties in `webpack.config.js`:

```javascript
{
  // ..
  output: {
    // ..
    libraryTarget: "umd",
    library: "@monarchwadia/conways-game-engine"
  }
}
```

On running the project now, a simple `console.log` of the library's exports shows that I am exporting our project correctly.

This was a very messy entry. [Here is a link to the commit][commit-3a], there you can see the extent of my work here. 

I'm now going to build a simple browser-based version of the project.

## Phase 3b - Typescript type definition export woes

The project exports are being detected by VSCode as `any` type. This is frustrating. But it is now solved.

Turns out that exporting a Typescript module with type definition files is harder than it looks at first glance. After wrestling with build tools, it came to light that webpack+typescript is totally capable of doing this for us, but the assumption is that the name of the module and the name of the typescript d.ts file must be exactly the same.

I made sure this was the case. Now, `dist/conways-game-engine.js` and `dist/conways-game-engine.d.ts` are in-sync. There are extra definition files in there, too, that are referred to by `conways-game-engine.d.ts`

Overall, a frustrating experience, but it's now working as expected.

As a bonus, it is now also possible to use the library as a window object inside a browser. If the project is included in a `<script src="...">` tag, it should add the project to the window object at `window["@monarchwadia/conways-game-engine"]`. This was, the project can be included using a CDN. Cool!

Amazing. Now that I'm past these hurdles, [here's the commit][commit-3b]. I'm finally ready to start building the project itself.

## Phase 3c - The web-based project

I went in and fixed the old simple-node and custom-rules projects. these were both based on node. At first they were complaining about `ReferenceError: window is not defined` but this was fixed easily adding `globalObject: 'this'` in `webpack.config.js`

I finished the web-based project in a matter of minutes. It was extremely simple to do, actually. Amazing. [Here's the commit][commit-3c]

# Finished.

Overall, that wasn't so bad. I did take a lunch break in the middle, but it still ended up taking ~7 hours of work instead of ~4.

A lot of the time went into actually documenting things here for you guys. And a lot more time went into configuring webpack/typescript. Overall it wasn't a bad experience, and I hope this proves useful to someone who wants a blow-by-blow of how to convert JS to TS.

If you've made it thus far, thanks for going through this with me. I am now going to `npm version minor` and publish this library.

Adios!

[starting-commit]: https://github.com/monarchwadia/conways-game-engine/tree/v1.0.1
[commit-0]: https://github.com/monarchwadia/conways-game-engine/commit/0bb4fc500fd84b4734270a3bb38ab3a115e55819
[commit-1a]: https://github.com/monarchwadia/conways-game-engine/commit/661ab3bb84b3d7af71ebf6a26e77661c1a645949
[commit-1b]: https://github.com/monarchwadia/conways-game-engine/commit/b3596d93916d8a6826b1d1a895660045e89de127
[commit-1c]: https://github.com/monarchwadia/conways-game-engine/commit/fa1229382fcc9e4247d7f120f3c384f7e6ebb1e3
[commit-2a]: https://github.com/monarchwadia/conways-game-engine/commit/0e1c64be1a78239290872782e0b7d324efa3962a
[commit-2b]: https://github.com/monarchwadia/conways-game-engine/commit/aff796c31a2eb186d11f1ab4233d96639393d74d
[commit-3a]: https://github.com/monarchwadia/conways-game-engine/commit/6183559fd643148d61364b2b419a91a9f2a45344
[commit-3b]: https://github.com/monarchwadia/conways-game-engine/commit/d93ef5e07f5b3d9d419ba7e0823e5b53017c3c29
[commit-3c]: https://github.com/monarchwadia/conways-game-engine/commit/dc1d32ab1185ee1dc0c97616c61a03d6198229e1

