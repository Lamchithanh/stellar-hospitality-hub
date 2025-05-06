import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, Star, Crown, Gem, Award, Clock, Calendar, Gift, Utensils, Bed, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu cho các gói thành viên
const membershipTiers = [
  {
    id: "silver",
    name: "Bạc",
    price: 2000000,
    duration: "1 năm",
    icon: <Star className="h-8 w-8 text-slate-400" />,
    description: "Gói thành viên cơ bản với các đặc quyền ưu đãi hấp dẫn.",
    benefits: [
      "Giảm 10% cho dịch vụ phòng",
      "Giảm 5% cho dịch vụ nhà hàng",
      "Đặt phòng ưu tiên",
      "Tích điểm thưởng",
      "Quà tặng sinh nhật"
    ],
    color: "bg-gradient-to-r from-slate-300 to-slate-400",
    recommended: false
  },
  {
    id: "gold",
    name: "Vàng",
    price: 5000000,
    duration: "1 năm",
    icon: <Crown className="h-8 w-8 text-amber-400" />,
    description: "Gói thành viên phổ biến với nhiều đặc quyền hấp dẫn.",
    benefits: [
      "Giảm 15% cho dịch vụ phòng",
      "Giảm 10% cho dịch vụ nhà hàng",
      "Đặt phòng ưu tiên",
      "Tích điểm thưởng x1.5",
      "Quà tặng sinh nhật",
      "Trả phòng muộn (tùy tình trạng)",
      "Nâng cấp phòng (tùy tình trạng)"
    ],
    color: "bg-gradient-to-r from-amber-300 to-amber-500",
    recommended: true
  },
  {
    id: "platinum",
    name: "Bạch Kim",
    price: 10000000,
    duration: "1 năm",
    icon: <Gem className="h-8 w-8 text-cyan-400" />,
    description: "Gói thành viên cao cấp với đầy đủ đặc quyền VIP.",
    benefits: [
      "Giảm 25% cho dịch vụ phòng",
      "Giảm 20% cho dịch vụ nhà hàng",
      "Giảm 15% cho dịch vụ spa",
      "Đặt phòng ưu tiên",
      "Tích điểm thưởng x2",
      "Quà tặng sinh nhật cao cấp",
      "Trả phòng muộn đến 16:00",
      "Nâng cấp phòng (đảm bảo)",
      "Đón tiễn sân bay",
      "Dịch vụ quản gia riêng"
    ],
    color: "bg-gradient-to-r from-cyan-300 to-cyan-600",
    recommended: false
  }
];

// Dữ liệu mẫu cho các đặc quyền thành viên
const membershipPerks = [
  {
    icon: <Bed className="h-12 w-12 text-primary" />,
    title: "Ưu đãi phòng",
    description: "Giảm giá đặc biệt cho dịch vụ phòng và ưu tiên đặt phòng khi có nhu cầu."
  },
  {
    icon: <Utensils className="h-12 w-12 text-primary" />,
    title: "Đặc quyền ẩm thực",
    description: "Giảm giá tại nhà hàng của chúng tôi và ưu tiên đặt bàn tại các thời điểm cao điểm."
  },
  {
    icon: <Gift className="h-12 w-12 text-primary" />,
    title: "Quà tặng đặc biệt",
    description: "Nhận quà sinh nhật và các phần quà đặc biệt vào những dịp lễ trong năm."
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: "Lịch trình linh hoạt",
    description: "Nhận đặc quyền nhận phòng sớm và trả phòng muộn tùy theo tình trạng sẵn có."
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Điểm thưởng cao",
    description: "Tích lũy điểm thưởng nhanh hơn với hệ số nhân tùy theo cấp độ thành viên."
  },
  {
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    title: "Dịch vụ VIP",
    description: "Trải nghiệm dịch vụ chăm sóc khách hàng VIP với đường dây hỗ trợ riêng."
  }
];

