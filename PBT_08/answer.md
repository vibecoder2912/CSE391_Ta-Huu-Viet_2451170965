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

