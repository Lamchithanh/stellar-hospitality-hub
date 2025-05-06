import { motion } from "framer-motion";
import { Shield, Award, Gem, Star, Users, Clock } from "lucide-react";

export function ExcellenceSection() {
  const excellencePoints = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Chất Lượng Đẳng Cấp",
      description: "Cam kết mang đến trải nghiệm hoàn hảo với tiêu chuẩn quốc tế 5 sao và dịch vụ được cá nhân hóa."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Giải Thưởng Quốc Tế",
      description: "Tự hào đạt được nhiều giải thưởng danh giá từ các tổ chức du lịch và khách sạn uy tín toàn cầu."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Ẩm Thực Đỉnh Cao",
      description: "Thưởng thức các món ăn độc đáo được chế biến bởi đội ngũ đầu bếp danh tiếng với nguyên liệu tươi ngon nhất."
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Thiết Kế Tinh Tế",
      description: "Không gian được thiết kế tỉ mỉ, kết hợp giữa kiến trúc hiện đại và nét văn hóa truyền thống."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Đội Ngũ Chuyên Nghiệp",
      description: "Nhân viên được đào tạo chuyên sâu, luôn sẵn sàng phục vụ và đáp ứng mọi yêu cầu của quý khách."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Dịch Vụ 24/7",
      description: "Hỗ trợ liên tục 24/7 đảm bảo mọi nhu cầu của quý khách đều được đáp ứng bất kể thời gian nào."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] -top-64 -right-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] -bottom-64 -left-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Cam Kết Chất Lượng
          </h2>
          <div className="w-20 h-[2px] bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-[800px] text-lg">
            Chúng tôi không ngừng nỗ lực để mang đến những trải nghiệm sang trọng và tinh tế nhất, xứng đáng với niềm tin của quý khách.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {excellencePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow duration-300 h-full">
                <div className="mt-1 text-primary">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800"
        >
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-semibold mb-4">Chứng Nhận Chất Lượng</h3>
            <p className="text-muted-foreground mb-6">
              Stellar Hospitality tự hào là đối tác cao cấp của các tổ chức du lịch và khách sạn uy tín toàn cầu, cam kết mang đến dịch vụ tốt nhất cho khách hàng.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <img src="/images/certification-1.png" alt="Certification" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/images/certification-2.png" alt="Certification" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/images/certification-3.png" alt="Certification" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 