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
import { MapPin, Star, Wifi, Droplets, Dumbbell, UtensilsCrossed, Flower2, Coffee, Car, Search, SlidersHorizontal, Bed, Home, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    rating: null,
    standard: false,
    deluxe: false,
    suite: false,
    villa: false
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Stellar Hotels" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Khách Sạn & Khu Nghỉ Dưỡng
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
              Trải nghiệm đẳng cấp và sang trọng tại các khách sạn tiêu chuẩn 5 sao của Stellar Hospitality
            </motion.p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-12 bg-white dark:bg-zinc-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-7xl mx-auto bg-white dark:bg-zinc-800/90 shadow-lg p-6 -mt-24 relative z-30">
              <div className="flex flex-col gap-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Tìm kiếm theo tên khách sạn hoặc địa điểm..." 
                    className="pl-10 rounded-none border-zinc-300 dark:border-zinc-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Bộ lọc giá */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Khoảng Giá
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-4 rounded-none">
                      <DropdownMenuLabel className="text-base font-semibold">Khoảng Giá</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                          </span>
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
                            <span className="text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-none">{formatCurrency(priceRange[0])}</span>
                            <span className="text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-none">{formatCurrency(priceRange[1])}</span>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Bộ lọc đánh giá */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary">
                        <Star className="h-4 w-4 mr-2" />
                        Đánh Giá
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-4 rounded-none">
                      <DropdownMenuLabel className="text-base font-semibold">Đánh Giá</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="space-y-2 py-4">
                        {[5, 4, 3, 2].map((rating) => (
                          <div 
                            key={rating}
                            className={`group relative overflow-hidden transition-all duration-300 ${
                              filters.rating === rating ? 'bg-primary/10' : 'hover:bg-primary/5'
                            }`}
                          >
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-none transition-colors duration-300 ${
                                  filters.rating === rating ? 'bg-primary text-white' : 'bg-white/50 group-hover:bg-white/80'
                                }`}>
                                  <Star className="h-4 w-4" />
                                </div>
                                <Label className="cursor-pointer text-sm font-medium">
                                  {rating} sao trở lên
                                </Label>
                              </div>
                              <Switch 
                                checked={filters.rating === rating}
                                onCheckedChange={(checked) => setFilters({...filters, rating: checked ? rating : null})}
                                className={`rounded-none data-[state=checked]:bg-primary ${
                                  filters.rating === rating ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Bộ lọc tiện nghi */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary">
                        <Wifi className="h-4 w-4 mr-2" />
                        Tiện Nghi
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-4 rounded-none">
                      <DropdownMenuLabel className="text-base font-semibold">Tiện Nghi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="space-y-2 py-4">
                        {[
                          { id: 'pool', label: 'Hồ bơi', icon: Droplets, checked: filters.pool },
                          { id: 'spa', label: 'Spa', icon: Flower2, checked: filters.spa },
                          { id: 'gym', label: 'Phòng tập', icon: Dumbbell, checked: filters.gym },
                          { id: 'restaurant', label: 'Nhà hàng', icon: UtensilsCrossed, checked: filters.restaurant },
                          { id: 'wifi', label: 'Wifi miễn phí', icon: Wifi, checked: filters.wifi },
                          { id: 'beach', label: 'Bãi biển riêng', icon: MapPin, checked: filters.beach }
                        ].map(({ id, label, icon: Icon, checked }) => (
                          <div 
                            key={id}
                            className={`group relative overflow-hidden transition-all duration-300 ${
                              checked ? 'bg-primary/10' : 'hover:bg-primary/5'
                            }`}
                          >
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-none transition-colors duration-300 ${
                                  checked ? 'bg-primary text-white' : 'bg-white/50 group-hover:bg-white/80'
                                }`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
                                  {label}
                                </Label>
                              </div>
                              <Switch 
                                id={id}
                                checked={checked}
                                onCheckedChange={(checked) => setFilters({...filters, [id]: checked})}
                                className={`rounded-none data-[state=checked]:bg-primary ${
                                  checked ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Bộ lọc loại phòng */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary">
                        <Bed className="h-4 w-4 mr-2" />
                        Loại Phòng
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-4 rounded-none">
                      <DropdownMenuLabel className="text-base font-semibold">Loại Phòng</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="space-y-2 py-4">
                        {[
                          { id: 'standard', label: 'Phòng tiêu chuẩn', icon: Bed, checked: filters.standard },
                          { id: 'deluxe', label: 'Phòng deluxe', icon: Bed, checked: filters.deluxe },
                          { id: 'suite', label: 'Suite', icon: Bed, checked: filters.suite },
                          { id: 'villa', label: 'Villa', icon: Home, checked: filters.villa }
                        ].map(({ id, label, icon: Icon, checked }) => (
                          <div 
                            key={id}
                            className={`group relative overflow-hidden transition-all duration-300 ${
                              checked ? 'bg-primary/10' : 'hover:bg-primary/5'
                            }`}
                          >
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-none transition-colors duration-300 ${
                                  checked ? 'bg-primary text-white' : 'bg-white/50 group-hover:bg-white/80'
                                }`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
                                  {label}
                                </Label>
                              </div>
                              <Switch 
                                id={id}
                                checked={checked}
                                onCheckedChange={(checked) => setFilters({...filters, [id]: checked})}
                                className={`rounded-none data-[state=checked]:bg-primary ${
                                  checked ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-700'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
                        beach: false,
                        rating: null,
                        standard: false,
                        deluxe: false,
                        suite: false,
                        villa: false
                      });
                    }}
                    className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence>
                {filteredHotels.length > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  >
                    {filteredHotels.map((hotel, index) => (
                      <HotelCard key={hotel.id} hotel={hotel} index={index} />
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
                          beach: false,
                          rating: null,
                          standard: false,
                          deluxe: false,
                          suite: false,
                          villa: false
                        });
                      }}
                      className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary"
                    >
                      Xóa bộ lọc
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Component HotelCard
const HotelCard = ({ hotel, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={hotel.imageUrl} 
            alt={hotel.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute top-4 left-4">
            {hotel.featured && (
              <Badge className="bg-white/90 text-black text-xs px-3 py-1 rounded-none">
                Nổi bật
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4 bg-white px-2 py-1 text-sm font-semibold text-black rounded-none flex items-center">
            <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
            {hotel.rating}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {hotel.name}
          </h3>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{hotel.location}</span>
          </div>
          
          <p className="text-muted-foreground mb-6 line-clamp-2">
            {hotel.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span 
                key={idx}
                className="text-xs bg-muted/30 px-3 py-1 rounded-none flex items-center gap-1"
              >
                <AmenityIcon amenity={amenity} />
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs bg-muted/30 px-3 py-1 rounded-none">
                +{hotel.amenities.length - 4}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Từ</span>
              <p className="font-semibold">{formatCurrency(hotel.price)}/đêm</p>
            </div>
            
            <Link 
              to={`/hotels/${hotel.id}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Chi tiết
              <svg 
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HotelListing;
