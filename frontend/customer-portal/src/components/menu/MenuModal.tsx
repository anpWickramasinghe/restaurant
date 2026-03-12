import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import {
  X,
  Share,
  ChevronDown,
  Check,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
    id?: string | number;
    title: string;
    price: number;
    image: string;
    description?: string;
  };
}

const MenuModal = ({ isOpen, onClose, item }: MenuModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"large" | "medium">("large");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const displayItem = item || {
    title: "Creamy Chicken and Egg Soup with Sweetcorn",
    price: 1398.0,
    image:
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000&auto=format&fit=crop",
  };

  const sizePrice =
    size === "large" ? displayItem.price : displayItem.price * 0.8;

  const extras = [
    { id: "1", name: "Extra Cheese", price: 150 },
    { id: "2", name: "Extra Chicken", price: 300 },
    { id: "3", name: "Bacon", price: 200 },
    { id: "4", name: "Mushrooms", price: 100 },
  ];

  // Calculate the total price of selected extras
  const extrasTotal = extras
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  // Update final price calculation
  const finalPrice = (sizePrice + extrasTotal) * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);

    const selectedExtrasDetails = extras.filter((extra) =>
      selectedExtras.includes(extra.id)
    );

    addToCart({
      id: `${Date.now()}-${Math.random()}`,
      menuItemId: displayItem.id?.toString(),
      title: displayItem.title,
      price: sizePrice + extrasTotal,
      quantity: quantity,
      image: displayItem.image,
      size: size,
      extras: selectedExtrasDetails,
    });

    // Show beautiful toast notification
    toast.success(
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={displayItem.image}
            alt={displayItem.title}
            className="w-12 h-12 rounded-lg object-cover ring-2 ring-primary/30"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">Added to Cart!</p>
          <p className="text-xs text-gray-600 line-clamp-1">
            {displayItem.title}
          </p>
          <p className="text-xs font-medium text-primary mt-0.5">
            {quantity}x • LKR {finalPrice.toLocaleString()}
          </p>
        </div>
      </div>,
      {
        duration: 3000,
        action: {
          label: "View Cart",
          onClick: () => {
            // This will be handled by the cart button click
          },
        },
      }
    );

    // Small delay for animation before closing
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 300);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-0 shadow-lg md:grid-cols-2 sm:rounded-lg overflow-hidden max-h-[90vh] md:max-h-[800px]">
          {/* LEFT SIDE */}
          <div className="relative h-64 md:h-full w-full bg-gray-100">
            <img
              src={displayItem.image}
              alt={displayItem.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col h-full">
            {/* HEADER */}
            <div className="flex justify-between items-start p-6 pb-2">
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <Share className="w-5 h-5" />
              </button>

              <Dialog.Close className="hidden md:block rounded-full p-1 hover:bg-gray-100">
                <X className="w-6 h-6" />
              </Dialog.Close>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <Dialog.Title className="text-2xl font-bold mb-2">
                {displayItem.title}
              </Dialog.Title>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg font-medium text-gray-900">
                  LKR{" "}
                  {displayItem.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>

                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  Buy 1, Get 1 Free
                  <span className="bg-white text-red-600 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
                    i
                  </span>
                </span>
              </div>

              {/* SIZE SELECTION */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-bold text-lg mb-2">Select Size</h3>
                <div className="flex gap-4 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-full border font-medium transition-colors ${size === "medium"
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    onClick={() => setSize("medium")}
                  >
                    Medium
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-full border font-medium transition-colors ${size === "large"
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    onClick={() => setSize("large")}
                  >
                    Large
                  </motion.button>
                </div>
              </div>
              {/* EXTRA ITEMS SELECTION */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <h3 className="font-bold text-lg mb-3">Extra Items</h3>
                <div className="space-y-2">
                  {extras.map((extra) => (
                    <motion.label
                      key={extra.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedExtras.includes(extra.id)
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-black cursor-pointer"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => {
                            setSelectedExtras((prev) =>
                              prev.includes(extra.id)
                                ? prev.filter((id) => id !== extra.id)
                                : [...prev, extra.id]
                            );
                          }}
                        />
                        <span className="font-medium text-sm">
                          {extra.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        +LKR {extra.price.toFixed(2)}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white mt-auto">
              <div className="flex items-center gap-4">
                <Select.Root
                  value={quantity.toString()}
                  onValueChange={(v: string) => setQuantity(parseInt(v))}
                >
                  <Select.Trigger className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2 hover:bg-gray-200 outline-none">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="bg-white border rounded-md shadow-lg z-60">
                      <Select.Viewport className="p-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <Select.Item
                            key={num}
                            value={num.toString()}
                            className="relative flex items-center h-[25px] px-8 pl-6 text-sm rounded-[3px] cursor-pointer "
                          >
                            <Select.ItemText>{num}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-0 w-[25px] flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 rounded-lg py-3 px-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${isAdding
                      ? "bg-primary text-white"
                      : "bg-black text-white hover:bg-gray-900"
                    }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        <span>Adding...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>
                          Add {quantity} to order • LKR{" "}
                          {finalPrice.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuModal;
