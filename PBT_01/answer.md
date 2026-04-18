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
