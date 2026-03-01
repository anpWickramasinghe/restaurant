import { motion } from "framer-motion";

const ExclusiveMeals = () => {
  const meals = [
    {
      id: 1,
      name: "Burger Combo Box",
      image: "../src/assets/exca.png",
      discount: "40%",
    },
    {
      id: 2,
      name: "White Meal Offer",
      image: "../src/assets/exca.png",
      discount: "20%",
    },
    {
      id: 3,
      name: "Butterbrot Café London",
      image: "../src/assets/exca.png",
      discount: "17%",
    },
  ];

  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-12">Exclusive Offers</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {meals.map((meal, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={meal.id}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Elegant Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent transition-opacity duration-300"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-3">
                  Save {meal.discount}
                </span>
                <h3 className="text-white font-bold text-2xl tracking-tight leading-tight">
                  {meal.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="relative flex-shrink-0 w-[280px] rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/5] w-full">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2">
                    Save {meal.discount}
                  </span>
                  <h3 className="text-white font-bold text-xl tracking-tight leading-tight">
                    {meal.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveMeals;
