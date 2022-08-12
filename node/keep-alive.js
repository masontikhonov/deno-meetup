const SA_BPM = 60 * 1000 / 103;

const lyrics = [
  `🎶       Ah       🎶`,
  `🎶       ha       🎶`,
  `🎶       ha       🎶`,
  `🎶       ha       🎶`,
  `🎶 stayin' alive! 🎶`,
  `🎶                🎶`,
  `🎶 stayin' alive! 🎶`,
  `🎶                🎶`,
  `🎶       Ah       🎶`,
  `🎶       ha       🎶`,
  `🎶       ha       🎶`,
  `🎶       ha       🎶`,
  `🎶 stayin' aliii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiiii- 🎶`,
  `🎶 -iiiiiiiiiive! 🎶`,
  `🎶                🎶`,
  `🎶                🎶`,
];

const getIndexCounter = (arr) => {
  let i = 0;
  return () => {
    if (i === arr.length) {
      i = 0;
    }
    return i++;
  }
}

const indexCounter = getIndexCounter(lyrics);

export const keepAlive = () => {
  setInterval(() => {
    console.log(lyrics[indexCounter()]);
  }, SA_BPM);
};
