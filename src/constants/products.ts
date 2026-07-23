// ==============================
// Image Imports - Spices
// ==============================

import jeera from "@/assets/products/spices/jeera.png";
import ajwain from "@/assets/products/spices/ajwain.png";
import corianderSeeds from "@/assets/products/spices/coriander-seeds.png";
import saunf from "@/assets/products/spices/saunf.png";
import methi from "@/assets/products/spices/methi.png";
import mustardSeeds from "@/assets/products/spices/mustard-seeds.png";
import kalaJeera from "@/assets/products/spices/kala-jeera.png";
import suva from "@/assets/products/spices/suva.png";


export const PRODUCT_CATEGORIES = [
  "All",
  "Spices",
  "Seeds",
  "Pulses",
  "Oil Seeds",
  "Grains",
] as const;

export type ProductCategory = Exclude<
  (typeof PRODUCT_CATEGORIES)[number],
  "All"
>;

/**
 * Category information used throughout the UI.
 * The `icon` field is a key, NOT a React component.
 * The UI will map this key to a Lucide icon.
 */
export const PRODUCT_CATEGORY_INFO = {
  Spices: {
    icon: "spices",
    title: "Spices",
    description: "Premium quality spices sourced from trusted farmers across India.",
  },

  Seeds: {
    icon: "seeds",
    title: "Seeds",
    description: "High-quality agricultural and specialty seeds for wholesale supply.",
  },

  Pulses: {
    icon: "pulses",
    title: "Pulses",
    description: "Nutritious pulses and dals carefully selected for consistent quality.",
  },

  "Oil Seeds": {
    icon: "oil-seeds",
    title: "Oil Seeds",
    description: "Premium oil seeds suitable for food and industrial applications.",
  },

  Grains: {
    icon: "grains",
    title: "Grains",
    description: "Quality food grains sourced from trusted farming regions.",
  },
} as const;

export interface Product {
  id: string;
  name: string;

  category: ProductCategory;

  image: string;
  alt: string;

  description: string;

  featured: boolean;

  available?: boolean;

  origin?: string;

  tags?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "jeera",
    name: "Jeera (Cumin)",
    category: "Spices",
    image: jeera,
    alt: "Premium quality whole cumin seeds (Jeera)",
    description:
      "Premium whole cumin seeds known for their rich aroma, earthy flavor, and consistent quality. Ideal for culinary and commercial applications.",
    featured: true,
    available: true,
    origin: "India",
    tags: [
      "jeera",
      "cumin",
      "jira",
      "whole cumin",
      "spices",
      "indian spices",
    ],
  },

  {
    id: "ajwain",
    name: "Ajwain",
    category: "Spices",
    image: ajwain,
    alt: "Premium quality Ajwain seeds",
    description:
      "Carefully selected ajwain seeds offering a distinctive aroma and strong flavor. Widely used in food processing and traditional cooking.",
    featured: true,
    available: true,
    origin: "India",
    tags: [
      "ajwain",
      "carom seeds",
      "bishop's weed",
      "spices",
    ],
  },

  {
    id: "coriander-seeds",
    name: "Coriander Seeds",
    category: "Spices",
    image: corianderSeeds,
    alt: "Premium quality coriander seeds",
    description:
      "Naturally dried coriander seeds with excellent aroma and freshness. Suitable for spice blends, seasoning, and wholesale supply.",
    featured: true,
    available: true,
    origin: "India",
    tags: [
      "coriander",
      "coriander seeds",
      "dhania",
      "spices",
    ],
  },

  {
    id: "saunf",
    name: "Saunf (Fennel Seeds)",
    category: "Spices",
    image: saunf,
    alt: "Premium quality fennel seeds (Saunf)",
    description:
      "Premium fennel seeds valued for their sweet aroma, freshness, and superior quality for food and beverage applications.",
    featured: true,
    available: true,
    origin: "India",
    tags: [
      "saunf",
      "fennel",
      "fennel seeds",
      "spices",
    ],
  },

  {
    id: "methi",
    name: "Fenugreek (Methi)",
    category: "Spices",
    image: methi,
    alt: "Premium quality fenugreek seeds (Methi)",
    description:
      "High-quality fenugreek seeds sourced from trusted farmers, known for their natural bitterness and rich nutritional value.",
    featured: true,
    available: true,
    origin: "India",
    tags: [
      "methi",
      "fenugreek",
      "fenugreek seeds",
      "spices",
    ],
  },

  {
    id: "mustard-seeds",
    name: "Mustard Seeds",
    category: "Spices",
    image: mustardSeeds,
    alt: "Premium quality mustard seeds",
    description:
      "Clean and carefully processed mustard seeds suitable for cooking, seasoning, oil extraction, and industrial use.",
    featured: false,
    available: true,
    origin: "India",
    tags: [
      "mustard",
      "rai",
      "mustard seeds",
      "spices",
    ],
  },

  {
    id: "kala-jeera",
    name: "Kala Jeera (Black Cumin)",
    category: "Spices",
    image: kalaJeera,
    alt: "Premium quality black cumin (Kala Jeera)",
    description:
      "Premium black cumin seeds with an intense aroma and distinctive flavor, widely used in premium spice blends and culinary applications.",
    featured: false,
    available: true,
    origin: "India",
    tags: [
      "kala jeera",
      "black cumin",
      "black jeera",
      "spices",
    ],
  },

  {
    id: "suva",
    name: "Suva (Dill Seeds)",
    category: "Spices",
    image: suva,
    alt: "Premium quality dill seeds (Suva)",
    description:
      "Carefully selected dill seeds offering a fresh aroma and authentic flavor for seasoning, spice blends, and food manufacturing.",
    featured: false,
    available: true,
    origin: "India",
    tags: [
      "suva",
      "dill",
      "dill seeds",
      "spices",
    ],
  },
];