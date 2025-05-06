import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Star, Wifi, Droplets, Dumbbell, UtensilsCrossed, Flower2, Coffee, Car, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu cho danh sách khách sạn
const hotels = [
  {
    id: 1,
    name: "Stellar Resort & Spa Hà Nội",
    location: "Hà Nội, Việt Nam",
    rating: 4.8,
    price: 2500000,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Hồ bơi", "Spa", "Phòng tập", "Nhà hàng", "Wifi miễn phí", "Đậu xe miễn phí"],
    featured: true,
    discount: 15,
    description: "Trải nghiệm sự sang trọng và đẳng cấp tại trung tâm thủ đô Hà Nội"
  },
  {
    id: 2,
    name: "Stellar Boutique Hội An",
    location: "Hội An, Quảng Nam",
    rating: 4.6,
    price: 1800000,
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Hồ bơi", "Nhà hàng", "Bar", "Wifi miễn phí", "Xe đưa đón sân bay"],
    featured: false,
    discount: 0,
    description: "Kết hợp giữa kiến trúc cổ điển và hiện đại tại phố cổ Hội An"
  },
  {
    id: 3,
    name: "Stellar Grand Đà Nẵng",
    location: "Đà Nẵng",
    rating: 4.7,
    price: 2300000,
    imageUrl: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Spa", "Phòng tập", "Nhà hàng", "Phòng hội nghị", "Bãi biển riêng"],
    featured: true,
    discount: 10,
    description: "Tận hưởng kỳ nghỉ tuyệt vời với tầm nhìn ra biển Đà Nẵng"
  },
  {
    id: 4,
    name: "Stellar Ocean View Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    rating: 4.9,
    price: 3000000,
    imageUrl: "https://images.unsplash.com/photo-1605346434674-a440ca2dca65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Bãi biển riêng", "Hồ bơi", "Spa", "Nhà hàng", "Bar trên sân thượng"],
    featured: true,
    discount: 5,
    description: "Vị trí đắc địa với tầm nhìn tuyệt đẹp ra vịnh Nha Trang"
  },
  {
    id: 5,
    name: "Stellar Highlands Đà Lạt",
    location: "Đà Lạt, Lâm Đồng",
    rating: 4.5,
    price: 1500000,
    imageUrl: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    amenities: ["Vườn", "Nhà hàng", "Cà phê", "Wifi miễn phí", "Tour đạp xe"],
    featured: false,
    discount: 0,
    description: "Không gian yên bình giữa thiên nhiên đồi núi Đà Lạt"
  },
  {
    id: 6,
    name: "Stellar Mekong Cần Thơ",
    location: "Cần Thơ",
    rating: 4.4,
    price: 1200000,
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: ["Hồ bơi", "Nhà hàng", "Tour sông nước", "Wifi miễn phí"],
    featured: false,
    discount: 20,
    description: "Trải nghiệm văn hóa sông nước miền Tây Nam Bộ"
  },
];

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Component hiển thị icon cho từng tiện nghi
const AmenityIcon = ({ amenity }: { amenity: string }) => {
  switch (amenity) {
    case "Hồ bơi":
      return <Droplets className="h-4 w-4 text-primary" />;
    case "Wifi miễn phí":
      return <Wifi className="h-4 w-4 text-primary" />;
    case "Phòng tập":
      return <Dumbbell className="h-4 w-4 text-primary" />;
    case "Nhà hàng":
      return <UtensilsCrossed className="h-4 w-4 text-primary" />;
    case "Vườn":
      return <Flower2 className="h-4 w-4 text-primary" />;
    case "Cà phê":
      return <Coffee className="h-4 w-4 text-primary" />;
    case "Đậu xe miễn phí":
      return <Car className="h-4 w-4 text-primary" />;
    default:
      return null;
  }
};

