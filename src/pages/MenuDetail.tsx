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
  ShoppingCart
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
        {/* Hero Section */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Main Image */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Item Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">
                    {item.category}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="mr-1">{item.rating}</span>
                    <span className="text-muted-foreground text-sm">({item.reviews})</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{item.name}</h1>
                <p className="text-muted-foreground mb-6 text-lg">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <ChefHat className="h-5 w-5 text-primary mr-2" />
                    <span>Đầu bếp: {item.chef}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Thời gian chuẩn bị: {item.prepTime}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-primary mr-2" />
                    <span>Phục vụ: {item.availableTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 text-primary mr-2" />
                    <span className="mr-2">Độ cay:</span>
                    <SpicyLevel level={item.spicyLevel} />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.isVegetarian && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-500">
                      <Leaf className="h-3.5 w-3.5 mr-1" />
                      Món chay
                    </Badge>
                  )}
                  {item.isGlutenFree && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-500">
                      <Wheat className="h-3.5 w-3.5 mr-1" />
                      Không gluten
                    </Badge>
                  )}
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/30 dark:text-red-500">
                    <HeartPulse className="h-3.5 w-3.5 mr-1" />
                    {item.nutrition.calories} calories
                  </Badge>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <span className="block text-2xl font-bold text-primary">{item.price.toLocaleString()}₫</span>
                  <span className="text-muted-foreground">Giá đã bao gồm thuế</span>
                </div>
                <Button 
                  className="w-full sm:w-auto mt-3 sm:mt-0 bg-gradient-to-r from-primary to-primary/80"
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
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="overflow-hidden rounded-lg shadow-md"
                >
                  <img 
                    src={image} 
                    alt={`${item.name} ${index + 2}`} 
                    className="w-full h-64 object-cover transition-transform hover:scale-110 duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Content Section */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Mô tả món ăn</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed whitespace-pre-line">{item.longDescription}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Ingredients and Nutrition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  Nguyên liệu
                </h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-slate-800 shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <HeartPulse className="h-5 w-5 mr-2 text-primary" />
                  Thông tin dinh dưỡng
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Calo</div>
                    <div className="font-bold text-lg">{item.nutrition.calories}</div>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Protein</div>
                    <div className="font-bold text-lg">{item.nutrition.protein}</div>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Carbs</div>
                    <div className="font-bold text-lg">{item.nutrition.carbs}</div>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Chất béo</div>
                    <div className="font-bold text-lg">{item.nutrition.fat}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
        
        {/* Related Items Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Món ăn tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(i => i.id !== item.id).map((relatedItem, index) => (
              <motion.div
                key={relatedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 border-0 group">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={relatedItem.images[0]} 
                      alt={relatedItem.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2">{relatedItem.category}</Badge>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{relatedItem.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedItem.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{relatedItem.price.toLocaleString()}₫</span>
                      <Link to={`/menus/${relatedItem.id}`}>
                        <Button variant="outline" size="sm">Xem chi tiết</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MenuDetail; 