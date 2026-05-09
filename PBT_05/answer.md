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