/* =========================================================
   SAWAN ALBUM DESIGN — SCRIPT
   Product cards and category filtering.
   ========================================================= */

const CONFIG = {
  whatsappNumber: "917300500834",
  whatsappMessage: "Hi! I'd like to know more about Sawan Album Design.",
  instagramHandle: "sawanalbumdesigns",
  imagesFolder: "images/",
};

const CATEGORY_LABELS = [
  { key: "free", label: "Free" },
  { key: "cliparts", label: "Cliparts" },
  { key: "wedding-texts", label: "Texts" },
  { key: "wedding-psd", label: "Wedding PSD" },
  { key: "birthday-psd", label: "Birthday PSD" },
  { key: "pre-wedding-psd", label: "Pre-Wedding PSD" },
];

let activeProductFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  wireCategoryFilters();
  wireCategoryLinks();
  wireWhatsAppButtons();
  wireHamburgerMenu();
  wireHeaderScrollShadow();
  wireFaqAccordion();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

function getProductCategoryKey(product) {
  if (product.categoryKey) return product.categoryKey;

  // Backwards compatibility for older product entries.
  const category = (product.category || "").toLowerCase();
  if (category.includes("clipart")) return "cliparts";
  if (category.includes("text")) return "wedding-texts";
  if (category.includes("pre-wedding")) return "pre-wedding-psd";
  if (category.includes("birthday")) return "birthday-psd";
  if (category.includes("free")) return "free";
  if (category.includes("wedding")) return "wedding-psd";
  return "other";
}

