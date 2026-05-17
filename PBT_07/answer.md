A1 — Dự đoán

Đoạn 1:

Output: undefined (sau đó x = 5)
Giải thích: var được tạo; biến tồn tại nhưng chưa được gán → undefined.

Đoạn 2:

Output: ReferenceError (ví dụ: ReferenceError: Cannot access 'y' before initialization)
Giải thích: let trong Temporal Dead Zone (TDZ) — không thể truy cập trước khi khai báo.

Đoạn 3:

Output: TypeError khi cố gắng gán lại z (chương trình dừng trước console.log)
Giải thích: const không cho phép gán lại; lỗi xảy ra tại z = 20.

Đoạn 4:

Output: [1, 2, 3, 4]
Giải thích: const bảo vệ tham chiếu, không bảo vệ nội dung; arr.push hợp lệ.

Đoạn 5:

Output:
Trong block: 2
Ngoài block: 1
Giải thích: let có scope block; a trong block khác với a ngoài.
