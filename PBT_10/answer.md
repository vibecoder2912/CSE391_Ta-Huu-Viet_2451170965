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