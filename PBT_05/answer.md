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