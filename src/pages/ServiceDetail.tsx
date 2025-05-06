import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, Calendar, Utensils, Droplets, Bath, Car, PartyPopper, Plane, Wine, Flower2 } from "lucide-react";

// Dữ liệu mẫu chi tiết dịch vụ
const serviceDetails = {
  id: 1,
  title: "Spa & Làm đẹp",
  description: "Trải nghiệm thư giãn tuyệt đối với các liệu pháp spa cao cấp và dịch vụ làm đẹp chuyên nghiệp.",
  icon: <Droplets className="h-12 w-12" />,
  longDescription: `
    Tại Stellar Hospitality, chúng tôi cam kết mang đến cho bạn trải nghiệm spa và làm đẹp đẳng cấp 5 sao. 
    Với đội ngũ chuyên viên được đào tạo chuyên sâu và không gian thiết kế sang trọng, chúng tôi cung cấp
    các liệu pháp spa cao cấp và dịch vụ làm đẹp toàn diện giúp bạn thư giãn hoàn toàn và tìm lại sự cân bằng cho cơ thể.
  `,
  features: [
    "Massage trị liệu",
    "Chăm sóc da mặt",
    "Phòng xông hơi",
    "Dịch vụ làm tóc và móng",
    "Liệu pháp thảo dược",
    "Liệu pháp đá nóng",
    "Tắm thảo dược",
    "Chăm sóc cơ thể",
    "Chăm sóc móng tay và móng chân",
    "Gói làm đẹp trọn gói"
  ],
  prices: [
    { name: "Massage toàn thân (60 phút)", price: "750.000₫" },
    { name: "Chăm sóc da mặt cơ bản", price: "850.000₫" },
    { name: "Chăm sóc da mặt cao cấp", price: "1.200.000₫" },
    { name: "Liệu pháp đá nóng (90 phút)", price: "1.100.000₫" },
    { name: "Tắm thảo dược", price: "950.000₫" },
    { name: "Gói trọn gói Stellar (3 giờ)", price: "2.500.000₫" }
  ],
  images: [
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1596178060810-72660ee8a9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ],
  benefits: [
    "Giải tỏa căng thẳng và mệt mỏi",
    "Cải thiện sức khỏe làn da",
    "Tăng cường tuần hoàn máu",
    "Detox cơ thể",
    "Cải thiện sức khỏe tinh thần"
  ],
  recommendation: "Để có trải nghiệm tốt nhất, chúng tôi khuyên bạn nên đặt lịch trước ít nhất 24 giờ."
};

// Hàm lấy icon dựa vào id
const getServiceIcon = (id: number) => {
  switch (id) {
    case 1: return <Droplets className="h-12 w-12" />;
    case 2: return <Utensils className="h-12 w-12" />;
    case 3: return <Car className="h-12 w-12" />;
    case 4: return <PartyPopper className="h-12 w-12" />;
    case 5: return <Bath className="h-12 w-12" />;
    case 6: return <Plane className="h-12 w-12" />;
    case 7: return <Wine className="h-12 w-12" />;
    case 8: return <Flower2 className="h-12 w-12" />;
    default: return <Droplets className="h-12 w-12" />;
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const serviceId = parseInt(id || "1");
  
  // Trong thực tế, bạn sẽ lấy dữ liệu dựa trên ID
  // Ở đây chúng ta chỉ sử dụng dữ liệu mẫu với icon khác nhau tùy ID
  const service = { 
    ...serviceDetails, 
    id: serviceId,
    icon: getServiceIcon(serviceId)
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-full shadow-md">
              <div className="text-primary">
                {service.icon}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {service.title}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="overflow-hidden rounded-xl shadow-md"
                >
                  <img 
                    src={image} 
                    alt={`${service.title} ${index + 1}`} 
                    className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Detailed Information Section */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0 h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Mô tả chi tiết</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">{service.longDescription}</p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-4 text-foreground">Lợi ích</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-primary/10 p-4 rounded-lg mt-6">
                    <h3 className="text-lg font-medium mb-2 text-foreground">Lưu ý</h3>
                    <p>{service.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Features and Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Dịch vụ bao gồm</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="justify-start py-2 px-3">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Bảng giá</h3>
                <div className="space-y-3">
                  {service.prices.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b border-dashed border-gray-200 dark:border-gray-700">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail; 