A1:
<768px : hiển thị trên 1 cột, các box xếp chồng lên nhau, mỗi hộp full width
768-991px: hiển thị trên 2 cột, 2 cột, mỗi cột 2 box.
>=992px: hiển thị trên 3 cột, mỗi cột 4 box (tổng 12 box).

Thêm: col-md-6 nghĩa là "từ breakpoint md (≥768px) trở lên, phần tử chiếm 6 trong 12 cột (50%)". Không cần viết col-sm-12 vì Bootstrap là mobile‑first: nếu bạn chỉ đặt col-12 mặc định (hoặc không đặt col-sm-*), mobile sẽ dùng full width; col-md-6 sẽ override từ md trở lên.

A2:
d-none d-md-block: Ẩn trên tất cả breakpoint nhỏ hơn md (<768px); hiển thị dưới dạng display: block từ md (≥768px) trở lên.

5 spacing utilities (ví dụ):
mt-3: margin-top = spacer * 3 (Bootstrap spacing scale).
mb-auto: margin-bottom = auto (dùng để đẩy phần tử).
px-4: padding-left và padding-right = spacer * 4.
me-2: margin-end (right in LTR) = spacer * 2.
g-3: gap giữa cột/row (row/grid gutter) = spacer * 3.

Khác nhau .container / .container-fluid / .container-md:
.container: có max-width cố định thay đổi theo breakpoint và auto‑center nội dung (dùng cho nội dung đọc tốt).
.container-fluid: luôn 100% chiều rộng viewport (dùng cho background/full‑width sections).
.container-md: fluid (full width) dưới md, và có max-width từ md trở lên — tức kết hợp behavior của fluid + breakpoint cụ thể.