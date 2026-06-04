A1:
Thứ tự output:
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích:

Dòng đồng bộ chạy đầu tiên: "1 - Start" rồi "4 - End".
Promise callbacks vào microtask queue (microtasks) — chạy ngay sau khi stack rỗng nhưng trước macrotasks.
setTimeout callbacks vào macrotask queue (task queue) — chạy sau microtasks.
Khi Promise.resolve().then(...) xuất hiện, cả 3 - Promise và 6 - Promise 2 (và trong callback thứ hai còn tạo một setTimeout nested) vào microtask; microtasks chạy trước macrotasks, nên 3 rồi 6 xuất hiện trước các timeout. setTimeout(...,0) từ dòng gốc (2) và nested (7) đều là macrotasks; thứ tự macrotasks theo enqueue → 2 rồi 7. 5 có delay 100ms nên sau cùng.

A2:
1:
await fetch(...) — fetch trả về một Promise chứa Response object. Dùng await để chờ Promise resolve và lấy Response (thay vì dùng .then()).

2:
response.ok — false khi status code ngoài khoảng 200–299. Ví dụ status codes: 404 (Not Found), 500 (Internal Server Error), 429 (Too Many Requests).

3:
response.json() — trả về Promise vì parsing JSON có thể bất đồng bộ; cần await để nhận object đã parse.

4:
try...catch — bắt các lỗi runtime: network errors (DNS, no-connection), exceptions khi parsing JSON (malformed JSON), hoặc lỗi do chúng ta throw (ví dụ 4xx/5xx khi !response.ok).  fetch không reject cho HTTP errors (200–599) — chỉ reject cho network failure hoặc CORS.

A3:

Sơ đồ trạng thái (miêu tả):

Pending → Fulfilled (resolve with value)
Pending → Rejected (reject with reason)
Callback Hell (ví dụ 4 cấp):
callback1(arg, (err, res1) => {
if (err) return handleErr(err);
callback2(res1, (err, res2) => {
if (err) return handleErr(err);
callback3(res2, (err, res3) => {
if (err) return handleErr(err);
callback4(res3, (err, res4) => {
if (err) return handleErr(err);
console.log('Done', res4);
});
});
});
});

Refactor thành async/await:
async function run() {
try {
const res1 = await promiseCallback1();
const res2 = await promiseCallback2(res1);
const res3 = await promiseCallback3(res2);
const res4 = await promiseCallback4(res3);
console.log('Done', res4);
} catch (err) {
handleErr(err);
}
}