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

A4:

Các giá trị faulsy trong JavaScript:
false
0 và -0
0n (BigInt zero)
"" (empty string)
null
undefined
NaN

Dự đoán cho đoạn if:

if ("0") console.log("A"); → In (truthy)
if ("") console.log("B"); → Không in (falsy)
if ([]) console.log("C"); → In (mảng rỗng là truthy)
if ({}) console.log("D"); → In (object là truthy)
if (null) console.log("E"); → Không in (falsy)
if (0) console.log("F"); → Không in (falsy)
if (-1) console.log("G"); → In (non-zero số là truthy)
if (" ") console.log("H"); → In (chuỗi chứa space là truthy)

A5:

Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

Cách 3:
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

Câu C1:

Lỗi gán thay vì so sánh:

Code: if (giaSauGiam = 0) { ... }
Vấn đề: Dùng phép gán = thay vì so sánh → luôn gán 0 và điều kiện sai lệch.
Sửa: if (giaSauGiam === 0) { ... }
Input giaBan có thể là chuỗi nên phép toán không đúng:

Test dùng "100000" → phép tính với string có thể trả về NaN hoặc nối chuỗi.
Sửa: Chuyển giaBan về số trước khi tính: const price = Number(giaBan); if (isNaN(price)) return "Lỗi: Input không phải số";
Không xử lý kiểu dữ liệu cho phanTramGiam:

Nếu truyền string hoặc NaN cần validate.
Sửa: const pct = Number(phanTramGiam); if (isNaN(pct)) return "Lỗi: Phần trăm không hợp lệ";
Không có dấu chấm câu/format, nhưng quan trọng là xử lý lỗi đầu vào:

Thêm return/throw phù hợp khi gặp input không hợp lệ.
Lỗi "ẩn" về var trong vòng lặp và setTimeout:

Code dùng for (var i=0; i<5; i++) { setTimeout(function(){ console.log("Item " + i) },1000) }
Vấn đề: var có function-scope → khi callback chạy, i đã là 5 → in Item 5 nhiều lần.
Sửa: Dùng let i (block-scope) hoặc tạo closure: for (let i = 0; i < 5; i++) { ... }
Thiếu xử lý khi phanTramGiam ngoài [0,100] — hiện code trả về chuỗi nhưng nên rõ ràng:

Giữ return "Phần trăm giảm không hợp lệ"; là OK nhưng ghi rõ kiểu trả về.