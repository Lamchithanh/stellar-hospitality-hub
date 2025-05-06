import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    role: "Doanh nhân",
    image: "https://i.pravatar.cc/150?img=32",
    content: "Tôi đã có nhiều trải nghiệm tại các khách sạn 5 sao trên thế giới, nhưng phải nói rằng Stellar Hospitality mang đến một đẳng cấp khác biệt. Từ cách phục vụ tận tâm đến không gian sang trọng, mọi thứ đều hoàn hảo.",
    rating: 5
  },
  {
    id: 2,
    name: "Trần Thị Mai Anh",
    role: "Chuyên gia ẩm thực",
    image: "https://i.pravatar.cc/150?img=23",
    content: "Nhà hàng tại Stellar không chỉ là nơi thưởng thức ẩm thực mà còn là nơi trải nghiệm nghệ thuật ẩm thực đích thực. Các món ăn được chế biến tinh tế với nguyên liệu cao cấp, đội ngũ đầu bếp chuyên nghiệp.",
    rating: 5
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    role: "Nhiếp ảnh gia",
    image: "https://i.pravatar.cc/150?img=11",
    content: "Không gian được thiết kế vô cùng tinh tế và sang trọng, là điểm đến lý tưởng cho những buổi chụp ảnh. Nhân viên rất thân thiện và hỗ trợ nhiệt tình. Tôi sẽ quay lại đây trong tương lai.",
    rating: 5
  },
  {
    id: 4,
    name: "Phạm Quỳnh Anh",
    role: "Giám đốc marketing",
    image: "https://i.pravatar.cc/150?img=41",
    content: "Kỳ nghỉ tuyệt vời nhất mà tôi từng có. Dịch vụ phòng hoàn hảo, nhân viên chuyên nghiệp và thân thiện. Đặc biệt spa tại đây thực sự đẳng cấp, giúp tôi thư giãn tuyệt đối.",
    rating: 5
  }
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setCurrent(current => (current === testimonials.length - 1 ? 0 : current + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent(current => (current === 0 ? testimonials.length - 1 : current - 1));
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, next]);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 relative overflow-hidden">
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Trải Nghiệm Của Khách Hàng
          </h2>
          <div className="w-20 h-[2px] bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-[800px] text-lg">
            Những đánh giá chân thực từ những vị khách đã trải nghiệm dịch vụ của chúng tôi
          </p>
        </motion.div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={prev}
              className="bg-white dark:bg-zinc-800 shadow-lg p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-all duration-300 hover:scale-105"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
          
          <div className="relative h-full overflow-hidden py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-zinc-800/50 p-8 md:p-10 shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-zinc-700 shadow-lg">
                      <img 
                        src={testimonials[current].image} 
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">{testimonials[current].name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{testimonials[current].role}</p>
                    <div className="flex mt-2">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-lg italic mb-6">
                      {testimonials[current].content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={next}
              className="bg-white dark:bg-zinc-800 shadow-lg p-3 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-all duration-300 hover:scale-105"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                current === index 
                  ? "bg-primary w-8" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 