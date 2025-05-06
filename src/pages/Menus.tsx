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
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Thực Đơn
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Khám phá tinh hoa ẩm thực Việt Nam kết hợp với các phong cách ẩm thực quốc tế
            </p>
          </motion.div>
        </section>

        {/* Hiển thị món ăn đặc trưng */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Flame className="h-5 w-5 mr-2 text-primary" />
              Món Đặc Trưng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">Đặc trưng</Badge>
                      </div>
                      {item.new && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary">Mới</Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <Link to={`/menus/${item.id}`}>
                          <Button size="sm" variant="secondary" className="bg-white/90 text-slate-900">
                            <ChefHat className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-secondary px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            <TagIcon tag={tag} />
                            {tag}
                          </span>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="font-bold text-lg">{formatCurrency(item.price)}</p>
                        <Link to={`/menus/${item.id}`}>
                          <Button variant="ghost" size="sm" className="group">
                            <ExternalLink className="h-4 w-4 mr-1 transition-transform group-hover:translate-x-1" />
                            Chi tiết
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Hiển thị menu theo danh mục */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Thực Đơn Theo Danh Mục</h2>
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="appetizers" className="flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  Khai Vị
                </TabsTrigger>
                <TabsTrigger value="main_courses" className="flex items-center">
                  <Flame className="h-4 w-4 mr-2" />
                  Món Chính
                </TabsTrigger>
                <TabsTrigger value="desserts" className="flex items-center">
                  <Wheat className="h-4 w-4 mr-2" />
                  Tráng Miệng
                </TabsTrigger>
                <TabsTrigger value="drinks" className="flex items-center">
                  <GlassWater className="h-4 w-4 mr-2" />
                  Đồ Uống
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link to={`/menus/${item.id}`} className="block">
                        <Card className="flex overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 border-0 group">
                          <div className="relative w-1/3 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          <div className="w-2/3">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base group-hover:text-primary transition-colors duration-300">
                                  {item.name}
                                  {item.new && <Badge variant="secondary" className="ml-2 text-xs">Mới</Badge>}
                                </CardTitle>
                                <span className="font-bold">{formatCurrency(item.price)}</span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag, idx) => (
                                  <span 
                                    key={idx}
                                    className="text-xs bg-secondary px-2 py-0.5 rounded-full flex items-center gap-1"
                                  >
                                    <TagIcon tag={tag} />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menus; 