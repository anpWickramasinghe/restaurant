import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center relative z-10">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold tracking-wider uppercase mb-6">
              Exceptional Dining, Delivered
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6"
          >
            Feast Your Senses. <br />
            <span className="text-primary font-serif italic font-medium">Fast & Fresh.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Experience culinary excellence curated from top restaurants. Reserve your table or enjoy gourmet meals at home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <button className="group flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-black transition-all shadow-lg shadow-gray-900/20">
              Order Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-center bg-gray-100 text-gray-900 px-8 py-4 rounded-xl text-base font-medium hover:bg-gray-200 transition-colors">
              Book a Table
            </button>
          </motion.div>
        </div>

        {/* RIGHT IMAGE COMPOSITION */}
        <div className="relative flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
          {/* Abstract backdrop shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-50 rounded-full blur-3xl -z-10"></div>

          <div className="relative w-full max-w-lg aspect-square">
            {/* MAIN IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl z-20"
            >
              <img
                src="src/assets/womenpizza.png"
                alt="Woman eating pizza"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>

            {/* FLOATING NOTIFICATION 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-6 md:-left-12 top-10 bg-white/90 backdrop-blur-md shadow-xl border border-gray-100/50 rounded-2xl p-4 w-64 z-30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">Accepted</span>
                <span className="text-[10px] text-gray-500 font-medium">Just now</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Your order from <span className="text-gray-900 font-bold">La Piazza</span> is being prepared.</p>
            </motion.div>

            {/* FLOATING NOTIFICATION 2 */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -right-6 md:-right-12 bottom-20 bg-gray-900 shadow-2xl rounded-2xl p-4 w-60 z-30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]"></div>
                <span className="text-xs font-bold text-white tracking-wide uppercase">Arriving</span>
              </div>
              <p className="text-sm text-gray-300 font-medium">Your rider is <span className="text-white font-bold">2 mins</span> away. Get ready!</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
