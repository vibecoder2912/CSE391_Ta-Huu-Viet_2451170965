// var_let_const.js
// A1 — var / let / const

console.log("A1 - Đoạn 1:");
try {
  console.log(x);
} catch (e) {
  console.log("Error:", e.message);
}
var x = 5;
console.log("Sau khi gán x =", x);
console.log("------");

console.log("A1 - Đoạn 2:");
try {
  console.log(y);
} catch (e) {
  console.log("Error:", e.message);
}
let y = 10;
console.log("Sau khi gán y =", y);
console.log("------");

console.log("A1 - Đoạn 3:");
try {
  const z = 15;
  try {
    z = 20;
    console.log("z sau gán lại:", z);
  } catch (e) {
    console.log("Error khi gán lại const z:", e.message);
  }
} catch (e) {
  console.log("Error:", e.message);
}
console.log("------");

console.log("A1 - Đoạn 4:");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
console.log("------");

console.log("A1 - Đoạn 5:");
let a = 1;
{
  let a = 2;
  console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
console.log("======\n");


// A2 — Data Types & Coercion
console.log("A2 - Data Types & Coercion:");
console.log("typeof null ->", typeof null);
console.log("typeof undefined ->", typeof undefined);
console.log("typeof NaN ->", typeof NaN);

console.log('"5" + 3 ->', "5" + 3);
console.log('"5" - 3 ->', "5" - 3);
console.log('"5" * "3" ->', "5" * "3");
console.log("true + true ->", true + true);

console.log("[] + [] ->", [] + []);
console.log("[] + {} ->", [] + {});
console.log("{} + [] ->", ({} + []));
console.log("======\n");


// A3 — == vs ===
console.log("A3 - == vs ===:");
console.log("5 == '5' ->", 5 == "5");
console.log("5 === '5' ->", 5 === "5");
console.log("null == undefined ->", null == undefined);
console.log("null === undefined ->", null === undefined);
console.log("NaN == NaN ->", NaN == NaN);
console.log("0 == false ->", 0 == false);
console.log("0 === false ->", 0 === false);
console.log("'' == false ->", "" == false);
console.log("======\n");


// A4 — Truthy & Falsy
console.log("A4 - Truthy & Falsy:");
console.log('if ("0") ->', !!("0"));
console.log('if ("") ->', !!(""));
console.log('if ([]) ->', !!([]));
console.log('if ({}) ->', !!({}));
console.log('if (null) ->', !!(null));
console.log('if (0) ->', !!(0));
console.log('if (-1) ->', !!(-1));
console.log('if (" ") ->', !!(" "));
console.log("Falsy values list:", [false, 0, -0, 0n, "", null, undefined, NaN]);
console.log("======\n");


// A5 — Template Literals
console.log("A5 - Template Literals:");
const name = "Lan";
const age = 21;
const userId = 123;
const page = 2;
const title = "Tiêu đề";
const description = "Mô tả ngắn";
const price = 25000;

const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
const html = `<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>`;

console.log("greeting ->", greeting);
console.log("url ->", url);
console.log("html ->\n", html);