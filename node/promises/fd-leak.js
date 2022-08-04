// @ts-check
// ➡️ fnm use 14/16
import * as fs from 'fs';

const openAndThrow = () => {
  fs.open('./package.json', 'r', (err, fd) => { //* ➡️ async
    throw new Error(`❗Leaked FD #${fd}❗`);
  });
};

setInterval(openAndThrow, 50);
