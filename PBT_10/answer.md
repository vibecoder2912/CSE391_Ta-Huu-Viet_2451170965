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

C1:

1) Network errors
Network errors là lỗi xảy ra trước khi server trả response, ví dụ: mất mạng, DNS lỗi, CORS failure, connection timeout, server không reachable.

Cách xử lý:

Bọc toàn bộ request trong try...catch.
Kiểm tra err.name === "AbortError" nếu bị timeout chủ động.
Hiển thị UI thân thiện: “Không có kết nối mạng”, “Thử lại”.
Có thể retry tự động với số lần giới hạn nếu là lỗi mạng tạm thời.
2) API errors
API error là khi server đã trả response nhưng status code cho biết request thất bại.

Cách xử lý theo từng loại:

404 Not Found: tài nguyên không tồn tại, thường báo “Sản phẩm không còn tồn tại”.
500 Internal Server Error: lỗi từ backend, nên báo “Hệ thống đang lỗi, thử lại sau”.
429 Too Many Requests: bị giới hạn tần suất, nên dừng retry ngay hoặc retry theo Retry-After nếu server cung cấp.
Ví dụ:

404 → không retry, vì retry cũng không tạo ra dữ liệu.
500 → có thể retry 1–3 lần nếu lỗi có thể tạm thời.
429 → chờ theo Retry-After hoặc exponential backoff.
3) Timeout: fetchWithTimeout(url, ms)
async function fetchWithTimeout(url, ms, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

Cách dùng:
try {
  const response = await fetchWithTimeout('/api/products', 10000);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Sản phẩm không tồn tại');
    }
    if (response.status === 429) {
      throw new Error('Bị giới hạn request');
    }
    throw new Error('Server error');
  }

  const data = await response.json();
  console.log(data);
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request bị timeout sau 10 giây');
  } else {
    console.log('Lỗi mạng hoặc lỗi khác:', err.message);
  }
}

Giải thích:

AbortController dùng để hủy request nếu quá thời gian cho phép.
clearTimeout đảm bảo timer không bị treo sau khi request xong.
fetch() chỉ reject khi lỗi mạng hoặc bị abort, không reject với HTTP error như 404/500.
4) Retry logic: fetchWithRetry(url, maxRetries)
Chỉ retry khi:

Lỗi mạng
Timeout
Một số lỗi tạm thời như 500, 502, 503, 504

Không nên retry khi:
404
401/403
400
Sửa lỗi logic do input sai:
async function fetchWithTimeout(url, ms, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function shouldRetry(response, error) {
  if (error) {
    return error.name === 'AbortError' || error instanceof TypeError;
  }

  if (!response) return false;

  return [500, 502, 503, 504, 429].includes(response.status);
}

async function fetchWithRetry(url, maxRetries = 3, timeoutMs = 10000, options = {}) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, timeoutMs, options);

      if (response.ok) {
        return response;
      }

      if (!shouldRetry(response, null)) {
        return response;
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        if (retryAfter) {
          await new Promise(resolve => setTimeout(resolve, Number(retryAfter) * 1000));
        }
      }
    } catch (error) {
      lastError = error;

      if (!shouldRetry(null, error)) {
        throw error;
      }
    }

    if (attempt < maxRetries) {
      const delay = 500 * 2 ** (attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Request failed after retries');
}

C2:
1: Promise.all()
Dùng khi tất cả request đều quan trọng. Chỉ cần một request lỗi thì toàn bộ thất bại.

Ví dụ thực tế:

Trang checkout cần đồng thời: thông tin giỏ hàng, phí ship, địa chỉ user, mã giảm giá hợp lệ.
Nếu một phần lỗi, không nên tiếp tục render checkout.
async function loadCheckoutData() {
  const [cartRes, shippingRes, profileRes] = await Promise.all([
    fetch('/api/cart'),
    fetch('/api/shipping-fee'),
    fetch('/api/profile'),
  ]);

  const cart = await cartRes.json();
  const shipping = await shippingRes.json();
  const profile = await profileRes.json();

  return { cart, shipping, profile };
}
Nếu một trong các API lỗi, Promise.all() reject ngay.

2: Promise.allSettled()
Dùng khi muốn lấy tất cả kết quả, kể cả khi một vài request thất bại.

Ví dụ thực tế:

Trang sản phẩm tải song song: review, recommendations, related products.
Nếu review lỗi thì vẫn hiển thị recommendations.
async function loadProductPage(productId) {
  const results = await Promise.allSettled([
    fetch(`/api/products/${productId}`),
    fetch(`/api/products/${productId}/reviews`),
    fetch(`/api/products/${productId}/recommendations`),
  ]);

  const [productResult, reviewsResult, recommendationsResult] = results;

  const product = productResult.status === 'fulfilled'
    ? await productResult.value.json()
    : null;

  const reviews = reviewsResult.status === 'fulfilled'
    ? await reviewsResult.value.json()
    : [];

  const recommendations = recommendationsResult.status === 'fulfilled'
    ? await recommendationsResult.value.json()
    : [];

  return { product, reviews, recommendations };
}

Điểm mạnh:

Không mất dữ liệu chỉ vì một API phụ lỗi.
Rất hợp cho dashboard hoặc trang có nhiều widget độc lập.
3: Promise.race()
Dùng khi chỉ quan tâm kết quả đầu tiên hoàn thành, dù là resolve hay reject.

Ví dụ thực tế:

Lấy giá sản phẩm từ nhiều CDN/mirror.
Dùng nguồn nào phản hồi nhanh nhất để tăng tốc.
async function getFastestPrice(productId) {
  const pricePromise1 = fetch(`/api/price-primary/${productId}`);
  const pricePromise2 = fetch(`/api/price-backup/${productId}`);
  const pricePromise3 = fetch(`/api/price-edge/${productId}`);

  const fastestResponse = await Promise.race([
    pricePromise1,
    pricePromise2,
    pricePromise3,
  ]);

  return await fastestResponse.json();
}

Lưu ý:

race() không đợi tất cả.
Nếu request đầu tiên lỗi thì race() cũng reject ngay.
4: Promise.any()
Dùng khi có nhiều nguồn dự phòng và chỉ cần một nguồn thành công.

Ví dụ thực tế:

Lấy ảnh sản phẩm từ nhiều server mirror.
Chỉ cần một server trả ảnh thành công là đủ.
async function loadProductImage(productId) {
  const imagePromises = [
    fetch(`https://cdn1.example.com/products/${productId}.jpg`),
    fetch(`https://cdn2.example.com/products/${productId}.jpg`),
    fetch(`https://cdn3.example.com/products/${productId}.jpg`),
  ];

  const response = await Promise.any(imagePromises);
  return response.blob();
}
Nếu tất cả đều fail, Promise.any() reject với AggregateError.