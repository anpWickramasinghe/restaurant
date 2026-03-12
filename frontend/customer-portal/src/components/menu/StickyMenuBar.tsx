import { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Search, Wifi, ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCategorySection from "./ItemsCard";
import Cart from "./Cart";
import { useCart } from "../../context/CartContext";

import { getMenuItems } from "../../services/api";

type MenuItem = {
  id: string | number;
  name: string;
  price: number;
  img: string;
  available: boolean;
};

// Socket URL for real-time menu updates (connects to API Gateway)
const SOCKET_URL =
  import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:4000";

export default function StickyMenuBar() {
  const [menuData, setMenuData] = useState<Record<string, MenuItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const { cart, cartAnimationTrigger, lastAddedItem } = useCart();
  const socketRef = useRef<Socket | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = Object.keys(menuData);

  const [active, setActive] = useState("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // State for cart animation
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  const [showAddedIndicator, setShowAddedIndicator] = useState(false);
  const [floatingItem, setFloatingItem] = useState<{
    show: boolean;
    image?: string;
  }>({ show: false });

  // Trigger cart bounce animation when cartAnimationTrigger changes
  useEffect(() => {
    if (cartAnimationTrigger > 0) {
      setIsCartBouncing(true);
      setShowAddedIndicator(true);

      // Show floating item animation
      if (lastAddedItem?.image) {
        setFloatingItem({ show: true, image: lastAddedItem.image });
      }

      // Reset bounce after animation
      const bounceTimer = setTimeout(() => {
        setIsCartBouncing(false);
      }, 600);

      // Hide added indicator
      const indicatorTimer = setTimeout(() => {
        setShowAddedIndicator(false);
      }, 2000);

      // Hide floating item
      const floatingTimer = setTimeout(() => {
        setFloatingItem({ show: false });
      }, 800);

      return () => {
        clearTimeout(bounceTimer);
        clearTimeout(indicatorTimer);
        clearTimeout(floatingTimer);
      };
    }
  }, [cartAnimationTrigger, lastAddedItem]);

  // Socket.io connection for real-time menu updates
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("[Menu Socket] Connected:", socket.id);
      setIsLive(true);
      // Join the public menu room
      socket.emit("join:menu");
    });

    socket.on("disconnect", () => {
      console.log("[Menu Socket] Disconnected");
      setIsLive(false);
    });

    // Listen for menu item updates (availability changes)
    socket.on("menu:item:updated", (updatedItem: any) => {
      console.log(
        "[Menu Socket] Item updated:",
        updatedItem.name,
        "available:",
        updatedItem.available
      );
      setMenuData((prev) => {
        const newData = { ...prev };
        for (const category in newData) {
          newData[category] = newData[category].map((item) =>
            item.id === updatedItem._id
              ? {
                  ...item,
                  available: updatedItem.available,
                  price: updatedItem.price,
                }
              : item
          );
        }
        return newData;
      });
    });

    // Listen for new menu items
    socket.on("menu:item:created", (newItem: any) => {
      console.log("[Menu Socket] New item created:", newItem.name);
      const category = newItem.category || "Other";
      setMenuData((prev) => ({
        ...prev,
        [category]: [
          ...(prev[category] || []),
          {
            id: newItem._id,
            name: newItem.name,
            price: newItem.price,
            img: newItem.image || "../src/assets/food.png",
            available: newItem.available,
          },
        ],
      }));
    });

    // Listen for deleted menu items
    socket.on("menu:item:deleted", ({ id }: { id: string }) => {
      console.log("[Menu Socket] Item deleted:", id);
      setMenuData((prev) => {
        const newData = { ...prev };
        for (const category in newData) {
          newData[category] = newData[category].filter(
            (item) => item.id !== id
          );
          // Remove empty categories
          if (newData[category].length === 0) {
            delete newData[category];
          }
        }
        return newData;
      });
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      getMenuItems(searchQuery)
        .then((items) => {
          const grouped: Record<string, MenuItem[]> = {};
          items.forEach((item: any) => {
            const category = item.category || "Other";
            if (!grouped[category]) {
              grouped[category] = [];
            }
            grouped[category].push({
              id: item._id,
              name: item.name,
              price: item.price,
              img: item.image || "../src/assets/food.png",
              available: item.available,
            });
          });
          setMenuData(grouped);
          if (Object.keys(grouped).length > 0) {
            setActive(Object.keys(grouped)[0]);
          } else {
            // Clear active if no results
            setActive("");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch menu:", err);
          setError("Failed to load menu items");
        })
        .finally(() => setLoading(false));
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Initial fetch is now handled by the effect above when searchQuery is initially ""

  useEffect(() => {
    if (loading || categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    categories.forEach((cat) => {
      const ref = sectionRefs.current[cat];
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [loading, categories]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  if (loading && !Object.keys(menuData).length) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <span className="ml-3 text-gray-600">Loading menu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Sticky Menu */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2">
          <p className="font-semibold text-sm md:text-base flex items-center gap-2">
            Menu
            {isLive && (
              <span className="flex items-center text-xs text-green-600 font-normal">
                <Wifi className="w-3 h-3 mr-1" />
                Live
              </span>
            )}
          </p>

          <div className="relative w-full md:w-60">
            <div className="flex items-center gap-4">
              {/* Animated Cart Button */}
              <div className="relative">
                <motion.button
                  className={`p-2 rounded-md transition-colors relative ${
                    isCartBouncing ? "bg-primary/10" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setOpen(true)}
                  animate={
                    isCartBouncing
                      ? {
                          scale: [1, 1.3, 0.9, 1.1, 1],
                          rotate: [0, -10, 10, -5, 0],
                        }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <ShoppingCart
                    className={`w-5 h-5 ${
                      isCartBouncing ? "text-primary" : "text-black"
                    }`}
                  />

                  {/* Cart item count badge with animation */}
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                        className={`absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                          isCartBouncing ? "bg-primary" : "bg-primary"
                        }`}
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Floating item animation */}
                <AnimatePresence>
                  {floatingItem.show && floatingItem.image && (
                    <motion.div
                      initial={{
                        opacity: 1,
                        scale: 0.5,
                        x: 50,
                        y: 50,
                      }}
                      animate={{
                        opacity: 0,
                        scale: 0.2,
                        x: 0,
                        y: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute top-0 right-0 pointer-events-none"
                    >
                      <img
                        src={floatingItem.image}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-primary shadow-lg"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* "Added!" indicator */}
                <AnimatePresence>
                  {showAddedIndicator && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -5, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Added!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Cart open={open} onOpenChange={setOpen} />

              <div className="relative w-full ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menu..."
                  className="w-full p-2 pl-10 border rounded-md mt-2 md:mt-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-10 px-4 py-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat)}
              className={`whitespace-nowrap pb-2 text-xs md:text-sm font-medium transition-all ${
                active === cat
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-20">
        {categories.map((cat) => (
          <MenuCategorySection
            key={cat}
            title={cat}
            items={menuData[cat]}
            sectionRef={(el: HTMLDivElement | null) =>
              (sectionRefs.current[cat] = el)
            }
          />
        ))}
      </div>
    </div>
  );
}
