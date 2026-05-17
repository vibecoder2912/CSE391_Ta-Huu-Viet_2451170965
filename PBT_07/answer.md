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

A2:

console.log kết quả:

typeof null → "object" (lỗi lịch sử của JS)
typeof undefined → "undefined"
typeof NaN → "number"
"5" + 3 → "53"
"5" - 3 → 2
"5" * "3" → 15
true + true → 2
[] + [] → "" (chuỗi rỗng)
[] + {} → "[object Object]"
{} + [] → "[object Object]" (khi là biểu thức; chú ý ngữ cảnh có thể gây khác biệt nếu {} bị hiểu là block)

Tại sao "5" + 3 khác "5" - 3:

Toán tử + nếu có một operand là string thì thực hiện concatenation(cộng chuỗi) (ép về string).
Toán tử - không hỗ trợ nối chuỗi → JS ép cả hai về dạng số(number) rồi trừ.

A3 — Dự đoán so sánh

5 == "5" → true
5 === "5" → false
null == undefined → true
null === undefined → false
NaN == NaN → false
0 == false → true
0 === false → false
"" == false → true
Quy tắc: Nên dùng === (strict equality) để tránh kết quả bất ngờ do type coercion; chỉ dùng == khi hiểu rõ cơ chế ép kiểu và cần hành vi đó.
