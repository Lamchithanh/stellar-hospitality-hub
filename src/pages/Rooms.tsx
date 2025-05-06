import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Users, 
  BedDouble, 
  Maximize2,
  Mountain, 
  Wifi, 
  Bath, 
  Coffee,
  LifeBuoy,
  ShowerHead, 
  Tv,
  UtensilsCrossed
} from "lucide-react";

// Dữ liệu phòng mẫu
const rooms = [
  {
    id: 1,
    name: "Phòng Deluxe",
    description: "Tận hưởng không gian rộng rãi và thoải mái với tầm nhìn tuyệt đẹp",
    price: 1800000,
    priceWithBreakfast: 2000000,
    capacity: 2,
    size: 32,
    bedType: "1 giường đôi lớn",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: [
      "Điều hòa nhiệt độ",
      "Wifi miễn phí",
      "TV màn hình phẳng",
      "Minibar",
      "Phòng tắm riêng",
      "Đồ vệ sinh cá nhân cao cấp",
      "Máy pha cà phê",
      "Két an toàn"
    ],
    view: "Thành phố",
    featured: false,
    discount: 0
  },
  {
    id: 2,
    name: "Phòng Premium",
    description: "Phòng cao cấp với không gian rộng rãi và tiện nghi hiện đại",
    price: 2200000,
    priceWithBreakfast: 2400000,
    capacity: 2,
    size: 36,
    bedType: "1 giường đôi lớn hoặc 2 giường đơn",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1584132905271-512c958d674a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: [
      "Điều hòa nhiệt độ",
      "Wifi miễn phí",
      "TV màn hình phẳng",
      "Minibar cao cấp",
      "Phòng tắm riêng với bồn tắm",
      "Đồ vệ sinh cá nhân cao cấp",
      "Máy pha cà phê Nespresso",
      "Két an toàn",
      "Áo choàng tắm",
      "Dép đi trong phòng"
    ],
    view: "Thành phố hoặc Biển",
    featured: true,
    discount: 10
  },
  {
    id: 3,
    name: "Suite Junior",
    description: "Suite sang trọng với phòng khách riêng biệt và tiện nghi đẳng cấp",
    price: 3500000,
    priceWithBreakfast: 3800000,
    capacity: 3,
    size: 48,
    bedType: "1 giường King-size",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: [
      "Phòng khách riêng",
      "Điều hòa nhiệt độ",
      "Wifi miễn phí",
      "Smart TV 55 inch",
      "Minibar với đồ uống miễn phí",
      "Phòng tắm sang trọng với bồn tắm và vòi sen riêng biệt",
      "Đồ vệ sinh cá nhân cao cấp",
      "Máy pha cà phê Nespresso",
      "Két an toàn kỹ thuật số",
      "Áo choàng tắm cao cấp",
      "Dép đi trong phòng",
      "Dịch vụ dọn phòng hai lần mỗi ngày"
    ],
    view: "Biển",
    featured: true,
    discount: 0
  },
  {
    id: 4,
    name: "Suite Gia Đình",
    description: "Không gian rộng rãi lý tưởng cho gia đình với hai phòng ngủ liền kề",
    price: 4200000,
    priceWithBreakfast: 4600000,
    capacity: 4,
    size: 65,
    bedType: "1 giường King-size và 2 giường đơn",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: [
      "Hai phòng ngủ liền kề",
      "Phòng khách riêng",
      "Điều hòa nhiệt độ",
      "Wifi miễn phí",
      "2 Smart TV",
      "Minibar với đồ uống miễn phí",
      "Hai phòng tắm với bồn tắm và vòi sen",
      "Đồ vệ sinh cá nhân cao cấp",
      "Máy pha cà phê Nespresso",
      "Bếp nhỏ đầy đủ tiện nghi",
      "Két an toàn kỹ thuật số",
      "Dịch vụ dọn phòng hai lần mỗi ngày",
      "Dịch vụ quản gia riêng (theo yêu cầu)"
    ],
    view: "Biển và Thành phố",
    featured: false,
    discount: 15
  },
  {
    id: 5,
    name: "Villa Bãi Biển",
    description: "Villa sang trọng với hồ bơi riêng và tầm nhìn tuyệt đẹp ra biển",
    price: 8500000,
    priceWithBreakfast: 9000000,
    capacity: 6,
    size: 120,
    bedType: "2 giường King-size và 2 giường Queen-size",
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    amenities: [
      "Ba phòng ngủ riêng biệt",
      "Phòng khách rộng rãi",
      "Hồ bơi riêng",
      "Sân hiên với tầm nhìn ra biển",
      "Điều hòa nhiệt độ",
      "Wifi miễn phí",
      "Smart TV ở tất cả các phòng",
      "Nhà bếp đầy đủ tiện nghi",
      "Minibar với đồ uống miễn phí",
      "Ba phòng tắm với bồn tắm và vòi sen riêng biệt",
      "Đồ vệ sinh cá nhân cao cấp",
      "Máy pha cà phê Nespresso",
      "Két an toàn kỹ thuật số",
      "Dịch vụ dọn phòng hai lần mỗi ngày",
      "Dịch vụ quản gia riêng 24/7",
      "Dịch vụ đầu bếp riêng (theo yêu cầu)"
    ],
    view: "Trực diện biển",
    featured: true,
    discount: 0
  }
];

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Component hiển thị icon cho từng tiện nghi
const AmenityIcon = ({ name }: { name: string }) => {
  if (name.includes("Wifi")) return <Wifi className="h-4 w-4 text-primary" />;
  if (name.includes("giường")) return <BedDouble className="h-4 w-4 text-primary" />;
  if (name.includes("tắm")) return <Bath className="h-4 w-4 text-primary" />;
  if (name.includes("vòi sen")) return <ShowerHead className="h-4 w-4 text-primary" />;
  if (name.includes("cà phê")) return <Coffee className="h-4 w-4 text-primary" />;
  if (name.includes("TV")) return <Tv className="h-4 w-4 text-primary" />;
  if (name.includes("dọn phòng")) return <LifeBuoy className="h-4 w-4 text-primary" />;
  if (name.includes("bếp") || name.includes("Bếp")) return <UtensilsCrossed className="h-4 w-4 text-primary" />;
  return null;
};

