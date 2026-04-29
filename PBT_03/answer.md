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