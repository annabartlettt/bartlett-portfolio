import { SB } from "@/content/storybridge-tokens";

/**
 * The one set of StoryBridge content every built screen on the page draws
 * from, so the cover, the role screens, the rule screens and the component
 * explorer never disagree about a title, a grade or a colour.
 */
export const FEATURED = {
  title: "The Youngest Teacher",
  byline: ["Anna Bartlett", "Family", "United States"],
};

export const LIBRARY = [
  { title: "The Rematch", grade: "Grade 5–6", tag: "Sports", c: SB.blue },
  { title: "My Dad's Old Car", grade: "Grade 5–6", tag: "Family", c: SB.blue },
  { title: "The Group Chat", grade: "Grade 7–8", tag: "Friendship", c: SB.coral },
  { title: "Saturday Morning Pancakes", grade: "Grade 3–4", tag: "Family", c: SB.yellow },
  { title: "The Book I Didn't Want to Read", grade: "Grade 5–6", tag: "School", c: SB.coral },
  { title: "Third Quarter", grade: "Grade 7–8", tag: "Sports", c: SB.mint },
];

export const AUTHOR_STATS = [
  { n: "7", label: "Published stories", short: "Published", note: "+2 this month" },
  { n: "136", label: "Total reads", short: "Reads", note: "across all your stories" },
  { n: "2", label: "Active drafts", short: "Drafts", note: "started this week" },
];

export const AUTHOR_STORIES = [
  { title: "The Youngest Teacher", meta: "Apr 23, 2026 · 41 reads", tags: ["Family"] },
  { title: "The Rematch", meta: "Apr 12, 2026 · 33 reads", tags: ["Sports", "Friendship"] },
];

export const LEVELS = ["3rd–4th", "5th–6th", "7th–8th"];

/** The moderation queue: titles from the library, one held for a person. */
export const QUEUE = [
  { title: "Third Quarter", verdict: "AI: CLEAR", flagged: false },
  { title: "The Group Chat", verdict: "AI: FLAGGED · review", flagged: true },
  { title: "The Book I Didn't Want to Read", verdict: "AI: CLEAR", flagged: false },
];

/** The story open in the reader view, as written in the prototype. */
export const OPEN_STORY = {
  title: "The Rematch",
  author: "Jordan T.",
  meta: "Apr 12, 2026 · 33 readers",
  grade: "Grade 5–6",
  tags: ["Sports", "Friendship"],
  paragraphs: [
    "My little sister beat me in a game of one-on-one last summer, and I have not stopped thinking about it since.",
    "She's twelve. I'm sixteen. She's five-foot-two and I'm five-foot-nine. None of this should have happened.",
    "What happened was that I underestimated her. I've been playing basketball since I was seven, and somewhere along the way I decided that meant I no longer had to pay attention.",
  ],
};
