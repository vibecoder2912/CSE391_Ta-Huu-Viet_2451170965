A1:
type="text" → Ô nhập văn bản một dòng cơ bản, không có định dạng đặc biệt → Use case: Nhập tên sản phẩm trong thanh tìm kiếm hoặc nhập họ tên khách hàng.

type="password" → Các ký tự nhập vào sẽ hiển thị dưới dạng dấu chấm hoặc sao để bảo mật → Use case: Nhập mật khẩu khi đăng nhập hoặc thiết lập tài khoản mua hàng.

type="email" → Ô nhập text, tự động kiểm tra định dạng email (phải có ký tự @ và tên miền) → Use case: Nhập địa chỉ nhận tin nhắn khuyến mãi (Newsletter) hoặc xác nhận đơn hàng, gửi otp.

type="number" → Ô nhập số, có nút tăng/giảm (spinner), tự động chặn nếu nhập ký tự chữ → Use case: Chọn số lượng sản phẩm muốn thêm vào giỏ hàng.

type="tel" → Ô nhập chuyên biệt cho số điện thoại, thường kích hoạt bàn phím số trên di động → Use case: Nhập số điện thoại liên lạc khi điền thông tin giao hàng (Shipping address).

type="date" → Hiển thị giao diện lịch (datepicker) để chọn ngày/tháng/năm → Use case: Chọn ngày giao hàng mong muốn hoặc nhập ngày sinh để nhận ưu đãi thành viên.

type="checkbox" → Các ô vuông nhỏ cho phép chọn nhiều lựa chọn cùng lúc hoặc bật/tắt một tùy chọn → Use case: Bộ lọc thuộc tính sản phẩm (chọn cùng lúc màu Đỏ, Xanh) hoặc đồng ý với điều khoản dịch vụ.

type="radio" → Các nút tròn, chỉ cho phép chọn duy nhất 1 lựa chọn trong một nhóm → Use case: Chọn phương thức thanh toán (Thanh toán khi nhận hàng, Thẻ tín dụng, hoặc Ví điện tử).

type="file" → Nút bấm mở cửa sổ trình duyệt tệp tin của thiết bị → Use case: Khách hàng tải ảnh thực tế lên phần đánh giá sản phẩm (Review) sau khi mua.

type="range" → Thanh trượt (slider) để chọn một giá trị trong khoảng xác định → Use case: Bộ lọc khoảng giá (Price Range) giúp khách hàng giới hạn ngân sách mua sắm.

A2:
1. Trường hợp 1:
Kết quả: Trình duyệt sẽ ngăn không cho gửi form và hiển thị một thông báo lỗi (thường là "Please fill out this field").

Tại sao: Thuộc tính required bắt buộc trường nhập liệu không được phép để trống. Vì value="" nên điều kiện này bị vi phạm.

2. Trường hợp 2:
Kết quả: Trình duyệt báo lỗi định dạng (thường là "Please include an '@' in the email address").

Tại sao: type="email" yêu cầu dữ liệu phải khớp với cấu trúc email cơ bản. Chuỗi "abc" thiếu ký tự @ và phần tên miền phía sau, dẫn đến lỗi cú pháp.

3. Trường hợp 3:
Kết quả: Trình duyệt báo lỗi giá trị nằm ngoài khoảng (thường là "Value must be less than or equal to 10").

Tại sao: Bạn đã thiết lập max="10", nhưng giá trị nhập vào là 15. Trình duyệt sẽ chặn lại vì giá trị này vượt quá ngưỡng tối đa cho phép.

4. Trường hợp 4:
Kết quả: Trình duyệt báo lỗi không khớp định dạng yêu cầu (thường là "Please match the requested format").

Tại sao: Thuộc tính pattern="[0-9]{10}" yêu cầu đầu vào phải là đúng 10 chữ số. Chuỗi "abc123" vừa chứa chữ cái, vừa không đủ độ dài 10 ký tự nên bị từ chối.

5. Trường hợp 5:
Kết quả: Trình duyệt báo lỗi về độ dài (thường là "Please lengthen this text to 8 characters or more").

Tại sao: Thuộc tính minlength="8" yêu cầu chuỗi phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, do đó không vượt qua được bộ lọc bảo mật về độ dài mật khẩu.

A3:

1:
Tên dễ truy cập: label gán tên truy cập cho input.
Liên kết semantic: for=id tạo kết nối programmatic giữa nhãn và control.
Tương tác: click vào label sẽ focus/toggle control.
Thay thế placeholder: placeholder không phải nhãn — không nên dùng thay label.

2:
Nhóm logic: khi nhiều control liên quan (ví dụ nhóm radio/checkbox hoặc nhóm thông tin như "Địa chỉ giao hàng").
Ngữ cảnh cho screen reader: legend cung cấp tiêu đề nhóm, screen reader đọc tiêu đề này trước các control trong nhóm.
Ví dụ cụ thể:
Nhóm phương thức thanh toán:
<fieldset>
  <legend>Phương thức thanh toán</legend>
  <label><input type="radio" name="pay" value="card"> Thẻ</label>
  <label><input type="radio" name="pay" value="cod"> COD</label>
</fieldset>

3:
Khi dùng aria-label: cho control không có nhãn nhìn thấy (icon-only button, biểu tượng) hoặc khi bắt buộc cung cấp tên truy cập nhưng không thể hiển thị nhãn.
Tại sao không dùng khi đã có label: aria-label sẽ override (ghi đè) tên truy cập do label cung cấp, tạo thông tin trùng lặp.
Thay thế tốt hơn: nếu cần tên truy cập từ một phần tử khác, dùng aria-labelledby tham chiếu tới id của label.

