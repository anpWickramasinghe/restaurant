import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PopularCategory = () => {
  const categories = [
    { id: 1, name: "Burgers", image: "../src/assets/food.png" },
    { id: 2, name: "Salads", image: "../src/assets/food.png" },
    { id: 3, name: "Pasta", image: "../src/assets/food.png" },
    { id: 4, name: "Pizza", image: "../src/assets/food.png" },
    { id: 5, name: "Breakfast", image: "../src/assets/food.png" },
    { id: 6, name: "Soups", image: "../src/assets/food.png" },
  ];

  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Popular Categories</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary transition-colors group">
            Explore All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={category.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 p-6 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-center border-t border-gray-50">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE HORIZONTAL SCROLL VIEW */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center flex-shrink-0 w-24 group">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-3 mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-8 flex md:hidden items-center justify-center w-full gap-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-xl py-3 shadow-sm">
          Explore All Categories
        </button>
      </div>
    </div>
  );
};

export default PopularCategory;
