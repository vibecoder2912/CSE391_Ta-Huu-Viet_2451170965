A1:
- static: vấn chiếm chỗ trong flow, không tham chiếu vị trí(mặc định), có cuộn theo trang, use case nội dung bình thường trong flow.

- relative: vẫn chiếm chỗ trong flow nhưng có thể dịch chuyển vị trí so với vị trí ban đầu, có cuộn theo trang, use case khi muốn dịch chuyển phần tử mà không ảnh hưởng đến layout chung.
- absolute: không chiếm chỗ trong flow, vị trí tham chiếu đến phần tử cha gần nhất có position khác static hoặc viewport nếu không có, không cuộn theo trang, use case khi muốn phần tử nằm ở vị trí cố định so với phần tử cha hoặc viewport.

- fixed: không chiếm chỗ trong flow, vị trí tham chiếu đến viewport, không cuộn theo trang, use case khi muốn phần tử luôn hiển thị ở một vị trí cố định trên màn hình, bất kể cuộn trang.

- sticky: kết hợp giữa relative và fixed, khi cuộn đến vị trí nhất định sẽ trở thành fixed, có cuộn theo trang, use case khi muốn phần tử dính vào một vị trí nhất định khi cuộn đến đó.

B1:
Trường hợp 1 — display: flex; + .item { flex: 1; } (4 items)

Các item nằm trên một hàng ngang, mỗi item chia đều chiều ngang (bằng nhau).
Bố cục: 1 hàng × 4 cột
Text-art:
[ item ][ item ][ item ][ item ]
Trường hợp 2 — display: flex; flex-wrap: wrap; + .item { width: 45%; margin: 2.5%; } (6 items)

Mỗi item chiếm ~45% + margin 2.5% hai bên → gần 50% tổng, nên 2 item vừa 1 hàng.
6 items → 3 hàng × 2 cột
Text-art:
Hàng 1: [ item ][ item ]
Hàng 2: [ item ][ item ]
Hàng 3: [ item ][ item ]
Trường hợp 3 — display: flex; justify-content: space-between; align-items: center; (3 items)

Các item trên một hàng ngang; khoảng cách ngang đều giữa chúng, item đầu trái, cuối phải, thứ hai căn giữa theo khoảng cách.
Căn dọc: tất cả căn giữa theo chiều cao container.
Bố cục: 1 hàng × 3 cột (với không gian giữa lớn)
Text-art:
[item] [item] [item]
(căn dọc: đều ở giữa)
Trường hợp 4 — display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; (3 items)

Grid có 3 cột cố định: cột 1 = 200px (ví dụ sidebar), cột 2 = flexible (main), cột 3 = 200px (ads).
Với 3 item, mỗi item sẽ lấp từng cột từ trái sang phải, 1 hàng duy nhất.
Bố cục: 1 hàng × 3 cột
Text-art:
[200px] [ 1fr (main) ] [200px]
Trường hợp 5 — display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; (7 items)

Grid 3 cột bằng nhau. Items xếp theo hàng (flow) trái→phải, xuống hàng tiếp khi đầy.
7 items → sẽ tạo 3 hàng: hai hàng đầu đủ 3 cột (3+3), hàng thứ 3 chứa 1 item ở cột đầu (vị trí đầu hàng).
Bố cục: 3 hàng; hàng1: items 1–3, hàng2: 4–6, hàng3: item7 ở ô đầu, hai ô còn trống.
Text-art:
Hàng 1: [1][2][3]
Hàng 2: [4][5][6]
Hàng 3: [7][ ][ ]


C1:
Navigation bar: Flexbox — dễ căn hàng ngang và phân phối không gian (justify-content, align-items) cho logo, menu, nút ở cùng một hàng.

Instagram-like grid: Grid — tạo lưới cố định 3 cột đều nhau dễ dàng, responsive bằng auto-fill/minmax() khi số ảnh thay đổi.

Blog (main + sidebar): Grid — bố cục hai cột chính tốt với grid-template-columns: 200px 1fr; kết hợp Flexbox bên trong các khu vực nếu cần căn hàng/ô.

Footer 4 cột: Grid (hoặc Flexbox) — Grid cho bố cục cột ổn định và responsive; Flexbox có thể dùng nếu nội dung mỗi cột chỉ là hàng dọc đơn giản.

Product card: Flexbox — dùng display: flex; flex-direction: column và margin-top: auto để đẩy nút xuống đáy card một cách ổn định.

