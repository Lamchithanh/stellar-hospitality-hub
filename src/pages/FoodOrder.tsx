import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Banknote, 
  QrCode, 
  Phone, 
  Package, 
  MapPin, 
  Mail, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ShoppingCart,
  Utensils,
  CheckCircle,
  ArrowLeft,
  User,
  Building2,
  ShieldCheck,
  Loader2
} from "lucide-react";

// Dữ liệu mẫu các món ăn (copy từ MenuDetail.tsx)
const menuItems = [
  {
    id: 1,
    name: "Phở Bò Kobe Đặc Biệt",
    category: "Món Việt Hiện Đại",
    price: 350000,
    description: "Phở truyền thống được nâng tầm với thịt bò Kobe thượng hạng và nước dùng ninh xương trong 24 giờ.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 2,
    name: "Cơm Cháy Sốt Hải Sản",
    category: "Món Fusion",
    price: 280000,
    description: "Cơm cháy giòn rụm kết hợp với hải sản tươi ngon và sốt đặc biệt của bếp trưởng.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
  }
];

// Định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const successVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 80,
      duration: 0.5
    }
  }
};

const FoodOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Thông tin món ăn từ ID
  const itemId = parseInt(id || "1");
  const menuItem = menuItems.find(item => item.id === itemId) || menuItems[0];
  
  // Thông tin đặt món
  const [orderInfo, setOrderInfo] = useState({
    quantity: 1,
    notes: "",
    deliveryOption: "delivery", // delivery hoặc pickup
    deliveryTime: "", // Thời gian giao hàng
  });
  
  // Thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Hà Nội",
  });
  
  // Tính tổng tiền
  const calculateTotal = () => {
    const subtotal = menuItem.price * orderInfo.quantity;
    const deliveryFee = orderInfo.deliveryOption === "delivery" ? 30000 : 0;
    const tax = subtotal * 0.1; // 10% thuế
    return subtotal + deliveryFee + tax;
  };

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi thông tin đặt món
  const handleOrderInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi xác nhận đặt món
  const handleOrderSubmit = () => {
    setOrderCompleted(true);
    toast({
      title: "Đặt món thành công!",
      description: "Đơn hàng của bạn đã được xác nhận và đang được xử lý.",
    });
    
    // Tự động chuyển sang trang xác nhận sau 1 giây
    setTimeout(() => {
      setActiveStep(3);
    }, 1000);
  };

  // Xử lý khi người dùng muốn quay lại trang menu
  const handleBackToMenu = () => {
    navigate("/menus");
  };

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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Đặt Món
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hoàn tất quá trình đặt món của bạn để thưởng thức ẩm thực tuyệt vời
            </p>
          </motion.div>
        </section>

        {/* Breadcrumb */}
        <div className="mb-8">
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
            <Link to={`/menus/${itemId}`} className="hover:text-primary transition-colors">{menuItem.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Đặt món</span>
          </motion.div>
        </div>

        {/* Các bước đặt món */}
        <div className="relative mb-12">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 flex items-center justify-center border-2 ${activeStep >= 1 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                1
              </div>
              <span className="mt-2 text-sm">Thông tin</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-muted-foreground/30 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" 
                style={{ width: `${activeStep > 1 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 flex items-center justify-center border-2 ${activeStep >= 2 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                2
              </div>
              <span className="mt-2 text-sm">Thanh toán</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-muted-foreground/30 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" 
                style={{ width: `${activeStep > 2 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 flex items-center justify-center border-2 ${activeStep >= 3 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                3
              </div>
              <span className="mt-2 text-sm">Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Nội dung các bước */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột thông tin/form */}
          <div className="md:col-span-2">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                variants={containerVariants}
              >
                <Card className="shadow-md border border-gray-200 dark:border-gray-800 rounded-none bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="bg-slate-50/80 dark:bg-slate-900/20 border-b border-gray-200 dark:border-gray-800">
                    <CardTitle className="text-2xl flex items-center">
                      <div className="w-1.5 h-6 bg-primary mr-3"></div>
                      Thông tin đặt món
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Thông tin món ăn */}
                    <motion.div 
                      variants={itemVariants}
                      className="border border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 md:w-1/4">
                          <div className="relative h-full">
                            <img
                              src={menuItem.image}
                              alt={menuItem.name}
                              className="w-full h-full object-cover aspect-square sm:aspect-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:hidden"></div>
                          </div>
                        </div>
                        <div className="flex-grow p-6 bg-white dark:bg-slate-800">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <Badge variant="outline" className="rounded-none bg-primary/10 border-0 text-primary mb-2">
                                {menuItem.category}
                              </Badge>
                              <h3 className="font-semibold text-xl mb-2">{menuItem.name}</h3>
                              <p className="text-sm text-muted-foreground mb-4">{menuItem.description}</p>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
                              <span className="font-medium text-primary text-lg">{formatCurrency(menuItem.price)}</span>
                              <div className="flex items-center">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-none border-gray-300 dark:border-gray-700"
                                  onClick={() => setOrderInfo(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                >
                                  -
                                </Button>
                                <span className="mx-4 font-medium">{orderInfo.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-none border-gray-300 dark:border-gray-700"
                                  onClick={() => setOrderInfo(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Phương thức nhận món */}
                    <motion.div variants={itemVariants} className="space-y-4">
                      <h3 className="text-lg font-semibold pb-2 border-b border-gray-200 dark:border-gray-800 flex items-center">
                        <div className="w-1 h-5 bg-primary mr-2"></div>
                        Phương thức nhận món
                      </h3>
                      <RadioGroup 
                        defaultValue={orderInfo.deliveryOption}
                        onValueChange={(value) => setOrderInfo(prev => ({ ...prev, deliveryOption: value }))}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="delivery"
                          className={`flex flex-col items-center justify-between p-4 cursor-pointer border-2 ${
                            orderInfo.deliveryOption === "delivery" 
                              ? "border-primary bg-primary/5" 
                              : "border-gray-200 dark:border-gray-800"
                          } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                        >
                          <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                          <Package className="h-6 w-6 mb-2 text-primary" />
                          <div className="space-y-1 text-center">
                            <p className="font-medium">Giao hàng</p>
                            <p className="text-xs text-muted-foreground">Giao hàng đến địa chỉ của bạn</p>
                          </div>
                        </Label>
                        <Label
                          htmlFor="pickup"
                          className={`flex flex-col items-center justify-between p-4 cursor-pointer border-2 ${
                            orderInfo.deliveryOption === "pickup" 
                              ? "border-primary bg-primary/5" 
                              : "border-gray-200 dark:border-gray-800"
                          } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                        >
                          <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                          <Utensils className="h-6 w-6 mb-2 text-primary" />
                          <div className="space-y-1 text-center">
                            <p className="font-medium">Tự đến lấy</p>
                            <p className="text-xs text-muted-foreground">Tự đến nhà hàng để lấy món</p>
                          </div>
                        </Label>
                      </RadioGroup>
                    </motion.div>

                    {/* Thông tin khách hàng */}
                    <motion.div variants={itemVariants} className="space-y-4">
                      <h3 className="text-lg font-semibold pb-2 border-b border-gray-200 dark:border-gray-800 flex items-center">
                        <div className="w-1 h-5 bg-primary mr-2"></div>
                        Thông tin khách hàng
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <Label htmlFor="fullName" className="text-sm font-medium group-focus-within:text-primary transition-colors">Họ và tên</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <User className="h-5 w-5" />
                            </div>
                            <Input 
                              id="fullName" 
                              name="fullName"
                              value={customerInfo.fullName}
                              onChange={handleCustomerInfoChange}
                              placeholder="Nhập họ và tên" 
                              className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 group">
                          <Label htmlFor="phone" className="text-sm font-medium group-focus-within:text-primary transition-colors">Số điện thoại</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <Phone className="h-5 w-5" />
                            </div>
                            <Input 
                              id="phone" 
                              name="phone"
                              value={customerInfo.phone}
                              onChange={handleCustomerInfoChange}
                              placeholder="Nhập số điện thoại" 
                              className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 group">
                        <Label htmlFor="email" className="text-sm font-medium group-focus-within:text-primary transition-colors">Email</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                            <Mail className="h-5 w-5" />
                          </div>
                          <Input 
                            id="email" 
                            name="email"
                            value={customerInfo.email}
                            onChange={handleCustomerInfoChange}
                            type="email" 
                            placeholder="example@email.com" 
                            className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      
                      {orderInfo.deliveryOption === "delivery" && (
                        <div className="space-y-2 group">
                          <Label htmlFor="address" className="text-sm font-medium group-focus-within:text-primary transition-colors">Địa chỉ giao hàng</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <Input 
                              id="address" 
                              name="address"
                              value={customerInfo.address}
                              onChange={handleCustomerInfoChange}
                              placeholder="Nhập địa chỉ giao hàng" 
                              className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Thời gian */}
                    <motion.div variants={itemVariants} className="space-y-4">
                      <h3 className="text-lg font-semibold pb-2 border-b border-gray-200 dark:border-gray-800 flex items-center">
                        <div className="w-1 h-5 bg-primary mr-2"></div>
                        Thời gian {orderInfo.deliveryOption === "delivery" ? "giao hàng" : "nhận món"}
                      </h3>
                      <div className="space-y-2 group">
                        <Label htmlFor="deliveryTime" className="text-sm font-medium group-focus-within:text-primary transition-colors">Thời gian</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                            <Clock className="h-5 w-5" />
                          </div>
                          <Input 
                            id="deliveryTime" 
                            name="deliveryTime"
                            value={orderInfo.deliveryTime}
                            onChange={handleOrderInfoChange}
                            type="time" 
                            className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <Label htmlFor="notes" className="text-sm font-medium group-focus-within:text-primary transition-colors">Ghi chú</Label>
                        <Textarea 
                          id="notes" 
                          name="notes"
                          value={orderInfo.notes}
                          onChange={handleOrderInfoChange}
                          placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú khác (nếu có)" 
                          className="rounded-none min-h-[100px] text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-800 p-6 bg-slate-50/80 dark:bg-slate-900/20">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-none border hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                      onClick={() => navigate(`/menus/${itemId}`)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Quay lại
                    </Button>
                    <Button 
                      type="button" 
                      className="rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => setActiveStep(2)}
                    >
                      Thanh toán
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-md border border-gray-200 dark:border-gray-800 rounded-none bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="bg-slate-50/80 dark:bg-slate-900/20 border-b border-gray-200 dark:border-gray-800">
                    <CardTitle className="text-2xl flex items-center">
                      <div className="w-1.5 h-6 bg-primary mr-3"></div>
                      Phương thức thanh toán
                    </CardTitle>
                    <CardDescription>
                      Chọn phương thức thanh toán phù hợp với bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <RadioGroup 
                      defaultValue={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="credit_card"
                        className={`flex flex-col items-center justify-between p-6 cursor-pointer border-2 ${
                          paymentMethod === "credit_card" 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-200 dark:border-gray-800"
                        } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                      >
                        <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                        <CreditCard className="h-8 w-8 mb-3 text-primary" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                        </div>
                      </Label>

                      <Label
                        htmlFor="cash"
                        className={`flex flex-col items-center justify-between p-6 cursor-pointer border-2 ${
                          paymentMethod === "cash" 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-200 dark:border-gray-800"
                        } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                      >
                        <RadioGroupItem value="cash" id="cash" className="sr-only" />
                        <Banknote className="h-8 w-8 mb-3 text-primary" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">Tiền mặt</p>
                          <p className="text-sm text-muted-foreground">Thanh toán khi nhận hàng</p>
                        </div>
                      </Label>

                      <Label
                        htmlFor="qr_code"
                        className={`flex flex-col items-center justify-between p-6 cursor-pointer border-2 ${
                          paymentMethod === "qr_code" 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-200 dark:border-gray-800"
                        } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                      >
                        <RadioGroupItem value="qr_code" id="qr_code" className="sr-only" />
                        <QrCode className="h-8 w-8 mb-3 text-primary" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">QR Code</p>
                          <p className="text-sm text-muted-foreground">Quét mã QR qua ứng dụng ngân hàng</p>
                        </div>
                      </Label>

                      <Label
                        htmlFor="bank_transfer"
                        className={`flex flex-col items-center justify-between p-6 cursor-pointer border-2 ${
                          paymentMethod === "bank_transfer" 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-200 dark:border-gray-800"
                        } hover:border-primary/80 hover:bg-primary/5 transition-all duration-300`}
                      >
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" className="sr-only" />
                        <Building2 className="h-8 w-8 mb-3 text-primary" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">Chuyển khoản</p>
                          <p className="text-sm text-muted-foreground">Chuyển khoản qua ngân hàng</p>
                        </div>
                      </Label>
                    </RadioGroup>

                    <div className="bg-primary/5 border border-primary/10 p-4 rounded-sm">
                      <h4 className="font-medium mb-2 flex items-center">
                        <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                        Thanh toán an toàn
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-800 p-6 bg-slate-50/80 dark:bg-slate-900/20">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="rounded-none border hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                      onClick={() => setActiveStep(1)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Quay lại
                    </Button>
                    <Button 
                      type="button" 
                      className="rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={handleOrderSubmit}
                      disabled={orderCompleted}
                    >
                      {orderCompleted ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Đang xử lý
                        </>
                      ) : (
                        <>
                          Hoàn tất đặt món
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={successVariants}
              >
                <Card className="shadow-lg border border-gray-200 dark:border-gray-800 rounded-none bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-green-500 via-green-400 to-green-300"></div>
                  <CardContent className="p-12 text-center">
                    <motion.div 
                      className="w-24 h-24 mx-auto mb-8 relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: 0.2
                      }}
                    >
                      <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 animate-ping opacity-25"></div>
                      <div className="relative bg-green-100 dark:bg-green-900/30 w-full h-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                      </div>
                    </motion.div>
                    
                    <motion.h2 
                      className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Đặt món thành công!
                    </motion.h2>
                    
                    <motion.p 
                      className="text-muted-foreground mb-6 max-w-xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Cảm ơn bạn đã đặt món. Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.
                      Chúng tôi sẽ liên hệ với bạn qua số điện thoại {customerInfo.phone} để xác nhận.
                    </motion.p>

                    <motion.div
                      className="mb-8 p-5 border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 mx-auto max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="font-semibold text-lg mb-3 text-left">Thông tin đơn hàng</h3>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex justify-between pb-2 border-b border-dashed border-gray-200 dark:border-gray-800">
                          <span className="text-muted-foreground">Mã đơn hàng:</span>
                          <span className="font-medium">STL-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-dashed border-gray-200 dark:border-gray-800">
                          <span className="text-muted-foreground">Món:</span>
                          <span className="font-medium">{menuItem.name} x {orderInfo.quantity}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-dashed border-gray-200 dark:border-gray-800">
                          <span className="text-muted-foreground">Tổng tiền:</span>
                          <span className="font-medium text-primary">{formatCurrency(calculateTotal())}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-muted-foreground">Phương thức:</span>
                          <span className="font-medium">
                            {paymentMethod === "credit_card" ? "Thẻ tín dụng/ghi nợ" : 
                             paymentMethod === "cash" ? "Tiền mặt khi nhận hàng" : "Ví điện tử/Chuyển khoản"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row justify-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button 
                        variant="outline" 
                        className="rounded-none border shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={handleBackToMenu}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại thực đơn
                      </Button>
                      <Button 
                        className="rounded-none bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={() => navigate("/")}
                      >
                        Về trang chủ
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Cột sidebar thông tin đơn hàng */}
          <div>
            {activeStep !== 3 && (
              <div className="sticky top-4">
                <Card className="shadow-md border border-gray-200 dark:border-gray-800 rounded-none bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-slate-50/80 dark:bg-slate-900/20">
                    <CardTitle className="flex items-center text-xl">
                      <ShoppingCart className="h-5 w-5 text-primary mr-2" />
                      Thông tin đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="w-16 h-16 border border-gray-200 dark:border-gray-800 mr-3 overflow-hidden">
                            <img
                              src={menuItem.image}
                              alt={menuItem.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{menuItem.name}</h4>
                            <p className="text-sm text-muted-foreground">{menuItem.category}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">Số lượng</span>
                          <p className="font-medium">{orderInfo.quantity}</p>
                        </div>
                      </div>

                      <div className="py-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Giá:</span>
                          <span>{formatCurrency(menuItem.price)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Số lượng:</span>
                          <span>x {orderInfo.quantity}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Phí giao hàng:</span>
                          <span>{orderInfo.deliveryOption === "delivery" ? formatCurrency(30000) : "Miễn phí"}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Thuế (10%):</span>
                          <span>{formatCurrency(menuItem.price * orderInfo.quantity * 0.1)}</span>
                        </div>
                      </div>

                      <div className="py-3">
                        <div className="flex justify-between font-bold">
                          <span>Tổng cộng:</span>
                          <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-5 bg-slate-50/80 dark:bg-slate-900/20">
                    {activeStep === 1 && (
                      <div className="w-full">
                        <div className="mb-3 text-sm text-muted-foreground">
                          <p className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 inline" />
                            Thời gian chuẩn bị: 15-30 phút
                          </p>
                        </div>
                        <div className="bg-primary/5 border border-primary/10 p-3 text-sm">
                          <span className="font-medium">Lưu ý:</span> Vui lòng kiểm tra kỹ thông tin trước khi đặt hàng. Thông tin sẽ được sử dụng để liên hệ và giao hàng.
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <Button
                        type="button"
                        className="w-full rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={handleOrderSubmit}
                      >
                        Xác nhận đặt món
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodOrder; 