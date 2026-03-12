import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

interface MenuBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const MenuBanner = ({
  title = "Savor the Flavor",
  subtitle = "Experience culinary excellence with our carefully curated menu featuring fresh, locally sourced ingredients.",
  backgroundImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
}: MenuBannerProps) => {
  return (
    <div className="relative h-[20vh] min-h-[500px] w-full overflow-hidden  shadow-3xl">
      {/* Background Image with Parallax-like Zoom */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
          >
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            <span className="uppercase tracking-wider text-primary-foreground">
              Premium Selection
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-8 text-lg text-gray-200 md:text-xl"
          >
            {subtitle}
          </motion.p>

       
        </div>
      </div>
    </div>
  );
};

export default MenuBanner;


