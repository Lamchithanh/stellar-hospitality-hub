import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Utensils, 
  Car, 
  Bath, 
  Flower2, 
  PartyPopper, 
  Plane, 
  Wine,
  Droplets
} from "lucide-react";

// Dữ liệu dịch vụ mẫu
const services = [
  {
    id: 1,
    title: "Spa & Làm đẹp",
    description: "Trải nghiệm thư giãn tuyệt đối với các liệu pháp spa cao cấp và dịch vụ làm đẹp chuyên nghiệp.",
    icon: <Droplets className="h-12 w-12 text-primary" />,
    features: [
      "Massage trị liệu",
      "Chăm sóc da mặt",
      "Phòng xông hơi",
      "Dịch vụ làm tóc và móng",
      "Liệu pháp thảo dược"
    ],
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Nhà hàng & Ẩm thực",
    description: "Thưởng thức ẩm thực đẳng cấp với các món ăn đặc sắc được chuẩn bị bởi đầu bếp hàng đầu.",
    icon: <Utensils className="h-12 w-12 text-primary" />,
    features: [
      "Bữa sáng tự chọn",
      "Nhà hàng fine-dining",
      "Phục vụ tại phòng 24/7",
      "Bar & Lounge",
      "Tiệc riêng tư"
    ],
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Đưa đón & Giao thông",
    description: "Dịch vụ đưa đón sang trọng và tiện lợi từ sân bay đến khách sạn hoặc bất kỳ điểm đến nào.",
    icon: <Car className="h-12 w-12 text-primary" />,
    features: [
      "Đón/tiễn sân bay",
      "Thuê xe sang",
      "Tài xế riêng",
      "Tour tham quan thành phố",
      "Đặt vé máy bay"
    ],
    image: "https://images.unsplash.com/photo-1567079664909-090673e99173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Tiệc & Sự kiện",
    description: "Tổ chức tiệc và sự kiện đẳng cấp với không gian sang trọng và dịch vụ chuyên nghiệp.",
    icon: <PartyPopper className="h-12 w-12" />,
    features: [
      "Tiệc cưới",
      "Hội nghị doanh nghiệp",
      "Sinh nhật & Kỷ niệm",
      "Tiệc cocktail",
      "Trang trí theo chủ đề"
    ],
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Wellness & Thể thao",
    description: "Duy trì lối sống lành mạnh với các hoạt động thể thao và chương trình wellness đa dạng.",
    icon: <Bath className="h-12 w-12" />,
    features: [
      "Phòng tập hiện đại",
      "Bể bơi trong nhà/ngoài trời",
      "Yoga & Thiền",
      "Huấn luyện viên cá nhân",
      "Các lớp thể dục nhóm"
    ],
    image: "https://images.unsplash.com/photo-1570440828843-602a0817e5ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    featured: true
  },
  {
    id: 6,
    title: "Tour & Trải nghiệm",
    description: "Khám phá vẻ đẹp địa phương với các tour độc đáo và trải nghiệm văn hóa đặc sắc.",
    icon: <Plane className="h-12 w-12" />,
    features: [
      "Tour văn hóa",
      "Trải nghiệm ẩm thực địa phương",
      "Khám phá thiên nhiên",
      "Hoạt động biển",
      "Học nấu ăn truyền thống"
    ],
    image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 7,
    title: "Giải trí & Đêm",
    description: "Tận hưởng những buổi tối sôi động với các chương trình giải trí đặc sắc và quầy bar cao cấp.",
    icon: <Wine className="h-12 w-12" />,
    features: [
      "Âm nhạc sống",
      "DJ & Sàn nhảy",
      "Rượu vang & cocktail cao cấp",
      "Xì gà lounge",
      "Chương trình văn nghệ"
    ],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    featured: false
  },
  {
    id: 8,
    title: "Dịch vụ Đặc biệt",
    description: "Những trải nghiệm xa xỉ và độc quyền được thiết kế riêng theo yêu cầu của bạn.",
    icon: <Flower2 className="h-12 w-12" />,
    features: [
      "Butler riêng 24/7",
      "Bữa tối riêng tư dưới ánh nến",
      "Thuê du thuyền riêng",
      "Trực thăng tham quan",
      "Dịch vụ mua sắm cá nhân"
    ],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true
  }
];

const Services = () => {
  // Dịch vụ nổi bật
  const featuredServices = services.filter(service => service.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-2 mb-4 text-sm font-medium tracking-wide text-primary rounded-none">
              STELLAR HOSPITALITY
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Dịch Vụ Đẳng Cấp
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Trải nghiệm dịch vụ 5 sao với đội ngũ nhân viên tận tâm, chuyên nghiệp cùng tiện nghi hiện đại, mang đến cho bạn kỳ nghỉ đáng nhớ
            </p>
          </motion.div>
        </section>

        {/* Dịch vụ nổi bật */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-10 h-[2px] bg-primary mr-3"></span>
              Dịch Vụ Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-500 group rounded-none">
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <Badge className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 border-0 text-white rounded-none">
                          Dịch vụ hàng đầu
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto -mt-10 mb-4 relative z-10 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 p-3 w-16 h-16 flex items-center justify-center shadow-lg border-0 rounded-none">
                        <div className="text-primary">
                          {service.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-4">
                      <CardDescription className="mb-6 text-sm">
                        {service.description}
                      </CardDescription>
                      <Link to={`/services/${service.id}`}>
                        <Button className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none">
                          Xem Chi Tiết
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tất cả dịch vụ */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-10 h-[2px] bg-primary mr-3"></span>
              Tất Cả Dịch Vụ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                >
                  <Card className="flex overflow-hidden h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-none">
                    <div className="relative w-1/3 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {service.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="backdrop-blur-sm bg-amber-500/80 hover:bg-amber-600/80 border-0 text-white rounded-none">Nổi bật</Badge>
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="group-hover:text-primary transition-colors duration-300 flex items-center text-xl font-bold">
                          <span className="mr-3 text-primary">{service.icon}</span>
                          <span>{service.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-muted-foreground mb-6">{service.description}</p>
                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-sm flex items-center">
                              <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-muted-foreground">+ {service.features.length - 3} dịch vụ khác</li>
                          )}
                        </ul>
                      </CardContent>
                      <div className="px-6 pb-6 mt-auto">
                        <Link to={`/services/${service.id}`}>
                          <Button className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none">
                            Xem Chi Tiết
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services; 