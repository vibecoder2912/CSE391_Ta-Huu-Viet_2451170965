// Quản lý trạng thái Client-side State
let localUsersStore = [];
let bootstrapUserModal;
let bootstrapToast;

// --- 1. API LAYER (Tách biệt logic tương tác mạng) ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Lỗi hệ thống: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    },

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        return this.handleResponse(response);
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        return this.handleResponse(response);
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        return this.handleResponse(response); // Trả về {} khi delete thành công trên JSONPlaceholder
    }
};

// --- 2. UI LAYER (Tách biệt logic hiển thị giao diện DOM) ---
const ui = {
    container: document.getElementById('users-container'),
    toastEl: document.getElementById('live-toast'),
    toastMsg: document.getElementById('toast-message'),
    toastIcon: document.getElementById('toast-icon'),

    renderUsers(usersList) {
        this.container.innerHTML = '';

        if (usersList.length === 0) {
            this.container.innerHTML = `
                        <div class="col-100 text-center py-5 text-muted">
                            <i class="fa-solid fa-user-slash display-4 d-block mb-3"></i>
                            <p class="fs-5 m-0">Không tìm thấy thành viên phù hợp nào.</p>
                        </div>
                    `;
            return;
        }

        usersList.forEach(user => {
            const companyName = user.company?.name || user.company || 'N/A';
            const cardHTML = `
                        <div class="col-12 col-md-6 col-lg-4" id="user-card-${user.id}">
                            <div class="card h-100 shadow-sm border-0 user-card">
                                <div class="card-body p-4 d-flex flex-column">
                                    <div class="d-flex align-items-center gap-3 mb-3">
                                        <div class="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 50px; height: 50px;">
                                            ${user.name.split(' ').pop().charAt(0).toUpperCase()}
                                        </div>
                                        <div class="text-truncate">
                                            <h5 class="card-title fw-bold m-0 text-truncate text-dark" title="${user.name}">${user.name}</h5>
                                            <span class="badge bg-light text-secondary border mt-1">${companyName}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4 small flex-grow-1 text-muted">
                                        <div class="mb-2 text-truncate"><i class="fa-solid fa-envelope me-2 text-primary" style="width:16px"></i>${user.email}</div>
                                        <div class="text-truncate"><i class="fa-solid fa-phone me-2 text-success" style="width:16px"></i>${user.phone}</div>
                                    </div>

                                    <div class="d-flex gap-2 border-top pt-3 mt-auto">
                                        <button class="btn btn-outline-warning btn-sm flex-grow-1 fw-medium" onclick="handleEditClick(${user.id})">
                                            <i class="fa-solid fa-pen-to-square me-1"></i>Sửa
                                        </button>
                                        <button class="btn btn-outline-danger btn-sm flex-grow-1 fw-medium" onclick="handleDeleteClick(${user.id})">
                                            <i class="fa-solid fa-trash-can me-1"></i>Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            this.container.insertAdjacentHTML('beforeend', cardHTML);
        });
    },

    showLoading() {
        this.container.innerHTML = '';
        // Render ra 6 khối Card Skeleton Loader giả lập
        for (let i = 0; i < 6; i++) {
            const skeletonHTML = `
                        <div class="col-12 col-md-6 col-lg-4 skeleton-card-wrapper">
                            <div class="card h-100 border-0 shadow-sm">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-center gap-3 mb-3">
                                        <div class="skeleton rounded-circle" style="width: 50px; height: 50px;"></div>
                                        <div class="flex-grow-1">
                                            <div class="skeleton mb-2" style="height: 18px; width: 70%; border-radius:4px;"></div>
                                            <div class="skeleton" style="height: 14px; width: 40%; border-radius:4px;"></div>
                                        </div>
                                    </div>
                                    <div class="my-4">
                                        <div class="skeleton mb-2" style="height: 12px; width: 90%; border-radius:4px;"></div>
                                        <div class="skeleton" style="height: 12px; width: 60%; border-radius:4px;"></div>
                                    </div>
                                    <div class="d-flex gap-2 border-top pt-3">
                                        <div class="skeleton flex-grow-1" style="height: 31px; border-radius:6px;"></div>
                                        <div class="skeleton flex-grow-1" style="height: 31px; border-radius:6px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            this.container.insertAdjacentHTML('beforeend', skeletonHTML);
        }
    },

    showError(message) {
        this.toastEl.classList.remove('bg-success');
        this.toastEl.classList.add('bg-danger');
        this.toastIcon.className = "fa-solid fa-circle-xmark fs-5";
        this.toastMsg.textContent = message;
        bootstrapToast.show();
    },

    showSuccess(message) {
        this.toastEl.classList.remove('bg-danger');
        this.toastEl.classList.add('bg-success');
        this.toastIcon.className = "fa-solid fa-circle-check fs-5";
        this.toastMsg.textContent = message;
        bootstrapToast.show();
    }
};

// --- 3. CONTROLLER LAYER (Quản lý luồng sự kiện điều phối ứng dụng) ---

// Đợi DOM load hoàn tất để bắt đầu khởi tạo cấu trúc dữ liệu nền
document.addEventListener('DOMContentLoaded', () => {
    bootstrapUserModal = new bootstrap.Modal(document.getElementById('userModal'));
    bootstrapToast = new bootstrap.Toast(document.getElementById('live-toast'), { delay: 4000 });

    // Tải danh sách gốc lần đầu
    loadInitialUsers();

    // Gắn bộ lắng nghe sự kiện Tìm kiếm (Client-side filter theo tên / email)
    document.getElementById('search-input').addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        const filtered = localUsersStore.filter(user =>
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)
        );
        ui.renderUsers(filtered);
    });

    // Gắn trình xử lý Submit Form (Hợp nhất cả Create lẫn Update)
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);
});

