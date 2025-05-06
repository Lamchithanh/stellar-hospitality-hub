import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Phone, Utensils, Music, Leaf, Coffee, Wine, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dữ liệu mẫu chi tiết nhà hàng
const restaurantDetails = {
  id: 1,
  name: "Stellar Fine Dining Hà Nội",
  location: "Hoàn Kiếm, Hà Nội",
  rating: 4.7,
  priceRange: "$$$$",
  cuisine: "Ẩm thực cao cấp",
  imageUrl: "https://source.unsplash.com/random/1200x600/?restaurant,luxury,vietnamese",
  features: ["Phòng riêng", "Tuyển chọn rượu vang", "Đỗ xe miễn phí"],
  featured: true,
  discount: 0,
  description: "Trải nghiệm ẩm thực tinh tế với tầm nhìn tuyệt đẹp ra Hồ Gươm",
  longDescription: `
    Nằm tại vị trí đẹp nhất Hà Nội với tầm nhìn ra Hồ Gươm, Stellar Fine Dining mang đến trải nghiệm ẩm thực 
    đẳng cấp 5 sao. Nhà hàng chúng tôi kết hợp giữa hương vị truyền thống Việt Nam với kỹ thuật chế biến hiện 
    đại của phương Tây, tạo nên những món ăn độc đáo làm say lòng thực khách.
    
    Với không gian sang trọng và tinh tế, Stellar Fine Dining là điểm đến lý tưởng cho những buổi tối lãng mạn, 
    tiệc doanh nghiệp hay các dịp kỷ niệm quan trọng. Đội ngũ đầu bếp giàu kinh nghiệm của chúng tôi luôn đảm bảo 
    mỗi món ăn đều là một tác phẩm nghệ thuật, kết hợp hài hòa giữa hương vị và cách trình bày.
  `,
  address: "88 Phố Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
  phone: "+84 24 3934 5678",
  openHours: {
    weekday: "11:00 - 23:00",
    weekend: "10:00 - 24:00"
  },
  menu: {
    appetizers: [
      { name: "Gỏi cuốn tôm thịt", description: "Bánh tráng cuốn với tôm, thịt heo, bún, rau thơm", price: "120.000₫" },
      { name: "Chả giò hải sản", description: "Chả giò giòn rụm nhân hải sản và rau củ", price: "150.000₫" },
      { name: "Súp bào ngư", description: "Súp bào ngư thượng hạng với nấm đông trùng hạ thảo", price: "280.000₫" }
    ],
    mainCourses: [
      { name: "Cá chẽm hấp Hồng Kông", description: "Cá chẽm tươi hấp với hành, gừng và xì dầu đặc biệt", price: "350.000₫" },
      { name: "Bò Wagyu nướng truffle", description: "Thăn bò Wagyu A5 nướng với dầu truffle", price: "680.000₫" },
      { name: "Tôm hùm nướng bơ tỏi", description: "Tôm hùm tươi sống nướng với bơ tỏi và rau thơm", price: "1.200.000₫" }
    ],
    desserts: [
      { name: "Bánh flan caramel", description: "Bánh flan mềm mịn với lớp caramel đắng nhẹ", price: "95.000₫" },
      { name: "Trái cây theo mùa", description: "Đĩa trái cây tươi theo mùa được cắt và trình bày đẹp mắt", price: "120.000₫" }
    ],
    drinks: [
      { name: "Rượu vang Đà Lạt", description: "Rượu vang đỏ sản xuất tại Đà Lạt", price: "180.000₫/ly" },
      { name: "Cocktail đặc biệt Stellar", description: "Cocktail đặc biệt pha chế độc quyền", price: "220.000₫" }
    ]
  },
  gallery: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ],
  reviews: [
    { author: "Nguyễn Văn A", rating: 5, comment: "Đồ ăn tuyệt vời, dịch vụ chuyên nghiệp. Sẽ quay lại!" },
    { author: "Trần Thị B", rating: 4, comment: "Không gian sang trọng, món ăn ngon nhưng giá hơi cao." },
    { author: "Lê Văn C", rating: 5, comment: "Trải nghiệm ẩm thực hoàn hảo với tầm nhìn tuyệt đẹp ra Hồ Gươm." }
  ]
};

