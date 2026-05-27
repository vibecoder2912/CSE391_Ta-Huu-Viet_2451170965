// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
  return (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);
}

const process = pipe(
  x => x * 2,
  x => x + 10,
  x => x.toString(),
  x => "Kết quả: " + x
);

console.log(process(5)); // "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        continue;
      }
    }
  }

  throw lastError;
}