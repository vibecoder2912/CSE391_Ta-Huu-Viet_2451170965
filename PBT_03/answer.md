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

B2:

Hộp 1(content-box): 348.89px x 179.64px
Hộp 2(border-box): 300px x 149.64px

B3:
Rules + specificity (từ cao đến thấp):

p { color: #e74c3c; } — Specificity: 0,0,1
div p { color: #e67e22; } — Specificity: 0,0,2
section div p { color: #f1c40f; } — Specificity: 0,0,3
.text { color: #2ecc71; } — Specificity: 0,1,0
p.text { color: #1abc9c; } — Specificity: 0,1,1
.text.highlight { color: #16a085; } — Specificity: 0,2,0
p.text.highlight { color: #3498db; } — Specificity: 0,2,1
#demo { color: #9b59b6; } — Specificity: 1,0,0
p#demo { color: #8e44ad; } — Specificity: 1,0,1
#demo.text { color: #2c3e50; } — Specificity: 1,1,0

Element sẽ hiển thị màu #2c3e50 vì quy tắc #demo.text có specificity cao nhất (1,1,0). Thay đổi thứ tự các rules trong file CSS sẽ không đổi màu, trừ khi thay đổi selectors hoặc đưa một rule có cùng specificity nhưng xuất hiện sau #demo.text(thứ tự xuất hiện).

C1:

Chiều rộng thực tế (box-sizing: content-box)
.sidebar: content width = 300px; padding = 20px left + 20px right = 40px; border = 1px + 1px = 2px
→ Tổng thực tế = 300 + 40 + 2 = 342px
.content: content width = 660px; padding = 30px + 30px = 60px; border = 1px + 1px = 2px
→ Tổng thực tế = 660 + 60 + 2 = 722px
Tổng 2 cột = 342 + 722 = 1064px > container 960px


Tại sao layout bị vỡ:
Vì .sidebar + .content thực tế chiếm 1064px, lớn hơn container 960px. Với sử dụng thuộc tính css float, khi không còn đủ không gian ngang cho phần tử float tiếp theo thì phần tử đó bị đẩy xuống dòng mới.


Có hai cách sửa:
Cách A (dùng border-box): đặt box-sizing: border-box cho các cột; khi đó width bao gồm padding + border. Giữ width: 300px và width: 660px sẽ khiến tổng = 300 + 660 = 960px đúng bằng container — layout không vỡ.

Cách B (không dùng border-box): giữ box-sizing: content-box và giảm width của .content để bù cho padding + border. Ví dụ giữ .sidebar width 300 (thực tế 342), đặt .content content-width = 556px → thực tế content = 556 + 60 + 2 = 618; tổng = 342 + 618 = 960.


C2:

"Sản phẩm A" (h2.title.highlight): font-size = 20px; color = green (from .highlight !important).
"Mô tả sản phẩm" (p inside #featured .card): color = blue (inherits from .card).
"Sản phẩm B" (h2.title): font-size = 20px; color = blue (from .card).
"Mô tả sản phẩm B" (p.highlight): color = green (from .highlight !important).

Mô tả chi tiết (cascade + kế thừa):

"Sản phẩm A" (<h2 class="title highlight"> trong #featured)
font-size: 20px
Giải thích: .card .title { font-size: 20px; } đặt trực tiếp trên thẻ h2, ghi đè giá trị kế thừa từ .container (14px) hay body (16px).

color: green
Giải thích: .highlight { color: green !important; } có !important(specificity = vô cực) nên ưu tiên hơn mọi khai báo bình thường (kể cả #featured .title { color: red; } hoặc .card { color: blue; }).


"Mô tả sản phẩm" (thẻ p trong cùng div.card#featured)
color: blue
Giải thích: có rule .card p { color: inherit; } khiến p kế thừa màu từ phần tử cha .card. .card đặt color: blue; nên p nhận màu xanh. Màu của anh/chị em (h2) không ảnh hưởng vì thừa kế là từ cha, không phải từ anh/em.


"Sản phẩm B" (<h2 class="title"> trong .card không có id)
font-size: 20px
Giải thích: như trên, .card .title { font-size: 20px; } áp dụng trực tiếp.
color: blue
Giải thích: không có quy tắc nào ưu tiên hơn .card { color: blue; } cho tiêu đề này, nên tiêu đề dùng màu từ .card.

"Mô tả sản phẩm B" (<p class="highlight"> trong .card)
color: green
Giải thích: thẻ p có lớp highlight nên .highlight { color: green !important; } áp dụng trực tiếp; !important thắng mọi giá trị kế thừa hoặc khai báo bình thường.