const Rooms = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  const filteredRooms = activeTab === "all" ? rooms : rooms.filter(room => {
    if (activeTab === "deluxe") return room.name.includes("Deluxe");
    if (activeTab === "premium") return room.name.includes("Premium");
    if (activeTab === "suite") return room.name.includes("Suite");
    if (activeTab === "villa") return room.name.includes("Villa");
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="mb-12">
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
              Phòng & Suite Sang Trọng
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Khám phá bộ sưu tập phòng và suite đẳng cấp, nơi tiện nghi hiện đại kết hợp với sự sang trọng tinh tế
            </p>
          </motion.div>
          
          {/* Tabs để lọc loại phòng */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 flex justify-center"
          >
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
              <TabsList className="grid grid-cols-5 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-none">
                <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">Tất cả</TabsTrigger>
                <TabsTrigger value="deluxe" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">Deluxe</TabsTrigger>
                <TabsTrigger value="premium" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">Premium</TabsTrigger>
                <TabsTrigger value="suite" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">Suite</TabsTrigger>
                <TabsTrigger value="villa" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none">Villa</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </section>
        
        {/* Danh sách phòng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
              <Card className="overflow-hidden h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-none">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {room.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="backdrop-blur-sm bg-amber-500/80 hover:bg-amber-600/80 border-0 text-white rounded-none">Nổi bật</Badge>
                    </div>
                  )}
                  {room.discount > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="backdrop-blur-sm bg-rose-600/80 hover:bg-rose-700/80 border-0 text-white rounded-none">Giảm {room.discount}%</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Thông tin nhanh trên ảnh khi hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="backdrop-blur-sm bg-white/60 text-slate-900 text-xs px-3 py-1 flex items-center gap-1 rounded-none">
                      <Users className="h-3 w-3 text-primary" />
                      {room.capacity} người
                    </span>
                    <span className="backdrop-blur-sm bg-white/60 text-slate-900 text-xs px-3 py-1 flex items-center gap-1 rounded-none">
                      <BedDouble className="h-3 w-3 text-primary" />
                      {room.bedType}
                    </span>
                    <span className="backdrop-blur-sm bg-white/60 text-slate-900 text-xs px-3 py-1 flex items-center gap-1 rounded-none">
                      <Maximize2 className="h-3 w-3 text-primary" />
                      {room.size} m²
                    </span>
                    <span className="backdrop-blur-sm bg-white/60 text-slate-900 text-xs px-3 py-1 flex items-center gap-1 rounded-none">
                      <Mountain className="h-3 w-3 text-primary" />
                      {room.view}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{room.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-muted/50 backdrop-blur-sm px-3 py-1 flex items-center gap-1 rounded-none"
                      >
                        <AmenityIcon name={amenity} />
                        {amenity.length > 15 ? `${amenity.substring(0, 15)}...` : amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-xs bg-muted/50 backdrop-blur-sm px-3 py-1 rounded-none">
                        +{room.amenities.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Chỉ phòng</span>
                      <span className="font-bold text-lg text-primary">{formatCurrency(room.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Bao gồm bữa sáng</span>
                      <span>{formatCurrency(room.priceWithBreakfast)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-none" 
                    asChild
                  >
                    <Link to={`/rooms/${room.id}`}>
                      Chi tiết
                    </Link>
                  </Button>
                  <Button 
                    className="flex-1 backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none" 
                    asChild
                  >
                    <Link to={`/booking?room=${room.id}`}>
                      Đặt ngay
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rooms; 