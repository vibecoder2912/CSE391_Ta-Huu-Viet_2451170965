function calculate(num1, operator, num2) {
  const toNum = (v) => (typeof v === "number" ? v : (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v)) ? Number(v) : NaN)); // Chuyển đổi chuỗi số hợp lệ thành số, các trường hợp khác trả về NaN(Not a Number)
  const a = toNum(num1);
  const b = toNum(num2);

  if (isNaN(a) || isNaN(b)) return "Lỗi: Input không phải số"; // Kiểm tra nếu a hoặc b không phải là số hợp lệ

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return "Lỗi: Không thể chia cho 0";
      return a / b;
    case "%":
      if (b === 0) return "Lỗi: Không thể chia cho 0";
      return a % b;
    case "**":
      return a ** b;
    default:
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// Test cases
console.log(calculate(10, "+", 5));    // 15
console.log(calculate(10, "/", 0));    // "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // 1024