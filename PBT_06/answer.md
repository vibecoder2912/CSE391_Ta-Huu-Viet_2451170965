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



Câu C1 — Đổi màu $primary

Mục tiêu & công cụ: Cần nguồn Bootstrap SCSS, node+npm (hoặc yarn) và sass (Dart Sass) để biên dịch SCSS → CSS.

Quy trình ngắn:

Cài đặt Bootstrap source: npm install bootstrap (hoặc tải mã nguồn Bootstrap).
Tạo file SCSS tùy biến (ví dụ custom.scss) và import theo thứ tự:

import biến trước khi import Bootstrap:

// custom.scss
$primary: #E63946;
@import "node_modules/bootstrap/scss/bootstrap";


Biên dịch custom.scss thành custom.css bằng sass (sass custom.scss custom.css --no-source-map --style=compressed).
Thay link CSS trong HTML để dùng custom.css (thay vì CDN mặc định).
Các file cần sửa/tạo: không sửa trực tiếp file trong node_modules; thay vào đó tạo/sửa custom.scss trong dự án rồi build lại.

Lưu ý nâng cao: nếu chỉ cần vài biến, ghi đè như trên là đủ. Nếu muốn thay đổi nhiều biến hoặc cấu trúc, copy _variables.scss vào dự án, chỉnh rồi import Bootstrap SCSS sau.

Tại sao không override .btn-primary { background: red; } trực tiếp:

Consistency: $primary được dùng ở nhiều chỗ (border, hover, focus, btn variants, charts...). Thay biến cập nhật toàn hệ thống; override CSS thủ công dễ sót chỗ.

Maintainability: SASS variables giữ nguồn chân thật; dễ thay lại, nhất là khi cập nhật phiên bản Bootstrap.

Specificity & states: .btn-primary có nhiều trạng thái (hover, active, focus, disabled). Override một thuộc tính có thể bỏ sót pseudo-class hoặc biến động phụ thuộc CSS variables; dùng biến đảm bảo mọi trạng thái kế thừa đúng giá trị.

Build-time theming: Dùng SASS bạn có thể build nhiều theme khác nhau (theme-dark, theme-light) dễ dàng; override CSS thủ công kém linh hoạt.


Câu C2 — So sánh: CSS thuần vs Bootstrap (navbar responsive + product card)

Ví dụ ngắn:

Navbar responsive + product card bằng Bootstrap: chỉ HTML + classes (không CSS).
CSS thuần: cần viết layout (flex/grid), responsive breakpoints, spacing, button styles, card shadow/padding, mobile menu toggle JS.
Số dòng CSS ước tính:

Bootstrap: 0 dòng CSS (sử dụng CSS đã có).
CSS thuần: ~70–200 dòng CSS (tùy mức chi tiết, responsive, animations).
Thời gian phát triển (ước tính):

Bootstrap: 5–30 phút (lấy component, tùy text/images).
CSS thuần: 2–8+ giờ (layout, cross-browser fixes, responsive, accessibility, polish).
Khả năng tùy biến:

Bootstrap: Tốt để xây nhanh, nhất quán; tùy biến sâu cần SASS (variables, maps). Một số style mặc định khó xoá mà không viết override.
CSS thuần: Toàn quyền kiểm soát — dễ tạo thiết kế độc đáo nhưng tốn công và dễ lặp lại code.
Khi NÊN dùng Bootstrap:

Prototype nhanh, dashboard/admin, trang marketing cần triển khai nhanh, team muốn consistency, hoặc khi không cần design hoàn toàn độc đáo.
Khi KHÔNG NÊN dùng Bootstrap:

Khi cần UI rất tùy biến, nhẹ tối đa (critical CSS nhỏ), hoặc project có hệ thống design token/SASS riêng mà Bootstrap gây thừa tính năng.
Kết luận ngắn: Bootstrap tiết kiệm thời gian và công sức cho layout/common components; CSS thuần cho kiểm soát tuyệt đối và tối ưu kích thước/hiệu năng khi bạn có đủ nguồn lực.