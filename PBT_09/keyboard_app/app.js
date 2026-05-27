const photos = [
  {
    title: "Cực quang",
    image: "https://placehold.co/1200x800/1d4ed8/ffffff?text=Aurora",
    description: "Ánh sáng chuyển động trên nền trời lạnh, tối giản và rõ tương phản."
  },
  {
    title: "Xa mạc",
    image: "https://placehold.co/1200x800/f59e0b/111827?text=Desert",
    description: "Màu ấm mạnh, hợp để test chuyển ảnh và modal chi tiết."
  },
  {
    title: "Rừng",
    image: "https://placehold.co/1200x800/16a34a/ffffff?text=Forest",
    description: "Tông xanh cân bằng, dễ nhận diện trạng thái active."
  },
  {
    title: "Biển",
    image: "https://placehold.co/1200x800/0891b2/ffffff?text=Ocean",
    description: "Hình ảnh sáng, phù hợp kiểm tra focus ring trên nền tối."
  },
  {
    title: "Thành phố",
    image: "https://placehold.co/1200x800/334155/e2e8f0?text=City",
    description: "Bối cảnh đô thị với độ tương phản vừa đủ."
  },
  {
    title: "Núi",
    image: "https://placehold.co/1200x800/7c3aed/ffffff?text=Mountains",
    description: "Khung cảnh có sắc tím để phân biệt với các slide khác."
  },
  {
    title: "Tuyết",
    image: "https://placehold.co/1200x800/e2e8f0/0f172a?text=Snow",
    description: "Ảnh sáng nhất trong bộ, hữu ích để kiểm tra slideshow."
  },
  {
    title: "Vũ trụ",
    image: "https://placehold.co/1200x800/0f172a/38bdf8?text=Space",
    description: "Tông tối mạnh, tạo điểm nhấn cho command palette."
  },
  {
    title: "Hoàng hôn",
    image: "https://placehold.co/1200x800/ef4444/ffffff?text=Sunset",
    description: "Màu nóng, hoàn thiện bộ 1-9 để jump bằng phím số."
  }
];

const commands = [
  {
    name: "Open first image",
    description: "Đi tới ảnh đầu tiên",
    action: () => setPhoto(0)
  },
  {
    name: "Open random image",
    description: "Mở một ảnh ngẫu nhiên",
    action: () => setPhoto(Math.floor(Math.random() * photos.length))
  },
  {
    name: "Next image",
    description: "Chuyển ảnh sang phải",
    action: () => setPhoto(currentIndex + 1)
  },
  {
    name: "Previous image",
    description: "Chuyển ảnh sang trái",
    action: () => setPhoto(currentIndex - 1)
  },
  {
    name: "Toggle slideshow",
    description: "Phát hoặc tạm dừng slideshow",
    action: toggleSlideshow
  },
  {
    name: "Open command palette",
    description: "Hiện overlay tìm lệnh",
    action: openPalette
  }
];

let currentIndex = 0;
let slideshowTimer = null;
let paletteIndex = 0;
let paletteQuery = "";

const app = document.createElement("main");
app.className = "app";
document.body.appendChild(app);

buildUI();
wireEvents();
renderPhoto();
renderPalette();

