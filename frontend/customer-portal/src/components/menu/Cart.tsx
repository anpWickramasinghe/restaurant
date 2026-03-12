import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Minus, Trash2, ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

const Cart = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onOpenChange(false); // Close the cart modal
    navigate("/checkout"); // Navigate to checkout page
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  } as const;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <motion.img
                src="/cafe.png"
                alt="logo"
                className="w-10 h-10 rounded-full"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <div>
                <SheetTitle className="text-base font-bold">
                  DineSmart
                </SheetTitle>
                <div className="text-xs text-gray-500">
                  No.735/8F, Samagi Mawatha
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cart.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center text-gray-500 mt-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ShoppingCart className="w-16 h-16 mb-3 text-gray-300" />
                </motion.div>
                <p className="text-center font-medium">Your cart is empty</p>
                <p className="text-center text-sm text-gray-400 mt-1">
                  Add some delicious items from our menu!
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex gap-3 items-start border-b pb-4 group"
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-lg object-cover ring-2 ring-gray-100"
                        />
                        {index === 0 && cart.length > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5"
                          >
                            <Sparkles className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-sm">
                            {item.title}
                          </div>
                        </div>
                        <ul className="text-xs text-gray-500 mt-1 space-y-1.8">
                          {item.size && (
                            <li>
                              Size:{" "}
                              <span className="font-medium text-gray-700 capitalize">
                                {item.size}
                              </span>
                            </li>
                          )}
                          {item.extras && item.extras.length > 0 && (
                            <li>
                              Extras:{" "}
                              <span className="font-medium text-gray-700">
                                {item.extras.map((e) => e.name).join(", ")}
                              </span>
                            </li>
                          )}
                        </ul>
                        <div className="flex items-center gap-2 mt-2">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 transition-colors hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            className="font-semibold text-sm w-6 text-center"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 transition-colors hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.span
                            key={item.price * item.quantity}
                            initial={{ scale: 1.1, color: "#FC8A06" }}
                            animate={{ scale: 1, color: "#000" }}
                            className="ml-2 text-sm font-bold"
                          >
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </motion.span>
                          <motion.div
                            whileHover={{ scale: 1.1, color: "#ef4444" }}
                            whileTap={{ scale: 0.9 }}
                            className="ml-auto"
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-red-50"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Note and Checkout */}
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.div
                className="border-t px-6 py-4 bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add an order note (utensils, special instructions, etc.)"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2, color: "#FC8A06" }}
                    animate={{ scale: 1, color: "#000" }}
                    className="font-bold text-base"
                  >
                    LKR {total.toLocaleString()}
                  </motion.span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full h-12 text-lg mt-2 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 transition-all"
                    onClick={handleCheckout}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Go to checkout
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