const HotelListing = () => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    pool: false,
    spa: false,
    gym: false,
    restaurant: false,
    wifi: false,
    beach: false,
  });

  // Lọc khách sạn dựa trên tìm kiếm và bộ lọc
  const filteredHotels = hotels.filter((hotel) => {
    // Lọc theo tìm kiếm
    if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Lọc theo khoảng giá
    if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) {
      return false;
    }

    // Lọc theo tiện nghi
    if (filters.pool && !hotel.amenities.includes("Hồ bơi")) return false;
    if (filters.spa && !hotel.amenities.includes("Spa")) return false;
    if (filters.gym && !hotel.amenities.includes("Phòng tập")) return false;
    if (filters.restaurant && !hotel.amenities.includes("Nhà hàng")) return false;
    if (filters.wifi && !hotel.amenities.includes("Wifi miễn phí")) return false;
    if (filters.beach && !hotel.amenities.includes("Bãi biển riêng")) return false;

    return true;
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
              Khám Phá Điểm Đến Sang Trọng
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Trải nghiệm kỳ nghỉ đẳng cấp tại bộ sưu tập khách sạn và khu nghỉ dưỡng cao cấp của chúng tôi tại các điểm đến hàng đầu Việt Nam
            </p>
          </motion.div>
        
          {/* Phần tìm kiếm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 shadow-lg rounded-none overflow-hidden">
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                    <Input
                      placeholder="Tìm kiếm theo tên khách sạn hoặc địa điểm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-5 py-7 bg-transparent border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 font-medium"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>
        
        {/* Phần nội dung chính */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Phần bộ lọc */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Bộ Lọc</h2>
                </div>
              </div>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base flex items-center">
                      <span className="w-4 h-[2px] bg-primary mr-2"></span>
                      Khoảng Giá
                    </h3>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1">VNĐ/đêm</span>
                  </div>
                  <div className="space-y-6 px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={5000000}
                      step={100000}
                      onValueChange={setPriceRange}
                      className="py-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-medium bg-primary/10 px-2 py-1">{formatCurrency(priceRange[0])}</span>
                      <span className="text-primary font-medium bg-primary/10 px-2 py-1">{formatCurrency(priceRange[1])}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-semibold text-base flex items-center">
                    <span className="w-4 h-[2px] bg-primary mr-2"></span>
                    Tiện Nghi
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          <Label htmlFor="pool" className="cursor-pointer text-sm">Hồ bơi</Label>
                        </div>
                        <Switch 
                          id="pool"
                          checked={filters.pool}
                          onCheckedChange={(checked) => setFilters({...filters, pool: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flower2 className="h-4 w-4 text-primary" />
                          <Label htmlFor="spa" className="cursor-pointer text-sm">Spa</Label>
                        </div>
                        <Switch 
                          id="spa"
                          checked={filters.spa}
                          onCheckedChange={(checked) => setFilters({...filters, spa: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-primary" />
                          <Label htmlFor="gym" className="cursor-pointer text-sm">Phòng tập</Label>
                        </div>
                        <Switch 
                          id="gym"
                          checked={filters.gym}
                          onCheckedChange={(checked) => setFilters({...filters, gym: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed className="h-4 w-4 text-primary" />
                          <Label htmlFor="restaurant" className="cursor-pointer text-sm">Nhà hàng</Label>
                        </div>
                        <Switch 
                          id="restaurant"
                          checked={filters.restaurant}
                          onCheckedChange={(checked) => setFilters({...filters, restaurant: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-primary" />
                          <Label htmlFor="wifi" className="cursor-pointer text-sm">Wifi miễn phí</Label>
                        </div>
                        <Switch 
                          id="wifi"
                          checked={filters.wifi}
                          onCheckedChange={(checked) => setFilters({...filters, wifi: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 hover:bg-primary/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <Label htmlFor="beach" className="cursor-pointer text-sm">Bãi biển riêng</Label>
                        </div>
                        <Switch 
                          id="beach"
                          checked={filters.beach}
                          onCheckedChange={(checked) => setFilters({...filters, beach: checked})}
                          className="rounded-none data-[state=checked]:bg-primary h-4 w-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 5000000]);
                    setFilters({
                      pool: false,
                      spa: false,
                      gym: false,
                      restaurant: false,
                      wifi: false,
                      beach: false
                    });
                  }}
                  className="w-full bg-gradient-to-r from-primary/20 to-primary/10 border-0 hover:bg-primary/20 text-primary font-medium rounded-none"
                >
                  Xóa tất cả bộ lọc
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Danh sách khách sạn */}
          <div className="lg:col-span-9">
            <AnimatePresence>
              {filteredHotels.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredHotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group">
                        <div className="h-60 relative overflow-hidden">
                          <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between gap-2">
                            {hotel.featured && (
                              <Badge className="backdrop-blur-sm bg-amber-500/80 hover:bg-amber-600/80 border-0 text-white rounded-none">
                                Nổi bật
                              </Badge>
                            )}
                            {hotel.discount > 0 && (
                              <Badge className="backdrop-blur-sm bg-rose-600/80 hover:bg-rose-700/80 border-0 text-white rounded-none">
                                Giảm {hotel.discount}%
                              </Badge>
                            )}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 backdrop-blur-sm bg-white/20 text-white px-2 py-1 rounded-none">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <span className="font-medium">{hotel.rating}</span>
                              </div>
                              <div className="backdrop-blur-sm bg-primary/80 text-white px-2 py-1 rounded-none">
                                <span className="font-bold">{formatCurrency(hotel.price)}</span>
                                <span className="text-xs"> / đêm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-5 flex-grow">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            <span>{hotel.location}</span>
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-3">{hotel.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-muted/30 backdrop-blur-sm px-3 py-1 rounded-none flex items-center gap-1 hover:bg-primary/10 transition-colors"
                              >
                                <AmenityIcon amenity={amenity} />
                                {amenity}
                              </span>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <span className="text-xs bg-muted/30 backdrop-blur-sm px-3 py-1 rounded-none hover:bg-primary/10 transition-colors">
                                +{hotel.amenities.length - 4}
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="px-5 pb-5 pt-0">
                          <div className="w-full bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none">
                            <Link to={`/hotels/${hotel.id}`} className="w-full">
                              <Button className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none">
                                Xem Chi Tiết
                              </Button>
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center p-12 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none"
                >
                  <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mb-6 rounded-none">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Không tìm thấy khách sạn phù hợp</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    Vui lòng điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc của bạn để tìm kiếm khách sạn phù hợp
                  </p>
                  <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setPriceRange([0, 5000000]);
                        setFilters({
                          pool: false,
                          spa: false,
                          gym: false,
                          restaurant: false,
                          wifi: false,
                          beach: false
                        });
                      }}
                      className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 hover:bg-primary/10 text-primary font-medium rounded-none min-w-[200px]"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelListing;
