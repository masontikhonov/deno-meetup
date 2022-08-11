import { rgb24 } from 'https://deno.land/std@0.151.0/fmt/colors.ts';

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

const colors: Parameters<typeof rgb24>[1][] = [
  { r: 255, g: 0, b: 24 },
  { r: 255, g: 165, b: 44 },
  { r: 255, g: 255, b: 65 },
  { r: 0, g: 128, b: 24 },
  { r: 0, g: 0, b: 249 },
  { r: 134, g: 0, b: 125 },
];

const getIndexCounter = (arr: unknown[]) => {
  let i = 0;
  return () => {
    if (i === arr.length) {
      i = 0;
    }
    return i++;
  };
};

const lyricsIndex = getIndexCounter(lyrics);
const colorsIndex = getIndexCounter(colors);

export const keepAlive = () => {
  setInterval(() => {
    console.log(rgb24(lyrics[lyricsIndex()], colors[colorsIndex()]));
  }, SA_BPM);
};
