import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function CartDrawer() {
  const {
    isOpen,
    setCartOpen,
    items,
    removeItem,
    updateQuantity,
    total,
    clearCart,
  } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast({ title: "Please login to checkout", variant: "destructive" });
      setCartOpen(false);
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        orderItems: items.map((item) => ({
          // Fallback to item.product.id because it's populated from db where id maps to _id
          product: (item.product as any)._id || item.product.id,
          quantity: item.quantity,
          size: item.size,
        })),
        totalAmount: total(),
        shippingAddress: {
          fullName: user.name,
          addressLine1: "123 Main St", // Dummy address for demo
          city: "Mumbai",
          state: "MH",
          postalCode: "400001",
          country: "India",
          phone: user.phone || "9999999999",
        },
      };
      await createOrder(orderData);
      toast({ title: "Order placed successfully!" });
      clearCart();
      setCartOpen(false);
      navigate("/dashboard"); // go to orders
    } catch (error) {
      toast({ title: "Failed to place order", variant: "destructive" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold">
                  Your Cart
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(false)}
                className="rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 opacity-30" />
                <p className="text-sm">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setCartOpen(false)}
                  asChild
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-xl bg-secondary/50"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-lg"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-lg"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-lg ml-auto text-destructive"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      ₹{total().toLocaleString()}
                    </span>
                  </div>
                  <Button
                    className="w-full rounded-xl"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout — ₹{total().toLocaleString()}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl text-xs"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
