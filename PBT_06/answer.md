A1:
<768px : hiển thị trên 1 cột, các box xếp chồng lên nhau, mỗi hộp full width
768-991px: hiển thị trên 2 cột, 2 cột, mỗi cột 2 box.
>=992px: hiển thị trên 3 cột, mỗi cột 4 box (tổng 12 box).

Thêm: col-md-6 nghĩa là "từ breakpoint md (≥768px) trở lên, phần tử chiếm 6 trong 12 cột (50%)". Không cần viết col-sm-12 vì Bootstrap là mobile‑first: nếu bạn chỉ đặt col-12 mặc định (hoặc không đặt col-sm-*), mobile sẽ dùng full width; col-md-6 sẽ override từ md trở lên.