// Danh sách các phần tử vùng nội dung của từng Widget dựa theo ID quy ước [0, 1, 2]
const widgets = [
    document.querySelector('#widget-0 .content-area'),
    document.querySelector('#widget-1 .content-area'),
    document.querySelector('#widget-2 .content-area')
];

const fetchTimeInfo = document.getElementById('fetch-time-info');
const btnRefresh = document.getElementById('btn-refresh');

// Khởi động ứng dụng, tự động kích hoạt load tất cả dữ liệu lần đầu
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

// Hàm helper phục vụ việc fetch an toàn, chủ động quăng lỗi Http phục vụ bài toán độc lập
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
    }
    return await response.json();
}

// --- HÀM CỐT LÕI: GỌI SONG SONG MULTI-API ---
async function loadDashboard() {
    const startTime = Date.now();

    // 1. Kích hoạt trạng thái Loading tổng thể trên toàn bộ các widget
    setAllWidgetsToLoading();
    btnRefresh.disabled = true;
    fetchTimeInfo.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-1"></i> Đang tải dữ liệu song song từ các API nguồn...`;

    // 2. Thực thi Promise.allSettled để gọi song song đồng thời 3 APIs độc lập
    const results = await Promise.allSettled([
        fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"),
        fetchJSON("https://restcountries.com/v3.1/name/vietnam"),
        // Mẹo kiểm tra trạng thái Error: Thay đổi link này thành link lỗi ví dụ "https://dog.ceo/api/breeds/image/random/sai-link" để test
        fetchJSON("https://dog.ceo/api/breeds/image/random/3")
    ]);

    // 3. Duyệt mảng kết quả xử lý phân phối dữ liệu dựa vào index tương ứng
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            // Xử lý Render giao diện Success theo từng loại cấu trúc JSON đặc thù của API đó
            renderWidgetSuccess(index, result.value);
        } else {
            // Xử lý Render giao diện báo lỗi Error riêng biệt cho Widget bị sập mạng / sai cấu trúc
            renderWidgetError(index, result.reason.message);
        }
    });

    // 4. Tính toán và kết xuất tổng thời gian xử lý đồng bộ lên header
    const duration = Date.now() - startTime;
    fetchTimeInfo.innerHTML = `<i class="fa-solid fa-circle-check text-success me-1"></i> Tất cả dữ liệu được đồng bộ hóa thành công trong <strong class="text-primary">${duration} ms</strong>`;
    btnRefresh.disabled = false;
}

// --- CÁC HÀM XỬ LÝ TRẠNG THÁI (STATES) CHO TỪNG WIDGET ---

// Đưa toàn bộ các ô Widget về trạng thái Spinner quay vòng chờ dữ liệu
function setAllWidgetsToLoading() {
    widgets.forEach(container => {
        container.innerHTML = `
                    <div class="text-center py-4 text-primary">
                        <div class="spinner-border text-primary mb-3" style="width: 2.5rem; height: 2.5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mb-0 fw-medium text-muted small">Đang kết nối API nguồn...</p>
                    </div>
                `;
    });
}

// Render giao diện báo lỗi cục bộ khi một API cụ thể bị từ chối/sập
function renderWidgetError(index, errorMessage) {
    widgets[index].innerHTML = `
                <div class="text-center text-danger px-2 animate-fade-in">
                    <i class="fa-solid fa-triangle-exclamation display-5 text-danger opacity-75 mb-3 d-block"></i>
                    <h6 class="fw-bold mb-1">Tải dữ liệu thất bại</h6>
                    <p class="text-muted small mb-0 font-monospace border bg-light p-2 rounded text-break">${errorMessage}</p>
                </div>
            `;
}

// Render dữ liệu chuyên sâu tương ứng với cấu trúc dữ liệu trả về của mỗi API thành công
function renderWidgetSuccess(index, data) {
    const container = widgets[index];
    container.innerHTML = ''; // Xóa sạch giao diện loading cũ

    if (index === 0) {
        // Xử lý dữ liệu Weather của Open-Meteo
        const current = data.current_weather;
        container.innerHTML = `
                    <div class="w-100 text-center">
                        <div class="display-3 fw-bold text-dark mb-2">${current.temperature}<span class="h3 text-primary fw-bold">°C</span></div>
                        <div class="badge bg-primary-subtle text-primary border px-3 py-2 rounded-pill fw-semibold mb-3">
                            <i class="fa-solid fa-wind me-1"></i> Tốc độ gió: ${current.windspeed} km/h
                        </div>
                        <ul class="list-group list-group-flush text-start w-100 small mt-2">
                            <li class="list-group-item d-flex justify-content-between text-muted"><span>Kinh độ:</span> <strong>105.85</strong></li>
                            <li class="list-group-item d-flex justify-content-between text-muted"><span>Vĩ độ:</span> <strong>21.03</strong></li>
                            <li class="list-group-item d-flex justify-content-between text-muted"><span>Mã thời tiết:</span> <strong>Code ${current.weathercode}</strong></li>
                        </ul>
                    </div>
                `;
    }
    else if (index === 1) {
        // Xử lý dữ liệu REST Countries của Việt Nam
        const country = data[0];
        container.innerHTML = `
                    <div class="w-100 text-center">
                        <img src="${country.flags.png}" alt="Quốc kỳ VN" class="img-fluid rounded border mb-3 shadow-sm" style="max-height: 60px;">
                        <h4 class="fw-bold text-dark mb-1">${country.name.official}</h4>
                        <p class="text-muted small mb-3">Thủ đô: <strong class="text-dark">${country.capital[0]}</strong></p>
                        
                        <div class="row g-2 w-100 text-start small border-top pt-2">
                            <div class="col-6 py-1 border-bottom border-end"><span class="text-muted d-block small">Dân số</span><strong>${(country.population / 1000000).toFixed(2)} triệu</strong></div>
                            <div class="col-6 py-1 border-bottom ps-3"><span class="text-muted d-block small">Châu lục</span><strong>${country.continents[0]}</strong></div>
                            <div class="col-6 py-1 border-end"><span class="text-muted d-block small">Tiền tệ</span><strong>${Object.keys(country.currencies)[0]}</strong></div>
                            <div class="col-6 py-1 ps-3"><span class="text-muted d-block small">Tên miền</span><strong>${country.tld[0]}</strong></div>
                        </div>
                    </div>
                `;
    }
    else if (index === 2) {
        // Xử lý dữ liệu hình ảnh của Dog API (Mảng 3 tấm ảnh)
        const imgUrls = data.message;
        let imagesHTML = '<div class="row g-2 w-100">';
        imgUrls.forEach(url => {
            imagesHTML += `
                        <div class="col-4">
                            <img src="${url}" class="dog-img border shadow-sm" alt="Cún con" onclick="window.open('${url}', '_blank')" title="Click xem ảnh gốc">
                        </div>
                    `;
        });
        imagesHTML += '</div>';

        container.innerHTML = `
                    <div class="w-100 text-center">
                        <p class="text-muted small mb-3 text-start"><i class="fa-solid fa-circle-info me-1"></i>Nhấp chuột vào hình ảnh bất kỳ để mở ảnh gốc chất lượng cao.</p>
                        ${imagesHTML}
                        <div class="mt-3 text-end">
                            <span class="badge bg-success-subtle text-success border">Trạng thái: OK</span>
                        </div>
                    </div>
                `;
    }
}