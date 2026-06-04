// --- Cấu hình & Trạng thái Ứng dụng ---
let currentPage = 1;
const limitPerPage = 20;
let isFetching = false;
let hasMoreData = true;

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const loadingIndicator = document.getElementById('loading-indicator');
const lightboxModalEl = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxAuthor = document.getElementById('lightbox-author');

let bootstrapLightboxModal;

// --- Khởi tạo Ứng dụng ---
document.addEventListener('DOMContentLoaded', () => {
    bootstrapLightboxModal = new bootstrap.Modal(lightboxModalEl);

    // 1. Tải 20 bức ảnh đầu tiên cho Page 1
    fetchPhotos(currentPage);

    // 2. Thiết lập IntersectionObserver cho cơ chế Infinite Scroll
    setupInfiniteScroll();
});

// --- Hàm Gọi API lấy dữ liệu hình ảnh (Dùng Lorem Picsum API) ---
async function fetchPhotos(page) {
    if (isFetching || !hasMoreData) return;

    isFetching = true;
    loadingIndicator.classList.remove('d-none'); // Hiện chữ "Đang tải thêm..."

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limitPerPage}`);

        if (!response.ok) {
            throw new Error(`Lỗi kết nối API: ${response.status}`);
        }

        const photos = await response.json();

        if (photos.length < limitPerPage) {
            hasMoreData = false; // Hết dữ liệu trên Server để cuộn tiếp
            loadingIndicator.innerHTML = '<span class="text-muted small">🎉 Bạn đã xem hết bộ sưu tập!</span>';
        }

        // Render dữ liệu ảnh vừa lấy được
        renderPhotos(photos);

        currentPage++; // Tăng trang lên chuẩn bị cho lượt scroll kế tiếp

    } catch (error) {
        console.error("Lỗi Fetch dữ liệu:", error);
        loadingIndicator.innerHTML = '<span class="text-danger small"><i class="fa-solid fa-circle-xmark me-1"></i> Không thể tải dữ liệu ảnh. Cuộn lại để thử lại.</span>';
    } finally {
        isFetching = false;
    }
}

// --- Hàm Render UI danh sách Card Ảnh ---
function renderPhotos(photosList) {
    photosList.forEach(photo => {
        // Ta lấy kích thước ảnh thu nhỏ 400x400 để Grid tải nhanh, tối ưu băng thông mạng
        const thumbnailSrc = `https://picsum.photos/id/${photo.id}/400/400`;
        // Ảnh gốc chất lượng cao để hiển thị trên Lightbox
        const fullSizeSrc = photo.download_url;

        const colHTML = `
                    <div class="col">
                        <div class="gallery-img-container shadow-sm border" onclick="openLightbox('${fullSizeSrc}', '${photo.author}')">
                            <img 
                                data-src="${thumbnailSrc}" 
                                class="gallery-img lazy-target" 
                                alt="Photo by ${photo.author}"
                            >
                            <div class="img-overlay">
                                <p class="m-0 small fw-bold text-truncate"><i class="fa-solid fa-camera me-1"></i>${photo.author}</p>
                            </div>
                        </div>
                    </div>
                `;
        galleryGrid.insertAdjacentHTML('beforeend', colHTML);
    });

    // Sau khi chèn DOM mới, đăng ký cơ chế Lazy Load cho các thẻ img vừa tạo
    applyLazyLoading();
}

// --- Kỹ thuật 1: Lazy Loading hình ảnh (IntersectionObserver) ---
function applyLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-target');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Chuyển đường dẫn từ data-src sang src thật để trình duyệt tải ảnh về
                img.src = img.getAttribute('data-src');

                img.addEventListener('load', () => {
                    img.classList.add('loaded'); // Kích hoạt hiệu ứng css fade-in mượt mà
                });

                img.classList.remove('lazy-target'); // Xóa class đánh dấu mục tiêu
                observer.unobserve(img); // Hủy theo dõi phần tử này để giải phóng bộ nhớ
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Tải trước ảnh khi nó cách viewport bên dưới 200px
    });

    lazyImages.forEach(image => imageObserver.observe(image));
}

// --- Kỹ thuật 2: Infinite Scroll (IntersectionObserver cho phần đáy trang) ---
function setupInfiniteScroll() {
    const scrollObserver = new IntersectionObserver((entries) => {
        // entry[0].isIntersecting kiểm tra xem thẻ #load-trigger đã lọt vào tầm mắt người dùng chưa
        if (entries[0].isIntersecting && !isFetching && hasMoreData) {
            fetchPhotos(currentPage);
        }
    }, {
        rootMargin: '100px' // Kích hoạt gọi hàm trước khi người dùng chạm hẳn tới đáy 100px
    });

    scrollObserver.observe(loadTrigger);
}

// --- Kỹ thuật 3: Lightbox Modal phóng to ảnh ---
function openLightbox(fullUrl, authorName) {
    // Hiển thị ảnh chất lượng cao lên Modal
    lightboxImg.src = fullUrl;
    lightboxAuthor.textContent = `Tác giả: ${authorName}`;

    // Kích hoạt hiển thị Bootstrap Modal
    bootstrapLightboxModal.show();
}