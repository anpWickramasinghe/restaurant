import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Tag, Search, Globe, Headphones, HelpCircle,
  Briefcase, Clock, ShieldCheck, MapPinned
} from "lucide-react";

const tabs = [
  { key: "faq", label: "FAQ" },
  { key: "who", label: "Identity" },
  { key: "contact", label: "Contact" },
  { key: "help", label: "Support" },
];

const faqItems = [
  {
    id: 1,
    question: "How does DineSmart elevate delivery?",
    steps: [
      {
        icon: <Briefcase size={20} className="text-gray-900" />,
        title: "Curated Selection",
        description: "Only the finest local restaurants and gourmet kitchens.",
      },
      {
        icon: <Clock size={20} className="text-gray-900" />,
        title: "Precision Timing",
        description: "AI-optimized routing ensures food arrives exactly as intended.",
      },
      {
        icon: <ShieldCheck size={20} className="text-gray-900" />,
        title: "Quality Guaranteed",
        description: "Specialized heat-retaining transport for every order.",
      },
    ],
  },
  {
    id: 2,
    question: "Do you offer premium memberships?",
    steps: [
      {
        icon: <Tag size={20} className="text-gray-900" />,
        title: "DineSmart Noir",
        description: "Zero delivery fees on all premium restaurant orders.",
      },
      {
        icon: <Globe size={20} className="text-gray-900" />,
        title: "Priority Access",
        description: "Skip the queue at high-demand dining hours.",
      },
      {
        icon: <HelpCircle size={20} className="text-gray-900" />,
        title: "Dedicated Concierge",
        description: "24/7 personal support line for Noir members.",
      },
    ],
  },
  {
    id: 3,
    question: "What is your coverage area?",
    steps: [
      {
        icon: <Search size={20} className="text-gray-900" />,
        title: "City Centers",
        description: "Extensive coverage in major metropolitan zones.",
      },
      {
        icon: <MapPinned size={20} className="text-gray-900" />,
        title: "Suburban Reach",
        description: "Expanding premium delivery to select suburbs.",
      },
      {
        icon: <MapPin size={20} className="text-gray-900" />,
        title: "Real-time Status",
        description: "Enter your zip code to verify immediate availability.",
      },
    ],
  },
];

const infoCards = {
  who: [
    {
      title: "The Standard",
      description: "Setting a new benchmark for what food delivery should feel like—effortless, elegant, and exceptional.",
    },
    {
      title: "The Selection",
      description: "We don't accept every restaurant. We accept the ones worth trying. A strict curation process ensures quality.",
    },
    {
      title: "The Promise",
      description: "If it's not perfect, it's not DineSmart. We stand behind every meal and every driver on our platform.",
    },
  ],
  contact: [
    {
      title: "Concierge Email",
      description: "concierge@dinesmart.luxury",
    },
    {
      title: "Direct Line",
      description: "+44 800 123 4567",
    },
    {
      title: "Headquarters",
      description: "123 Culinary Avenue, West End, London",
    },
  ],
  help: [
    {
      title: "Live Chat",
      description: "Available inside the App 24/7",
    },
    {
      title: "Resolution Standard",
      description: "Issues resolved within 5 minutes, guaranteed.",
    },
    {
      title: "Partner Support",
      description: "restaurants@dinesmart.luxury",
    },
  ],
};

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("faq");
  const [activeFAQ, setActiveFAQ] = useState(1);

  const selectedFAQ = faqItems.find((f) => f.id === activeFAQ) || faqItems[0];
  const cards = activeTab === "faq" ? selectedFAQ.steps : infoCards[activeTab as keyof typeof infoCards] || [];

  return (
    <section className="w-full bg-white py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER AND TABS */}
        <div className="flex flex-col mb-16 items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-10">
            Inside <span className="font-serif italic font-medium text-primary">DineSmart</span>
          </h2>

          <div className="inline-flex bg-gray-100 p-1.5 rounded-full overflow-x-auto max-w-full no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTab(t.key);
                  if (t.key === "faq") setActiveFAQ(1);
                }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === t.key ? "text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {activeTab === t.key && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {activeTab === "faq" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  {/* Left: FAQ Navigator */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {faqItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveFAQ(item.id)}
                        className={`text-left p-5 rounded-2xl transition-all duration-300 border ${activeFAQ === item.id
                            ? "bg-gray-900 text-white border-gray-900 shadow-xl"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <h3 className="font-bold text-lg">{item.question}</h3>
                      </button>
                    ))}
                  </div>

                  {/* Right: FAQ Steps Detail */}
                  <div className="lg:col-span-7 flex flex-col justify-center gap-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFAQ}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        {cards.map((card: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-300">
                              {/* If icon exists, clone it, else put a simple dot */}
                              {card.icon ? card.icon : <div className="w-2 h-2 rounded-full bg-gray-900 group-hover:bg-white" />}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h4>
                              <p className="text-gray-500 leading-relaxed">{card.description}</p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cards.map((card: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-gray-900 hover:border-gray-900 transition-colors duration-500"
                    >
                      <h4 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-500">
                        {card.title}
                      </h4>
                      <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                        {card.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