// Hàm [READ]: Gọi API lấy dữ liệu thô ban đầu
async function loadInitialUsers() {
    ui.showLoading();
    try {
        localUsersStore = await api.getUsers();
        ui.renderUsers(localUsersStore);
    } catch (error) {
        console.error(error);
        ui.showError("Không thể kết nối lấy dữ liệu từ Server. Vui lòng thử lại sau.");
    }
}

// Điều phối mở Modal ở chế độ Thêm mới
function openAddModal() {
    document.getElementById('user-form').reset();
    document.getElementById('form-user-id').value = '';
    document.getElementById('modal-title').textContent = "Thêm thành viên mới";
    document.getElementById('btn-submit-form').textContent = "Thêm mới";
}

// [UPDATE - Bước 1]: Click Edit -> Tìm dữ liệu cũ điền ngược vào Form
async function handleEditClick(id) {
    // Tìm đối tượng trực tiếp từ local store để điền nhanh lên form thay vì gọi lại endpoint chi tiết (hoặc gọi API tùy nhu cầu)
    const user = localUsersStore.find(u => u.id === id);
    if (!user) return;

    document.getElementById('form-user-id').value = user.id;
    document.getElementById('form-name').value = user.name;
    document.getElementById('form-email').value = user.email;
    document.getElementById('form-phone').value = user.phone;
    document.getElementById('form-company').value = user.company?.name || user.company || '';

    document.getElementById('modal-title').textContent = "Cập nhật thông tin thành viên";
    document.getElementById('btn-submit-form').textContent = "Cập nhật";
    bootstrapUserModal.show();
}

// [CREATE & UPDATE - Bước 2]: Xử lý sự kiện gửi dữ liệu Form lên API
async function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('form-user-id').value;
    const userData = {
        name: document.getElementById('form-name').value.trim(),
        email: document.getElementById('form-email').value.trim(),
        phone: document.getElementById('form-phone').value.trim(),
        company: { name: document.getElementById('form-company').value.trim() }
    };

    // Vô hiệu hóa nút bấm tránh double-click gửi trùng request
    const submitBtn = document.getElementById('btn-submit-form');
    submitBtn.disabled = true;

    try {
        if (id) {
            // Chế độ UPDATE (PUT)
            const updatedUser = await api.updateUser(id, userData);

            // Cập nhật mảng lưu trữ local (Vì JSONPlaceholder không thực sự lưu trên server của họ)
            const idx = localUsersStore.findIndex(u => u.id == id);
            if (idx !== -1) localUsersStore[idx] = { ...localUsersStore[idx], ...updatedUser };

            ui.showSuccess("Cập nhật thông tin thành viên thành công!");
        } else {
            // Chế độ CREATE (POST)
            const newUser = await api.createUser(userData);

            // JSONPlaceholder luôn trả về mock id là 11 khi tạo mới, ta tạo ngẫu nhiên tránh trùng Key DOM
            newUser.id = localUsersStore.length > 0 ? Math.max(...localUsersStore.map(u => u.id)) + 1 : 11;

            // Đẩy lên đầu danh sách hiển thị
            localUsersStore.unshift(newUser);
            ui.showSuccess("Đã thêm thành viên mới vào danh sách!");
        }

        // Đồng bộ kết quả ra giao diện và đóng modal
        ui.renderUsers(localUsersStore);
        document.getElementById('search-input').value = ''; // Reset bộ lọc search về rỗng
        bootstrapUserModal.hide();

    } catch (error) {
        console.error(error);
        ui.showError("Hệ thống xử lý thất bại. Vui lòng kiểm tra lại đường truyền mạng.");
    } finally {
        submitBtn.disabled = false;
    }
}

// [DELETE]: Xác nhận xóa phần tử khỏi máy chủ mạng và giao diện local
async function handleDeleteClick(id) {
    const user = localUsersStore.find(u => u.id === id);
    if (!user) return;

    // Dùng confirm dialog mặc định của trình duyệt để xác thực hành vi xóa người dùng
    if (confirm(`Bạn có chắc chắn muốn xóa thành viên "${user.name}" ra khỏi hệ thống danh bạ không?`)) {
        try {
            await api.deleteUser(id);

            // Lọc bỏ user đã bị xóa ra khỏi mảng dữ liệu local store
            localUsersStore = localUsersStore.filter(u => u.id !== id);

            // Render lại giao diện mà không cần tải lại trang
            ui.renderUsers(localUsersStore);
            ui.showSuccess(`Đã xóa thành viên "${user.name}" thành công.`);
        } catch (error) {
            console.error(error);
            ui.showError("Không thể thực hiện hành vi xóa. Lỗi kết nối mạng.");
        }
    }
}
