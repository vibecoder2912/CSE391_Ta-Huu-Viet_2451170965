A1:

Inline CSS
Example: <h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
Ưu điểm: áp dụng nhanh, override dễ cho một element cụ thể.
Nhược điểm: không tái sử dụng, làm bừa HTML, khó maintain, không được cache.
Khi dùng: sửa nhanh, thử nghiệm tạm thời, email HTML (khi bắt buộc).

Internal CSS (in <style> in the document head)
Example:
<head>
  <style>
    h1 { color: red; font-size: 24px; }
  </style>
</head>

Ưu điểm: dễ viết cho trang đơn lẻ, không cần file ngoài; override external dễ (do cascade).
Nhược điểm: không tái sử dụng giữa nhiều trang; làm HTML nặng nếu style lớn.
Khi dùng: prototype, single-page demo, hoặc khi cần style chỉ cho trang đó.

External CSS (file css riêng biệt được gắn vào)
Example: <link rel="stylesheet" href="styles.css"> with styles.css:
h1 { color: red; font-size: 24px; }
Ưu điểm: tách việc lập khung và style, tái sử dụng, cache trình duyệt, dễ maintain và scale.
Nhược điểm: cần thêm request, ít thuận tiện cho việc chỉnh sửa trực tiếp trong HTML.
Khi dùng: production, multi-page sites, team projects.

Nếu cùng 1 element có cả 3 cách áp dụng, cách nào "thắng"?
Vì CSS dịch từ trên xuống dưới, nên cách sử dụng sau cùng sẽ override các cách trước đó.

A2:

h1 → "ShopTLU"
.price → "25.990.000đ", "45.990.000đ"
#app header → <header> chứa "ShopTLU" và thanh nav.
nav a:first-child → "Home"
.product.featured h2 → "MacBook Pro"
article > p → "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..."
a[href="/"] → "Home"
.top-bar.dark h1 → "ShopTLU"

A3:
Trường hợp 1 (content-box):

Chiều rộng hiển thị = 400 + 202(padding) + 52(border) = 400 + 40 + 10 = 450px
Không gian chiếm trên trang (bao gồm margin trái/phải) = 450 + 10*2 = 470px
Trường hợp 2 (border-box):

Chiều rộng hiển thị = width = 400px
Kích thước content thực tế = 400 - 202(padding) - 52(border) = 400 - 40 - 10 = 350px
Không gian chiếm trên trang (bao gồm margin) = 400 + 10*2 = 420px
Trường hợp 3 (margin collapse):

Khoảng cách giữa .box-a và .box-b = max(25, 40) = 40px — không phải 65px vì margin dọc “collapse” (gộp) lấy giá trị lớn hơn.
Nâng cao (một margin âm): .box-a { margin-bottom: -10px } và .box-b { margin-top: 40px } → khoảng cách = 40 + (−10) = 30px (do collapse với dấu âm cộng vào).

A4:
1:
Rule A p → (0,0,1)
Rule B .price → (0,1,0)
Rule C #main-price → (1,0,0)
Rule D p.price → (0,1,1)

2:
Màu hiển thị: red — vì Rule C có specificity (1,0,0) cao nhất, nên thắng các rule khác.

3:
Thêm style="color: orange;" → orange (inline style wins over stylesheet rules).

4:
Nếu Rule A là p { color: black !important; } → black. Giải thích ngắn: !important trong stylesheet outrank(vượt quyền) non-!important rules (kể cả inline non-!important); giữa nhiều !important rules, specificity + source order sẽ quyết định.