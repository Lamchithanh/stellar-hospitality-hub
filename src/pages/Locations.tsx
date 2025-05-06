import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Star, ChevronRight, Search, Award, Clock, Users } from "lucide-react";

// Dữ liệu mẫu cho các địa điểm
const locations = [
  // Khách sạn
  {
    id: 1,
    name: "Stellar Saigon",
    location: "Thành phố Hồ Chí Minh",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    type: "hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Khách sạn & Spa",
    description: "Khách sạn sang trọng 5 sao tọa lạc tại trung tâm thành phố, nơi kết hợp giữa kiến trúc hiện đại và nét văn hóa truyền thống Việt Nam.",
    amenities: ["Hồ bơi vô cực", "Nhà hàng cao cấp", "Spa & Wellness", "Phòng tập hiện đại", "Dịch vụ đưa đón sân bay"],
    price: "5.000.000 VNĐ/đêm"
  },
  {
    id: 2,
    name: "Stellar Hanoi",
    location: "Hà Nội",
    address: "45 Tràng Tiền, Hoàn Kiếm, Hà Nội",
    type: "hotel",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Khách sạn & Nhà hàng",
    description: "Khách sạn boutique sang trọng tọa lạc bên Hồ Hoàn Kiếm, mang đến trải nghiệm lưu trú đẳng cấp với tầm nhìn tuyệt đẹp.",
    amenities: ["Nhà hàng fine-dining", "Quầy bar trên sân thượng", "Phòng họp sang trọng", "Dịch vụ xe limousine", "Butler riêng"],
    price: "4.500.000 VNĐ/đêm"
  },
  {
    id: 3,
    name: "Stellar Danang",
    location: "Đà Nẵng",
    address: "28 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
    type: "hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80",
    category: "Resort & Spa",
    description: "Resort sang trọng bên bờ biển Mỹ Khê, kết hợp hoàn hảo giữa thiên nhiên tuyệt đẹp và dịch vụ đẳng cấp 5 sao.",
    amenities: ["Bãi biển riêng", "Khu vườn nhiệt đới", "Các bể bơi vô cực", "Nhà hàng hải sản", "Dịch vụ spa trên bãi biển"],
    price: "6.200.000 VNĐ/đêm"
  },
  {
    id: 5,
    name: "Stellar Nha Trang",
    location: "Nha Trang",
    address: "32 Trần Phú, Nha Trang, Khánh Hòa",
    type: "hotel",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Beach Resort",
    description: "Resort biển sang trọng với tầm nhìn ngoạn mục ra vịnh Nha Trang, mang đến trải nghiệm nghỉ dưỡng đẳng cấp quốc tế.",
    amenities: ["Villa trên biển", "Khu vực bãi biển riêng", "Lặn biển", "Nhà hàng trên đồi", "Yoga bên biển"],
    price: "5.800.000 VNĐ/đêm"
  },
  {
    id: 6,
    name: "Stellar Huế",
    location: "Huế",
    address: "15 Lê Lợi, Huế, Thừa Thiên Huế",
    type: "hotel",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Boutique Hotel",
    description: "Khách sạn boutique tinh tế kết hợp giữa kiến trúc hoàng gia Huế và tiện nghi hiện đại, tạo nên không gian sang trọng độc đáo.",
    amenities: ["Nhà hàng ẩm thực Huế", "Dịch vụ tham quan Cung Đình", "Spa truyền thống", "Khu vườn kiểu Hoàng gia", "Thuyền sông Hương"],
    price: "3.900.000 VNĐ/đêm"
  },
  {
    id: 7,
    name: "Stellar Phú Quốc",
    location: "Phú Quốc",
    address: "Bãi Dài, Phú Quốc, Kiên Giang",
    type: "hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Island Resort",
    description: "Khu nghỉ dưỡng biệt lập với các villa riêng biệt trên đảo Phú Quốc, mang đến trải nghiệm nghỉ dưỡng sang trọng giữa thiên nhiên hoang sơ.",
    amenities: ["Hồ bơi riêng", "Bãi biển hoang sơ", "Tour khám phá đảo", "Spa giữa rừng nhiệt đới", "Nhà hàng hải sản tươi sống"],
    price: "8.500.000 VNĐ/đêm"
  },
  // Nhà hàng
  {
    id: 4,
    name: "Stellar Bistro",
    location: "Thành phố Hồ Chí Minh",
    address: "45 Lê Thánh Tôn, Quận 1, TP.HCM",
    type: "restaurant",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Nhà hàng Fine-dining",
    description: "Nhà hàng sang trọng với phong cách ẩm thực Pháp-Á fusion, nơi những món ăn được chế biến tinh tế bởi đầu bếp đẳng cấp quốc tế.",
    amenities: ["Menu đặc biệt theo mùa", "Không gian riêng tư", "Hầm rượu đẳng cấp", "Dịch vụ sommelier", "Đặt trước"],
    price: "2.000.000 VNĐ/người"
  },
  {
    id: 8,
    name: "Stellar Sky Lounge",
    location: "Hà Nội",
    address: "88 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
    type: "restaurant",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Rooftop Bar & Restaurant",
    description: "Nhà hàng trên tầng thượng với tầm nhìn toàn cảnh Hà Nội, phục vụ các món ăn hiện đại kết hợp với cocktail sáng tạo.",
    amenities: ["Tầm nhìn panorama", "DJ vào cuối tuần", "Thực đơn fusion", "Khu vực riêng", "Đội ngũ bartender chuyên nghiệp"],
    price: "1.500.000 VNĐ/người"
  },
  {
    id: 9,
    name: "Stellar Sushi",
    location: "Đà Nẵng",
    address: "56 Bạch Đằng, Hải Châu, Đà Nẵng",
    type: "restaurant",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    category: "Nhà hàng Nhật Bản",
    description: "Nhà hàng Nhật Bản cao cấp với không gian tối giản thanh lịch, phục vụ các món sushi và sashimi từ nguyên liệu nhập khẩu trực tiếp từ Nhật Bản.",
    amenities: ["Bàn Omakase", "Đầu bếp Nhật Bản", "Nguyên liệu nhập khẩu hàng ngày", "Rượu sake cao cấp", "Không gian riêng tư"],
    price: "2.200.000 VNĐ/người"
  },
  {
    id: 10,
    name: "Stellar Garden",
    location: "Hội An",
    address: "25 Phan Bội Châu, Hội An, Quảng Nam",
    type: "restaurant",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Nhà hàng Ẩm thực Việt Nam",
    description: "Nhà hàng trong khu vườn nhiệt đới, phục vụ ẩm thực Việt Nam đặc sắc được nâng tầm với phong cách trình bày hiện đại.",
    amenities: ["Không gian vườn", "Lớp học nấu ăn", "Rượu vang phối hợp", "Món ăn đặc sản địa phương", "Buổi tối có nhạc truyền thống"],
    price: "850.000 VNĐ/người"
  }
];

