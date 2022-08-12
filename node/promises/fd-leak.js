// @ts-check
// ➡️ fnm use 14/16
import * as fs from 'fs';

const openAndThrow = () => {
  // <~~ “Your promises, they look like lies” ©️ Jared Leto ~~>

  fs.open('./package.json', 'r', (err, fd) => { //* ➡️ async
    throw new Error(`❗Leaked FD #${fd}❗`);
  });
};

// openAndThrow();

// setInterval(openAndThrow, 50);
