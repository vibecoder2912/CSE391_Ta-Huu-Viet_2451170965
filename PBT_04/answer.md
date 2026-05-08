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

C2:

Lỗi 1 — Cards không đều chiều cao / nút "Mua" nhảy

Nguyên nhân: các .card có chiều cao khác nhau vì nội dung không được layout theo column flex; nút nằm theo flow làm vị trí thay đổi. Ngoài ra nếu parent .card-container cho phép item co lại, hàng khác nhau sẽ có chiều cao khác.
Sửa (CSS):
.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch; /* đảm bảo các item trên cùng 1 hàng cùng chiều cao */
  gap: 16px;
}

.card {
  box-sizing: border-box;
  flex: 0 0 calc(33.333% - 16px); /* or width:30% as before */
  display: flex;
  flex-direction: column;
  min-height: 320px; /* tuỳ chọn để đồng đều hơn */
}

/* phần chứa nội dung chính */
.card .card-body {
  flex: 1 1 auto; /* chiếm không gian để đẩy button xuống đáy */
  display: flex;
  flex-direction: column;
}

.card .btn {
  margin-top: auto; /* giữ nút luôn dính đáy card */
}


Lỗi 2 — Item vẫn dính góc trái trên trong container 100vh

Nguyên nhân: display:flex đặt nhưng không dùng justify-content/align-items; text-align:center chỉ căn giữa nội dung inline, không căn flex child.
Sửa (CSS):
.hero {
  height: 100vh;
  display: flex;
  justify-content: center; /* căn ngang */
  align-items: center;     /* căn dọc */
  padding: 20px;           /* phòng trường hợp nội dung quá gần cạnh */
  text-align: center;      /* giữ cho text bên trong căn giữa */
}


Lỗi 3 — Sidebar bị co lại khi content quá dài

Nguyên nhân: flex items có thể bị shrink; .content mặc định có min-width: auto và có thể ép sidebar khi nội dung overflow. Cần cố định độ rộng sidebar và cho content có min-width:0 để cho phép scroll nội dung thay vì làm co sidebar.
Sửa (CSS):
.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* sidebar cố định kích thước, không shrink */
.sidebar {
  flex: 0 0 250px; /* không co, không lớn */
  width: 250px;
}

/* content được phép co/scroll nội dung mà không ép sidebar */
.content {
  flex: 1 1 auto;
  min-width: 0; /* VERY IMPORTANT để nội dung bên trong không ép flex parent */
  overflow: auto; /* nếu cần scroll bên trong */
}