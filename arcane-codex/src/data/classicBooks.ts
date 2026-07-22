import type { PageContentData } from './spells'

export interface BookMetadata {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  description: string;
  pages: PageContentData[];
}

// Automatic Pagination Helper for Custom Uploaded Text
export function paginateRawText(
  rawText: string, 
  title: string = "Custom Book", 
  author: string = "Anonymous"
): PageContentData[] {
  const paragraphs = rawText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (paragraphs.length === 0) {
    paragraphs.push("No text content found in uploaded book.");
  }

  const pages: PageContentData[] = [];
  let pIdx = 0;

  // Title Page (Page 0)
  pages.push({
    pageIndex: 0,
    chapterTitle: `${title} — Preface`,
    leftTitle: title.toUpperCase(),
    leftSubtitle: `By ${author}`,
    leftFullText: [
      `Welcome to the digital 3D edition of ${title}.`,
      "This work has been reformatted and bound for reading within the 3D Arcane Grimoire.",
      "Use the page controls or keyboard arrow keys to turn pages."
    ],
    leftRuneSymbol: "📖 ᛒ ᛟ ᛟ",
    rightTitle: "PREFACE & CONTENTS",
    rightSubtitle: "Author's Note",
    rightFullText: [
      `"A room without books is like a body without a soul." — Marcus Tullius Cicero`,
      "Enjoy reading this volume in immersive 3D space."
    ],
    rightRuneSymbol: "📜 ᚱ ᛖ ᚨ"
  });

  // Group paragraphs into pages (approx 2 paragraphs per page)
  let i = 0;
  while (i < paragraphs.length) {
    pIdx++;
    const leftParas = paragraphs.slice(i, i + 2);
    i += 2;
    const rightParas = paragraphs.slice(i, i + 2);
    i += 2;

    pages.push({
      pageIndex: pIdx,
      chapterTitle: `${title} — Chapter ${pIdx}`,
      leftTitle: title.toUpperCase(),
      leftSubtitle: `Chapter ${pIdx} (Part A)`,
      leftFullText: leftParas.length > 0 ? leftParas : ["..."],
      leftRuneSymbol: "ᚦ ᚫ ᚱ ᚲ",
      
      rightTitle: title.toUpperCase(),
      rightSubtitle: `Chapter ${pIdx} (Part B)`,
      rightFullText: rightParas.length > 0 ? rightParas : ["End of chapter."],
      rightRuneSymbol: "ᛗ ᚨ ᚷ ᛁ"
    });
  }

  return pages;
}

export const CLASSIC_BOOKS: BookMetadata[] = [
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverColor: 'leather',
    description: 'The classic gothic masterpiece of Victor Frankenstein and his tragic creature.',
    pages: paginateRawText(`
Chapter 1

I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had filled several public situations with credit and honour. He was respected by all who knew him for his integrity and indefatigable attention to public business.

He passed his younger days perpetually occupied by the affairs of his country; several circumstances had prevented his marrying until the decline of life, when he became the husband of the mother of his children.

Chapter 2

We were brought up together; there was not quite a year difference in our ages. I need not say that we were strangers to any species of disunion or dispute. Harmony was the soul of our companionship, and the diversity and contrast that subsisted in our characters drew us nearer together.

Elizabeth was of a calmer and more concentrated disposition; but, with all my ardour, I was capable of a more intense application and was more deeply smitten with the thirst for knowledge. She busied herself with following the aerial creations of the poets; and in the majestic and wondrous scenes which surrounded our Swiss home.

Chapter 3

When I attained the age of seventeen my parents resolved that I should become a student at the university of Ingolstadt. Until then I had attended the schools of Geneva, but my father thought it necessary for the completion of my education that I should be made acquainted with other customs than those of my native country.

My departure was now fixed for an early day, but before the day resolved upon could arrive, the first misfortune of my life occurred—an omen, as it were, of my future misery.
    `, 'Frankenstein', 'Mary Shelley')
  },
  {
    id: 'sherlock',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    coverColor: 'obsidian',
    description: 'A Scandal in Bohemia and the sharp mysteries of 221B Baker Street.',
    pages: paginateRawText(`
To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler.

All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen.

One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient (for I had now returned to civil practice), when my way led me through Baker Street.

As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers.
    `, 'Sherlock Holmes', 'Arthur Conan Doyle')
  },
  {
    id: 'dracula',
    title: 'Dracula',
    author: 'Bram Stoker',
    coverColor: 'dragonskin',
    description: 'The terrifying vampire tale of Count Dracula and Castle Transylvania.',
    pages: paginateRawText(`
3 May. Bistritz.—Left Munich at 8:35 P. M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda-Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could walk through the streets.

The impression I had was that we were leaving the West and entering the East; the most western of splendid bridges over the Danube, which is here of noble width and depth, took us among the traditions of Turkish rule.

We left in good time, and came after nightfall to Klausenburgh. Here I stopped for the night at the Hotel Royale. I had for dinner, or rather supper, a chicken done up some way with red pepper, which was very good but thirsty.

The count had directed me to go to the Golden Krone Hotel, which I found, to my great delight, to be thoroughly old-fashioned, for of course I wanted to see all I could of the ways of the country.
    `, 'Dracula', 'Bram Stoker')
  },
  {
    id: 'alice',
    title: 'Alice in Wonderland',
    author: 'Lewis Carroll',
    coverColor: 'gold',
    description: 'Down the rabbit hole into a whimsical realm of Mad Hatters and Cheshire Cats.',
    pages: paginateRawText(`
Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!"

In another moment down went Alice after it, never once considering how in the world she was to get out again.
    `, 'Alice in Wonderland', 'Lewis Carroll')
  }
];
