A1:
Meta tag (chính xác): <meta name="viewport" content="width=device-width, initial-scale=1.0">

width=device-width: đặt viewport bằng chiều rộng thiết bị (không giả định 980px).
initial-scale=1.0: tỉ lệ zoom khởi tạo = 1 (1 CSS px = 1 device px logical).
Nếu thiếu trên iPhone: trình duyệt giả định viewport lớn (≈980px) → trang bị thu nhỏ / scale xuống → chữ rất nhỏ, bố cục desktop bị nén, không hiện đúng layout mobile.

Mobile‑First vs Desktop‑First (ví dụ breakpoint 768px):

Mobile‑First:
.nav { display: block; }
@media (min-width: 768px) {
  /* tablet+ */
  .nav { display: flex; }
}

Desktop‑First:
.nav { display: flex; }
@media (max-width: 767px) {
  /* mobile */
  .nav { display: block; }
}

Tại sao Mobile‑First được khuyên dùng: giảm CSS tải cho mobile, khuyến khích ưu tiên nội dung, tương thích với min-width media queries và tốt cho performance / SEO.


A2:
xs (mobile): <576px — điện thoại nhỏ (iPhone SE) — product grid: 1 cột
sm: ≥576px — điện thoại lớn / điện thoại ngang — product grid: 2 cột
md: ≥768px — tablet (iPad vertical) — product grid: 2–3 cột (thường 2 trên tablet)
lg: ≥992px — laptop nhỏ — product grid: 3 cột
xl: ≥1200px — desktop tiêu chuẩn — product grid: 4 cột
xxl: ≥1400px — desktop lớn / wide — product grid: 4–5 cột (tuỳ thiết kế)


A3:

CSS quy định: mặc định width:100%; sau đó override ở min-width tương ứng.

375px (iPhone SE) → .container = 100%
600px → .container = 540px (vì >=576px và <768px)
800px → .container = 720px (vì >=768px và <992px)
1000px → .container = 960px (vì >=992px và <1200px)
1400px → .container = 1140px (vì >=1200px)

A4:

Variables: Cho phép khai báo giá trị tái sử dụng (compile-time). 
Ví dụ:
$primary-color: #2563eb;
.btn { background: $primary-color; color: #fff; }


Nesting: Viết selector lồng nhau theo cấu trúc HTML, giảm lặp selector dài.
Ví dụ:
.card {
  .title { font-size: 1rem; }
  &:hover { box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
}

Mixins (@mixin / @include): Định nghĩa khối CSS có thể tái sử dụng, có tham số.
Ví dụ:
@mixin flex-center { display:flex; justify-content:center; align-items:center; }
.modal { @include flex-center; }

@extend / Inheritance: Cho phép một selector kế thừa toàn bộ rule từ selector khác, tránh lặp.
Ví dụ:
.btn-base { padding:8px 12px; border-radius:6px; }
.btn-primary { @extend .btn-base; background:#2563eb; color:#fff; }



Tại sao trình duyệt KHÔNG đọc *.scss?

SCSS là ngôn ngữ tiền xử lý (source) — browser chỉ hiểu CSS. Cần biên dịch (compile) SCSS → CSS trước khi phục vụ.
Các bước chuyển SCSS → CSS (ngắn gọn):

Cài tool/compiler (ví dụ sass):
npm install -D sass
npx sass scss/main.scss css/main.css
npx sass --watch scss/main.scss css/main.css


Hoặc dùng VS Code extension: Live Sass Compiler → bật Watch Sass.
Trong build tool (Vite/webpack/Create React App) chỉ cần cài sass.
Đưa file CSS đã compile vào HTML: <link rel="stylesheet" href="css/main.css">.

B3:
Lệnh compile:
npm install -D sass
npx sass scss/style.scss style/style.css

C1:
Navigation thay đổi:

375px (mobile): Header gọn — chỉ còn logo + search; menu chính được rút gọn/biểu tượng (tab bar) ở đáy màn hình thay cho menu ngang. Không có thanh menu ngang đầy đủ.
768px (tablet): Header vẫn giữ search lớn, menu chính không hiện đầy đủ như desktop — giao diện vẫn ưu tiên hero và thanh tìm kiếm. (Một số item menu có thể hiện ở dạng icon/thu gọn).
1440px (desktop): Header rộng hơn, không gian cho nhiều elements; menu/hyperlinks có thể hiển thị rõ hơn trên cùng (desktop cho 
phép nav đầy đủ hoặc nhiều action visible).

Lưới content (số cột):

375px: Nội dung chính xếp dọc — 1 cột (hero full‑width, các ô/biểu tượng dạng hàng ngang cuộn hoặc grid 1 cột).

768px: Vẫn thiên về 1 cột cho phần hero/ảnh banner, nhưng các block con (cards) có không gian hơn — thường chuyển sang 2 cột cho các gallery hoặc product grid nhỏ (tuỳ section).
1440px: Layout rộng, các vùng product/gallery chuyển thành nhiều cột (thường 3–4 cột) hoặc show nhiều item trên cùng một hàng.

Elements bị ẩn/thu gọn trên mobile:

Sidebar, ads, thanh menu dài, nhiều link phụ — bị ẩn hoặc chuyển vào menu ẩn.
Các badge, thông tin phụ, nhiều control UI (filters, toolbar) thường được ẩn hoặc đặt vào menu collapse.
Trên mobile có thêm bottom tab (quick actions) thay cho menu ngang desktop.

Font size có thay đổi không:

Có xu hướng tăng nhẹ trên tablet/desktop (desktop dùng base font lớn hơn để tận dụng không gian). Ảnh cho thấy kích thước chữ tiêu đề/placeholder search lớn hơn rõ trên desktop/tablet, nhưng body text vẫn tỷ lệ tương tự — kết luận: có scale font theo breakpoint (nhẹ), không thay đổi quá mạnh.

C2:
Wireframe (text-art, mô tả)

Mobile (≤ 767px)

Thứ tự dọc: Header (logo + phone) → Hero (full-width) → Gallery (1 cột, 6 ảnh) → Reservation form (ở dưới hero hoặc trước gallery — đặt ngay trong flow) → Map (thu gọn hoặc ẩn/hiển thị qua nút) → Footer
Ẩn/thu gọn: Sidebar/ads không hiển thị; map có thể ẩn hoặc collapse thành nút "Xem bản đồ".
Tablet (768px – 1023px)

Thứ tự: Header → Hero → Reservation form (ngang, có thể ở trên cùng của main) → Gallery (2 cột) → Map (bên dưới hoặc cạnh reservation nếu đủ rộng) → Footer
Hiển thị form như block ngang; map có thể nằm sau gallery hoặc bên cạnh form (tùy chiều rộng).
Desktop (≥ 1024px)

Bố cục 3 cột chính: Sidebar (left, bộ lọc/Thông tin đặt bàn 250px) | Main (center: Hero + Gallery grid 3 cột) | Map/Ads (right, 250px)
Header và Footer span full width; hero span full width top của main; featured/hero có thể lớn hơn; reservation form có thể làm sticky trong sidebar.


