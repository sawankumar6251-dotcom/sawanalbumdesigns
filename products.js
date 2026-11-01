/* =========================================================
   SAWAN ALBUM DESIGN â€” PRODUCTS FILE
   =========================================================

   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD, REMOVE OR
   CHANGE A PRODUCT. You never need to open index.html for
   this â€” the website reads this file and builds the product
   grid automatically.

   ---------------------------------------------------------
   HOW TO ADD A NEW PRODUCT (step by step for beginners)
   ---------------------------------------------------------

   1. Scroll down to the PRODUCTS list below.

   2. Copy one whole product block â€” everything from the
      opening "{" to the closing "}," â€” and paste it just
      above the closing "];" line at the bottom of the list.

   3. In your copied block, change these details:
        a) name, category, categoryKey, price, image, description, buyUrl
        b) previewImages -> an array of ALL preview image filenames
           Example: previewImages: ["royal-01.jpg", "royal-02.jpg", "royal-03.jpg"]
           The first "image" is the product card cover. "previewImages" are
           shown when a visitor clicks View previews. If previewImages is
           omitted, the gallery falls back to the cover image only.
        c) For free products, use downloadUrl instead of buyUrl.

   4. Upload the cover and preview JPG/WebP files into the "images" folder.
      Never upload original paid PSD/ZIP files into the public images folder.

   5. Save products.js and refresh the website. The product card and preview
      gallery are generated automatically. You do not need to edit index.html,
      script.js or style.css when adding more products.

   Example product block:
   {
     name: "50 Wedding Album PSD Bundle",
     category: "Wedding Album PSD",
     categoryKey: "wedding-psd",
     price: "999",
     image: "bundle-cover.jpg",
     previewImages: ["bundle-01.jpg", "bundle-02.jpg", "bundle-03.jpg"],
     description: "50 editable wedding album PSD designs.",
     buyUrl: "YOUR_PAYMENT_OR_CONTACT_URL",
   },

   NOTE: the product preview gallery is public. Add only preview images,
   ideally with a watermark. Keep original PSD files in private storage.

   ---------------------------------------------------------
   HOW TO REMOVE A PRODUCT
   ---------------------------------------------------------
   Delete that product's whole block (from "{" to the "},"
   after it). Delete its image from the "images" folder too,
   if you like (not required, just keeps things tidy).

   ---------------------------------------------------------
   A FEW RULES THAT KEEP THIS FILE WORKING
   ---------------------------------------------------------
   - Every block needs a comma "," after its closing "}" â€”
     except the very last block in the list, which can have
     one too (that's fine, don't worry about it).
   - Always keep the text inside quotes "like this".
   - Don't delete the "const PRODUCTS = [" line at the top or
     the "];" line at the bottom â€” everything else goes
     between them.

   ========================================================= */

/*
  categoryKey values: "free", "cliparts", "wedding-texts",
  "wedding-psd", "birthday-psd", "pre-wedding-psd" "haldi".

  For a free product, add categoryKey: "free", price: "Free",
  and downloadUrl: "https://your-real-download-link".
*/

const PRODUCTS = [

  {
    name: "Haldi Album PSD 10",
    category: "Haldi",
    categoryKey: "haldi",
    price: "50",
    image: "product-01.jpg",
    previewImages: [
      "haldi-preview (1).jpg",
      "haldi-preview (2).jpg",
      "haldi-preview (3).jpg",
      "haldi-preview (4).jpg",
      "haldi-preview (5).jpg",
      "haldi-preview (6).jpg",
      "haldi-preview (7).jpg",
      "haldi-preview (8).jpg",
      "haldi-preview (9).jpg",
      "haldi-preview (10).jpg"
    ],
    description: "Fully Editable Haldi Designs psds.",
    buyUrl: "https://sawanalbumdesigns.myinstamojo.com/product/haldi-album-psd-10/.",
  },

  {
    name: "10 DMs PSD",
    category: "Wedding Album PSD",
    categoryKey: "wedding-psd",
    price: "59",
    image: "product-02.jpg",
    previewImages: [
      "DM-Preview (1).jpg",
      "DM-Preview (2).jpg",
      "DM-Preview (3).jpg",
      "DM-Preview (4).jpg",
      "DM-Preview (5).jpg",
      "DM-Preview (6).jpg",
      "DM-Preview (7).jpg",
      "DM-Preview (8).jpg",
      "DM-Preview (9).jpg",
      "DM-Preview (10).jpg"
    ],
    description: "Clean, high-end spreads with generous whitespace and gold accents.Best for Wedding Album,s Couple Sheet.",
    buyUrl: "https://sawanalbumdesigns.myinstamojo.com/product/10-dms-psd/",
  },


  {
    name: "Wedding Text Collection",
    category: "Wedding Text PNG",
    categoryKey: "wedding-texts",
    price: "20",
    image: "product-05.jpg",
    previewImages: [
      "texts-preview (1).jpg",
      "texts-preview (2).jpg",
      "texts-preview (3).jpg",
      "texts-preview (4).jpg",
      "texts-preview (5).jpg",
],
    description: "20 elegant typography layouts for names, dates and vows.",
    buyUrl: "https://sawanalbumdesigns.myinstamojo.com/product/wedding-text-collection/",
  },

  {
    name: "Wedding Clipart Collection",
    category: "Wedding Clipart",
    categoryKey: "cliparts",
    price: "20",
    image: "product-06.jpg",
    previewImages: [
      "clipart-preview (1).jpg",
      "clipart-preview (2).jpg",
      "clipart-preview (3).jpg",
      "clipart-preview (4).jpg",
      "clipart-preview (5).jpg",
    ],
    description: "Floral, foil and ornamental elements for any album design.",
    buyUrl: "https://sawanalbumdesigns.myinstamojo.com/product/wedding-clipart-collection/.",
  },


{
    name: "5 Fonts",
    category: "Free",
    categoryKey: "free",
    price: "free",
    image: "free-01.jpg",
    description: "Premium Fonts for wedding album and other things.",
    downloadUrl: "https://drive.google.com/file/d/1XQ1XBekMHNyha4uzfC_ZHKk4xbhHKn_2/view?usp=drive_link",
},

{
    name: "5 Wedding Psd",
    category: "Free",
    categoryKey: "free",
    price: "free",
    image: "free-02.jpg",
    description: "Premium Album Layout for wedding album.",
    downloadUrl: "https://drive.google.com/file/d/1NTsbbeXnGi7qkgirHaT2g_Xx0f-PgTCH/view?usp=drive_link",
},

];