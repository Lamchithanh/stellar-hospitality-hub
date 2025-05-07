import { useParams, Link, useNavigate } from "react-router-dom";
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
  Refrigerator,
  Info,
  Bookmark,
  Star,
  MessageSquare
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
  ],
  reviews: [
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      date: "15/07/2023",
      comment: "Phòng rất sang trọng và sạch sẽ. Dịch vụ tuyệt vời, nhân viên thân thiện. Tầm nhìn ra biển tuyệt đẹp. Tôi sẽ quay lại."
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      author: "Trần Thị B",
      rating: 4,
      date: "20/06/2023",
      comment: "Phòng rộng rãi và thoải mái. Tuy nhiên, wifi hơi chậm. Mọi thứ khác đều hoàn hảo."
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      author: "Lê Văn C",
      rating: 5,
      date: "05/05/2023",
      comment: "Một trong những khách sạn tốt nhất tôi từng ở. Đồ ăn ngon, phòng sạch sẽ, nhân viên chu đáo."
    }
  ]
};

const RoomDetail = () => {
  const { id } = useParams();
  const roomId = parseInt(id || "1");
  const navigate = useNavigate();
  
  // Trong thực tế, bạn sẽ lấy dữ liệu dựa trên ID
  // Ở đây chúng ta chỉ sử dụng dữ liệu mẫu
  const room = { 
    ...roomDetails,
    id: roomId
  };

  // Hàm xử lý khi click vào nút đặt phòng
  const handleBookRoom = () => {
    navigate(`/room-booking/${roomId}`, { 
      state: { 
        type: 'room', 
        serviceInfo: {
          title: room.name,
          subtitle: `${room.type} - ${room.bedType}`,
          image: room.images[0],
          price: `${room.price.toLocaleString()}đ/đêm`,
          options: [
            { name: room.type, price: `${room.price.toLocaleString()}đ` }
          ],
          returnUrl: `/rooms/${roomId}`
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
              <Link to="/rooms" className="hover:text-primary transition-colors">Phòng</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{room.name}</span>
            </motion.div>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Main Image */}
              <div className="overflow-hidden shadow-lg border dark:border-gray-800">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Room Info */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="mr-3 bg-primary/10 border-0 text-primary">{room.type}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{room.rating}/5</span>
                          <span className="text-sm text-muted-foreground ml-1">({room.reviews?.length || 0} đánh giá)</span>
                        </div>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-4">{room.name}</h1>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none border hover:bg-primary/5 hover:border-primary transition-colors duration-300"
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-muted-foreground border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-primary" />
                      {room.location}
                    </span>
                    <span className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-1 text-primary" />
                      {room.bedType}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-primary" />
                      {room.capacity} người
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">{room.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <Bath className="h-5 w-5 text-primary mr-3" />
                      <span>Phòng tắm sang trọng</span>
                    </div>
                    <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <Wifi className="h-5 w-5 text-primary mr-3" />
                      <span>Wifi miễn phí</span>
                    </div>
                    <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <Droplets className="h-5 w-5 text-primary mr-3" />
                      <span>Hồ bơi riêng</span>
                    </div>
                    <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <Refrigerator className="h-5 w-5 text-primary mr-3" />
                      <span>Minibar đầy đủ</span>
                    </div>
                  </div>
                </div>
                
                <div className="border dark:border-gray-800 p-5 flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-800/50 shadow-sm">
                  <div>
                    <span className="block text-2xl font-bold text-primary">{room.price.toLocaleString()}đ</span>
                    <span className="text-muted-foreground">mỗi đêm, đã bao gồm thuế</span>
                  </div>
                  <Button 
                    className="w-full sm:w-auto mt-3 sm:mt-0 rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={handleBookRoom}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt phòng ngay
                  </Button>
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
              <Info className="h-5 w-5 mr-2 text-primary" />
              Hình ảnh phòng
            </motion.h2>
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
                    className="overflow-hidden border dark:border-gray-800 group hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={image} 
                      alt={`${room.name} ${index + 2}`} 
                      className="w-full h-64 object-cover transition-transform hover:scale-110 duration-700 group-hover:brightness-110"
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
                <Card className="bg-white dark:bg-slate-800 shadow-md border rounded-none">
                  <CardContent className="p-6">
                    <Tabs defaultValue="details">
                      <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Chi tiết</TabsTrigger>
                        <TabsTrigger value="amenities" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Tiện nghi</TabsTrigger>
                        <TabsTrigger value="policies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Chính sách</TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Đánh giá</TabsTrigger>
                      </TabsList>
                      
                      {/* Details Tab */}
                      <TabsContent value="details">
                        <h2 className="text-2xl font-semibold mb-4">Thông tin chi tiết</h2>
                        <p className="text-muted-foreground whitespace-pre-line mb-4 leading-relaxed">
                          {room.longDescription}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="border dark:border-gray-800 p-4 bg-slate-50 dark:bg-slate-900/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
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
                          
                          <div className="border dark:border-gray-800 p-4 bg-slate-50 dark:bg-slate-900/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
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
                            <div key={index} className="flex items-start p-2 border-b dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-300">
                              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
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
                            <div key={index} className="p-3 border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-300">
                              {policy}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      {/* Reviews Tab */}
                      <TabsContent value="reviews">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-semibold">Đánh giá từ khách hàng</h2>
                          <div className="flex items-center bg-primary/10 px-3 py-1.5">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-bold">{room.rating}</span>
                            <span className="text-sm text-muted-foreground ml-1">/ 5</span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {room.reviews?.map((review) => (
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
                <Card className="bg-white dark:bg-slate-800 shadow-md border rounded-none sticky top-4">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-gray-800">Đặt phòng</h3>
                    
                    <div className="mb-6">
                      <div className="flex justify-between pb-3 mb-3">
                        <span>Giá mỗi đêm</span>
                        <span className="font-semibold">{room.price.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between pb-3 mb-3">
                        <span>Thuế & phí dịch vụ</span>
                        <span className="font-semibold">{(room.price * 0.1).toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t dark:border-gray-800">
                        <span>Tổng giá</span>
                        <span className="text-primary">{(room.price * 1.1).toLocaleString()}đ</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={handleBookRoom}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Đặt phòng ngay
                      </Button>
                      <p className="text-sm text-muted-foreground text-center border-t dark:border-gray-800 pt-4 mt-2">
                        Không thu phí cho đến khi nhận phòng.<br />
                        Có thể hủy miễn phí trước 72 giờ.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetail; 