<template>
    <div class="menu-page">
      <header class="header">
      <img
        src="@/assets/Header.png"
        alt="Menu header"
        class="header-bg"
      />
    </header>


    <!-- FOOD LIST -->
    <!-- MENU BACKGROUND -->
    <div class="menu-bg">
      <div class="food-list">
        <div class="food-item" v-for="food in foods" :key="food.id">
          <div>
            <h3>{{ food.name }}</h3>
            <p class="price">{{ formatPrice(food.price) }}₫</p>
          </div>
          <button @click="openModal(food)">+</button>
        </div>
      </div>
    </div>


    <!-- FIXED BOTTOM CART BAR -->
    <div class="cart-bar">
  <button
  class="cart-icon"
  :disabled="!cart.length"
  @click="cart.length && (showCart = true)"
>
  🛒
  <span v-if="cartCount" class="cart-badge">
    {{ cartCount }}
  </span>
</button>

  <div class="cart-bar-right">
    <span class="cart-bar-total">
      {{ formatPrice(totalPrice()) }}₫
    </span>

    <button
      class="order-btn small"
      :disabled="!cart.length"
      @click="sendOrder"
    >
      Đặt Hàng
    </button>
  </div>
</div>

    <!-- CART MODAL -->
    <div class="modal" v-if="showCart" @click.self="closeCart" @touchmove.prevent>
      <div class="modal-content">
        <button class="close-btn" @click="closeCart">×</button>

        <h3>🛒 Đơn Hàng</h3>

        <div class="cart-item" v-for="item in cart" :key="item.key">
          <div class="cart-info">
            <strong>{{ item.name }}</strong>
            <div v-if="item.note" class="cart-note">
              {{ item.note }}
            </div>
            <span class="price">
              {{ formatPrice(item.price * item.qty) }}₫
            </span>
          </div>

          <div class="cart-controls">
            <button @click="decreaseQty(item)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="increaseQty(item)">+</button>
          </div>
        </div>

        <div class="cart-footer">
  <div class="cart-total">
    Tổng Cộng:
    <span class="price">
      {{ formatPrice(totalPrice()) }}₫
    </span>
  </div>

  <button class="order-btn small" @click="sendOrder">
    Đặt Hàng
  </button>