// Hàm đánh giá hiển thị sao
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
      <span className="ml-2">{rating}</span>
    </div>
  );
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurantId = parseInt(id || "1");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Trong thực tế, bạn sẽ lấy dữ liệu dựa trên ID
  // Ở đây chúng ta chỉ sử dụng dữ liệu mẫu
  const restaurant = { 
    ...restaurantDetails, 
    id: restaurantId
  };

  // Hàm xử lý đặt bàn
  const handleBookTable = () => {
    navigate(`/table-booking/${restaurantId}`);
  };

  // Hàm xử lý gọi ngay
  const handleCallNow = () => {
    // Trong môi trường thực tế, chúng ta có thể sử dụng các API của trình duyệt để gọi số
    const phoneNumber = restaurant.phone.replace(/\s/g, "");
    
    // Mở ứng dụng điện thoại nếu đang ở trên thiết bị di động
    window.location.href = `tel:${phoneNumber}`;
    
    // Hiển thị thông báo nếu đang ở trên desktop
    toast({
      title: "Gọi điện thoại",
      description: `Đang gọi số ${restaurant.phone}. Nếu thiết bị của bạn không hỗ trợ, vui lòng gọi trực tiếp.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Image */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] overflow-hidden rounded-none shadow-lg"
          >
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-black/30 border-t border-white/10">
              <div className="container mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-[2px] bg-primary"></div>
                  <Badge variant="secondary" className="bg-primary/80 text-white hover:bg-primary/90 border-0 rounded-none">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{restaurant.name}</h1>
                <div className="flex items-center gap-6 flex-wrap text-white/90">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {restaurant.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {restaurant.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.openHours.weekday}
                  </span>
                  <span className="py-1 px-3 bg-white/20 backdrop-blur-sm rounded-none">{restaurant.priceRange}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content - Description and Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            {/* Description */}
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-[2px] bg-primary"></div>
                  <h2 className="text-2xl font-semibold">Giới thiệu</h2>
                </div>
                <p className="text-muted-foreground mb-6 whitespace-pre-line">
                  {restaurant.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  {restaurant.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 text-sm bg-muted/30 hover:bg-primary/10 border-0 rounded-none">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for Menu, Gallery, Reviews */}
            <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none shadow-lg">
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 rounded-none">
                <CardContent className="p-8">
                  <Tabs defaultValue="menu">
                    <TabsList className="grid grid-cols-3 mb-8 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-none">
                      <TabsTrigger value="menu" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">
                        Thực đơn
                      </TabsTrigger>
                      <TabsTrigger value="gallery" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">
                        Hình ảnh
                      </TabsTrigger>
                      <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">
                        Đánh giá
                      </TabsTrigger>
                    </TabsList>
                    
                    {/* Menu Tab */}
                    <TabsContent value="menu" className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium mb-6 flex items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                          <Utensils className="h-5 w-5 mr-2 text-primary" />
                          <span>Khai vị</span>
                          <div className="w-10 h-[2px] bg-primary ml-4"></div>
                        </h3>
                        <div className="space-y-4">
                          {restaurant.menu.appetizers.map((item, index) => (
                            <div key={index} className="flex justify-between p-3 border-b border-dashed hover:bg-muted/20 transition-colors">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-none h-fit">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-6 flex items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                          <Utensils className="h-5 w-5 mr-2 text-primary" />
                          <span>Món chính</span>
                          <div className="w-10 h-[2px] bg-primary ml-4"></div>
                        </h3>
                        <div className="space-y-4">
                          {restaurant.menu.mainCourses.map((item, index) => (
                            <div key={index} className="flex justify-between p-3 border-b border-dashed hover:bg-muted/20 transition-colors">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-none h-fit">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-medium mb-6 flex items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                            <Leaf className="h-5 w-5 mr-2 text-primary" />
                            <span>Tráng miệng</span>
                            <div className="w-10 h-[2px] bg-primary ml-4"></div>
                          </h3>
                          <div className="space-y-4">
                            {restaurant.menu.desserts.map((item, index) => (
                              <div key={index} className="flex justify-between p-3 border-b border-dashed hover:bg-muted/20 transition-colors">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-none h-fit">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-medium mb-6 flex items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                            <Wine className="h-5 w-5 mr-2 text-primary" />
                            <span>Đồ uống</span>
                            <div className="w-10 h-[2px] bg-primary ml-4"></div>
                          </h3>
                          <div className="space-y-4">
                            {restaurant.menu.drinks.map((item, index) => (
                              <div key={index} className="flex justify-between p-3 border-b border-dashed hover:bg-muted/20 transition-colors">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-none h-fit">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Gallery Tab */}
                    <TabsContent value="gallery">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {restaurant.gallery.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="overflow-hidden rounded-none shadow-lg group relative"
                          >
                            <img 
                              src={image} 
                              alt={`${restaurant.name} ${index + 1}`} 
                              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <Badge className="backdrop-blur-sm bg-primary/80 border-0 text-white rounded-none px-3 py-1">
                                Hình ảnh {index + 1}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    {/* Reviews Tab */}
                    <TabsContent value="reviews">
                      <div className="space-y-5">
                        {restaurant.reviews.map((review, index) => (
                          <Card key={index} className="backdrop-blur-sm bg-muted/20 border-0 rounded-none hover:bg-muted/30 transition-colors">
                            <CardContent className="p-5">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-medium flex items-center">
                                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-none mr-3">
                                    <span className="font-semibold text-primary">{review.author.charAt(0)}</span>
                                  </div>
                                  {review.author}
                                </h4>
                                <RatingStars rating={review.rating} />
                              </div>
                              <p className="text-muted-foreground pl-11">{review.comment}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* Right Sidebar - Contact Info & Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none shadow-lg sticky top-4">
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 rounded-none">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-[2px] bg-primary"></div>
                    <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium mb-1">Địa chỉ</h4>
                        <p className="text-muted-foreground">{restaurant.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium mb-1">Điện thoại</h4>
                        <p className="text-muted-foreground">{restaurant.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium mb-1">Giờ mở cửa</h4>
                        <p className="text-muted-foreground">Thứ Hai - Thứ Sáu: {restaurant.openHours.weekday}</p>
                        <p className="text-muted-foreground">Thứ Bảy - Chủ Nhật: {restaurant.openHours.weekend}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Button */}
                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-0.5 rounded-none">
                      <Button 
                        className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none"
                        onClick={handleBookTable}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Đặt bàn
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-none"
                      onClick={handleCallNow}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Gọi ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetail; 