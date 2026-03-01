import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Utility to animate numbers including "+" and commas
const animateValue = (
  target: string,
  setValue: { (val: any): void; (arg0: string): void }
) => {
  const cleanNumber = parseInt(target.replace(/[^0-9]/g, ""));
  const hasPlus = target.includes("+");
  const hasComma = target.includes(",");

  const duration = 2000; // 2s animation for a more elegant build-up
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;

    // Use easing function for elegance (easeOutQuart)
    const t = Math.min((timestamp - startTime) / duration, 1);
    const easeT = 1 - Math.pow(1 - t, 4);

    const current = Math.floor(easeT * cleanNumber);

    const formatted = hasComma ? current.toLocaleString() : current.toString();
    setValue(hasPlus ? formatted + "+" : formatted);

    if (t < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const CounterSection = () => {
  const counters = [
    { id: 1, value: "546+", label: "Curated Restaurants" },
    { id: 2, value: "89,900+", label: "Flawless Deliveries" },
    { id: 3, value: "90+", label: "Michelin Stars" },
    { id: 4, value: "89+", label: "Cities Worldwide" },
  ];

  const [animatedValues, setAnimatedValues] = useState(counters.map(() => "0"));

  useEffect(() => {
    counters.forEach((counter, index) => {
      animateValue(counter.value, (val) => {
        setAnimatedValues((prev) => {
          const updated = [...prev];
          updated[index] = val;
          return updated;
        });
      });
    });
  }, []);

  return (
    <div className="w-full bg-white py-24 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {counters.map((counter, index) => (
            <div
              key={counter.id}
              className={`flex flex-col items-center sm:items-start md:items-center text-center sm:text-left md:text-center ${index !== 0 ? 'md:border-l md:border-gray-100' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-3">
                  {animatedValues[index]}
                </div>
                <div className="h-0.5 w-8 bg-primary rounded-full mb-4 mx-auto sm:mx-0 md:mx-auto"></div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{counter.label}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
