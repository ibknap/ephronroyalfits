const categories = [
  {
    id: "clothing",
    parentId: "clothing",
    name: "Clothing",
    sub: [
      {
        id: "hoodies",
        parentId: "clothing",
        image: "/images/hoodies.png",
        name: "Hoodies",
        sub: [],
      },
      {
        id: "polos",
        parentId: "clothing",
        image: "/images/polo.png",
        name: "Polos",
        sub: [],
      },
      {
        id: "tees",
        parentId: "clothing",
        image: "/images/tee.png",
        name: "Tees",
        sub: [],
      },
      {
        id: "sweatshirts",
        parentId: "clothing",
        image: "/images/sweatshirts.png",
        name: "Sweatshirts",
        sub: [],
      },
    ],
  },
  { id: "shoes", parentId: "shoes", name: "Shoes", sub: [] },
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
