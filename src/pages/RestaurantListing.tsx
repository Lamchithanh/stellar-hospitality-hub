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
import { MapPin, Star, Utensils, Music, Leaf, Coffee, Wine, Users, Search, SlidersHorizontal, Car, Wifi, Truck, Calendar, ChefHat, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
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

// Dữ liệu mẫu cho danh sách nhà hàng
const restaurants = [
  {
    id: 1,
    name: "Stellar Fine Dining Hà Nội",
    location: "Hoàn Kiếm, Hà Nội",
    rating: 4.7,
    priceRange: "$$$$",
    cuisine: ["Ẩm thực cao cấp"],
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,luxury,vietnamese",
    features: ["Phòng riêng", "Tuyển chọn rượu vang", "Đỗ xe miễn phí"],
    featured: true,
    discount: 0,
    description: "Trải nghiệm ẩm thực tinh tế với tầm nhìn tuyệt đẹp ra Hồ Gươm"
  },
  {
    id: 2,
    name: "Stellar Bistro Hội An",
    location: "Phố cổ Hội An, Quảng Nam",
    rating: 4.5,
    priceRange: "$$$",
    cuisine: ["Pháp-Việt fusion"],
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,hoian,vietnamese",
    features: ["Chỗ ngồi ngoài trời", "Nhạc sống", "Món chay"],
    featured: false,
    discount: 10,
    description: "Món ăn Pháp-Việt fusion tinh tế trong không gian phố cổ đầy lãng mạn"
  },
  {
    id: 3,
    name: "Stellar Steakhouse Sài Gòn",
    location: "Quận 1, TP. Hồ Chí Minh",
    rating: 4.8,
    priceRange: "$$$$",
    cuisine: ["Steak House"],
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,steak,luxury",
    features: ["Phòng riêng", "Quầy bar đầy đủ", "Thịt bò cao cấp"],
    featured: true,
    discount: 0,
    description: "Nơi lý tưởng cho những người sành ăn với các loại thịt bò nhập khẩu hảo hạng"
  },
  {
    id: 4,
    name: "Stellar Hải Sản Nha Trang",
    location: "Bãi biển Nha Trang, Khánh Hòa",
    rating: 4.6,
    priceRange: "$$$",
    cuisine: ["Hải sản"],
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,seafood,beach",
    features: ["View biển", "Hải sản tươi sống", "Chỗ ngồi ngoài trời"],
    featured: false,
    discount: 0,
    description: "Thưởng thức hải sản tươi sống hảo hạng ngắm nhìn biển Nha Trang tuyệt đẹp"
  },
  {
    id: 5,
    name: "Stellar Coffee Đà Lạt",
    location: "Đà Lạt, Lâm Đồng",
    rating: 4.4,
    priceRange: "$$",
    cuisine: ["Cà phê & Bánh ngọt"],
    imageUrl: "https://source.unsplash.com/random/300x200/?cafe,coffee,dalat",
    features: ["Cà phê đặc sản", "Bánh ngọt thủ công", "Không gian lãng mạn"],
    featured: false,
    discount: 15,
    description: "Thưởng thức hương vị cà phê Đà Lạt đích thực trong không gian yên bình"
  },
  {
    id: 6,
    name: "Stellar Quán Sài Gòn",
    location: "Quận 3, TP. Hồ Chí Minh",
    rating: 4.3,
    priceRange: "$$",
    cuisine: ["Ẩm thực đường phố"],
    imageUrl: "https://source.unsplash.com/random/300x200/?streetfood,vietnamese,saigon",
    features: ["Món Việt đường phố", "Không gian mở", "Giá cả phải chăng"],
    featured: false,
    discount: 0,
    description: "Nơi thưởng thức tinh hoa ẩm thực đường phố Sài Gòn trong không gian hiện đại"
  },
];

// Component hiển thị icon cho từng tính năng
const FeatureIcon = ({ feature }: { feature: string }) => {
  switch (feature) {
    case "Phòng riêng":
      return <Users className="h-4 w-4 text-primary" />;
    case "Chỗ ngồi ngoài trời":
      return <Coffee className="h-4 w-4 text-primary" />;
    case "Nhạc sống":
      return <Music className="h-4 w-4 text-primary" />;
    case "Món chay":
      return <Leaf className="h-4 w-4 text-primary" />;
    case "Tuyển chọn rượu vang":
      return <Wine className="h-4 w-4 text-primary" />;
    default:
      return <Utensils className="h-4 w-4 text-primary" />;
  }
};

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [filters, setFilters] = useState({
    vietnamese: false,
    chinese: false,
    japanese: false,
    korean: false,
    italian: false,
    french: false,
    parking: false,
    wifi: false,
    delivery: false,
    reservation: false,
    rating: null
  });

  // Hàm lọc nhà hàng
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Lọc theo tên
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Lọc theo mức giá
    const price = Number(restaurant.priceRange);
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }

    // Lọc theo tính năng
    if (filters.vietnamese && !restaurant.cuisine.includes("Việt Nam")) return false;
    if (filters.chinese && !restaurant.cuisine.includes("Trung Hoa")) return false;
    if (filters.japanese && !restaurant.cuisine.includes("Nhật Bản")) return false;
    if (filters.korean && !restaurant.cuisine.includes("Hàn Quốc")) return false;
    if (filters.italian && !restaurant.cuisine.includes("Ý")) return false;
    if (filters.french && !restaurant.cuisine.includes("Pháp")) return false;
    if (filters.parking && !restaurant.features.includes("Bãi đỗ xe")) return false;
    if (filters.wifi && !restaurant.features.includes("Wifi miễn phí")) return false;
    if (filters.delivery && !restaurant.features.includes("Giao hàng")) return false;
    if (filters.reservation && !restaurant.features.includes("Đặt bàn")) return false;

    return true;
  });

  // Xử lý thay đổi mức giá
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
  };
  
  const isPriceActive = (price: number) => priceRange.includes(price);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Stellar Restaurants" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Nhà Hàng & Ẩm Thực
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
              Khám phá hành trình ẩm thực đặc sắc với các nhà hàng đẳng cấp của chúng tôi trên khắp Việt Nam
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
                    placeholder="Tìm kiếm nhà hàng theo tên, địa điểm hoặc ẩm thực..." 
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
                            max={2000000}
                            step={50000}
                            onValueChange={handlePriceChange}
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

                  {/* Bộ lọc loại ẩm thực */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-primary/10 hover:text-primary">
                        <ChefHat className="h-4 w-4 mr-2" />
                        Loại Ẩm Thực
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-4 rounded-none">
                      <DropdownMenuLabel className="text-base font-semibold">Loại Ẩm Thực</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="space-y-2 py-4">
                        {[
                          { id: 'vietnamese', label: 'Việt Nam', icon: ChefHat, checked: filters.vietnamese },
                          { id: 'chinese', label: 'Trung Hoa', icon: ChefHat, checked: filters.chinese },
                          { id: 'japanese', label: 'Nhật Bản', icon: ChefHat, checked: filters.japanese },
                          { id: 'korean', label: 'Hàn Quốc', icon: ChefHat, checked: filters.korean },
                          { id: 'italian', label: 'Ý', icon: ChefHat, checked: filters.italian },
                          { id: 'french', label: 'Pháp', icon: ChefHat, checked: filters.french }
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
                          { id: 'parking', label: 'Bãi đỗ xe', icon: Car, checked: filters.parking },
                          { id: 'wifi', label: 'Wifi miễn phí', icon: Wifi, checked: filters.wifi },
                          { id: 'delivery', label: 'Giao hàng', icon: Truck, checked: filters.delivery },
                          { id: 'reservation', label: 'Đặt bàn', icon: Calendar, checked: filters.reservation }
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
                      setPriceRange([0, 2000000]);
                      setFilters({
                        vietnamese: false,
                        chinese: false,
                        japanese: false,
                        korean: false,
                        italian: false,
                        french: false,
                        parking: false,
                        wifi: false,
                        delivery: false,
                        reservation: false,
                        rating: null
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
                {filteredRestaurants.length > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  >
                    {filteredRestaurants.map((restaurant, index) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
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
                      <Utensils className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Không tìm thấy nhà hàng phù hợp</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      Vui lòng điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc của bạn để tìm kiếm nhà hàng phù hợp
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setPriceRange([0, 2000000]);
                        setFilters({
                          vietnamese: false,
                          chinese: false,
                          japanese: false,
                          korean: false,
                          italian: false,
                          french: false,
                          parking: false,
                          wifi: false,
                          delivery: false,
                          reservation: false,
                          rating: null
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

// Component RestaurantCard
const RestaurantCard = ({ restaurant, index }) => {
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
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-black text-xs px-3 py-1 inline-block">
              {restaurant.cuisine.join(", ")}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-white px-2 py-1 text-sm font-semibold text-black flex items-center">
            <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
            {restaurant.rating}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {restaurant.name}
          </h3>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{restaurant.location}</span>
          </div>
          
          <p className="text-muted-foreground mb-6 line-clamp-2">
            {restaurant.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {restaurant.features.map((feature, idx) => (
              <span 
                key={idx}
                className="text-xs bg-muted/30 px-3 py-1 flex items-center gap-1"
              >
                <FeatureIcon feature={feature} />
                {feature}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Giá trung bình</span>
              <p className="font-semibold">{restaurant.priceRange}</p>
            </div>
            
            <Link 
              to={`/restaurants/${restaurant.id}`}
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

export default RestaurantListing;
