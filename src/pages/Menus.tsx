import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Flame, 
  Wheat, 
  Fish, 
  Beef, 
  GlassWater,
  Wine,
  Coffee,
  ChefHat,
  ExternalLink
} from "lucide-react";

// Định nghĩa kiểu dữ liệu cho món ăn
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  new: boolean;
};

// Dữ liệu món ăn mẫu
const menuItems: MenuItem[] = [
  // Khai vị
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    description: "Bánh tráng cuốn với tôm, thịt heo, bún, rau thơm và xà lách với nước chấm đặc biệt",
    price: 120000,
    category: "appetizers",
    tags: ["đặc sản", "truyền thống"],
    image: "https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    featured: true,
    new: false
  },
  {
    id: 2,
    name: "Chả giò hải sản",
    description: "Chả giò giòn rụm nhân hải sản và rau củ, dùng kèm với xà lách và nước mắm chua ngọt",
    price: 150000,
    category: "appetizers",
    tags: ["chiên giòn", "hải sản"],
    image: "https://images.unsplash.com/photo-1548811256-1627d99e7a57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    featured: false,
    new: true
  },
  {
    id: 3,
    name: "Súp bào ngư",
    description: "Súp bào ngư thượng hạng với nấm đông trùng hạ thảo và gà xé",
    price: 280000,
    category: "appetizers",
    tags: ["cao cấp", "hải sản"],
    image: "https://plus.unsplash.com/premium_photo-1670984939428-6705649ae469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true,
    new: false
  },
  
  // Món chính
  {
    id: 4,
    name: "Cá chẽm hấp Hồng Kông",
    description: "Cá chẽm tươi hấp với hành, gừng và xì dầu đặc biệt kiểu Hồng Kông",
    price: 350000,
    category: "main_courses",
    tags: ["hải sản", "đặc sắc"],
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    featured: true,
    new: false
  },
  {
    id: 5,
    name: "Bò Wagyu nướng truffle",
    description: "Thăn bò Wagyu A5 nướng với dầu truffle và khoai tây nghiền",
    price: 680000,
    category: "main_courses",
    tags: ["bò", "cao cấp", "nướng"],
    image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    featured: true,
    new: false
  },
  {
    id: 6,
    name: "Cơm chiên hải sản XO",
    description: "Cơm chiên với hỗn hợp hải sản, trứng và sốt XO đặc biệt",
    price: 220000,
    category: "main_courses",
    tags: ["cơm", "hải sản"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    featured: false,
    new: false
  },
  {
    id: 7,
    name: "Gà đồi nướng mật ong",
    description: "Gà đồi nướng với mật ong rừng và lá chanh, dùng kèm với xôi và rau thơm",
    price: 320000,
    category: "main_courses",
    tags: ["gà", "nướng", "truyền thống"],
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc240a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    featured: false,
    new: true
  },
  {
    id: 8,
    name: "Lẩu hải sản đặc biệt (2 người)",
    description: "Lẩu hải sản với nước dùng đặc biệt, tôm, mực, cá, sò điệp và rau củ theo mùa",
    price: 450000,
    category: "main_courses",
    tags: ["lẩu", "hải sản", "2 người"],
    image: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
    featured: true,
    new: false
  },
  
  // Tráng miệng
  {
    id: 9,
    name: "Chè khúc bạch",
    description: "Chè khúc bạch với trái cây tươi và sirô hoa lài",
    price: 85000,
    category: "desserts",
    tags: ["truyền thống", "ngọt"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d8e3f2689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    featured: false,
    new: false
  },
  {
    id: 10,
    name: "Bánh flan caramel",
    description: "Bánh flan mềm mịn với lớp caramel đắng nhẹ",
    price: 95000,
    category: "desserts",
    tags: ["bánh", "ngọt"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    featured: true,
    new: false
  },
  {
    id: 11,
    name: "Trái cây theo mùa",
    description: "Đĩa trái cây tươi theo mùa được cắt và trình bày đẹp mắt",
    price: 120000,
    category: "desserts",
    tags: ["trái cây", "tươi"],
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    featured: false,
    new: false
  },
  
  // Đồ uống
  {
    id: 12,
    name: "Sinh tố bơ",
    description: "Sinh tố bơ mịn với sữa đặc và đá",
    price: 75000,
    category: "drinks",
    tags: ["sinh tố", "lạnh"],
    image: "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    featured: false,
    new: false
  },
  {
    id: 13,
    name: "Cà phê trứng",
    description: "Cà phê đen truyền thống với lớp kem trứng mịn màng",
    price: 85000,
    category: "drinks",
    tags: ["cà phê", "đặc sản"],
    image: "https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true,
    new: false
  },
  {
    id: 14,
    name: "Trà sen vàng",
    description: "Trà ướp hương sen thanh mát với hạt sen tươi",
    price: 65000,
    category: "drinks",
    tags: ["trà", "thơm"],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: false,
    new: true
  },
  {
    id: 15,
    name: "Rượu vang Đà Lạt",
    description: "Rượu vang đỏ sản xuất tại Đà Lạt với hương vị trái cây và vani",
    price: 180000,
    category: "drinks",
    tags: ["rượu", "đặc sản"],
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    featured: false,
    new: false
  },
];

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Component hiển thị icon cho các tab
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "appetizers":
      return <Leaf className="h-4 w-4 mr-2" />;
    case "main_courses":
      return <Flame className="h-4 w-4 mr-2" />;
    case "desserts":
      return <Wheat className="h-4 w-4 mr-2" />;
    case "drinks":
      return <GlassWater className="h-4 w-4 mr-2" />;
    default:
      return null;
  }
};

