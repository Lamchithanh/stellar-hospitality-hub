import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Star, Calendar, Users, Wifi, Bath, Flower2, Utensils, Dumbbell, Info, Clock, Car, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Mock data for hotel details
const hotels = {
  1: {
    id: 1,
    name: "Stellar Resort & Spa",
    description: "Trải nghiệm đẳng cấp tại khu nghỉ dưỡng cao cấp của chúng tôi, nơi vẻ đẹp hiện đại kết hợp với dịch vụ hoàn hảo. Stellar Resort & Spa mang đến không gian nghỉ dưỡng tuyệt vời với thiết kế sang trọng, tinh tế đến từng chi tiết và tầm nhìn tuyệt đẹp ra thiên nhiên xung quanh.",
    location: "New York City, NY",
    address: "123 Broadway St, New York, NY 10001",
    rating: 4.8,
    price: 250,
    checkIn: "15:00",
    checkOut: "11:00",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605346434674-a440ca2dca65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    amenities: [
      { name: "Wi-Fi Miễn Phí", icon: Wifi },
      { name: "Hồ Bơi Vô Cực", icon: Bath },
      { name: "Spa Cao Cấp", icon: Flower2 },
      { name: "Nhà Hàng 5 Sao", icon: Utensils },
      { name: "Phòng Tập Hiện Đại", icon: Dumbbell },
      { name: "Dịch Vụ 24/7", icon: Clock },
      { name: "Đỗ Xe Có Người Phục Vụ", icon: Car },
    ],
    rooms: [
      {
        id: 101,
        name: "Phòng Deluxe Giường King",
        price: 250,
        capacity: 2,
        description: "Phòng rộng rãi với giường king-size, tầm nhìn ra thành phố và tiện nghi cao cấp.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Diện tích 45m²", "Minibar miễn phí", "Đồ dùng phòng tắm cao cấp", "Smart TV 55 inch"]
      },
      {
        id: 102,
        name: "Suite Hành Pháp",
        price: 400,
        capacity: 2,
        description: "Suite cao cấp với khu vực tiếp khách riêng, giường king-size và tầm nhìn toàn cảnh.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Diện tích 75m²", "Khu vực phòng khách riêng", "Bồn tắm view đẹp", "Dịch vụ Butler"]
      },
      {
        id: 103,
        name: "Suite Gia Đình",
        price: 500,
        capacity: 4,
        description: "Lý tưởng cho gia đình với hai phòng ngủ, phòng khách và tiện nghi thân thiện với gia đình.",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Diện tích 95m²", "Hai phòng ngủ", "Khu vực vui chơi trẻ em", "Tủ lạnh lớn"]
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Nguyễn Văn A",
        rating: 5,
        date: "15 tháng 3, 2023",
        comment: "Dịch vụ vô cùng xuất sắc và cơ sở vật chất tuyệt đẹp. Spa là điểm nhấn trong kỳ nghỉ của chúng tôi.",
      },
      {
        id: 2,
        user: "Trần Thị B",
        rating: 4,
        date: "28 tháng 2, 2023",
        comment: "Phòng ở sang trọng và vị trí rất thuận tiện. Điểm trừ duy nhất là khu vực hồ bơi hơi đông.",
      },
      {
        id: 3,
        user: "Lê Minh C",
        rating: 5,
        date: "10 tháng 1, 2023",
        comment: "Một trong những khách sạn tốt nhất tôi từng ở. Nhân viên rất nhiệt tình và chu đáo.",
      },
    ],
  },
  // More hotel data...
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hotel = hotels[Number(id) as keyof typeof hotels];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Tự động chuyển ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % hotel?.images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Không tìm thấy khách sạn</h2>
            <p className="mb-6">Khách sạn bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ.</p>
            <Link to="/hotels">
              <Button>Quay lại danh sách khách sạn</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section với Slider */}
        <section className="relative h-[80vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5 }}
                src={hotel.images[currentImageIndex]}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <div className="flex flex-col">
                  <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-2 mb-4 text-sm font-medium tracking-wide">
                    STELLAR HOSPITALITY
                </div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                  >
                    {hotel.name}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-20 h-[2px] bg-white mb-6"
                  />
                  <div className="flex items-center mb-8 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm md:text-base">{hotel.address}</span>
              </div>
                    <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-semibold">{hotel.rating}</span>
                </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link to={`/booking/${hotel.id}`}>
                      <Button size="lg" className="backdrop-blur-sm bg-primary/60 hover:bg-primary/80 rounded-none min-w-[180px] border border-primary/20">
                        Đặt Phòng Ngay
                      </Button>
                    </Link>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="backdrop-blur-sm bg-white/5 border-white/30 text-white hover:bg-white/10 rounded-none group min-w-[180px]"
                    >
                      Xem Virtual Tour
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
          </div>
        </div>
        
          {/* Slider dots */}
          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-14 h-1 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                    ? "bg-white" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Xem ảnh ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Hotel Overview Section */}
        <section className="bg-white py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h6 className="text-primary font-medium">GIỚI THIỆU</h6>
                    <h2 className="text-3xl font-bold">Thiên Đường Nghỉ Dưỡng</h2>
                    <div className="w-20 h-[2px] bg-primary"></div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {hotel.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-muted p-8 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                  <div>
                          <h3 className="font-medium text-lg">Giờ Nhận Phòng</h3>
                          <p>Từ {hotel.checkIn}</p>
                    </div>
                  </div>
                </div>
                
                    <div className="bg-muted p-8 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                          <h3 className="font-medium text-lg">Giờ Trả Phòng</h3>
                          <p>Trước {hotel.checkOut}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-secondary/50 p-8 sticky top-8"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Đặt Phòng Ngay</h3>
                      <div className="w-12 h-[2px] bg-primary mb-6"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giá từ</span>
                        <span className="text-2xl font-bold">${hotel.price}</span>
                      </div>
                      <div className="text-right text-muted-foreground">mỗi đêm</div>
                  </div>
                  
                    <Link to={`/booking/${hotel.id}`} className="block">
                      <Button className="w-full py-6 rounded-none text-lg backdrop-blur-sm bg-primary/80 hover:bg-primary/90 border border-primary/20">
                        Đặt Phòng
                      </Button>
                    </Link>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Giá đã bao gồm thuế và phí</p>
                      <p className="font-medium mt-2">Miễn phí hủy trước 3 ngày</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Full Gallery */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h6 className="text-primary font-medium mb-2">BỘ SƯU TẬP</h6>
              <h2 className="text-3xl font-bold mb-4">Khám Phá Không Gian</h2>
              <div className="w-20 h-[2px] bg-primary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {hotel.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  } overflow-hidden h-[300px] relative group`}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <Button variant="outline" className="backdrop-blur-sm bg-transparent border-white/50 text-white hover:bg-white/10 rounded-none">
                      Xem Ảnh Lớn
                    </Button>
                  </div>
                  <img 
                    src={image} 
                    alt={`${hotel.name} - ${index}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Phần nội dung Tab */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="mx-auto max-w-4xl flex justify-center space-x-10 mb-0 bg-transparent">
                  <TabsTrigger 
                    value="overview" 
                    className={`text-base ${activeTab === 'overview' ? 'text-primary font-semibold' : 'text-muted-foreground'} py-4 rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-primary transition-all`}
                  >
                    Tổng Quan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rooms" 
                    className={`text-base ${activeTab === 'rooms' ? 'text-primary font-semibold' : 'text-muted-foreground'} py-4 rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-primary transition-all`}
                  >
                    Phòng Nghỉ
                  </TabsTrigger>
                  <TabsTrigger 
                    value="amenities" 
                    className={`text-base ${activeTab === 'amenities' ? 'text-primary font-semibold' : 'text-muted-foreground'} py-4 rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-primary transition-all`}
                  >
                    Tiện Nghi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className={`text-base ${activeTab === 'reviews' ? 'text-primary font-semibold' : 'text-muted-foreground'} py-4 rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:text-primary transition-all`}
                  >
                    Đánh Giá
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="mt-10">
                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6">Vị Trí Đắc Địa</h3>
                      <div className="w-16 h-[2px] bg-primary mb-6"></div>
                      <p className="text-muted-foreground mb-8">
                        Tọa lạc tại vị trí trung tâm thành phố, {hotel.name} mang đến sự thuận tiện tuyệt đối cho du khách. Chỉ cách các điểm tham quan nổi tiếng vài phút đi bộ, khách sạn là điểm xuất phát lý tưởng để khám phá thành phố.
                      </p>
                      <div className="bg-secondary/30 overflow-hidden rounded-lg h-[300px]">
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                            <p className="font-medium">Bản đồ tương tác</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold mb-6">Những Điều Nổi Bật</h3>
                      <div className="w-16 h-[2px] bg-primary mb-6"></div>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                            <Bath className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">Hồ Bơi Vô Cực</h4>
                            <p className="text-muted-foreground">
                              Ngắm nhìn thành phố từ hồ bơi vô cực trên tầng thượng, trải nghiệm bơi lội tuyệt vời mà không bị giới hạn tầm nhìn.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                            <Utensils className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">Ẩm Thực Đẳng Cấp</h4>
                            <p className="text-muted-foreground">
                              Nhà hàng 5 sao với đội ngũ đầu bếp nổi tiếng, phục vụ các món ăn đặc sắc từ nhiều nền ẩm thực khác nhau.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                            <Flower2 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">Trung Tâm Spa</h4>
                            <p className="text-muted-foreground">
                              Thư giãn và làm mới bản thân tại trung tâm spa cao cấp với các liệu pháp độc quyền và công nghệ hiện đại.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="rooms" className="mt-0">
                  <div className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                      <h3 className="text-2xl font-bold mb-4">Phòng & Suite Sang Trọng</h3>
                      <div className="w-16 h-[2px] bg-primary mx-auto mb-6"></div>
                      <p className="text-muted-foreground">
                        Mỗi phòng và suite tại {hotel.name} đều được thiết kế tinh tế, kết hợp giữa phong cách hiện đại và những nét văn hóa đặc trưng, mang đến không gian nghỉ ngơi lý tưởng.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {hotel.rooms.map((room, index) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group"
                        >
                          <div className="overflow-hidden relative mb-6">
                            <div className="absolute top-4 right-4 z-10 bg-black/70 text-white px-4 py-2 text-sm font-medium">
                              ${room.price}/đêm
                            </div>
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          
                          <h4 className="text-xl font-semibold mb-3">{room.name}</h4>
                          
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Tối đa {room.capacity} khách</span>
                          </div>
                          
                          <p className="text-muted-foreground mb-5">{room.description}</p>
                          
                          <div className="border-t pt-4 mb-6">
                            <h5 className="font-medium mb-3">Tiện nghi phòng</h5>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                              {room.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Link to={`/booking/${hotel.id}?room=${room.id}`}>
                            <Button className="w-full rounded-none group backdrop-blur-sm bg-primary/80 hover:bg-primary/90 border border-primary/20">
                              Đặt Phòng
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
                <TabsContent value="amenities" className="mt-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                      <h3 className="text-2xl font-bold mb-4">Tiện Nghi & Dịch Vụ</h3>
                      <div className="w-16 h-[2px] bg-primary mx-auto mb-6"></div>
                      <p className="text-muted-foreground">
                        {hotel.name} tự hào cung cấp các tiện nghi cao cấp và dịch vụ đẳng cấp thế giới để đảm bảo kỳ nghỉ của quý khách thật sự đáng nhớ.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {hotel.amenities.map((amenity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-muted/30 p-8 text-center hover:bg-muted/50 transition-colors"
                        >
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                            <amenity.icon className="h-8 w-8 text-primary" />
                          </div>
                          <h4 className="text-lg font-semibold mb-3">{amenity.name}</h4>
                          <div className="w-10 h-[1px] bg-primary/50 mx-auto"></div>
                        </motion.div>
                  ))}
                </div>
                    
                    <div className="mt-16 bg-secondary/30 p-8 md:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                          <h4 className="text-xl font-semibold mb-4">Dịch Vụ Đặc Biệt</h4>
                          <div className="w-12 h-[2px] bg-primary mb-6"></div>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              <p>Dịch vụ đưa đón sân bay</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              <p>Dịch vụ quản gia riêng 24/7</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              <p>Chương trình giải trí đặc biệt mỗi tối</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              <p>Dịch vụ trông trẻ theo yêu cầu</p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              <p>Tổ chức tiệc riêng & sự kiện đặc biệt</p>
                            </li>
                          </ul>
                        </div>
                        <div className="hidden lg:block">
                          <img
                            src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="Dịch vụ đặc biệt"
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      </div>
                </div>
              </div>
            </TabsContent>
            
                <TabsContent value="reviews" className="mt-0">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                      <h3 className="text-2xl font-bold mb-4">Đánh Giá Từ Khách Hàng</h3>
                      <div className="w-16 h-[2px] bg-primary mx-auto mb-6"></div>
                      <p className="text-muted-foreground">
                        Khám phá trải nghiệm của khách hàng tại {hotel.name} qua những đánh giá chân thực.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-8 mb-12">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="text-center md:border-r md:pr-8 md:w-1/3">
                          <div className="text-5xl font-bold mb-2">{hotel.rating}</div>
                          <div className="flex justify-center gap-1 mb-3">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">Dựa trên {hotel.reviews.length} đánh giá</p>
                        </div>
                        
                        <div className="flex-1">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium w-24">Tuyệt vời (5)</div>
                              <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[70%]"></div>
                              </div>
                              <div className="text-sm font-medium w-10">70%</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium w-24">Tốt (4)</div>
                              <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[20%]"></div>
                              </div>
                              <div className="text-sm font-medium w-10">20%</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium w-24">Trung bình (3)</div>
                              <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[10%]"></div>
                              </div>
                              <div className="text-sm font-medium w-10">10%</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium w-24">Kém (2)</div>
                              <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[0%]"></div>
                              </div>
                              <div className="text-sm font-medium w-10">0%</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-medium w-24">Rất kém (1)</div>
                              <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[0%]"></div>
                              </div>
                              <div className="text-sm font-medium w-10">0%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-10">
                      {hotel.reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="border-b pb-10"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-1">{review.user}</h4>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                      <Button variant="outline" className="rounded-none bg-transparent border-primary/50 hover:bg-primary/5 text-primary">Xem Thêm Đánh Giá</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
          </Tabs>
        </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 mb-6 text-sm font-medium tracking-wider">
                TRẢI NGHIỆM ĐẬM CHẤT STELLAR
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Sẵn Sàng Cho Kỳ Nghỉ Đáng Nhớ?
              </h2>
              <p className="text-xl mb-10 text-white/80 leading-relaxed">
                Đặt phòng ngay hôm nay để trải nghiệm dịch vụ đẳng cấp, tiện nghi hiện đại và ẩm thực tinh tế. Mỗi chi tiết đều được chuẩn bị để tạo nên kỷ niệm khó quên.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/booking/${hotel.id}`}>
                  <Button size="lg" className="min-w-[200px] backdrop-blur-sm bg-white/20 text-white hover:bg-white/30 border border-white/20">
                    Đặt Phòng Ngay
                  </Button>
                </Link>
                <Link to="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="min-w-[200px] backdrop-blur-sm bg-transparent border-white/30 text-white hover:bg-white/10 group"
                  >
                    Khám Phá Dịch Vụ
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
            </Link>
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">50+</h3>
                  <p className="text-white/70">Phòng & Suite</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">5</h3>
                  <p className="text-white/70">Nhà Hàng & Bar</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">24/7</h3>
                  <p className="text-white/70">Dịch Vụ Hỗ Trợ</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">100%</h3>
                  <p className="text-white/70">Khách Hài Lòng</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetail;
