import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import MenuModal from "./MenuModal";

type Props = {
  title: string;
  items: {
    id: string | number;
    name: string;
    price: number;
    img: string;
    available: boolean;
  }[];
  sectionRef: (el: HTMLDivElement | null) => void;
};

export default function MenuCategorySection({
  title,
  items,
  sectionRef,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(
    null
  );
  const [clickedItemId, setClickedItemId] = useState<string | number | null>(
    null
  );

  const handleOpenModal = (item: (typeof items)[0]) => {
    if (!item.available) return;
    setClickedItemId(item.id);

    // Small delay for the click animation
    setTimeout(() => {
      setSelectedItem(item);
      setIsModalOpen(true);
      setClickedItemId(null);
    }, 150);
  };

  // Animation variants for card items
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div
      ref={sectionRef}
      id={title}
      className="space-y-4 md:space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2
        className="text-lg sm:text-xl md:text-2xl font-bold px-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h2>

      {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <motion.div key={item.id} custom={index} variants={cardVariants}>
            <Card
              className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full ${
                item.available
                  ? "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "opacity-60"
              }`}
            >
              <CardHeader className="flex flex-row items-start justify-between relative p-3 sm:p-4 pb-2">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold pr-12 line-clamp-2">
                  {item.name}
                </CardTitle>

                {/* Enhanced Add Button - Orange theme */}
                <motion.button
                  onClick={() => handleOpenModal(item)}
                  disabled={!item.available}
                  whileHover={item.available ? { scale: 1.15 } : {}}
                  whileTap={item.available ? { scale: 0.9 } : {}}
                  animate={
                    clickedItemId === item.id
                      ? {
                          scale: [1, 0.8, 1.2, 1],
                          rotate: [0, -15, 15, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 rounded-lg p-2 sm:p-3 shadow-md transition-all ${
                    item.available
                      ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:bg-primary/80"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label={
                    item.available
                      ? `Add ${item.name} to cart`
                      : `${item.name} is unavailable`
                  }
                >
                  <AnimatePresence mode="wait">
                    {clickedItemId === item.id ? (
                      <motion.div
                        key="bag"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                      >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </CardHeader>

              <CardContent className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 pt-0">
                <div className="flex flex-col space-y-1 flex-1 min-w-0">
                  <p className="text-gray-600 text-xs sm:text-sm leading-tight line-clamp-2">
                    Delicious and freshly prepared meal made specially for you.
                  </p>
                  <motion.p
                    className="text-black font-bold text-lg sm:text-xl mt-1 sm:mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Rs {item.price.toLocaleString()}
                  </motion.p>

                  {/* Availability badge */}
                  {!item.available && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center self-start mt-1 sm:mt-2 px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-medium rounded-full"
                    >
                      Currently unavailable
                    </motion.span>
                  )}
                </div>

                <div className="relative shrink-0">
                  <motion.div
                    className={`rounded-xl flex items-center justify-center overflow-hidden ${
                      item.available ? "bg-primary/10" : "bg-gray-200"
                    }`}
                    whileHover={item.available ? { scale: 1.05 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </motion.div>

                  {/* Shine effect for available items */}
                  {item.available && (
                    <motion.div
                      className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        animate={{ translateX: ["100%", "-100%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedItem && (
        <MenuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={{
            id: selectedItem.id,
            title: selectedItem.name,
            price: selectedItem.price,
            image: selectedItem.img,
          }}
        />
      )}
    </motion.div>
  );
}
