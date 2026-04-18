Câu A1:
1:  1. -> Request xuất phát từ laptop → đi qua router WiFi
    2. → Qua Viettel(isp bất kỳ) → chạy qua đường cáp quang
    3. → Đến data center của Shoppe ở Việt Nam
    4. → Server xử lý: "Minh muốn xem Dashboard"
    5. → Response chạy ngược lại: cáp quang → Viettel → router → laptop
    6. → Chrome nhận file HTML, CSS, JS → render ra giao diện → Minh thấy Dashboard

2: Nằm trong thư mục Screenshot


Câu A2:
1: Sử dụng div class="header" thay vì header. Sửa: thay bằng thẻ header.
2: Sử dụng div class="menu" thay vì thẻ nav. Sửa: sử dụng nav + ul/li.
3: Sử dụng div class="main" thay vì thẻ main. Sửa: thay bằng thẻ main.
4: Sử dụng div class="product" và div class="title" thay vì thẻ article và heading(h1/h2/h3/). Sửa: thay bằng thẻ article và heading.
5: Sử dụng div class="footer" thay vì thẻ footer. Sửa: thay bằng thẻ footer.

Câu A3:
Vì mỗi div sẽ tạo một dòng riêng (Hộp 1/2/3). Các span và strong nằm cạnh nhau trên cùng một dòng vì giữa chúng là khoảng cách và không tạo ra dòng riêng như div (Text A Text B; Text C Text D).

Câu A4:
<thead>: Chứa hàng tiêu đề cột (th), dùng để mô tả từng cột.
<tbody>: Chứa các hàng dữ liệu chính (td); có thể có nhiều <tbody> để nhóm nhiều mặt hàng.
<tfoot>: Chứa hàng tóm tắt/tổng kết(ví dụ totals);
Lý do vì sao không nên dùng table để tạo trang web:
1. Các thẻ <table> được thiết kế chỉ để hiển thị dữ liệu dạng bảng, không phù hợp để tạo bố cục trang web.
2. Sử dụng <table> để tạo bố cục trang web sẽ làm cho mã HTML trở nên phức tạp và khó bảo trì, vì bạn sẽ phải lồng nhiều bảng vào nhau để đạt được bố cục mong muốn.
3. Sử dụng <table> để tạo bố cục trang web sẽ làm cho trang web trở nên kém linh hoạt và khó thích ứng với các kích thước màn hình khác nhau, đặc biệt là trên thiết bị di động.

Câu B3:
Lỗi 1: Dòng 1 — Thẻ DOCTYPE sai (<!DOCTYPE>) — Cách sửa: đổi thành <!DOCTYPE html>.
Lỗi 2: Dòng 2 — Thiếu thuộc tính ngôn ngữ trên thẻ html (<html>) — Cách sửa: thêm lang, ví dụ <html lang="vi">.
Lỗi 3: Dòng 4 — Thẻ <title> không đóng — Cách sửa: đóng thẻ bằng </title> (và đặt meta charset trước title).
Lỗi 4: Dòng 5 — Giá trị charset sai ('utf8') — Cách sửa: dùng <meta charset="utf-8">.
Lỗi 5: Dòng 8 — Thẻ <h1> đóng sai (dùng <h1> thay vì </h1>) — Cách sửa: đổi thành </h1>.
Lỗi 6: Dòng 12 — Thẻ <a> không đóng (<a href="home">Trang chủ<a>) — Cách sửa: đóng bằng </a>.
Lỗi 7: Dòng 20 — Thuộc tính src của <img> không có dấu ngoặc kép và thiếu alt (src=iphone.jpg) — Cách sửa: <img src="iphone.jpg" alt="Ảnh iPhone 16 Pro">.
Lỗi 8: Dòng 22 — Sai thứ tự đóng thẻ (nesting): <p>Giá: <b>25.990.000đ</p></b> — Cách sửa: đóng đúng thứ tự, ví dụ <p>Giá: <b>25.990.000đ</b></p> (hoặc dùng <strong>).
Lỗi 9: Dòng 27-31 — Hàng header của bảng dùng <td> thay vì <th> và thiếu <thead>/<tbody> — Cách sửa: dùng <thead><tr><th>...</th></tr></thead> và phần dữ liệu trong <tbody>.
Lỗi 10: Dòng 40 — Dùng hai thẻ <main> (không hợp lệ về semantic) — Cách sửa: đổi thẻ thứ hai thành <aside> hoặc <section>.
Lỗi 11: Dòng 45 — Thẻ <p> trong footer không đóng — Cách sửa: thêm </p>.
Lỗi 12: Dòng 47 — Thiếu thẻ đóng </html> cuối file — Cách sửa: thêm </html> ở cuối.

Câu B4:
3:
Action: Bấm vào nút tìm kiếm trên trang chủ Shopee.
Method: GET.
Input type: Text, Button.



