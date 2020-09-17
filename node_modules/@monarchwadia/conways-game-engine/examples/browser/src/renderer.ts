import ConwaysGameEngine from "@monarchwadia/conways-game-engine"

export const renderer = (engine: ConwaysGameEngine) => {
  const out = document.getElementById('out');
  let string = '';

  const world = engine.world;

  world.forEach(row => {
    row.forEach(col => {
      string += col ? "■" : "▢";
    });
    string += '\n'
  });

  out.innerHTML = string;
}
