import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Check } from "lucide-react";

export function MembershipCTA() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/20 dark:from-primary/10 dark:to-primary/5"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-amber-500" />
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Thành Viên VIP
              </h2>
            </div>
            <div className="w-20 h-[2px] bg-primary mb-8"></div>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
              Trở thành thành viên VIP của Stellar Hospitality để nhận được đặc quyền ưu đãi độc quyền, dịch vụ cá nhân hóa và trải nghiệm sang trọng vượt trội tại tất cả các khách sạn và nhà hàng trong hệ thống của chúng tôi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Giảm giá lên đến 25% cho dịch vụ phòng</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Giảm giá đặc biệt tại các nhà hàng</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Ưu tiên đặt phòng và nâng cấp phòng</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Tích điểm thưởng với hệ số nhân ưu đãi</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Check-in sớm và check-out muộn</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <p>Dịch vụ quản gia VIP riêng biệt</p>
              </div>
            </div>
            
            <Link to="/membership">
              <Button className="rounded-none group">
                Khám phá đặc quyền thành viên
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="VIP Experience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-xl font-bold mb-2">Stellar VIP Club</h3>
                <p className="text-sm text-white/90 mb-4">
                  Đăng ký ngay hôm nay để nhận 1.000 điểm thưởng và trải nghiệm đặc quyền thành viên.
                </p>
                <div className="flex items-center">
                  <span className="bg-amber-500 text-xs text-white px-2 py-1 mr-2">ƯU ĐÃI ĐẶC BIỆT</span>
                  <span className="text-sm">Ưu đãi hạn chế, kết thúc vào 31/12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 