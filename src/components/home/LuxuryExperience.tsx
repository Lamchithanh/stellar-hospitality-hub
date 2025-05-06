import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LuxuryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-white dark:bg-black"
    >
      {/* Nền đặc biệt */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/5 to-zinc-950/30 dark:from-black/5 dark:to-black/50 z-10"></div>
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Luxury experience" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Trải Nghiệm Đẳng Cấp, <br/>Khoảnh Khắc Vĩnh Cửu
            </h2>
            <div className="w-20 h-[2px] bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Mỗi khoảnh khắc tại Stellar Hospitality đều là một trải nghiệm khó quên. Từ thiết kế tinh tế, dịch vụ chu đáo đến ẩm thực đỉnh cao, chúng tôi cam kết mang đến những trải nghiệm vượt trên cả mong đợi.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dịch Vụ Cá Nhân Hóa</h3>
                  <p className="text-muted-foreground">
                    Mỗi chi tiết đều được tùy chỉnh theo sở thích cá nhân của quý khách, mang lại trải nghiệm độc đáo riêng biệt.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Đội Ngũ Chuyên Nghiệp</h3>
                  <p className="text-muted-foreground">
                    Đội ngũ nhân viên được đào tạo chuyên sâu, sẵn sàng đáp ứng mọi nhu cầu của quý khách 24/7.
                  </p>
                </div>
              </div>
            </div>
            <Link to="/services">
              <Button className="rounded-none group">
                Khám phá dịch vụ
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            style={{ y: y2 }}
            className="relative overflow-hidden lg:h-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-12 grid-rows-6 gap-4 h-full"
            >
              <div className="col-span-7 row-span-4 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Spa experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-3 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Restaurant" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-3 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Pool" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-7 row-span-2 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80" 
                  alt="Suite" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              style={{ opacity }}
              className="absolute right-4 bottom-4 bg-black/80 text-white p-4 max-w-[200px]"
            >
              <p className="text-sm italic">
                "Mỗi chi tiết đều được chăm chút tỉ mỉ để mang đến trải nghiệm hoàn hảo nhất."
              </p>
              <p className="text-xs mt-2 font-semibold">— Stellar Hospitality</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 