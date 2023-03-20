interface TrickSortingSchemeEntry {
  name: string;
  id: number;
  sortFunc: (a: any, b: any) => number; // TODO!
  catName: string; // TODO ??
  attributeFunc: (a: any) => unknown; // TODO!
  showCategory: boolean;
  attributeLast?: true;
}

export const trickSortingSchemes: TrickSortingSchemeEntry[] = [
  {
    name: "Level Upwards",
    id: 0,
    sortFunc: (a, b) => a.difficultyLevel - b.difficultyLevel,
    catName: "Level",
    attributeFunc: (a) => a.difficultyLevel,
    showCategory: true,
  },
  {
    name: "Level Downwards",
    id: 1,
    sortFunc: (a, b) => b.difficultyLevel - a.difficultyLevel,
    catName: "Level",
    attributeFunc: (a) => a.difficultyLevel,
    showCategory: true,
  },
  {
    name: "StickFrequency Upwards",
    id: 2,
    sortFunc: (a, b) => {
      if (a.stickFrequency >= 0) return a.stickFrequency - b.stickFrequency;
      return 0.1;
    },
    catName: "StickFrequency",
    attributeFunc: (a) => a.stickFrequency,
    showCategory: false,
  },
  {
    name: "StickFrequency Downwards",
    id: 3,
    sortFunc: (a, b) => {
      if (a.stickFrequency >= 0) return b.stickFrequency - a.stickFrequency;
      return 1;
    },
    catName: "StickFrequency",
    attributeFunc: (a) => a.stickFrequency,
    showCategory: false,
  },
  {
    name: "Starting Position",
    id: 4,
    sortFunc: (a, b) => {
      return a.startPos.localeCompare(b.startPos);
    },
    catName: "Starting Position",
    attributeFunc: (a) => a.startPos,
    showCategory: true,
  },
  {
    name: "End Position",
    id: 5,
    sortFunc: (a, b) => {
      return a.endPos.localeCompare(b.endPos);
    },
    catName: "End Position",
    attributeFunc: (a) => a.endPos,
    showCategory: true,
  },
  {
    name: "Year Established",
    id: 6,
    sortFunc: (a, b) => {
      return b.yearEstablished - a.yearEstablished;
    },
    catName: "",
    attributeFunc: (a) => a.yearEstablished,
    showCategory: true,
  },
];

export const comboSortingSchemes: TrickSortingSchemeEntry[] = [
  {
    name: "Length Upwards",
    id: 0,
    sortFunc: (a, b) => a.numberOfTricks - b.numberOfTricks,
    catName: "Trick Combos",
    attributeFunc: (a) => a.numberOfTricks,
    showCategory: true,
  },
  {
    name: "Length Downwards",
    id: 1,
    sortFunc: (a, b) => b.numberOfTricks - a.numberOfTricks,
    catName: "Trick Combos",
    attributeFunc: (a) => a.numberOfTricks,
    showCategory: true,
  },
  {
    name: "StickFrequency Upwards",
    id: 2,
    sortFunc: (a, b) => {
      if (a.stickFrequency >= 0) return a.stickFrequency - b.stickFrequency;
      return 0.1;
    },
    catName: "StickFrequency",
    attributeFunc: (a) => a.stickFrequency,
    showCategory: false,
  },
  {
    name: "StickFrequency Downwards",
    id: 3,
    sortFunc: (a, b) => {
      if (a.stickFrequency >= 0) return b.stickFrequency - a.stickFrequency;
      return 1;
    },
    catName: "StickFrequency",
    attributeFunc: (a) => a.stickFrequency,
    showCategory: false,
  },
  {
    name: "Year Established",
    id: 4,
    sortFunc: (a, b) => {
      return b.yearEstablished - a.yearEstablished;
    },
    catName: "",
    attributeFunc: (a) => a.yearEstablished,
    showCategory: true,
  },
  {
    name: "Max Difficulty",
    id: 5,
    sortFunc: (a, b) => {
      return b.maxDiff - a.maxDiff;
    },
    catName: "max Difficulty:",
    attributeFunc: (a) => a.maxDiff,
    attributeLast: true,
    showCategory: true,
  },
];