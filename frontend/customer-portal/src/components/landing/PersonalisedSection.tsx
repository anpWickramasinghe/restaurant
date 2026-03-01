import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PersonalisedSection = () => {
  return (
    <div className="w-full bg-white py-24 overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

        {/* Left Side: Abstract/Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center relative"
        >
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-gray-50 rounded-full scale-110 -z-10 blur-xl"></div>
          <img
            src="../src/assets/persona.png"
            alt="Personalised and Instant Delivery"
            className="w-full max-w-[400px] lg:max-w-[500px] object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Right Side: Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-900 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
            Smart Curation
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
            DineSmart is more <br className="hidden md:block" />
            <span className="font-serif italic font-medium text-primary">Personalised</span> <br />
            &amp; Instant.
          </h2>

          <p className="text-gray-500 text-lg mb-8 max-w-md leading-relaxed">
            Powered by advanced AI to understand your exact cravings, filter out what you don't like, and curate a flawless dining experience every single time.
          </p>

          <button className="group flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl shadow-gray-900/10">
            Explore Your Taste
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default PersonalisedSection;
