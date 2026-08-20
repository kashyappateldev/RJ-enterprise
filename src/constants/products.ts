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

// ==============================
// Product Categories
// ==============================

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

// ==============================
// Product Category Information
// ==============================

/**
 * Category information used throughout the UI.
 *
 * The `icon` field is a key, NOT a React component.
 * The UI maps this key to the appropriate Lucide icon.
 */
export const PRODUCT_CATEGORY_INFO = {
  Spices: {
    icon: "spices",
    title: "Spices",
    description:
      "Premium quality spices sourced from trusted farmers across India.",
  },

  Seeds: {
    icon: "seeds",
    title: "Seeds",
    description:
      "High-quality agricultural and specialty seeds for wholesale supply.",
  },

  Pulses: {
    icon: "pulses",
    title: "Pulses",
    description:
      "Nutritious pulses and dals carefully selected for consistent quality.",
  },

  "Oil Seeds": {
    icon: "oil-seeds",
    title: "Oil Seeds",
    description:
      "Premium oil seeds suitable for food and industrial applications.",
  },

  Grains: {
    icon: "grains",
    title: "Grains",
    description:
      "Quality food grains sourced from trusted farming regions.",
  },
} as const;

// ==============================
// Product Types
// ==============================

/**
 * Flexible specification object.
 *
 * Different agricultural products can have different specifications.
 * For example:
 *
 * Jeera → Botanical Name, Purity, Moisture
 * Coriander → Types, Form, Purity
 * Kala Jeera → Oil Contents
 * Ajwain → Cleaning
 *
 * We therefore don't hardcode specification keys.
 */
export type ProductSpecifications = Record<string, string>;

/**
 * Product names in different languages.
 *
 * More languages can be added later without changing the
 * Product interface.
 *
 * Example:
 *
 * languages: {
 *   Hindi: "जीरा",
 *   Gujarati: "જીરું",
 * }
 */
export type ProductLanguages = Record<string, string>;

// ==============================
// Product Interface
// ==============================

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

  /**
   * Detailed product specifications.
   * Optional because some products may not have
   * detailed specification information yet.
   */
  specifications?: ProductSpecifications;

  /**
   * Product names in different languages.
   * Optional because language information may not
   * be available for every product yet.
   */
  languages?: ProductLanguages;
}

// ==============================
// Products
// ==============================

export const PRODUCTS: Product[] = [
  // ============================================================
  // 1. JEERA
  // ============================================================

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

    specifications: {
      "Botanical Name": "Cuminum cyminum",
      "Common Names": "Jeera, Brown Seeds",
      Purity: "99.5%, 99%, 98%",
      Moisture: "Max. 9%",
      "Non GMO": "Yes",
      Origin: "India",
    },

    languages: {
      Hindi: "जीरा",
      Gujarati: "જીરું",
    },
  },

  // ============================================================
  // 2. AJWAIN
  // ============================================================

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

    specifications: {
      "Botanical Name": "Trachy spermum Ammi",
      "Common Names":
        "Carom Seeds, Ajowan Seeds, Bishop Seeds, Celery Seeds",
      Purity: "99%, 99.5%",
      Moisture: "Max. 10%",
      Cleaning: "Machine Clean / Sortex Clean",
      "Non GMO": "Yes",
      Origin: "India",
    },

    languages: {
      Hindi: "अजवाइन (Ajwain)",
      Gujarati: "અજમો",
    },
  },

  // ============================================================
  // 3. CORIANDER SEEDS
  // ============================================================

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

    specifications: {
      "Botanical Name": "Coriandrum sativum",
      "Common Names": "Dhaniya",
      Purity: "99%, 99.50%",
      Types: "Eagle, Scooter, Single & Double Parrot",
      Form: "Whole Seeds, Splits, Powder",
      Moisture: "Max. 10%",
      "Non GMO": "Yes",
      Origin: "India",
    },

    languages: {
      Hindi: "धनिया",
      Gujarati: "ધાણાના બીજ",
    },
  },

  // ============================================================
  // 4. SAUNF / FENNEL
  // ============================================================

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

    specifications: {
      "Botanical Name": "Foeniculum Vulgare Mill",
      "Common Names": "Saunf",
      Purity: "98%, 99%, 99.50%",
      Types: "Singapore Quality & Europe Quality",
      Forms: "Fennel Seeds, Whole & Powder",
      "Non GMO": "Yes",
      Origin: "India",
    },

    languages: {
      Hindi: "सौंफ",
      Gujarati: "વરિયાળી",
    },
  },

  // ============================================================
  // 5. FENUGREEK / METHI
  // ============================================================

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

    specifications: {
      "Botanical Name": "Trigonella foenum-graecum",
      "Common Names": "Methi Dana",
      Purity: "99%, 99.50%, 99.90%",
      Moisture: "Max. 7%",
      "Non GMO": "Yes",
      Origin: "India",
    },

    languages: {
      Hindi: "मेथी",
      Gujarati: "મેથી",
    },
  },

  // ============================================================
  // 6. MUSTARD SEEDS
  // ============================================================

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

    // Detailed specifications will be added when
    // verified information is available.
  },

  // ============================================================
  // 7. KALA JEERA / BLACK CUMIN
  // ============================================================

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
    "black cumin seed",
    "black seeds",
    "nigella seeds",
    "kalonji",
    "spices",
  ],

  specifications: {
    "Common Names":
      "Black Cumin Seed, Black Seeds, Nigella Seeds, Kalonji",

    "Purity":
      "99%, 99.50%, 99.90%",

    "Moisture":
      "Max. 7%",

    "Oil Contents":
      "36%",

    "Non GMO":
      "Yes",

    "Origin":
      "India",
  },

  languages: {
    Gujarati: "કાળું જીરું",
    Hindi: "काला जीरा",
  },
},

  // ============================================================
  // 8. SUVA / DILL SEEDS
  // ============================================================

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
      "dill seed",
      "garden dill",
      "sowa",
      "spices",
    ],

    specifications: {
      "Common Names":
        "Dill, Dill Seed, Garden Dill, Sowa",

      "Purity":
        "99%, 99.50%, 99.90%",

      "Moisture":
        "Max. 10%",

      "Cleaning":
        "Machine Clean / Sortex Clean",

      "Non GMO":
        "Yes",

      "Origin":
        "India",
    },

    languages: {
      Gujarati: "સુવાદાણા બીજ",
      Hindi: "सोया",
    },
  },
];