</div>
      </div>
    </div>

    <!-- FOOD MODAL -->
          <div
        class="modal"
        v-if="showModal"
        @click.self="closeModal"
        @touchmove.prevent
      >
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>

        

        <div class="modal-body">
          <!-- FOOD TITLE -->
          <h3 class="food-title">{{ selectedFood.name }}</h3>

          <p class="unit-price">
            {{ formatPrice(selectedFood.price) }}₫ each
          </p>

          <p class="food-desc" v-if="selectedFood.desc">
            {{ selectedFood.desc }}
          </p>

          <!-- IMAGE SLIDER -->
          <div
            class="food-images"
            v-if="selectedFood && selectedFood.images && selectedFood.images.length"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <div
              class="img-track"
              :style="{
                transform: `translateX(-${activeImage * 80}%)`
              }"
            >
              <img
                v-for="(img, i) in selectedFood.images"
                :key="i"
                :src="img"
                class="food-img"
              />
            </div>
          </div>
        </div>

                <div class="modal-bottom">
          <textarea
            v-model="note"
            placeholder="📝 Ghi chú cho quán . . ."
            class="food-note"
            rows="1"
            @keydown.enter.prevent="finishNote"
          ></textarea>

          <div class="action-row">
            <button class="confirm" @click="confirmAdd">
              Thêm vào giỏ hàng - 
              <span class="price">
                {{ formatPrice(selectedFood.price * quantity) }}₫
              </span>
            </button>

            <div class="qty-control">
              <button
                class="qty-btn minus"
                :disabled="quantity === 1"
                @click="quantity > 1 && quantity--"
              >
                −
              </button>

              <span>{{ quantity }}</span>

              <button class="qty-btn plus" @click="quantity++">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "MenuPage",
  mounted() {
    this.loadCart();
    window.addEventListener("beforeunload", this.beforeUnload);
  },

    beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeUnload);
    },

  data() {
    return {
      foods: [
        {
          id: 1,
          name: "Fried Rice",
          price: 45000,
          desc: "Classic fried rice with egg and vegetables",
          images: [
            new URL("@/assets/Food/1.png", import.meta.url).href,
            new URL("@/assets/Food/2.png", import.meta.url).href,
            new URL("@/assets/Food/3.png", import.meta.url).href,
            new URL("@/assets/Food/4.png", import.meta.url).href,
          ],
        },
        {
          id: 2,
          name: "Pho Beef",
          price: 50000,
          desc: "Slow-simmered beef broth with rice noodles",
          images: [],
        },
        {
          id: 3,
          name: "Milk Tea",
          price: 30000,
          desc: "Black tea with fresh milk and sugar",
          images: [],
        },
                {
          id: 4,
          name: "Fried Rice",
          price: 45000,
          desc: "Classic fried rice with egg and vegetables",
          images: [
            new URL("@/assets/Food/1.png", import.meta.url).href,
            new URL("@/assets/Food/2.png", import.meta.url).href,
            new URL("@/assets/Food/3.png", import.meta.url).href,
            new URL("@/assets/Food/4.png", import.meta.url).href,
          ],
        },
        {
          id: 5,
          name: "Pho Beef",
          price: 50000,
          desc: "Slow-simmered beef broth with rice noodles",
          images: [],
        },
        {
          id: 6,
          name: "Milk Tea",
          price: 30000,
          desc: "Black tea with fresh milk and sugar",
          images: [],
        },
                {
          id: 7,
          name: "Fried Rice",
          price: 45000,
          desc: "Classic fried rice with egg and vegetables",
          images: [
            new URL("@/assets/Food/1.png", import.meta.url).href,
            new URL("@/assets/Food/2.png", import.meta.url).href,
            new URL("@/assets/Food/3.png", import.meta.url).href,
            new URL("@/assets/Food/4.png", import.meta.url).href,
          ],
        },
        {
          id: 8,
          name: "Pho Beef",
          price: 50000,
          desc: "Slow-simmered beef broth with rice noodles",
          images: [],
        },
        {
          id: 9,
          name: "Milk Tea",
          price: 30000,
          desc: "Black tea with fresh milk and sugar",
          images: [],
        },
      ],

      cart: [],
      showModal: false,
      showCart: false,
      selectedFood: null,
      quantity: 1,
      note: "",
      activeImage: 0,
      touchStartX: 0,
      scrollY: 0,
    };
  },

  computed: {
    cartCount() {
      return this.cart.reduce((sum, i) => sum + i.qty, 0);
    },
  },

  watch: {
    cart: {
      deep: true,
      handler() {
        this.saveCart();
      },
    },
          showModal(val) {
        val ? this.lockScroll() : this.unlockScroll();
      },

      showCart(val) {
        val ? this.lockScroll() : this.unlockScroll();
      }
  },

  methods: {
    beforeUnload(e) {
      if (this.cart.length) {
        e.preventDefault();
        e.returnValue = "";
      }
    },

    closeCart() {
      this.showCart = false;
    },

    /* IMAGE SWIPE */
    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },

    onTouchEnd(e) {
      if (!this.selectedFood || !this.selectedFood.images || !this.selectedFood.images.length) return;

      const diff = e.changedTouches[0].screenX - this.touchStartX;

      if (diff < -40 && this.activeImage < this.selectedFood.images.length - 1) {
        this.activeImage++;
      }

      if (diff > 40 && this.activeImage > 0) {
        this.activeImage--;
      }
    },

    /* CART STORAGE */
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    loadCart() {
      const saved = localStorage.getItem("cart");
      if (saved) this.cart = JSON.parse(saved);
    },

    /* UI HELPERS */
    finishNote(e) {
      e.target.blur();
    },

    formatPrice(price) {
      return price.toLocaleString("vi-VN");
    },

    lockScroll() {
        this.scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
      },

      unlockScroll() {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, this.scrollY || 0);
      },

    /* MODAL */
    openModal(food) {
      this.selectedFood = food;
      this.quantity = 1;
      this.note = "";
      this.activeImage = 0;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedFood = null;
      this.note = "";
    },

    /* CART ACTIONS */
    confirmAdd() {
      if (!this.selectedFood || this.quantity < 1) return;

      const cleanNote = this.note.trim().toLowerCase();
      const key = `${this.selectedFood.id}-${cleanNote}`;

      const existingItem = this.cart.find(i => i.key === key);

      if (existingItem) {
        existingItem.qty += this.quantity;
      } else {
        this.cart.push({
          key,
          id: this.selectedFood.id,
          name: this.selectedFood.name,
          price: this.selectedFood.price,
          qty: this.quantity,
          note: this.note,
        });
      }

      this.closeModal();
    },

    increaseQty(item) {
      item.qty++;
    },

    decreaseQty(item) {
      item.qty--;
      if (item.qty <= 0) {
        const index = this.cart.indexOf(item);
        if (index !== -1) this.cart.splice(index, 1);
      }
    },

    totalPrice() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    },

        async sendOrder() {
      if (!this.cart.length) return;

      const order = {
        table_name: "A1",              // TEMP hardcoded
        customer_name: "Walk-in",      // TEMP
        phone: "0000000000",           // TEMP
        guest_count: 1,                // TEMP
        items: this.cart.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          note: item.note || null,
        })),
      };

      try {
        const res = await fetch("http://127.0.0.1:8000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (!res.ok) {
          throw new Error("Failed to send order");
        }

        const data = await res.json();
        console.log("ORDER SAVED:", data);

        alert("Đặt hàng thành công!");

        // clear cart
        this.cart = [];
        localStorage.removeItem("cart");
        this.showCart = false;
      } catch (err) {
        console.error(err);
        alert("Không thể gửi đơn hàng");
      }
    },
  },
};
</script>

<style>

