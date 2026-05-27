const products = [
  { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/600x600?text=iPhone+16", rating: 4.5, inStock: true },
  { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/600x600?text=Samsung+S24", rating: 4.4, inStock: true },
  { id: 3, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/600x600?text=Pixel+9", rating: 4.6, inStock: true },
  { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/600x600?text=MacBook+Pro", rating: 4.8, inStock: true },
  { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/600x600?text=Dell+XPS+15", rating: 4.7, inStock: true },
  { id: 6, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/600x600?text=ThinkPad+X1", rating: 4.5, inStock: false },
  { id: 7, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/600x600?text=iPad+Air", rating: 4.6, inStock: true },
  { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/600x600?text=Xiaomi+Pad+6", rating: 4.2, inStock: true },
  { id: 9, name: "Galaxy Tab S9", price: 20990000, category: "tablet", image: "https://placehold.co/600x600?text=Galaxy+Tab+S9", rating: 4.5, inStock: true },
  { id: 10, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/600x600?text=AirPods+Pro", rating: 4.3, inStock: true },
  { id: 11, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/600x600?text=Galaxy+Buds", rating: 4.1, inStock: true },
  { id: 12, name: "Magic Mouse", price: 2490000, category: "accessory", image: "https://placehold.co/600x600?text=Magic+Mouse", rating: 4.4, inStock: false }
];

const appState = {
  search: "",
  category: "all",
  sort: "featured",
  cartCount: 0
};

const categories = ["all", "phone", "laptop", "tablet", "accessory"];

const themeKey = "product-catalog-theme";
const body = document.body;

let refs = {};

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  buildAppShell();
  cacheRefs();
  bindEvents();
  loadTheme();
  renderProducts();
  updateCartBadge();
}

function buildAppShell() {
  const app = document.createElement("div");
  app.className = "app";

  const topbar = document.createElement("section");
  topbar.className = "topbar";

  const brand = document.createElement("div");
  brand.className = "brand";

  const title = document.createElement("h1");
  title.textContent = "Product Catalog";

  const subtitle = document.createElement("p");
  subtitle.textContent = "Search, filter, sort, open modal, add to cart, and switch theme.";

  brand.append(title, subtitle);

  const actions = document.createElement("div");
  actions.className = "actions";

  const cartButton = document.createElement("button");
  cartButton.className = "icon-btn";
  cartButton.type = "button";
  cartButton.setAttribute("aria-label", "Cart");
  cartButton.innerHTML = "🛒";

  const cartBadge = document.createElement("span");
  cartBadge.className = "badge";
  cartBadge.textContent = "0";
  cartButton.appendChild(cartBadge);

  const themeButton = document.createElement("button");
  themeButton.className = "toggle-btn";
  themeButton.type = "button";
  themeButton.id = "themeToggle";
  themeButton.textContent = "Dark mode";

  actions.append(cartButton, themeButton);
  topbar.append(brand, actions);

  const panel = document.createElement("section");
  panel.className = "panel";

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const searchWrap = document.createElement("div");
  searchWrap.className = "search-wrap";

  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.type = "search";
  searchInput.id = "searchInput";
  searchInput.placeholder = "Search products...";
  searchInput.setAttribute("aria-label", "Search products");

  searchWrap.appendChild(searchInput);

  const sortWrap = document.createElement("div");
  sortWrap.className = "sort-wrap";

  const sortSelect = document.createElement("select");
  sortSelect.className = "sort-select";
  sortSelect.id = "sortSelect";
  sortSelect.setAttribute("aria-label", "Sort products");

  const sortOptions = [
    ["featured", "Featured"],
    ["price-asc", "Giá tăng"],
    ["price-desc", "Giá giảm"],
    ["name-asc", "Tên A-Z"],
    ["rating-desc", "Đánh giá cao nhất"]
  ];

  sortOptions.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    sortSelect.appendChild(option);
  });

  sortWrap.appendChild(sortSelect);
  toolbar.append(searchWrap, sortWrap);

  const categoryBar = document.createElement("div");
  categoryBar.className = "categories";
  categoryBar.id = "categoryBar";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-btn";
    button.dataset.category = category;
    button.textContent = category === "all" ? "All" : category;
    if (category === "all") button.classList.add("active");
    categoryBar.appendChild(button);
  });

  const meta = document.createElement("div");
  meta.className = "meta";

  const resultCount = document.createElement("span");
  resultCount.id = "resultCount";
  resultCount.textContent = "0 products";

  const stockInfo = document.createElement("span");
  stockInfo.textContent = "Click a card for details";

  meta.append(resultCount, stockInfo);

  const grid = document.createElement("section");
  grid.className = "grid";
  grid.id = "productGrid";

  panel.append(toolbar, categoryBar, meta, grid);
  app.append(topbar, panel);

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "modalOverlay";
  modalOverlay.hidden = true;

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Product details");

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitleWrap = document.createElement("div");
  const modalTitle = document.createElement("h2");
  modalTitle.id = "modalTitle";
  modalTitle.textContent = "";
  modalTitleWrap.appendChild(modalTitle);

  const closeModal = document.createElement("button");
  closeModal.className = "modal-close";
  closeModal.type = "button";
  closeModal.id = "closeModal";
  closeModal.setAttribute("aria-label", "Close modal");
  closeModal.textContent = "✕";

  modalHeader.append(modalTitleWrap, closeModal);

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.id = "modalContent";

  modal.append(modalHeader, modalContent);
  modalOverlay.appendChild(modal);

  body.append(app, modalOverlay);
}

function cacheRefs() {
  refs = {
    searchInput: document.querySelector("#searchInput"),
    sortSelect: document.querySelector("#sortSelect"),
    categoryBar: document.querySelector("#categoryBar"),
    grid: document.querySelector("#productGrid"),
    resultCount: document.querySelector("#resultCount"),
    cartBadge: document.querySelector(".badge"),
    themeToggle: document.querySelector("#themeToggle"),
    modalOverlay: document.querySelector("#modalOverlay"),
    modalContent: document.querySelector("#modalContent"),
    modalTitle: document.querySelector("#modalTitle"),
    closeModal: document.querySelector("#closeModal")
  };
}

function bindEvents() {
  refs.searchInput.addEventListener("input", (event) => {
    appState.search = event.target.value;
    renderProducts();
  });

  refs.sortSelect.addEventListener("change", (event) => {
    appState.sort = event.target.value;
    renderProducts();
  });

  refs.categoryBar.addEventListener("click", (event) => {
    const button = event.target.closest(".category-btn");
    if (!button) return;

    appState.category = button.dataset.category;
    updateCategoryButtons();
    renderProducts();
  });

  refs.themeToggle.addEventListener("click", toggleTheme);
  refs.closeModal.addEventListener("click", closeModal);
  refs.modalOverlay.addEventListener("click", (event) => {
    if (event.target === refs.modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.modalOverlay.hidden) {
      closeModal();
    }
  });
}

function renderProducts() {
  const visibleProducts = sortProducts(
    searchProducts(
      filterByCategory(products, appState.category),
      appState.search
    ),
    appState.sort
  );

  refs.grid.replaceChildren();

  if (visibleProducts.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Không tìm thấy sản phẩm phù hợp.";
    refs.grid.appendChild(emptyState);
  } else {
    visibleProducts.forEach(product => {
      refs.grid.appendChild(createProductCard(product));
    });
  }

  refs.resultCount.textContent = `${visibleProducts.length} products shown`;
}

function filterByCategory(productList, category) {
  if (category === "all") return productList;
  return productList.filter(product => product.category === category);
}

function searchProducts(productList, keyword) {
  const query = keyword.trim().toLowerCase();
  if (!query) return productList;

  return productList.filter(product =>
    product.name.toLowerCase().includes(query)
  );
}

function sortProducts(productList, sortValue) {
  const sorted = [...productList];

  switch (sortValue) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = String(product.id);

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;

  const body = document.createElement("div");
  body.className = "product-body";

  const top = document.createElement("div");
  top.className = "product-top";

  const info = document.createElement("div");

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const category = document.createElement("div");
  category.className = "product-category";
  category.textContent = product.category.toUpperCase();

  info.append(name, category);

  const rating = document.createElement("div");
  rating.className = "product-rating";
  rating.textContent = `⭐ ${product.rating.toFixed(1)}`;

  top.append(info, rating);

  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);

  const stock = document.createElement("span");
  stock.className = `stock-pill${product.inStock ? "" : " out"}`;
  stock.textContent = product.inStock ? "In stock" : "Out of stock";

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const addButton = document.createElement("button");
  addButton.className = "cart-btn";
  addButton.type = "button";
  addButton.textContent = product.inStock ? "Thêm giỏ" : "Hết hàng";
  addButton.disabled = !product.inStock;

  addButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!product.inStock) return;
    appState.cartCount += 1;
    updateCartBadge();
  });

  actions.appendChild(addButton);

  body.append(top, price, stock, actions);
  card.append(image, body);

  card.addEventListener("click", () => openModal(product));

  return card;
}

function openModal(product) {
  refs.modalTitle.textContent = product.name;
  refs.modalContent.replaceChildren();

  const image = document.createElement("img");
  image.className = "modal-image";
  image.src = product.image;
  image.alt = product.name;

  const info = document.createElement("div");
  info.className = "modal-info";

  const title = document.createElement("h2");
  title.textContent = product.name;

  const price = document.createElement("div");
  price.className = "modal-price";
  price.textContent = formatPrice(product.price);

  const desc = document.createElement("p");
  desc.className = "modal-desc";
  desc.textContent = "Thông tin chi tiết sản phẩm được tạo hoàn toàn bằng JavaScript, không hardcode HTML.";

  const grid = document.createElement("div");
  grid.className = "modal-grid";

  const fields = [
    ["Category", product.category],
    ["Rating", product.rating.toFixed(1)],
    ["Stock", product.inStock ? "Available" : "Out of stock"],
    ["Product ID", String(product.id)]
  ];

  fields.forEach(([label, value]) => {
    const box = document.createElement("div");
    box.className = "detail-box";

    const boxLabel = document.createElement("span");
    boxLabel.className = "detail-label";
    boxLabel.textContent = label;

    const boxValue = document.createElement("span");
    boxValue.className = "detail-value";
    boxValue.textContent = value;

    box.append(boxLabel, boxValue);
    grid.appendChild(box);
  });

  info.append(title, price, desc, grid);
  refs.modalContent.append(image, info);
  refs.modalOverlay.hidden = false;
}

function closeModal() {
  refs.modalOverlay.hidden = true;
}

function updateCategoryButtons() {
  document.querySelectorAll(".category-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.category === appState.category);
  });
}

function updateCartBadge() {
  refs.cartBadge.textContent = String(appState.cartCount);
}

function formatPrice(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

function toggleTheme() {
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem(themeKey, isDark ? "dark" : "light");
  refs.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeKey);

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    refs.themeToggle.textContent = "Light mode";
  } else {
    body.classList.remove("dark-mode");
    refs.themeToggle.textContent = "Dark mode";
  }
}