// Định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Membership = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Xử lý khi nhấn nút đăng ký thành viên
  const handleSignUp = (tierId: string) => {
    navigate(`/login?membership=${tierId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Hero Section */}
        <section className="mb-16">
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
              Chương Trình Thành Viên VIP
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Tận hưởng đặc quyền độc quyền và ưu đãi đặc biệt khi trở thành thành viên của Stellar Hospitality
            </p>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[500px] overflow-hidden mb-12"
          >
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Membership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-3xl text-white text-center p-8 backdrop-blur-sm bg-black/30 border-0 rounded-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <Crown className="h-8 w-8 text-amber-400 mr-3" />
                    <h2 className="text-3xl md:text-4xl font-bold">Nâng Tầm Trải Nghiệm</h2>
                  </div>
                  <p className="text-white/90 text-lg mb-6">
                    Trở thành thành viên để nhận những đặc quyền độc quyền, ưu đãi đặc biệt 
                    và dịch vụ cá nhân hóa tại tất cả các khách sạn và nhà hàng trong hệ thống.
                  </p>
                  <Button 
                    className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0 rounded-none"
                    size="lg"
                    onClick={() => navigate("/register?membership=true")}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Gia Nhập Ngay
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Tabs Section */}
        <section className="mb-16">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800/50 p-1 mb-10 rounded-none">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none"
              >
                Tổng quan
              </TabsTrigger>
              <TabsTrigger 
                value="tiers"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none"
              >
                Gói thành viên
              </TabsTrigger>
              <TabsTrigger 
                value="faq"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-none"
              >
                Câu hỏi thường gặp
              </TabsTrigger>
            </TabsList>
            
            {/* Tab 1: Tổng quan */}
            <TabsContent value="overview" className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeTab === "overview" ? 1 : 0, y: activeTab === "overview" ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {membershipPerks.map((perk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                      <Card className="h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-none">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                          <div className="p-4 bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300 rounded-none">
                            {perk.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{perk.title}</h3>
                          <p className="text-muted-foreground">{perk.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg mb-8 rounded-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold">Chương Trình Điểm Thưởng</CardTitle>
                    <CardDescription>
                      Tích lũy điểm thưởng với mỗi chi tiêu và đổi lấy những trải nghiệm tuyệt vời
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Chương trình thành viên Stellar Rewards cho phép bạn tích lũy điểm với mỗi đồng chi tiêu tại khách sạn,
                      nhà hàng và các dịch vụ trong hệ thống của chúng tôi. Điểm thưởng có thể được đổi thành:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Đêm nghỉ miễn phí tại các khách sạn</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Bữa ăn miễn phí tại các nhà hàng</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Dịch vụ spa và làm đẹp</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Trải nghiệm độc đáo và tour du lịch</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Nâng cấp phòng và dịch vụ</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Sản phẩm độc quyền từ cửa hàng lưu niệm</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Alert className="backdrop-blur-sm bg-primary/10 border-0 rounded-none">
                  <Award className="h-5 w-5 text-primary" />
                  <AlertTitle className="text-primary font-semibold">Ưu đãi đặc biệt</AlertTitle>
                  <AlertDescription>
                    Đăng ký thành viên ngay hôm nay và nhận thêm 1000 điểm thưởng, tương đương với một bữa ăn miễn phí cho hai người tại nhà hàng của chúng tôi.
                  </AlertDescription>
                </Alert>
              </motion.div>
            </TabsContent>
            
            {/* Tab 2: Gói thành viên */}
            <TabsContent value="tiers">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeTab === "tiers" ? 1 : 0, y: activeTab === "tiers" ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {membershipTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="relative"
                  >
                    <Card className={`h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-none ${tier.recommended ? 'ring-2 ring-primary' : ''}`}>
                      {tier.recommended && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                          <Badge className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 border-0 text-white rounded-none">Phổ biến nhất</Badge>
                        </div>
                      )}
                      <CardHeader className={`${tier.color} text-white px-6 py-6`}>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <CardTitle className="text-2xl font-bold">Gói {tier.name}</CardTitle>
                            <CardDescription className="text-white/90">{tier.duration}</CardDescription>
                          </div>
                          {tier.icon}
                        </div>
                        <div className="mt-2">
                          <div className="text-3xl font-bold">{formatCurrency(tier.price)}</div>
                          <div className="text-white/90 text-sm">mỗi năm</div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 px-6">
                        <p className="text-muted-foreground mb-6">{tier.description}</p>
                        <h4 className="font-semibold mb-4">Đặc quyền bao gồm:</h4>
                        <ul className="space-y-3">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-2">
                        <Button 
                          className={`w-full backdrop-blur-sm rounded-none ${tier.recommended ? 'bg-primary/80 hover:bg-primary/90 text-white border-0' : 'bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                          onClick={() => handleSignUp(tier.id)}
                        >
                          Đăng ký ngay
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Tab 3: FAQ */}
            <TabsContent value="faq">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeTab === "faq" ? 1 : 0, y: activeTab === "faq" ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-none">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Làm thế nào để trở thành thành viên?</h3>
                      <p className="text-muted-foreground">
                        Bạn có thể đăng ký thành viên trực tiếp trên trang web này bằng cách chọn gói thành viên phù hợp và hoàn tất quá trình thanh toán. 
                        Bạn cũng có thể đăng ký tại bất kỳ khách sạn nào trong hệ thống của chúng tôi.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Tôi có thể nâng cấp gói thành viên không?</h3>
                      <p className="text-muted-foreground">
                        Có, bạn có thể nâng cấp gói thành viên bất cứ lúc nào. Phí nâng cấp sẽ được tính dựa trên thời gian còn lại của gói hiện tại.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Làm thế nào để sử dụng điểm thưởng?</h3>
                      <p className="text-muted-foreground">
                        Bạn có thể sử dụng điểm thưởng tại bất kỳ khách sạn hoặc nhà hàng nào trong hệ thống. Chỉ cần thông báo với nhân viên khi đặt phòng hoặc đặt bàn.
                        Bạn cũng có thể đổi điểm thưởng trực tiếp trên trang web hoặc ứng dụng của chúng tôi.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Thẻ thành viên có hiệu lực trong bao lâu?</h3>
                      <p className="text-muted-foreground">
                        Thẻ thành viên có hiệu lực trong 1 năm kể từ ngày đăng ký. Bạn sẽ nhận được thông báo trước 30 ngày khi thẻ sắp hết hạn để gia hạn.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Tôi có thể sử dụng đặc quyền thành viên tại tất cả các chi nhánh không?</h3>
                      <p className="text-muted-foreground">
                        Có, đặc quyền thành viên có thể được sử dụng tại tất cả các khách sạn, khu nghỉ dưỡng và nhà hàng trong hệ thống Stellar Hospitality trên toàn quốc.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">Làm thế nào để liên hệ với dịch vụ thành viên?</h3>
                      <p className="text-muted-foreground">
                        Thành viên có thể liên hệ với đội ngũ hỗ trợ 24/7 qua số điện thoại: 1800-123-456 hoặc email: vip@stellarhospitality.com.
                        Thành viên Bạch Kim sẽ có đường dây riêng và quản lý tài khoản cá nhân.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* CTA Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden p-10 rounded-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70"></div>
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", 
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}></div>
            <div className="relative z-10 text-white text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Sẵn sàng nâng cấp trải nghiệm của bạn?</h2>
              <p className="mb-8 text-lg text-white/90">
                Đăng ký thành viên ngay hôm nay để nhận ngay 1000 điểm thưởng và bắt đầu tận hưởng những đặc quyền độc quyền cùng Stellar Hospitality
              </p>
              <Button 
                size="lg" 
                className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0 rounded-none"
                onClick={() => navigate("/register?membership=true")}
              >
                <Crown className="h-4 w-4 mr-2" />
                Đăng ký ngay
              </Button>
              <div className="flex items-center justify-center mt-6 text-sm font-medium">
                <Clock className="h-4 w-4 mr-2" />
                <span>Ưu đãi có hạn! Đăng ký trước 31/12 để nhận thêm ưu đãi đặc biệt.</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Membership; 