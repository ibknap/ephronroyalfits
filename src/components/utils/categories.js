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
        image: "/images/glasses.png",
        name: "Sunglasses",
        sub: [],
      },
      {
        id: "hairclips",
        parentId: "accessories",
        image: "/images/hairclips.png",
        name: "Hair Clips",
        sub: [],
      },
    ],
  },
  {
    id: "gems",
    parentId: "gems",
    name: "Gems",
    sub: [
      {
        id: "bracelets",
        parentId: "gems",
        image: "/images/bracelets.png",
        name: "Bracelets",
        sub: [],
      },
      {
        id: "rings",
        parentId: "gems",
        image: "/images/rings.png",
        name: "Rings",
        sub: [],
      },
      {
        id: "earrings",
        parentId: "gems",
        image: "/images/earrings.png",
        name: "Earrings",
        sub: [],
      },
      {
        id: "necklaces",
        parentId: "gems",
        image: "/images/necklaces.png",
        name: "Necklaces",
        sub: [],
      },
    ],
  },
  {
    id: "essentials",
    parentId: "essentials",
    name: "Essentials",
    sub: [
      {
        id: "journals",
        parentId: "essentials",
        image: "/images/journals.png",
        name: "Journals",
        sub: [],
      },
      {
        id: "writingmaterials",
        parentId: "essentials",
        image: "/images/writingmaterials.png",
        name: "Writing Materials",
        sub: [],
      },
      {
        id: "bags",
        parentId: "essentials",
        image: "/images/bags.png",
        name: "Bags",
        sub: [],
      },
    ],
  },
];

export default categories;