// Các khuyến nghị
const recommendations = [
  {
    title: "Kỳ nghỉ lãng mạn",
    locations: ["Stellar Phú Quốc", "Stellar Nha Trang", "Stellar Sky Lounge"],
    icon: <Star className="h-5 w-5" />
  },
  {
    title: "Hội nghị & Sự kiện",
    locations: ["Stellar Saigon", "Stellar Hanoi", "Stellar Danang"],
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Ẩm thực đỉnh cao",
    locations: ["Stellar Bistro", "Stellar Sushi", "Stellar Garden"],
    icon: <Award className="h-5 w-5" />
  }
];

export default function Locations() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Lọc địa điểm theo loại và tìm kiếm
  const filteredLocations = locations
    .filter(location => 
      (activeTab === "all" || location.type === activeTab) && 
      (location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       location.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Stellar Locations" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Điểm Đến Stellar
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-[2px] bg-white mb-6"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl max-w-2xl"
            >
              Khám phá các khách sạn và nhà hàng đẳng cấp của chúng tôi tại những địa điểm tuyệt đẹp nhất Việt Nam
            </motion.p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-12 bg-white dark:bg-zinc-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-800/90 shadow-lg p-6 -mt-24 relative z-30">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:w-2/3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Tìm kiếm theo tên hoặc địa điểm..." 
                    className="pl-10 rounded-none border-zinc-300 dark:border-zinc-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full rounded-none">
                      <TabsTrigger value="all">Tất cả</TabsTrigger>
                      <TabsTrigger value="hotel">Khách sạn</TabsTrigger>
                      <TabsTrigger value="restaurant">Nhà hàng</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Locations Grid */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16">
              <Tabs defaultValue="locations">
                <div className="flex justify-center mb-8">
                  <TabsList className="rounded-none border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="locations" className="px-8">Tất cả địa điểm</TabsTrigger>
                    <TabsTrigger value="recommendations" className="px-8">Đề xuất cho bạn</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="locations">
                  {filteredLocations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredLocations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">Không tìm thấy địa điểm phù hợp với tìm kiếm của bạn.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchTerm("");
                          setActiveTab("all");
                        }}
                      >
                        Xóa bộ lọc
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="recommendations">
                  <div className="space-y-16">
                    {recommendations.map((recommendation, index) => (
                      <div key={index} className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {recommendation.icon}
                          </div>
                          <h3 className="text-2xl font-semibold">{recommendation.title}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {locations
                            .filter(loc => recommendation.locations.includes(loc.name))
                            .map(location => (
                              <LocationCard key={location.id} location={location} />
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-white dark:bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Bản Đồ Các Điểm Đến
              </h2>
              <div className="w-20 h-[2px] bg-primary mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khám phá vị trí địa lý của các khách sạn và nhà hàng sang trọng của Stellar Hospitality trên khắp Việt Nam
              </p>
            </div>
            
            <div className="aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
              <img 
                src="/images/vietnam-map.jpg" 
                alt="Vietnam Map" 
                className="w-full h-full object-contain opacity-50"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium">Bản đồ tương tác sẽ được hiển thị tại đây</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Cho Trải Nghiệm Đẳng Cấp?</h2>
              <p className="text-lg text-white/90 mb-8">
                Đặt phòng ngay hôm nay và tận hưởng những đặc quyền dành riêng cho khách hàng khi đặt trực tiếp trên trang web của chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/hotels">
                  <Button size="lg" variant="secondary" className="min-w-[200px] rounded-none">
                    Đặt Phòng Ngay
                  </Button>
                </Link>
                <Link to="/restaurants">
                  <Button size="lg" variant="outline" className="min-w-[200px] rounded-none bg-transparent text-white border-white hover:bg-white/10">
                    Đặt Bàn Nhà Hàng
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Component LocationCard
function LocationCard({ location }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={location.image} 
            alt={location.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 text-black text-xs px-3 py-1 inline-block">
                {location.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-white px-2 py-1 text-sm font-semibold text-black rounded-sm flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
              {location.rating}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {location.name}
          </h3>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{location.location}</span>
          </div>
          
          <p className="text-muted-foreground mb-6 line-clamp-2">
            {location.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Từ</span>
              <p className="font-semibold">{location.price}</p>
            </div>
            
            <Link 
              to={location.type === "hotel" ? `/hotels/${location.id}` : `/restaurants/${location.id}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Chi tiết
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 