// Component hiển thị icon cho các tag
const TagIcon = ({ tag }: { tag: string }) => {
  if (tag.includes("hải sản")) return <Fish className="h-3 w-3" />;
  if (tag.includes("bò")) return <Beef className="h-3 w-3" />;
  if (tag.includes("rượu")) return <Wine className="h-3 w-3" />;
  if (tag.includes("cà phê")) return <Coffee className="h-3 w-3" />;
  return null;
};

const Menus = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");

  // Danh sách món ăn đặc trưng
  const featuredItems = menuItems.filter(item => item.featured);
  
  // Lọc món ăn theo danh mục
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Thực Đơn Đặc Sắc
            </h1>
            <div className="w-24 h-1 bg-primary/80 mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Khám phá thế giới ẩm thực đa dạng với những món ăn được chế biến tinh tế từ nguyên liệu tươi ngon nhất.
            </p>
          </motion.div>
        </section>

        {/* Món ăn đặc trưng */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <ChefHat className="mr-2 h-6 w-6 text-primary" />
              <span>Món Ăn Đặc Trưng</span>
            </h2>
            <Link to="/menus" className="text-primary hover:text-primary/80 flex items-center group transition-colors">
              <span>Xem tất cả</span>
              <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * item.id }}
              >
                <Link to={`/menus/${item.id}`}>
                  <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300 rounded-none border border-gray-200 dark:border-gray-800 dark:bg-gray-900/30 group">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.featured && (
                        <div className="absolute top-0 left-0 bg-primary text-white text-xs font-semibold py-1 px-2.5">
                          ĐẶC TRƯNG
                        </div>
                      )}
                      {item.new && (
                        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-semibold py-1 px-2.5">
                          MỚI
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                        <p className="text-sm opacity-90 line-clamp-1 mb-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-lg">{formatCurrency(item.price)}</div>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <Badge 
                                key={idx} 
                                variant="secondary" 
                                className="bg-white/10 backdrop-blur-sm text-white border-0 flex items-center gap-1"
                              >
                                <TagIcon tag={tag} />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Menu chính */}
        <section>
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">Thực Đơn</h2>
          
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="mb-10 border-b dark:border-gray-800 overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 rounded-none gap-0 w-full flex justify-start">
                <TabsTrigger 
                  value="appetizers"
                  className="flex-none rounded-none h-12 border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all duration-300"
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Khai Vị
                </TabsTrigger>
                <TabsTrigger 
                  value="main_courses"
                  className="flex-none rounded-none h-12 border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all duration-300"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  Món Chính
                </TabsTrigger>
                <TabsTrigger 
                  value="desserts"
                  className="flex-none rounded-none h-12 border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all duration-300"
                >
                  <Wheat className="h-4 w-4 mr-2" />
                  Tráng Miệng
                </TabsTrigger>
                <TabsTrigger 
                  value="drinks"
                  className="flex-none rounded-none h-12 border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all duration-300"
                >
                  <GlassWater className="h-4 w-4 mr-2" />
                  Đồ Uống
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map(item => (
                <TabsContent key={item.id} value={item.category} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="rounded-none shadow-sm hover:shadow-md transition-all group border border-gray-200 dark:border-gray-800 dark:bg-gray-900/30 overflow-hidden h-full">
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="sm:w-1/3 relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover aspect-square sm:aspect-auto transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent sm:bg-gradient-to-l md:hidden"></div>
                        </div>
                        <CardContent className="flex-1 flex flex-col justify-between p-5 sm:p-6">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {item.tags.map((tag, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="outline" 
                                    className="bg-primary/5 border-primary/20 text-xs flex items-center gap-0.5"
                                  >
                                    <TagIcon tag={tag} />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-lg font-bold text-primary">
                                {formatCurrency(item.price)}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                            <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <CategoryIcon category={item.category} />
                              <span className="text-sm text-muted-foreground">
                                {item.category === "appetizers" ? "Khai vị" :
                                 item.category === "main_courses" ? "Món chính" :
                                 item.category === "desserts" ? "Tráng miệng" : "Đồ uống"}
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-none border border-primary/30 hover:bg-primary/5 hover:border-primary transition-colors text-primary"
                              asChild
                            >
                              <Link to={`/menus/${item.id}`}>Xem chi tiết</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menus; 