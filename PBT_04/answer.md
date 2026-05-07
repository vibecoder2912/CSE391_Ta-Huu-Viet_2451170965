A1:
- static: vấn chiếm chỗ trong flow, không tham chiếu vị trí(mặc định), có cuộn theo trang, use case nội dung bình thường trong flow.

- relative: vẫn chiếm chỗ trong flow nhưng có thể dịch chuyển vị trí so với vị trí ban đầu, có cuộn theo trang, use case khi muốn dịch chuyển phần tử mà không ảnh hưởng đến layout chung.
- absolute: không chiếm chỗ trong flow, vị trí tham chiếu đến phần tử cha gần nhất có position khác static hoặc viewport nếu không có, không cuộn theo trang, use case khi muốn phần tử nằm ở vị trí cố định so với phần tử cha hoặc viewport.

- fixed: không chiếm chỗ trong flow, vị trí tham chiếu đến viewport, không cuộn theo trang, use case khi muốn phần tử luôn hiển thị ở một vị trí cố định trên màn hình, bất kể cuộn trang.

- sticky: kết hợp giữa relative và fixed, khi cuộn đến vị trí nhất định sẽ trở thành fixed, có cuộn theo trang, use case khi muốn phần tử dính vào một vị trí nhất định khi cuộn đến đó.