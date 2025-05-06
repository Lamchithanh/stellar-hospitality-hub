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
import { MapPin, Star, Utensils, Music, Leaf, Coffee, Wine, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu cho danh sách nhà hàng
const restaurants = [
  {
    id: 1,
    name: "Stellar Fine Dining Hà Nội",
    location: "Hoàn Kiếm, Hà Nội",
    rating: 4.7,
    priceRange: "$$$$",
    cuisine: "Ẩm thực cao cấp",
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
    cuisine: "Pháp-Việt fusion",
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
    cuisine: "Steak House",
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
    cuisine: "Hải sản",
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
    cuisine: "Cà phê & Bánh ngọt",
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
    cuisine: "Ẩm thực đường phố",
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
  const [priceLevel, setPriceLevel] = useState<string[]>(["$", "$$", "$$$", "$$$$"]);
  const [filters, setFilters] = useState({
    privateRooms: false,
    outdoorSeating: false,
    liveMusic: false,
    vegetarianOptions: false,
  });

  // Lọc nhà hàng dựa trên tìm kiếm và bộ lọc
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Lọc theo tìm kiếm
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Lọc theo mức giá
    if (!priceLevel.includes(restaurant.priceRange)) {
      return false;
    }

    // Lọc theo tính năng
    if (filters.privateRooms && !restaurant.features.includes("Phòng riêng")) return false;
    if (filters.outdoorSeating && !restaurant.features.includes("Chỗ ngồi ngoài trời")) return false;
    if (filters.liveMusic && !restaurant.features.includes("Nhạc sống")) return false;
    if (filters.vegetarianOptions && !restaurant.features.includes("Món chay")) return false;

    return true;
  });

  // Xử lý thay đổi mức giá
  const handlePriceChange = (price: string) => {
    if (priceLevel.includes(price)) {
      setPriceLevel(priceLevel.filter(p => p !== price));
    } else {
      setPriceLevel([...priceLevel, price]);
    }
  };
  
  const isPriceActive = (price: string) => priceLevel.includes(price);

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
              Nhà Hàng & Ẩm Thực
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Khám phá hành trình ẩm thực đặc sắc với các nhà hàng đẳng cấp của chúng tôi trên khắp Việt Nam
            </p>
          </motion.div>
        
          {/* Phần tìm kiếm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none">
              <CardContent className="py-6 px-6">
                <div className="flex items-center bg-muted/50 px-4 py-2 border border-slate-200 dark:border-slate-700 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary rounded-none">
                  <svg className="h-5 w-5 text-muted-foreground mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input
                    placeholder="Tìm kiếm theo tên nhà hàng, địa điểm hoặc ẩm thực"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent rounded-none"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
        
        {/* Phần nội dung chính */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Phần bộ lọc */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg sticky top-4 rounded-none">
              <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-700">
                <CardTitle className="text-xl font-bold">Bộ Lọc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-5">
                  <h3 className="font-semibold text-lg flex items-center">
                    <span className="w-8 h-[2px] bg-primary mr-2"></span>
                    Mức Giá
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={isPriceActive("$") ? "default" : "outline"} 
                      size="sm" 
                      className={`min-w-[40px] ${isPriceActive("$") ? "backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0" : "bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"} rounded-none`}
                      onClick={() => handlePriceChange("$")}
                    >
                      $
                    </Button>
                    <Button 
                      variant={isPriceActive("$$") ? "default" : "outline"} 
                      size="sm" 
                      className={`min-w-[40px] ${isPriceActive("$$") ? "backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0" : "bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"} rounded-none`}
                      onClick={() => handlePriceChange("$$")}
                    >
                      $$
                    </Button>
                    <Button 
                      variant={isPriceActive("$$$") ? "default" : "outline"} 
                      size="sm" 
                      className={`min-w-[40px] ${isPriceActive("$$$") ? "backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0" : "bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"} rounded-none`}
                      onClick={() => handlePriceChange("$$$")}
                    >
                      $$$
                    </Button>
                    <Button 
                      variant={isPriceActive("$$$$") ? "default" : "outline"} 
                      size="sm" 
                      className={`min-w-[40px] ${isPriceActive("$$$$") ? "backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0" : "bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"} rounded-none`}
                      onClick={() => handlePriceChange("$$$$")}
                    >
                      $$$$
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-semibold text-lg flex items-center">
                    <span className="w-8 h-[2px] bg-primary mr-2"></span>
                    Tính Năng
                  </h3>
                  <div className="space-y-4 pl-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="privateRooms"
                        checked={filters.privateRooms}
                        onCheckedChange={(checked) => setFilters({...filters, privateRooms: checked})}
                        className="data-[state=checked]:bg-primary rounded-none"
                      />
                      <Label htmlFor="privateRooms" className="flex items-center cursor-pointer">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        Phòng riêng
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="outdoorSeating"
                        checked={filters.outdoorSeating}
                        onCheckedChange={(checked) => setFilters({...filters, outdoorSeating: checked})}
                        className="data-[state=checked]:bg-primary rounded-none"
                      />
                      <Label htmlFor="outdoorSeating" className="flex items-center cursor-pointer">
                        <Coffee className="h-4 w-4 mr-2 text-primary" />
                        Chỗ ngồi ngoài trời
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="liveMusic"
                        checked={filters.liveMusic}
                        onCheckedChange={(checked) => setFilters({...filters, liveMusic: checked})}
                        className="data-[state=checked]:bg-primary rounded-none"
                      />
                      <Label htmlFor="liveMusic" className="flex items-center cursor-pointer">
                        <Music className="h-4 w-4 mr-2 text-primary" />
                        Nhạc sống
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="vegetarianOptions"
                        checked={filters.vegetarianOptions}
                        onCheckedChange={(checked) => setFilters({...filters, vegetarianOptions: checked})}
                        className="data-[state=checked]:bg-primary rounded-none"
                      />
                      <Label htmlFor="vegetarianOptions" className="flex items-center cursor-pointer">
                        <Leaf className="h-4 w-4 mr-2 text-primary" />
                        Món chay
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Danh sách nhà hàng */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden flex flex-col h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-none">
                    <div className="h-56 relative">
                      <img 
                        src={restaurant.imageUrl} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {restaurant.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="backdrop-blur-sm bg-amber-500/80 hover:bg-amber-600/80 border-0 text-white rounded-none">Nổi bật</Badge>
                        </div>
                      )}
                      {restaurant.discount > 0 && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="backdrop-blur-sm bg-rose-600/80 hover:bg-rose-700/80 border-0 text-white rounded-none">Giảm {restaurant.discount}%</Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{restaurant.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1 text-primary" />
                        <span>{restaurant.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{restaurant.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                          <span>{restaurant.rating}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2">
                          <span className="font-medium">{restaurant.priceRange}</span>
                          <span>•</span>
                          <span>{restaurant.cuisine}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-muted/50 backdrop-blur-sm px-3 py-1 flex items-center gap-1 rounded-none"
                          >
                            <FeatureIcon feature={feature} />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link to={`/restaurants/${restaurant.id}`} className="w-full">
                        <Button className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none">
                          Xem Chi Tiết
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-12 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 mb-4">
                    <Utensils className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Không tìm thấy nhà hàng phù hợp</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md mx-auto">
                    Vui lòng điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc của bạn để khám phá thêm nhiều lựa chọn nhà hàng hấp dẫn khác
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-none"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceLevel(["$", "$$", "$$$", "$$$$"]);
                      setFilters({
                        privateRooms: false,
                        outdoorSeating: false,
                        liveMusic: false,
                        vegetarianOptions: false
                      });
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListing;
