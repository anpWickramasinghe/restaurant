import { motion } from "framer-motion";

export default function Experience() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Browse our curated selection of gourmet meals and local favorites.",
      img: "/src/assets/lap.png",
    },
    {
      num: "02",
      title: "Preparation",
      desc: "Our kitchens craft your order with precision and fresh ingredients.",
      img: "/src/assets/chicken.png",
    },
    {
      num: "03",
      title: "Enjoy",
      desc: "Pick up your meal or have it delivered straight to your door.",
      img: "/src/assets/package.png",
    }
  ];

  return (
    <section className="w-full bg-gray-900 text-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center md:text-left mb-16 md:mb-24 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            More than a meal. <br />
            <span className="text-primary font-serif italic font-medium">An Experience.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We've perfected the journey from craving to satisfaction. Simple, elegant, and designed around you.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative">
          {/* Subtle connector line (Desktop only) */}
          <div className="hidden md:block absolute top-[120px] left-[10%] p-px w-[80%] h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center md:items-start text-center md:text-left relative z-10"
            >
              {/* Image Circle */}
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gray-800/50 border border-gray-700 p-8 flex items-center justify-center mb-8 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-sm font-bold text-primary tracking-widest">{step.num}</span>
                <h3 className="font-bold text-2xl tracking-tight">{step.title}</h3>
              </div>

              <p className="text-gray-400 text-base leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