function buildUI() {
  const hero = document.createElement("section");
  hero.className = "hero";
  const title = document.createElement("h1");
  title.textContent = "Keyboard Navigation App";
  const desc = document.createElement("p");
  desc.textContent = "Mũi tên, số 1-9, space, Ctrl+K, Escape và focus management.";
  hero.append(title, desc);

  const layout = document.createElement("section");
  layout.className = "layout";

  const galleryPanel = document.createElement("div");
  galleryPanel.className = "panel gallery-panel";

  const galleryTop = document.createElement("div");
  galleryTop.className = "gallery-top";

  const navWrap = document.createElement("div");

  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn";
  prevBtn.id = "prevBtn";
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.textContent = "Prev";

  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn";
  nextBtn.id = "nextBtn";
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.textContent = "Next";

  navWrap.append(prevBtn, nextBtn);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.id = "photoMeta";
  meta.textContent = "";

  galleryTop.append(navWrap, meta);

  const stage = document.createElement("div");
  stage.className = "gallery-stage";

  const stageImg = document.createElement("img");
  stageImg.id = "galleryImage";
  stageImg.alt = "";

  const caption = document.createElement("div");
  caption.className = "gallery-caption";
  caption.innerHTML = "<strong id=\"captionTitle\"></strong><span id=\"captionDesc\"></span>";

  stage.append(stageImg, caption);

  const thumbs = document.createElement("div");
  thumbs.className = "thumbs";
  thumbs.id = "thumbs";

  galleryPanel.append(galleryTop, stage, thumbs);

  const sidePanel = document.createElement("aside");
  sidePanel.className = "panel side-panel";

  const shortcutsTitle = document.createElement("h2");
  shortcutsTitle.textContent = "Keyboard help";

  const help = document.createElement("div");
  help.className = "help";
  help.innerHTML =
    "<div><span class=\"kbd\">←</span> <span class=\"kbd\">→</span> chuyển ảnh</div>" +
    "<div><span class=\"kbd\">1</span> đến <span class=\"kbd\">9</span> nhảy ảnh</div>" +
    "<div><span class=\"kbd\">Space</span> play/pause slideshow</div>" +
    "<div><span class=\"kbd\">Esc</span> đóng modal hoặc palette</div>" +
    "<div><span class=\"kbd\">Ctrl</span> + <span class=\"kbd\">K</span> mở command palette</div>";

  const commandButton = document.createElement("button");
  commandButton.className = "command-btn";
  commandButton.type = "button";
  commandButton.id = "openPaletteBtn";
  commandButton.setAttribute("aria-label", "Open command palette");
  commandButton.textContent = "Open Command Palette";

  sidePanel.append(shortcutsTitle, help, commandButton);

  layout.append(galleryPanel, sidePanel);
  app.append(hero, layout);

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "modalOverlay";
  modalOverlay.hidden = true;

  const modal = document.createElement("div");
  modal.className = "modal";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("div");
  modalTitle.innerHTML = "<h3 id=\"modalTitle\"></h3>";

  const closeModal = document.createElement("button");
  closeModal.className = "modal-close";
  closeModal.id = "closeModalBtn";
  closeModal.type = "button";
  closeModal.setAttribute("aria-label", "Close modal");
  closeModal.textContent = "✕";

  modalHeader.append(modalTitle, closeModal);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.id = "modalBody";

  modal.append(modalHeader, modalBody);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  const paletteOverlay = document.createElement("div");
  paletteOverlay.className = "palette-overlay";
  paletteOverlay.id = "paletteOverlay";
  paletteOverlay.hidden = true;

  const palette = document.createElement("div");
  palette.className = "palette";

  const paletteHeader = document.createElement("div");
  paletteHeader.className = "palette-header";

  const paletteTitle = document.createElement("div");
  paletteTitle.innerHTML = "<h3>Command Palette</h3>";

  const closePalette = document.createElement("button");
  closePalette.className = "palette-close";
  closePalette.id = "closePaletteBtn";
  closePalette.type = "button";
  closePalette.setAttribute("aria-label", "Close command palette");
  closePalette.textContent = "✕";

  paletteHeader.append(paletteTitle, closePalette);

  const paletteSearch = document.createElement("div");
  paletteSearch.className = "palette-search";

  const paletteInput = document.createElement("input");
  paletteInput.className = "palette-input";
  paletteInput.id = "paletteInput";
  paletteInput.type = "text";
  paletteInput.placeholder = "Type a command...";
  paletteInput.setAttribute("aria-label", "Command search");

  paletteSearch.appendChild(paletteInput);

  const paletteList = document.createElement("div");
  paletteList.className = "palette-list";
  paletteList.id = "paletteList";
  paletteList.setAttribute("role", "listbox");

  palette.append(paletteHeader, paletteSearch, paletteList);
  paletteOverlay.appendChild(palette);
  document.body.appendChild(paletteOverlay);
}

function wireEvents() {
  document.querySelector("#prevBtn").addEventListener("click", function () {
    setPhoto(currentIndex - 1);
  });

  document.querySelector("#nextBtn").addEventListener("click", function () {
    setPhoto(currentIndex + 1);
  });

  document.querySelector("#openPaletteBtn").addEventListener("click", openPalette);
  document.querySelector("#closeModalBtn").addEventListener("click", closeModal);
  document.querySelector("#closePaletteBtn").addEventListener("click", closePalette);

  document.querySelector("#modalOverlay").addEventListener("click", function (event) {
    if (event.target === document.querySelector("#modalOverlay")) closeModal();
  });

  document.querySelector("#paletteOverlay").addEventListener("click", function (event) {
    if (event.target === document.querySelector("#paletteOverlay")) closePalette();
  });

  document.querySelector("#thumbs").addEventListener("click", function (event) {
    const button = event.target.closest(".thumb");
    if (!button) return;
    setPhoto(Number(button.dataset.index));
  });

  document.querySelector("#paletteList").addEventListener("click", function (event) {
    const item = event.target.closest(".palette-item");
    if (!item) return;
    const index = Number(item.dataset.index);
    paletteIndex = index;
    runPaletteCommand(index);
  });

  document.querySelector("#paletteInput").addEventListener("input", function (event) {
    paletteQuery = event.target.value;
    paletteIndex = 0;
    renderPalette();
  });

  document.querySelector("#paletteInput").addEventListener("keydown", function (event) {
    const filtered = getFilteredCommands();

    if (event.key === "ArrowDown") {
      event.preventDefault();
      paletteIndex = Math.min(paletteIndex + 1, filtered.length - 1);
      renderPalette();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      paletteIndex = Math.max(paletteIndex - 1, 0);
      renderPalette();
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (filtered.length) {
        runPaletteCommand(paletteIndex);
      }
    }

    if (event.key === "Escape") {
      closePalette();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "k" || event.key === "K")) {
      event.preventDefault();
      openPalette();
      return;
    }

    if (document.querySelector("#paletteOverlay").hidden === false) {
      return;
    }

    if (event.key === "ArrowRight") {
      setPhoto(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      setPhoto(currentIndex - 1);
    }

    if (event.key === " ") {
      event.preventDefault();
      toggleSlideshow();
    }

    if (event.key === "Escape") {
      closeModal();
      closePalette();
    }

    if (/^[1-9]$/.test(event.key)) {
      const targetIndex = Number(event.key) - 1;
      if (targetIndex < photos.length) setPhoto(targetIndex);
    }
  });
}

