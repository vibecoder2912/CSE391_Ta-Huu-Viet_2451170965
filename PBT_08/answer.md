A1:

// 1) Function Declaration
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? 0.1 : 0;
  const thuong = luong * thue;
  const thuc_nhan = luong - thuong;
  return { thuong, thuc_nhan };
}

// 2) Function Expression
const tinhThueBaoHiemExpr = function(luong) {
  const thue = luong > 11000000 ? 0.1 : 0;
  const thuong = luong * thue;
  const thuc_nhan = luong - thuong;
  return { thuong, thuc_nhan };
}


// 3) Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
  const thue = luong > 11000000 ? 0.1 : 0;
  const thuong = luong * thue;
  const thuc_nhan = luong - thuong;
  return { thuong, thuc_nhan };
};

Function Declaration: được hoisted (tên + thân)
Function Expression + Arrow Function: chỉ được hoisted biến, thân không được hoisted

Ví dụ: 
//Function Declaration(có thể gọi trước)
console.log(tinhThue(12000000)); // 1200000

function tinhThue(luong) {
  return luong * 0.1;
}

//Function Expression (không thể gọi trước, báo lỗi undentified)
console.log(tinhThueExpr(12000000)); // TypeError: tinhThueExpr is not a function

var tinhThueExpr = function(luong) {
  return luong * 0.1;
};

//Arrow Function (không thể gọi trước, báo lỗi ReferenceError)
console.log(tinhThueArrow(12000000)); // ReferenceError: Cannot access 'tinhThueArrow' before initialization

const tinhThueArrow = (luong) => luong * 0.1;

A2:

Đoạn 1:
1
2
3
2
2

Đoạn 2:
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2

A3:

nums.filter(n => n % 2 === 0)
nums.map(n => n * 3)
nums.reduce((a, b) => a + b, 0)
nums.find(n => n > 7)
nums.some(n => n > 10)
nums.every(n => n > 0)
nums.map(n => `Số ${n}: ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`)
nums.slice().reverse() (không mutate mảng gốc)


A4:

console.log(name, price, ram, color); →
iPhone 16 25990000 8 Titan

console.log(specs); →
ReferenceError: specs is not defined
(vì destructuring specs: { ram, color } không tạo biến specs—chỉ tạo ram và color.)

Sau spread:

console.log(updated.price); → 23990000
console.log(updated.sale); → true
console.log(product.price); → 25990000 (gốc không đổi)

Spread gotcha:
Sau const copy = { ...product }; copy.specs.ram = 16;
console.log(product.specs.ram); → 16
Giải thích ngắn: spread tạo shallow copy — thuộc tính specs (object) vẫn tham chiếu cùng một object, nên thay đổi nested object ảnh hưởng lên cả hai.