/* ===== BASE ===== */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
.menu-bg {
  position: absolute;
  top: 142px;          /* header height */
  bottom: 50px;        /* cart bar height */
  left: 0;
  right: 0;

  overflow-y: auto;
  -webkit-overflow-scrolling: auto; /* 👈 NOT touch */
  overscroll-behavior: contain; 

  padding: 12px;
}

/* ===== Header ===== */
.header {
  position: fixed;
  height: 180px;
  width: 100%;
  overflow: hidden;
  border-radius: 0 0 18px 18px;
}

.header-bg {
  width: 100%;
  height: auto;        /* 👈 important */
  display: block;
}

/* ===== GLOBAL BUTTON STANDARD ===== */
button {
  border-radius: 4px; /* sharp ~80% square */
  transition:
    transform 0.1s ease,
    background-color 0.1s ease,
    color 0.1s ease,
    border-color 0.1s ease;
}

button:active {
  transform: scale(0.95);
}

/* ===== FOOD LIST ===== */
.food-list {
  padding: 5px;
  margin-top: 10px;
}

.food-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.food-item button {
  background: #015233ec;
  color: white;
  border: none;
  padding: 8px 12px;
  font-weight: bold;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.cart-info {
  display: flex;
  flex-direction: column;
}

.cart-note {
  font-size: 12px;
  color: #555;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-controls button {
  width: 28px;
  height: 28px;
  border: none;
  background: #28a745;
  color: white;
  font-size: 18px;
}

.cart-total {
  font-weight: bold;
  margin-top: 10px;
}

.order-btn {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  background: #28a745;
  color: white;
  border: none;
  font-weight: bold;
}

.order-btn.small {
  width: auto !important;
  margin-top: 0 !important;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
}

/* ===== MODAL ===== */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s forwards;
  height: 75vh;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* ===== ACTION ROW ===== */
.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* ===== NOTE (SUBTLE, NO BG) ===== */
.food-note {
  width: 100%;
  min-height: 20px;
  max-height: 28px;
  padding: 0;
  font-size: 12px;
  border: none;
  outline: none;
  resize: none;
  background: transparent; /* NO background */
  color: #777;             /* gray text */
}

.food-note::placeholder {
  color: #aaa;
}


/* ===== QUANTITY CONTROL (FIXED & CONSISTENT) ===== */
.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px; /* move controls slightly right */
}

.qty-btn {
  width: 36px;
  height: 36px;
  font-size: 18px;
  border-radius: 4px;
}

/* Minus — outlined */
.qty-btn.minus {
  background: white;
  border: 2px solid #ff4d4f;
  color: #ff4d4f;
}

.qty-btn.minus:active {
  border-color: #d9363e;
  color: #d9363e;
}

/* Plus — filled */
.qty-btn.plus {
  background: #4caf50;
  color: white;
  border: none;
}

.qty-btn.plus:active {
  background: #43a047;
}

/* ===== CONFIRM BUTTON ===== */
.confirm {
  flex: 1;
  padding: 12px;
  background: #43a047;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
}

/* ===== CLOSE BUTTON ===== */
.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close-btn:active {
  transform: none; /* prevent shrink */
}

/* ===== PRICE STYLE ===== */
.price {
  color: #2e7d32;      /* professional dark green */
  font-weight: 600;
}

.modal .confirm .price {
  color: white;
}
/* ===== FIXED BOTTOM CART BAR ===== */
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 420px;
  width: 100%;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 12px;
  z-index: 900;
}

/* cart icon */
.cart-icon {
  position: relative;
  background: transparent;
  border: none;
  font-size: 22px;
}

/* red badge */
.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: red;
  color: white;
  font-size: 11px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* cart modal footer */
.cart-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eee;
}


.cart-bar-right {
  display: flex;
  align-items: center;
  gap: 13px;

  margin-left: auto;     /* push to the right */
}


.cart-bar-total {
  font-weight: bold;
  font-size: 14px;
  color: #2e7d32;
}

/* ensure bottom order button stays small */
.cart-bar .order-btn.small {
  padding: 6px 14px;
  font-size: 14px;
}

.cart-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.order-btn:disabled {
  background: #ccc;
  color: #777;
  cursor: not-allowed;
  opacity: 0.8;
}

.order-btn:disabled:active {
  transform: none;
}

.unit-price {
  font-size: 13px;
  color: #666;
  margin-top: -9px;   /* pull it closer to title */
  margin-bottom: 14px;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;
}

.modal-bottom {
  border-top: 1px solid #eee;
  padding-top: 10px;
  background: #fff;
}

.food-images {
  overflow: hidden;
  width: 100%;
  margin-top: 60px;   /* 👈 move image DOWN */
  margin-bottom: 12px;
}

.img-track {
  display: flex;
  gap: 10px;
  transition: transform 0.35s ease;
}

.food-img {
  width: 80%;
  flex-shrink: 0;
  border-radius: 16px;
  object-fit: cover;
  height: 300px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
}

.food-desc {
  font-size: 12px;
  color: #555555b9;
  margin-bottom: 12px;
}

</style>