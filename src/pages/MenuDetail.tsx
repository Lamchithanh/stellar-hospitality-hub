import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Clock, 
  Flame, 
  Utensils, 
  Leaf, 
  Wheat, 
  HeartPulse, 
  ChefHat, 
  CalendarClock, 
  Star,
  ShoppingCart,
  Check
} from "lucide-react";

// Dữ liệu mẫu các món ăn
const menuItems = [
  {
    id: 1,
    name: "Phở Bò Kobe Đặc Biệt",
    category: "Món Việt Hiện Đại",
    price: 350000,
    description: "Phở truyền thống được nâng tầm với thịt bò Kobe thượng hạng và nước dùng ninh xương trong 24 giờ.",
    longDescription: `
      Món phở đặc biệt này được chế biến từ những nguyên liệu cao cấp nhất, mang đến trải nghiệm ẩm thực Việt Nam đỉnh cao. 
      Thịt bò Kobe thượng hạng được cắt mỏng hoàn hảo, chính là điểm nhấn của món ăn. Nước dùng trong vắt được ninh từ xương 
      bò và gia vị đặc biệt trong 24 giờ, tạo nên hương vị đậm đà, ngọt thanh.
      
      Bánh phở được làm tươi mỗi ngày, dai mềm đúng chuẩn. Món ăn được hoàn thiện với các loại rau thơm tươi ngon và gia vị 
      đi kèm cao cấp như tương đen, chanh, ớt tươi Đà Lạt và giá đỗ tươi.
    `,
    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    ],
    ingredients: [
      "Thịt bò Kobe thượng hạng",
      "Bánh phở tươi",
      "Xương bò hầm",
      "Hành tây, hành lá",
      "Gừng, quế, hoa hồi",
      "Rau thơm các loại",
      "Giá đỗ",
      "Ớt tươi, chanh"
    ],
    nutrition: {
      calories: 520,
      protein: "32g",
      carbs: "58g",
      fat: "18g"
    },
    prepTime: "30 phút",
    isVegetarian: false,
    isGlutenFree: false,
    spicyLevel: 2, // 1-5
    featured: true,
    rating: 4.9,
    reviews: 142,
    chef: "Nguyễn Văn An",
    availableTime: "10:00 - 22:00"
  },
  {
    id: 2,
    name: "Cơm Cháy Sốt Hải Sản",
    category: "Món Fusion",
    price: 280000,
    description: "Cơm cháy giòn rụm kết hợp với hải sản tươi ngon và sốt đặc biệt của bếp trưởng.",
    longDescription: `
      Món cơm cháy sốt hải sản là sự kết hợp tuyệt vời giữa ẩm thực truyền thống Việt Nam và hương vị hiện đại. 
      Cơm được nấu từ gạo Jasmine thượng hạng, sau đó được chiên vàng giòn rụm tạo nên lớp cơm cháy đặc trưng.
      
      Phần sốt hải sản được chế biến từ tôm, mực, sò điệp tươi ngon nhất và các loại rau củ theo mùa. Đặc biệt, 
      sốt được nấu theo công thức riêng của bếp trưởng, mang đến hương vị đậm đà, cay nhẹ, ngọt thanh, hài hòa 
      từ nhiều nguyên liệu và gia vị.
      
      Món ăn được trang trí đẹp mắt với rau thơm tươi và một chút dầu mè thơm, tạo nên một món ăn vừa ngon miệng 
      vừa đẹp mắt.
    `,
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1071&q=80",
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    ingredients: [
      "Gạo Jasmine thượng hạng",
      "Tôm sú tươi",
      "Mực ống tươi",
      "Sò điệp",
      "Hành tây, tỏi",
      "Ớt chuông",
      "Các loại rau thơm",
      "Dầu mè"
    ],
    nutrition: {
      calories: 480,
      protein: "24g",
      carbs: "62g",
      fat: "15g"
    },
    prepTime: "25 phút",
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 3, // 1-5
    featured: true,
    rating: 4.7,
    reviews: 98,
    chef: "Trần Minh Đức",
    availableTime: "11:00 - 21:00"
  }
];

