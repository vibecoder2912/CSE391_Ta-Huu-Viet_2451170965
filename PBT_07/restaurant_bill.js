function formatVND(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function calcBill(items, options = {}) {
  // items: mảng các món ăn, mỗi món là đối tượng { name: tên món, price: giá, qty: số lượng }
  // options: { date: ngày mua hàng, tipPercent: phần trăm tip (nếu có) }
  const date = options.date ? new Date(options.date) : new Date();
  const tipPercent = Number(options.tipPercent) || 0;

  let subtotal = 0;
  const lines = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const price = Number(it.price);
    const qty = Number(it.qty) || 0;
    const lineTotal = price * qty;
    subtotal += lineTotal;
    lines.push({ idx: i + 1, name: it.name, qty, price, lineTotal });
  }

  // Luật giảm giá: nếu subtotal > 1 triệu thì giảm 15%, nếu > 500k thì giảm 10%, thứ 4 được giảm thêm 5% (cộng dồn)
  let discountPercent = 0;
  if (subtotal > 1_000_000) discountPercent = 15;
  else if (subtotal > 500_000) discountPercent = 10;

  // Thứ 4 được giảm thêm 5%
  if (date.getDay() === 3) discountPercent += 5;

  const discountAmount = subtotal * discountPercent / 100;
  const afterDiscount = subtotal - discountAmount;
  const vat = afterDiscount * 0.08;
  const tip = afterDiscount * (tipPercent / 100);
  const total = afterDiscount + vat + tip;

  // Xây dựng hóa đơn dạng text
  const pad = (s, w) => s.toString().padEnd(w);
  const lineSep = '═'.repeat(38);
  let out = '';
  out += '╔' + lineSep + '╗\n';
  out += '║' + '        HÓA ĐƠN NHÀ HÀNG'.padStart(20).padEnd(38) + '║\n';
  out += '╠' + lineSep + '╣\n';
  for (const l of lines) {
    const left = `${l.idx}. ${l.name}`.padEnd(18);
    const qtyStr = `x${l.qty}`.padEnd(6);
    const priceStr = '@' + (l.price >= 1000 ? (l.price/1000)+'k' : l.price) ;
    const totalStr = formatVND(l.lineTotal).padStart(10);
    out += `║ ${left} ${qtyStr} ${priceStr.padEnd(8)} = ${totalStr} ║\n`;
  }
  out += '╠' + lineSep + '╣\n';
  out += `║ Tổng cộng:${formatVND(subtotal).padStart(22)} ║\n`;
  out += `║ Giảm giá (${discountPercent}%):${formatVND(discountAmount).padStart(13)} ║\n`;
  out += `║ VAT (8%):${formatVND(vat).padStart(24)} ║\n`;
  out += `║ Tip (${tipPercent}%):${formatVND(tip).padStart(21)} ║\n`;
  out += '╠' + lineSep + '╣\n';
  out += `║ THANH TOÁN:${formatVND(total).padStart(22)} ║\n`;
  out += '╚' + lineSep + '╝\n';

  return { text: out, subtotal, discountPercent, discountAmount, vat, tip, total };
}

// Test case
if (require.main === module) {
  const items = [
    { name: 'Phở bò', price: 50000, qty: 2 },
    { name: 'Trà đá', price: 5000, qty: 3 },
    { name: 'Bún chả', price: 45000, qty: 1 },
  ];
  const res = calcBill(items, { date: new Date(), tipPercent: 5 });
  console.log(res.text);
}