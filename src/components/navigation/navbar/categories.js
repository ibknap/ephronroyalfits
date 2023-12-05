const categories = [
  { id: "hoodies", parentId: "hoodies", name: "Hoodies", sub: [] },
  { id: "polos", parentId: "polos", name: "Polos", sub: [] },
  { id: "tees", parentId: "tees", name: "Tees", sub: [] },
  { id: "sweatshirts", parentId: "sweatshirts", name: "Sweatshirts", sub: [] },
  {
    id: "accessories",
    parentId: "accessories",
    name: "Accessories",
    sub: [
      {
        id: "sunglasses",
        parentId: "accessories",
        name: "Sunglasses",
        sub: [],
      },
      { id: "hairclips", parentId: "accessories", name: "Hair Clips", sub: [] },
    ],
  },
  {
    id: "gems",
    parentId: "gems",
    name: "Gems",
    sub: [
      { id: "bracelets", parentId: "gems", name: "Bracelets", sub: [] },
      { id: "rings", parentId: "gems", name: "Rings", sub: [] },
    ],
  },
  {
    id: "essentials",
    parentId: "essentials",
    name: "Essentials",
    sub: [
      { id: "journals", parentId: "essentials", name: "Journals", sub: [] },
      {
        id: "materials",
        parentId: "essentials",
        name: "Writing Materials",
        sub: [],
      },
      { id: "tumblers", parentId: "essentials", name: "Tumblers", sub: [] },
    ],
  },
];

export default categories;
