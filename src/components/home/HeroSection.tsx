import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Tinh Hoa Đẳng Cấp",
    subtitle: "Trải nghiệm dịch vụ sang trọng bậc nhất"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Nghệ Thuật Ẩm Thực",
    subtitle: "Khám phá tinh hoa ẩm thực từ các đầu bếp danh tiếng"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    title: "Không Gian Hoàn Hảo",
    subtitle: "Thiết kế tinh tế, nơi mỗi chi tiết đều là nghệ thuật"
  }
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-[90vh] bg-black">
      {/* Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6 }}
              src={heroSlides[current].image}
              alt={heroSlides[current].title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider dots */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-14 h-1 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-white" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
        <div className="container px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                  {heroSlides[current].title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-24 h-[2px] bg-white mb-6"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10"
                >
                  {heroSlides[current].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/hotels">
                    <Button size="lg" className="min-w-[180px] bg-white text-black hover:bg-white/90 rounded-none">
                      Đặt Phòng
                    </Button>
                  </Link>
                  <Link to="/restaurants">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="backdrop-blur-sm bg-white/5 border-white/30 text-white hover:bg-white/10 rounded-none group min-w-[180px]"
                    >
                      Khám Phá Ẩm Thực
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
