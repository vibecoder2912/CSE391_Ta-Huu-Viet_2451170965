// Phiên bản 1: Classic Fizzbuzz
function classicFizzBuzz(start = 1, end = 100) {
  for (let i = start; i <= end; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(out || i);
  }
}

// Phiên bản 2: Custom
function customFizzBuzz(n, rules) { // rules là mảng các đối tượng { divisor: số chia, word: chuỗi thay thế }
  const res = [];
  for (let i = 1; i <= n; i++) {
    let s = "";
    for (const r of rules) {
      if (i % r.divisor === 0) s += r.word;
    }
    res.push(s || i);
  }
  return res;
}

// Test
console.log("Classic 1..30:");
classicFizzBuzz(1, 30);

console.log("\nCustom up to 30:");
const out = customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" }
]);
for (let i = 0; i < out.length; i++) {
  console.log(`${i + 1} => ${out[i]}`);
}