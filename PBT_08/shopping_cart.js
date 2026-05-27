function createCart() {
  let items = [];
  let discount = { type: "none", value: 0 };

  const formatPrice = (price) => price.toLocaleString("vi-VN");

  const getSubtotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyCurrentDiscount = (amount) => {
    if (discount.type === "percent") {
      return amount * (1 - discount.value);
    }
    if (discount.type === "fixed") {
      return Math.max(0, amount - discount.value);
    }
    return amount;
  };

  return {
    addItem(product, quantity = 1) {
      const existingItem = items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity
        });
      }
    },

    removeItem(productId) {
      items = items.filter(item => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      if (newQuantity <= 0) {
        this.removeItem(productId);
        return;
      }

      const item = items.find(item => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    },

    getTotal() {
      return applyCurrentDiscount(getSubtotal());
    },

    applyDiscount(code) {
      const discountMap = {
        SALE10: { type: "percent", value: 0.1 },
        SALE20: { type: "percent", value: 0.2 },
        FREESHIP: { type: "fixed", value: 30000 }
      };

      discount = discountMap[code] || { type: "none", value: 0 };
    },

    printCart() {
      if (items.length === 0) {
        console.log("Giỏ hàng đang trống");
        return;
      }

      const header = "┌──────────────────────────────────────────────┐";
      const footer = "└──────────────────────────────────────────────┘";
      const line = "├──────────────────────────────────────────────┤";

      console.log(header);
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
      console.log(line);

      items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const row = [
          String(index + 1).padEnd(1),
          item.name.padEnd(13),
          String(item.quantity).padStart(2),
          formatPrice(item.price).padStart(11),
          formatPrice(itemTotal).padStart(11)
        ];

        console.log(
          `│ ${row[0]} │ ${row[1]} │ ${row[2]} │ ${row[3]} │ ${row[4]} │`
        );
      });

      console.log(line);

      const subtotal = getSubtotal();
      const total = this.getTotal();
      const discountAmount = subtotal - total;
      const totalText =
        discountAmount > 0
          ? `Tổng cộng: ${formatPrice(total)}đ  (giảm ${formatPrice(discountAmount)}đ)`
          : `Tổng cộng: ${formatPrice(total)}đ`;

      console.log(`│ ${totalText.padEnd(42)} │`);
      console.log(footer);
    },

    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clearCart() {
      items = [];
      discount = { type: "none", value: 0 };
    }
  };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());