function renderProducts() {
  const grid = document.getElementById("storeGrid");
  if (!grid) return;

  if (typeof PRODUCTS === "undefined" || !Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    grid.innerHTML = '<p class="store-empty">No products yet — add one in products.js.</p>';
    updateFilterStatus(0);
    return;
  }

  const filteredProducts = activeProductFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(product => getProductCategoryKey(product) === activeProductFilter);

  if (filteredProducts.length === 0) {
    const label = CATEGORY_LABELS.find(item => item.key === activeProductFilter)?.label || "this category";
    grid.innerHTML = `<div class="store-empty-state"><h3>No ${escapeHtml(label)} products yet</h3><p>Products in this category will appear here when you add them to products.js.</p></div>`;
    updateFilterStatus(0);
    return;
  }

  grid.innerHTML = filteredProducts.map((product, index) => {
    const categoryKey = getProductCategoryKey(product);
    const imageUrl = `${CONFIG.imagesFolder}${product.image || ""}`;
    const isFree = categoryKey === "free" || String(product.price).toLowerCase() === "free";
    const actionUrl = isFree ? (product.downloadUrl || "") : (product.buyUrl || "");
    const actionLabel = isFree ? "Download Free" : "Buy Now";
    const fallbackUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I am interested in " + (product.name || "this product") + ".")}`;
    const price = product.price || (isFree ? "Free" : "");
    const hasPreviews = Array.isArray(product.previewImages) && product.previewImages.length > 0;

    return `
      <article class="product-card">
        <button type="button" class="product-img product-preview-trigger" data-product-index="${PRODUCTS.indexOf(product)}" aria-label="View previews for ${escapeAttribute(product.name || "product")}" style="background-image:url('${escapeAttribute(imageUrl)}')">
          <span class="preview-image-hint">View previews ${hasPreviews ? `(${product.previewImages.length} images)` : ""}</span>
        </button>
        <div class="product-body">
          <span class="product-category">${escapeHtml(product.category || "Digital Product")}</span>
          <h3>${escapeHtml(product.name || "Untitled Product")}</h3>
          <p>${escapeHtml(product.description || "")}</p>
          <div class="product-footer">
            <span class="product-price">${escapeHtml(price)}</span>
            <button type="button" class="btn btn-outline product-preview-button" data-product-index="${PRODUCTS.indexOf(product)}">View previews</button>
          </div>
          <div class="product-footer product-card-buy-row">
            <a href="${escapeAttribute(actionUrl || fallbackUrl)}" class="btn btn-primary product-buy" target="_blank" rel="noopener">${actionLabel}</a>
          </div>
          ${isFree && !product.downloadUrl ? '<p class="product-note">Download link not added yet. Please contact us on WhatsApp.</p>' : ""}
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-product-index]").forEach(button => {
    button.addEventListener("click", () => openProductPreview(Number(button.dataset.productIndex)));
  });

  updateFilterStatus(filteredProducts.length);
}

function ensureProductPreviewModal() {
  let modal = document.getElementById("productPreviewModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "productPreviewModal";
  modal.className = "product-preview-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="product-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="previewModalTitle">
      <button type="button" class="preview-close" aria-label="Close previews">&times;</button>
      <div class="preview-modal-header">
        <span class="product-category" id="previewModalCategory">Digital Product</span>
        <h2 id="previewModalTitle">Product previews</h2>
        <p id="previewModalDescription"></p>
        <strong id="previewModalPrice" class="product-price"></strong>
      </div>
      <div id="previewModalGallery" class="preview-modal-gallery"></div>
      <div class="preview-modal-actions">
        <a id="previewModalBuy" class="btn btn-primary" href="#" target="_blank" rel="noopener">Buy Now</a>
        <p>Digital product delivery is arranged after payment confirmation.</p>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const close = () => closeProductPreview();
  modal.querySelector(".preview-close").addEventListener("click", close);
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeProductPreview();
  });
  return modal;
}

function openProductPreview(productIndex) {
  const product = PRODUCTS[productIndex];
  if (!product) return;

  const modal = ensureProductPreviewModal();
  const isFree = getProductCategoryKey(product) === "free" || String(product.price).toLowerCase() === "free";
  const buyUrl = isFree ? (product.downloadUrl || "") : (product.buyUrl || "");
  const fallbackUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I am interested in " + (product.name || "this product") + ".")}`;
  const previewImages = Array.isArray(product.previewImages) && product.previewImages.length
    ? product.previewImages
    : (product.image ? [product.image] : []);

  modal.querySelector("#previewModalCategory").textContent = product.category || "Digital Product";
  modal.querySelector("#previewModalTitle").textContent = product.name || "Product previews";
  modal.querySelector("#previewModalDescription").textContent = product.description || "";
  modal.querySelector("#previewModalPrice").textContent = product.price || (isFree ? "Free" : "");
  const buy = modal.querySelector("#previewModalBuy");
  buy.textContent = isFree ? "Download Free" : "Buy Now";
  buy.href = buyUrl || fallbackUrl;

  const gallery = modal.querySelector("#previewModalGallery");
  gallery.innerHTML = previewImages.length ? previewImages.map((filename, index) => {
    const src = `${CONFIG.imagesFolder}${filename}`;
    return `<button type="button" class="preview-tile" data-preview-src="${escapeAttribute(src)}" aria-label="Enlarge preview ${index + 1}">
      <img src="${escapeAttribute(src)}" alt="${escapeAttribute((product.name || "Product") + " preview " + (index + 1))}" loading="lazy">
      <span>Preview ${index + 1}</span>
    </button>`;
  }).join("") : '<p class="store-empty">Preview images will be added soon.</p>';

  gallery.querySelectorAll(".preview-tile").forEach(tile => {
    tile.addEventListener("click", () => openImageLightbox(tile.dataset.previewSrc, tile.querySelector("img")?.alt || "Product preview"));
  });

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("preview-modal-open");
}

function closeProductPreview() {
  const modal = document.getElementById("productPreviewModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("preview-modal-open");
}

function openImageLightbox(src, alt) {
  let lightbox = document.getElementById("previewImageLightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "previewImageLightbox";
    lightbox.className = "preview-image-lightbox";
    lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close enlarged image">&times;</button><img alt="">';
    document.body.appendChild(lightbox);
    lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.classList.remove("is-open"));
    lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.classList.remove("is-open"); });
  }
  const image = lightbox.querySelector("img");
  image.src = src;
  image.alt = alt;
  lightbox.classList.add("is-open");
}

function updateFilterStatus(count) {
  const status = document.getElementById("storeFilterStatus");
  if (!status) return;
  if (activeProductFilter === "all") {
    status.textContent = `Showing ${count} product${count === 1 ? "" : "s"}`;
    return;
  }
  const label = CATEGORY_LABELS.find(item => item.key === activeProductFilter)?.label || "category";
  status.textContent = `Showing ${count} product${count === 1 ? "" : "s"} in ${label}`;
}

function setProductFilter(filterKey) {
  activeProductFilter = filterKey || "all";
  document.querySelectorAll("[data-filter]").forEach(button => {
    const isActive = button.dataset.filter === activeProductFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

function wireCategoryFilters() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => setProductFilter(button.dataset.filter));
  });
}

function wireCategoryLinks() {
  document.querySelectorAll("[data-category-link]").forEach(link => {
    link.addEventListener("click", () => setProductFilter(link.dataset.categoryLink));
  });
}

function wireWhatsAppButtons() {
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  document.querySelectorAll("[data-whatsapp-btn]").forEach(btn => btn.setAttribute("href", url));
}

function wireHamburgerMenu() {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.classList.toggle("is-open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

function wireHeaderScrollShadow() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function wireFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach(question => {
    const answer = question.nextElementSibling;
    if (!answer) return;
    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-question").forEach(q => {
        q.setAttribute("aria-expanded", "false");
        if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