function setPhoto(index) {
  currentIndex = (index + photos.length) % photos.length;
  renderPhoto();
}

function renderPhoto() {
  const photo = photos[currentIndex];
  const image = document.querySelector("#galleryImage");
  const title = document.querySelector("#captionTitle");
  const desc = document.querySelector("#captionDesc");
  const meta = document.querySelector("#photoMeta");
  const modalTitle = document.querySelector("#modalTitle");
  const modalBody = document.querySelector("#modalBody");

  image.src = photo.image;
  image.alt = photo.title;
  title.textContent = photo.title;
  desc.textContent = photo.description;
  meta.textContent = "Photo " + (currentIndex + 1) + " / " + photos.length;

  document.querySelectorAll(".thumb").forEach(function (thumb) {
    thumb.classList.toggle("active", Number(thumb.dataset.index) === currentIndex);
  });

  modalTitle.textContent = photo.title;
  modalBody.textContent = "";
  modalBody.appendChild(buildModalContent(photo));
}

function buildModalContent(photo) {
  const wrap = document.createElement("div");
  wrap.style.display = "grid";
  wrap.style.gridTemplateColumns = "1fr 1fr";
  wrap.style.gap = "16px";

  const img = document.createElement("img");
  img.src = photo.image;
  img.alt = photo.title;

  const info = document.createElement("div");
  info.className = "modal-meta";

  const heading = document.createElement("h3");
  heading.textContent = photo.title;

  const paragraph = document.createElement("p");
  paragraph.textContent = photo.description;

  const detail = document.createElement("p");
  detail.textContent = "Bạn có thể đóng modal bằng Escape.";

  info.append(heading, paragraph, detail);
  wrap.append(img, info);

  return wrap;
}

function openModal() {
  document.querySelector("#modalOverlay").hidden = false;
}

function closeModal() {
  document.querySelector("#modalOverlay").hidden = true;
}

function toggleSlideshow() {
  if (slideshowTimer) {
    clearInterval(slideshowTimer);
    slideshowTimer = null;
    return;
  }

  slideshowTimer = setInterval(function () {
    setPhoto(currentIndex + 1);
  }, 2000);
}

function openPalette() {
  const overlay = document.querySelector("#paletteOverlay");
  const input = document.querySelector("#paletteInput");
  overlay.hidden = false;
  paletteQuery = "";
  paletteIndex = 0;
  renderPalette();
  setTimeout(function () {
    input.focus();
  }, 0);
}

function closePalette() {
  document.querySelector("#paletteOverlay").hidden = true;
}

function getFilteredCommands() {
  const query = paletteQuery.trim().toLowerCase();
  if (!query) return commands;

  return commands.filter(function (command) {
    return (
      command.name.toLowerCase().indexOf(query) !== -1 ||
      command.description.toLowerCase().indexOf(query) !== -1
    );
  });
}

function renderPalette() {
  const list = document.querySelector("#paletteList");
  const filtered = getFilteredCommands();
  list.textContent = "";

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "palette-item";
    empty.textContent = "No commands found";
    list.appendChild(empty);
    return;
  }

  filtered.forEach(function (command, index) {
    const item = document.createElement("button");
    item.className = "palette-item";
    item.type = "button";
    item.setAttribute("aria-label", command.name);
    item.dataset.index = String(index);
    if (index === paletteIndex) item.classList.add("active");

    const title = document.createElement("strong");
    title.textContent = command.name;

    const desc = document.createElement("small");
    desc.textContent = command.description;

    item.append(title, desc);
    list.appendChild(item);
  });
}

function runPaletteCommand(index) {
  const filtered = getFilteredCommands();
  const command = filtered[index];
  if (!command) return;

  closePalette();
  command.action();
}

(function buildThumbs() {
  const thumbs = document.querySelector("#thumbs");
  thumbs.textContent = "";

  photos.forEach(function (photo, index) {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", "Open image " + (index + 1));

    const img = document.createElement("img");
    img.src = photo.image;
    img.alt = photo.title;

    button.appendChild(img);
    thumbs.appendChild(button);
  });
})();

openModal();
closeModal();
renderPhoto();
renderPalette();