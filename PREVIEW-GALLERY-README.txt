SAWAN ALBUM DESIGN — PRODUCT PREVIEW GALLERY UPDATE

Replace these 3 files in your GitHub repository:
1. script.js
2. style.css
3. products.js

Do not replace index.html. It already loads products.js, script.js, and style.css.

HOW IT WORKS
- Every product card has a "View previews" option.
- Clicking it opens a gallery with the product's previewImages.
- Clicking a preview opens a larger image.
- Buy Now stays connected to that product's buyUrl (or WhatsApp fallback).
- Existing products without previewImages show their cover image as the only preview.

HOW TO ADD A PRODUCT LATER
In products.js, add a product object with:
{
  name: "My New PSD Bundle",
  category: "Wedding Album PSD",
  categoryKey: "wedding-psd",
  price: "₹499",
  image: "new-bundle-cover.jpg",
  previewImages: ["new-bundle-01.jpg", "new-bundle-02.jpg", "new-bundle-03.jpg"],
  description: "Short product description.",
  buyUrl: "YOUR_REAL_BUY_OR_CONTACT_URL"
},

Upload all image files into the existing images/ folder. Filenames must match exactly.
The image property is the product card cover. previewImages lists every image shown in the gallery.
If previewImages is omitted, only the cover image appears.

IMPORTANT
Only upload preview JPG/WebP images to the public images folder. Do not upload paid original PSD files or ZIP bundles to GitHub/public hosting.
The Buy Now URL must be updated to your real payment/contact destination. This update does not automatically verify UPI payments or automatically deliver products.
