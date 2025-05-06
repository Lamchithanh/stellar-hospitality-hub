import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Check, 
  Calendar, 
  User, 
  Wifi, 
  Tv, 
  Utensils, 
  BedDouble, 
  Bath, 
  Droplets, 
  Refrigerator
} from "lucide-react";

// Dữ liệu mẫu chi tiết phòng
const roomDetails = {
  id: 1,
  name: "Phòng Suite Sang Trọng",
  type: "Suite",
  price: 2500000,
  location: "Đà Nẵng",
  rating: 4.8,
  size: "60m²",
  capacity: 2,
  bedType: "1 giường King size",
  description: "Phòng suite sang trọng với tầm nhìn ra biển, nội thất cao cấp và không gian riêng tư tuyệt đối.",
  longDescription: `
    Phòng Suite Sang Trọng của chúng tôi là không gian lý tưởng cho kỳ nghỉ hoàn hảo của bạn. Với diện tích 60m², 
    phòng được thiết kế tinh tế với nội thất cao cấp và tầm nhìn tuyệt đẹp ra biển Đà Nẵng.
    
    Phòng được trang bị đầy đủ tiện nghi hiện đại bao gồm TV màn hình phẳng, minibar, máy pha cà phê, két an toàn và 
    phòng tắm sang trọng với bồn tắm đứng riêng biệt. Giường King size với chăn ga gối đệm cao cấp đảm bảo giấc ngủ 
    thoải mái cho bạn.
    
    Đặc biệt, phòng còn có ban công riêng nơi bạn có thể ngắm nhìn hoàng hôn tuyệt đẹp trên biển hoặc thưởng thức 
    bữa sáng lãng mạn trong không gian riêng tư.
  `,
  amenities: [
    "Wifi miễn phí tốc độ cao",
    "Điều hòa nhiệt độ",
    "TV màn hình phẳng",
    "Minibar",
    "Két an toàn",
    "Máy pha cà phê",
    "Bàn làm việc",
    "Phòng tắm với vòi sen và bồn tắm riêng",
    "Đồ vệ sinh cá nhân cao cấp",
    "Áo choàng tắm và dép đi trong phòng",
    "Ban công riêng với tầm nhìn ra biển",
    "Dịch vụ phòng 24/7"
  ],
  images: [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1605346576608-92f1346b67d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ],
  policies: [
    "Nhận phòng: 14:00, Trả phòng: 12:00",
    "Không hút thuốc",
    "Thú cưng không được phép",
    "Hủy phòng miễn phí trước 72 giờ",
    "Phụ thu cho người lớn/trẻ em thêm"
  ]
};

const RoomDetail = () => {
  const { id } = useParams();
  const roomId = parseInt(id || "1");
  
  // Trong thực tế, bạn sẽ lấy dữ liệu dựa trên ID
  // Ở đây chúng ta chỉ sử dụng dữ liệu mẫu
  const room = { 
    ...roomDetails,
    id: roomId
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Main Image */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src={room.images[0]} 
                alt={room.name} 
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Room Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{room.name}</h1>
                <div className="flex items-center gap-3 mb-3 text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {room.location}
                  </span>
                  <span className="flex items-center">
                    <BedDouble className="h-4 w-4 mr-1" />
                    {room.bedType}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {room.capacity} người
                  </span>
                </div>
                <Badge variant="outline" className="mb-4">{room.type}</Badge>
                <p className="text-muted-foreground mb-6">{room.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-primary mr-2" />
                    <span>Phòng tắm sang trọng</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 text-primary mr-2" />
                    <span>Wifi miễn phí</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-primary mr-2" />
                    <span>Hồ bơi riêng</span>
                  </div>
                  <div className="flex items-center">
                    <Refrigerator className="h-5 w-5 text-primary mr-2" />
                    <span>Minibar đầy đủ</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <span className="block text-2xl font-bold text-primary">{room.price.toLocaleString()}đ</span>
                  <span className="text-muted-foreground">mỗi đêm, đã bao gồm thuế</span>
                </div>
                <Link to="/booking">
                  <Button className="w-full sm:w-auto mt-3 sm:mt-0 bg-gradient-to-r from-primary to-primary/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt phòng ngay
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Gallery Section */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {room.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="overflow-hidden rounded-lg shadow-md"
                >
                  <img 
                    src={image} 
                    alt={`${room.name} ${index + 2}`} 
                    className="w-full h-64 object-cover transition-transform hover:scale-110 duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Content Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white dark:bg-slate-800 shadow-md border-0">
                <CardContent className="p-6">
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="details">Chi tiết</TabsTrigger>
                      <TabsTrigger value="amenities">Tiện nghi</TabsTrigger>
                      <TabsTrigger value="policies">Chính sách</TabsTrigger>
                    </TabsList>
                    
                    {/* Details Tab */}
                    <TabsContent value="details">
                      <h2 className="text-2xl font-semibold mb-4">Thông tin chi tiết</h2>
                      <p className="text-muted-foreground whitespace-pre-line mb-4">
                        {room.longDescription}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-secondary/30 rounded-lg p-4">
                          <h3 className="font-medium mb-2 flex items-center">
                            <BedDouble className="h-5 w-5 mr-2 text-primary" />
                            Thông tin phòng
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Diện tích: {room.size}</li>
                            <li>Loại giường: {room.bedType}</li>
                            <li>Sức chứa: {room.capacity} người</li>
                          </ul>
                        </div>
                        
                        <div className="bg-secondary/30 rounded-lg p-4">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Utensils className="h-5 w-5 mr-2 text-primary" />
                            Đồ ăn & thức uống
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Bữa sáng miễn phí</li>
                            <li>Minibar</li>
                            <li>Máy pha cà phê</li>
                            <li>Dịch vụ phòng 24/7</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Amenities Tab */}
                    <TabsContent value="amenities">
                      <h2 className="text-2xl font-semibold mb-4">Tiện nghi phòng</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {room.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    {/* Policies Tab */}
                    <TabsContent value="policies">
                      <h2 className="text-2xl font-semibold mb-4">Chính sách phòng</h2>
                      <div className="space-y-3">
                        {room.policies.map((policy, index) => (
                          <div key={index} className="pb-3 border-b border-dashed border-gray-200 dark:border-gray-700">
                            {policy}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Right Sidebar - Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white dark:bg-slate-800 shadow-md border-0 sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Đặt phòng</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between border-b border-dashed pb-3 mb-3">
                      <span>Giá mỗi đêm</span>
                      <span className="font-semibold">{room.price.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed pb-3 mb-3">
                      <span>Thuế & phí dịch vụ</span>
                      <span className="font-semibold">{(room.price * 0.1).toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Tổng giá</span>
                      <span className="text-primary">{(room.price * 1.1).toLocaleString()}đ</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                      <Calendar className="h-4 w-4 mr-2" />
                      Đặt phòng ngay
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Không thu phí cho đến khi nhận phòng.<br />
                      Có thể hủy miễn phí trước 72 giờ.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetail; 