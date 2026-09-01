import { useCallback, useRef, useState } from "react";
import type { CategoryId, Grind, Product, Size } from "./data/products";
import { lineKey, productById, unitPrice, usd } from "./data/products";
import { useCart } from "./hooks";
import { Header, Ticker } from "./components/Header";
import { Opening } from "./components/Opening";
import { Shop } from "./components/Shop";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { ClubBand, CraftSection, Footer, ToastHost } from "./components/Extras";
import type { Toast } from "./components/Extras";

export default function App() {
  const cart = useCart();
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback((msg: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, msg }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (product: Product, size: Size, grind: Grind, qty: number) => {
      cart.add({ key: lineKey(product.id, size, grind), productId: product.id, size, grind }, qty);
      pushToast(
        `${product.origin} ${product.name} · ${size}, ${grind.toLowerCase()} — added to your bag`
      );
    },
    [cart, pushToast]
  );

  const quickAdd = useCallback(
    (product: Product) => addToCart(product, "250g", "Whole bean", 1),
    [addToCart]
  );

  const handleCheckoutComplete = useCallback(() => {
    cart.clear();
  }, [cart]);

  const subtotalForToast = cart.lines.reduce(
    (s, l) => s + unitPrice(productById(l.productId), l.size) * l.qty,
    0
  );

  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-espresso-950 text-oat-100">
      {/* ambient layered background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_-10%,#2a1d13_0%,#140d08_60%)]" />
        <div className="absolute -left-40 top-1/3 h-[36rem] w-[36rem] animate-drift rounded-full bg-caramel-600/8 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-ember-500/8 blur-[120px]" />
        <svg
          className="absolute right-[-6rem] top-24 h-[34rem] w-[34rem] text-espresso-800/40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M12 3c5 0 8.5 3.6 8.5 9s-3.5 9-8.5 9S3.5 17.4 3.5 12 7 3 12 3Z" stroke="currentColor" strokeWidth="0.5" />
          <path d="M12 3.5c-2.2 2.6-2 5.4-.3 8.2 1.6 2.6 1.6 5.6.3 8.6" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">
        <Ticker />
        <Header cartCount={cart.count} onCartOpen={() => setCartOpen(true)} />

        <main>
          <Opening />
          <Shop
            category={category}
            onCategory={setCategory}
            onOpen={setActiveProduct}
            onQuickAdd={quickAdd}
          />
          <CraftSection />
          <ClubBand />
        </main>

        <Footer onCategory={setCategory} />
      </div>

      {/* overlays */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAdd={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        lines={cart.lines}
        onClose={() => setCartOpen(false)}
        onSetQty={cart.setQty}
        onRemove={(key) => {
          cart.remove(key);
          pushToast("Removed from your bag");
        }}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={cart.lines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />

      <ToastHost toasts={toasts} />

      {/* tiny persistent cart total chip (mobile convenience) */}
      {cart.count > 0 && !cartOpen && !checkoutOpen && !activeProduct && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex animate-fade-up items-center gap-2.5 rounded-full border border-caramel-500/50 bg-espresso-850/95 py-3 pl-4 pr-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all hover:border-caramel-400 hover:shadow-[0_20px_48px_-12px_rgba(217,142,50,0.4)] lg:hidden"
          style={{ animationDuration: "0.4s" }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-caramel-500 font-mono text-[11px] font-bold text-espresso-950">
            {cart.count}
          </span>
          <span className="text-sm font-semibold text-oat-100">
            View bag · <span className="text-caramel-300">{usd(subtotalForToast)}</span>
          </span>
        </button>
      )}
    </div>
  );
}