// Component hiển thị mức độ cay
const SpicyLevel = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Flame
          key={i}
          className={`h-4 w-4 mr-0.5 ${i < level ? "text-red-500 fill-red-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const MenuDetail = () => {
  const { id } = useParams();
  const itemId = parseInt(id || "1");
  const navigate = useNavigate();
  
  // Tìm món ăn dựa trên ID
  const item = menuItems.find(item => item.id === itemId) || menuItems[0];

  // Hàm xử lý khi nhấn nút đặt món
  const handleOrderNow = () => {
    navigate(`/food-order/${itemId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
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
            <Link to="/menus" className="hover:text-primary transition-colors">Thực đơn</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{item.name}</span>
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
            <div className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Item Info */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="rounded-none bg-primary/10 border-0 text-primary px-3 py-1 text-xs font-medium">
                    {item.category}
                  </Badge>
                  <div className="flex items-center bg-primary/5 px-3 py-1.5">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{item.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ 5</span>
                    <span className="text-muted-foreground text-sm ml-1">({item.reviews})</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground dark:to-foreground/80">{item.name}</h1>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <ChefHat className="h-5 w-5 text-primary mr-3" />
                    <span>{item.chef}</span>
                  </div>
                  <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <CalendarClock className="h-5 w-5 text-primary mr-3" />
                    <span>{item.availableTime}</span>
                  </div>
                  <div className="flex items-center p-3 border dark:border-gray-800 bg-white dark:bg-slate-800/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <Flame className="h-5 w-5 text-primary mr-3" />
                    <div className="flex items-center">
                      <span className="mr-2">Độ cay:</span>
                      <SpicyLevel level={item.spicyLevel} />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.isVegetarian && (
                    <Badge className="rounded-none bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-500">
                      <Leaf className="h-3.5 w-3.5 mr-1" />
                      Món chay
                    </Badge>
                  )}
                  {item.isGlutenFree && (
                    <Badge className="rounded-none bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-500">
                      <Wheat className="h-3.5 w-3.5 mr-1" />
                      Không gluten
                    </Badge>
                  )}
                  <Badge className="rounded-none bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/30 dark:text-red-500">
                    <HeartPulse className="h-3.5 w-3.5 mr-1" />
                    {item.nutrition.calories} calories
                  </Badge>
                </div>
              </div>
              
              <div className="border dark:border-gray-800 p-5 flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-800/50 shadow-sm">
                <div>
                  <span className="block text-2xl font-bold text-primary">{item.price.toLocaleString()}₫</span>
                  <span className="text-muted-foreground">Giá đã bao gồm thuế</span>
                </div>
                <Button 
                  className="w-full sm:w-auto mt-3 sm:mt-0 rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={handleOrderNow}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Đặt món ngay
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
            Hình ảnh món ăn
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {item.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="overflow-hidden border dark:border-gray-800 group hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={image} 
                    alt={`${item.name} ${index + 2}`} 
                    className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110 group-hover:brightness-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Detailed Information */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-none bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-800">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 pb-3 border-b dark:border-gray-800">Mô tả chi tiết</h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="leading-relaxed whitespace-pre-line">{item.longDescription}</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4">Dinh dưỡng</h3>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-4 border dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                      <span className="block text-lg font-semibold text-primary">{item.nutrition.calories}</span>
                      <span className="text-muted-foreground text-sm">Calories</span>
                    </div>
                    <div className="p-4 border dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                      <span className="block text-lg font-semibold text-primary">{item.nutrition.protein}</span>
                      <span className="text-muted-foreground text-sm">Protein</span>
                    </div>
                    <div className="p-4 border dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                      <span className="block text-lg font-semibold text-primary">{item.nutrition.carbs}</span>
                      <span className="text-muted-foreground text-sm">Carbs</span>
                    </div>
                    <div className="p-4 border dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                      <span className="block text-lg font-semibold text-primary">{item.nutrition.fat}</span>
                      <span className="text-muted-foreground text-sm">Fat</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="rounded-none bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-800 sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b dark:border-gray-800 flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  Nguyên liệu
                </h3>
                <div className="space-y-2">
                  {item.ingredients.map((ingredient, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 border-b dark:border-gray-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={handleOrderNow}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Đặt món ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
        
        {/* Related Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
            Món ăn liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.filter(m => m.id !== item.id).slice(0, 3).map((relatedItem) => (
              <Link to={`/menus/${relatedItem.id}`} key={relatedItem.id}>
                <Card className="rounded-none border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedItem.images[0]} 
                      alt={relatedItem.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{relatedItem.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedItem.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">{relatedItem.price.toLocaleString()}₫</span>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        {relatedItem.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MenuDetail; 