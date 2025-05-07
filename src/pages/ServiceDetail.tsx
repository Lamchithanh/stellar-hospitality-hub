import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Check, 
  Calendar, 
  Utensils, 
  Droplets, 
  Bath, 
  Car, 
  PartyPopper, 
  Plane, 
  Wine, 
  Flower2,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare,
  Star
} from "lucide-react";

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
  recommendation: "Để có trải nghiệm tốt nhất, chúng tôi khuyên bạn nên đặt lịch trước ít nhất 24 giờ.",
  location: "Stellar Spa & Beauty Center, Tầng 3, Stellar Hotel Đà Nẵng",
  openHours: "7:00 - 21:00 hàng ngày",
  rating: 4.9,
  reviewCount: 48,
  reviews: [
    {
      id: 1,
      author: "Mai Anh",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      date: "15/07/2023",
      comment: "Dịch vụ spa tuyệt vời, nhân viên chuyên nghiệp và nhiệt tình. Không gian rất thư giãn và sang trọng. Tôi sẽ quay lại!"
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=9",
      author: "Quốc Bảo",
      rating: 5,
      date: "20/06/2023",
      comment: "Liệu pháp đá nóng thực sự giúp tôi thư giãn và giảm đau mỏi cơ. Chuyên viên rất tận tâm và kỹ thuật massage chuyên nghiệp."
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=15",
      author: "Thanh Hương",
      rating: 4,
      date: "05/05/2023",
      comment: "Chăm sóc da mặt cao cấp giúp da tôi sáng và căng mịn hơn. Tuy nhiên thời gian chờ hơi lâu dù đã đặt lịch trước."
    }
  ]
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
  const navigate = useNavigate();
  
  // Trong thực tế, bạn sẽ lấy dữ liệu dựa trên ID
  // Ở đây chúng ta chỉ sử dụng dữ liệu mẫu với icon khác nhau tùy ID
  const service = { 
    ...serviceDetails, 
    id: serviceId,
    icon: getServiceIcon(serviceId)
  };

  // Hàm xử lý khi click vào nút đặt lịch
  const handleBooking = () => {
    navigate(`/service-booking/${serviceId}`, { 
      state: { 
        type: 'service', 
        serviceInfo: {
          title: service.title,
          image: service.images[0],
          options: service.prices,
          returnUrl: `/services/${serviceId}`
        } 
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-sm text-muted-foreground"
            >
              <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link to="/services" className="hover:text-primary transition-colors">Dịch vụ</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{service.title}</span>
            </motion.div>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 mr-4">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{service.rating}/5</span>
                      <span className="text-sm text-muted-foreground ml-1">({service.reviewCount} đánh giá)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center mb-4 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{service.location}</span>
                </div>
                
                <div className="flex items-center mb-6 text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{service.openHours}</span>
                </div>
                
                <Button 
                  className="rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={handleBooking}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Đặt lịch ngay
                </Button>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden border dark:border-gray-800 shadow-md h-[400px] group">
                  <img 
                    src={service.images[0]} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 group-hover:brightness-110"
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Gallery Section */}
          <section className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold mb-6 flex items-center border-b border-gray-200 dark:border-gray-800 pb-3"
            >
              Hình ảnh dịch vụ
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="overflow-hidden border dark:border-gray-800 group hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={image} 
                      alt={`${service.title} ${index + 1}`} 
                      className="w-full h-64 object-cover transition-transform duration-700 hover:scale-105 group-hover:brightness-110"
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
              <Card className="bg-white dark:bg-slate-800 shadow-md rounded-none border h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 pb-3 border-b dark:border-gray-800">Mô tả chi tiết</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">{service.longDescription}</p>
                    
                    <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">Lợi ích</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start p-3 border dark:border-gray-800 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                          <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="border dark:border-gray-800 p-6 mt-8 bg-slate-50 dark:bg-slate-900/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <h3 className="text-lg font-medium mb-3 text-foreground">Lưu ý quan trọng</h3>
                      <p>{service.recommendation}</p>
                    </div>
                    
                    {/* Đánh giá từ khách hàng */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-6 pb-2 border-b dark:border-gray-800">
                        <h3 className="text-xl font-medium text-foreground">Đánh giá từ khách hàng</h3>
                        <div className="flex items-center bg-primary/10 px-3 py-1.5">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-bold">{service.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">/ 5</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {service.reviews?.map((review) => (
                          <div key={review.id} className="border dark:border-gray-800 p-4 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-none overflow-hidden border dark:border-gray-800">
                                <img
                                  src={review.avatar}
                                  alt={review.author}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">{review.author}</h4>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                                <div className="flex mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <p className="text-muted-foreground text-sm">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="mt-6 rounded-none border hover:bg-primary/5 w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Xem tất cả đánh giá
                      </Button>
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
              <Card className="bg-white dark:bg-slate-800 shadow-md rounded-none border mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-gray-800">Dịch vụ bao gồm</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-2 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-800 shadow-md rounded-none border sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-gray-800">Bảng giá</h3>
                  <div className="space-y-3">
                    {service.prices.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border-b dark:border-gray-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-300">
                        <span>{item.name}</span>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      onClick={handleBooking}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Đặt lịch ngay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>
          
          {/* Related Services Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
              Dịch vụ liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((idx) => (
                <Card key={idx} className="rounded-none border dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.images[idx % service.images.length]} 
                      alt={`Dịch vụ liên quan ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Dịch vụ {idx === 1 ? "Nhà hàng" : idx === 2 ? "Phòng họp" : "Tour du lịch"}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Trải nghiệm {idx === 1 ? "ẩm thực" : idx === 2 ? "không gian họp sang trọng" : "du lịch khám phá"} cùng Stellar Hospitality.
                    </p>
                    <Button variant="outline" className="w-full rounded-none mt-2 hover:bg-primary/5 hover:border-primary/30 transition-colors" size="sm">
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail; 