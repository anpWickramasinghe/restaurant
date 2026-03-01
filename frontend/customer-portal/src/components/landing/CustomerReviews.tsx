import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Stella G.",
      image: "https://i.pravatar.cc/150?img=1",
      location: "South London",
      date: "24th Sep, 2023",
      rating: 5,
      review: "Flawless delivery and exquisite presentation. The food arrived exactly as it would at the restaurant. Will absolutely be using this for all my dinner parties from now on.",
    },
    {
      id: 2,
      name: "Marcus T.",
      image: "https://i.pravatar.cc/150?img=11",
      location: "West End",
      date: "12th Oct, 2023",
      rating: 5,
      review: "DineSmart's AI recommendations are frighteningly accurate. It found a hidden gem of an Italian place that perfectly matched what I was craving. Impeccable service.",
    },
    {
      id: 3,
      name: "Elena R.",
      image: "https://i.pravatar.cc/150?img=5",
      location: "Chelsea",
      date: "03rd Nov, 2023",
      rating: 4,
      review: "Very elegant interface and smooth tracking. Only took off one star because I wish more local cafes were added to the premium tier, but the current selection is undeniably high quality.",
    },
    {
      id: 4,
      name: "David K.",
      image: "https://i.pravatar.cc/150?img=8",
      location: "Soho",
      date: "15th Nov, 2023",
      rating: 5,
      review: "The luxury experience is prevalent in every detail of the app. Ordering feels less like a chore and more like a curated dining event.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Build an array for desktop that handles wrap-around logic
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <div className="w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              A Taste of <span className="font-serif italic font-medium text-primary">Perfection</span>.
            </h2>
            <p className="text-gray-500 mt-4 max-w-md">Join thousands of food connoisseurs who elevate their dining at home.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-colors focus:outline-none"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-white hover:bg-black transition-colors focus:outline-none shadow-md"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleReviews().map((review, i) => (
              <motion.div
                key={`${review.id}-${currentIndex}`} // Force re-render on index change
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 tracking-tight">{review.name}</h3>
                      <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className={`${index < review.rating ? "text-primary fill-primary" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-base leading-relaxed flex-grow">"{review.review}"</p>
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center">
                  <span className="text-xs font-medium text-gray-400">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover grayscale"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{reviews[currentIndex].name}</h3>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${i < reviews[currentIndex].rating ? "text-primary fill-primary" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                "{reviews[currentIndex].review}"
              </p>
              <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                <span>{reviews[currentIndex].location}</span>
                <span>{reviews[currentIndex].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
