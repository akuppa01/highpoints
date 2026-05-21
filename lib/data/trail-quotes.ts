export interface TrailQuote {
  text: string;
  author: string;
  sourceLabel: string;
  sourceUrl: string;
}

const TRAIL_QUOTES: TrailQuote[] = [
  {
    text: "It is not the mountain we conquer, but ourselves.",
    author: "Edmund Hillary",
    sourceLabel: "Wikiquote — Edmund Hillary",
    sourceUrl: "https://en.wikiquote.org/wiki/Edmund_Hillary",
  },
  {
    text: "Climb the mountains and get their good tidings.",
    author: "John Muir",
    sourceLabel: "Wikiquote — John Muir",
    sourceUrl: "https://en.wikiquote.org/wiki/John_Muir",
  },
  {
    text: "How glorious a greeting the sun gives the mountains!",
    author: "John Muir",
    sourceLabel: "Wikiquote — John Muir",
    sourceUrl: "https://en.wikiquote.org/wiki/John_Muir",
  },
  {
    text: "The clearest way into the Universe is through a forest wilderness.",
    author: "John Muir",
    sourceLabel: "Wikiquote — John Muir",
    sourceUrl: "https://en.wikiquote.org/wiki/John_Muir",
  },
  {
    text: "The woods are lovely, dark and deep.",
    author: "Robert Frost",
    sourceLabel: "Wikiquote — Robert Frost",
    sourceUrl: "https://en.wikiquote.org/wiki/Robert_Frost",
  },
];

function getSeedValue(seed?: string | number) {
  if (typeof seed === "number") return seed;
  if (!seed) return 0;

  return [...seed].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
}

export function getTrailQuote(seed?: string | number) {
  const value = Math.abs(getSeedValue(seed));
  return TRAIL_QUOTES[value % TRAIL_QUOTES.length];
}

export function getDailyTrailQuote() {
  return getTrailQuote(new Date().toISOString().slice(0, 10));
}
